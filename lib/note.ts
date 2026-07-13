// note.com/co_studio のRSSフィードを取得・パースするユーティリティ。
// 記事を追加・編集したいときは note に投稿するだけでOK（コード変更不要）。
// このサイトは1時間ごとにRSSを取り直して自動反映します。

import { getOgImages } from "./og";

const NOTE_RSS_URL = "https://note.com/co_studio/rss";
export const NOTE_URL = "https://note.com/co_studio";

export type NoteArticle = {
  title: string;
  link: string;
  date: string; // 表示用 "2026.4.15"
  isoDate: string; // ソート用
  thumbnail: string | null;
  category: string;
};

// タイトルからカテゴリを推定（noteのRSSにはカテゴリ情報が無いため）
function inferCategory(title: string): string {
  if (/DEZIMA|デジマ/i.test(title)) return "Night DEZIMA";
  if (/インタビュー/.test(title)) return "インタビュー";
  if (/登壇|カンファレンス|セミナー|サミット|Summit/i.test(title)) return "登壇・イベント";
  if (/Co-Studio\s*[×x]|協業|プロジェクト|締結|出展/.test(title)) return "共同プロジェクト";
  return "コラム";
}

const MONTHS: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

// "Wed, 15 Apr 2026 18:07:17 +0900" → { display: "2026.4.15", iso: "2026-04-15" }
function parsePubDate(raw: string): { display: string; iso: string } {
  const m = raw.match(/(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})/);
  if (!m) return { display: "", iso: "0000-00-00" };
  const day = parseInt(m[1], 10);
  const month = MONTHS[m[2]] ?? 0;
  const year = parseInt(m[3], 10);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    display: `${year}.${month}.${day}`,
    iso: `${year}-${pad(month)}-${pad(day)}`,
  };
}

function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function pick(block: string, tag: string): string | null {
  // CDATA対応
  const re = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`, "i");
  const m = block.match(re);
  return m ? m[1].trim() : null;
}

function pickAttrTag(block: string, tag: string): string | null {
  // 自己終了/値タグ両対応の単純取得（media:thumbnail など）
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = block.match(re);
  return m ? m[1].trim() : null;
}

/**
 * note RSSから記事一覧を取得。失敗時は空配列を返す（ページは落とさない）。
 * Next.jsの fetch revalidate により1時間キャッシュ。
 */
export async function getNoteArticles(): Promise<NoteArticle[]> {
  try {
    const res = await fetch(NOTE_RSS_URL, {
      next: { revalidate: 3600 }, // 1時間ごとに再取得
      headers: { "User-Agent": "co-studio-hp/1.0" },
    });
    if (!res.ok) return [];
    const xml = await res.text();

    const items = xml.split(/<item>/).slice(1).map((chunk) => chunk.split(/<\/item>/)[0]);

    const articles: NoteArticle[] = items.map((block) => {
      const title = decodeEntities(pick(block, "title") ?? "");
      const link = (pick(block, "link") ?? "").trim();
      const thumbnail = pickAttrTag(block, "media:thumbnail");
      const { display, iso } = parsePubDate(pick(block, "pubDate") ?? "");
      return {
        title,
        link,
        date: display,
        isoDate: iso,
        thumbnail: thumbnail || null,
        category: inferCategory(title),
      };
    }).filter((a) => a.title && a.link);

    // 新しい順
    articles.sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1));

    // noteで「見出し画像」未設定の記事はRSSにmedia:thumbnailが入らない。
    // その場合は記事ページのog:image（noteが自動生成するカード画像）で補完する。
    const missing = articles.filter((a) => !a.thumbnail).map((a) => a.link);
    if (missing.length > 0) {
      const ogMap = await getOgImages(missing);
      for (const a of articles) {
        if (!a.thumbnail) a.thumbnail = ogMap[a.link] ?? null;
      }
    }

    return articles;
  } catch {
    return [];
  }
}

/**
 * Night DEZIMA関連の記事を「完全ガイド（大解説）」と「開催レポート」に分けて返す。
 * バナー画像（thumbnail）を使ったギャラリー表示などに利用。
 */
export async function getDezimaContent(): Promise<{
  guide: NoteArticle | null;
  reports: NoteArticle[];
}> {
  const all = await getNoteArticles();
  const dezima = all.filter((a) => /DEZIMA|デジマ/i.test(a.title));
  const guide = dezima.find((a) => /完全ガイド|大解説/.test(a.title)) ?? null;
  const reports = dezima.filter((a) => a !== guide);
  return { guide, reports };
}
