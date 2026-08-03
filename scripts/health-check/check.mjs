#!/usr/bin/env node
// Co-Studio HP 日次ヘルスチェック
//
// Uptime Check（15分ごと）は「トップページが200を返すか」しか見ていないため、
// 「200は返るが中身が壊れている」タイプの不具合を拾えない。
// 実際に2026-07-29、/news の全リリース一覧（約24,000px）が opacity:0 のまま
// 表示されない状態が本番で放置されていた。
//
// ここでは実ブラウザでページを開き、次を確認する：
//   1. ページが200で開けるか
//   2. スクロール後も opacity が 0 のままのセクションが残っていないか（上記バグの再発検知）
//   3. 各ページに「あるはずの文言」が実際に見えているか
//   4. ページ内の内部リンクが404になっていないか
//   5. フォームのAPIが設定切れ（503）になっていないか
//
// 失敗した項目だけをSlackに通知する。

import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "https://www.co-studio.co.jp";

/** 各ページで「見えていないとおかしい」文言 */
const PAGES = [
  { path: "/", mustSee: ["新規事業", "Co-DEZIMA"] },
  { path: "/service", mustSee: ["Co-DEZIMA", "SPRINT"] },
  { path: "/news", mustSee: ["ニュースリリース", "PR TIMES"] },
  { path: "/co-dezima", mustSee: ["出島という、新規事業の選択肢"] },
  { path: "/co-dezima/guide", mustSee: ["カーブアウト", "学習ループ", "出典・参考リンク"] },
  { path: "/shindan", mustSee: ["出島適合セルフ診断", "この診断で聞いていること"] },
  { path: "/portfolio", mustSee: ["do.Sukasu", "Aikomi"] },
  { path: "/results", mustSee: ["延べ60社以上", "SPRINT"] },
];

const failures = [];
const fail = (page, msg) => failures.push(`${page}｜${msg}`);

async function checkPage(browser, { path, mustSee }) {
  const url = BASE + path;
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  try {
    const res = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    if (!res || res.status() !== 200) {
      fail(path, `HTTP ${res ? res.status() : "応答なし"}`);
      return;
    }

    // 下まで少しずつスクロールして、遅延表示の演出を発火させる
    await page.evaluate(async () => {
      const step = 600;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1500);

    // ① スクロールしても opacity 0 のまま残っているセクションが無いか
    const invisible = await page.evaluate(() => {
      const out = [];
      for (const s of document.querySelectorAll("main section")) {
        const st = getComputedStyle(s);
        const h = s.getBoundingClientRect().height;
        if (h > 200 && parseFloat(st.opacity) < 0.1) {
          out.push({ height: Math.round(h), text: (s.innerText || "").slice(0, 40) });
        }
      }
      return out;
    });
    for (const s of invisible) {
      fail(path, `高さ${s.height}pxのセクションが非表示のまま（${s.text.replace(/\s+/g, " ")}…）`);
    }

    // ② 見えているべき文言が実際に見えているか
    for (const text of mustSee) {
      const visible = await page.evaluate((t) => {
        const walk = document.createElement("div");
        walk.remove();
        for (const el of document.querySelectorAll("main *")) {
          if (!el.textContent || !el.textContent.includes(t)) continue;
          const st = getComputedStyle(el);
          if (st.visibility === "hidden" || st.display === "none") continue;
          if (parseFloat(st.opacity) < 0.1) continue;
          if (el.getBoundingClientRect().height === 0) continue;
          return true;
        }
        return false;
      }, text);
      if (!visible) fail(path, `「${text}」が表示されていない`);
    }

    // ③ 内部リンクが404になっていないか
    const links = await page.evaluate(() =>
      Array.from(document.querySelectorAll('main a[href^="/"]'))
        .map((a) => a.getAttribute("href"))
        .filter((h) => h && !h.startsWith("//") && !h.startsWith("/#"))
    );
    const unique = [...new Set(links)].slice(0, 40);
    for (const href of unique) {
      const target = BASE + href.split("#")[0];
      try {
        const r = await fetch(target, { method: "HEAD", redirect: "follow" });
        if (r.status >= 400) fail(path, `内部リンク切れ ${href} → HTTP ${r.status}`);
      } catch {
        fail(path, `内部リンクに到達できない ${href}`);
      }
    }
  } catch (e) {
    fail(path, `確認中にエラー：${String(e).slice(0, 120)}`);
  } finally {
    await page.close();
  }
}

/** フォームのAPIが設定切れになっていないか（503は環境変数の欠落を意味する） */
async function checkApi() {
  try {
    const r = await fetch(BASE + "/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // 同意なし＝400が正しい応答。503なら環境変数が落ちている
      body: JSON.stringify({ email: "healthcheck@example.com", consent: false }),
    });
    if (r.status === 503) {
      fail("/api/newsletter", "HubSpotの環境変数が未設定（503）。再デプロイ時に消えた可能性");
    } else if (r.status !== 400) {
      fail("/api/newsletter", `想定外の応答 HTTP ${r.status}（期待は400）`);
    }
  } catch (e) {
    fail("/api/newsletter", `到達できない：${String(e).slice(0, 100)}`);
  }
}

async function notifySlack(text) {
  const url = process.env.SLACK_HP_WEBHOOK_URL;
  if (!url) {
    console.error("SLACK_HP_WEBHOOK_URL が未設定のため通知できません");
    return;
  }
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
}

const browser = await chromium.launch();
for (const p of PAGES) await checkPage(browser, p);
await browser.close();
await checkApi();

if (failures.length === 0) {
  console.log(`✓ 異常なし（${PAGES.length}ページ＋API）`);
  process.exit(0);
}

console.error(`✗ ${failures.length}件の異常`);
for (const f of failures) console.error("  - " + f);

await notifySlack(
  [
    `🟠 co-studio.co.jp のヘルスチェックで${failures.length}件の異常を検知しました。`,
    "",
    ...failures.map((f) => `• ${f}`),
    "",
    "※サイトは表示されている（ダウンではない）が、中身が壊れている可能性があります。",
  ].join("\n")
);
process.exit(1);
