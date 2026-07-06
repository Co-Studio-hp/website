import { NextResponse } from "next/server";

export const runtime = "nodejs";

type WpPayload = {
  company?: string;
  name?: string;
  email?: string;
};

export async function POST(request: Request) {
  let data: WpPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const company = (data.company ?? "").trim();
  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();

  if (!name || !email || !company) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  // フリーメールは対象外（会社メールのみ受け付ける）
  const FREE_MAIL_DOMAINS = [
    "gmail.com", "yahoo.co.jp", "yahoo.com", "outlook.com", "outlook.jp", "hotmail.com",
    "hotmail.co.jp", "live.jp", "live.com", "icloud.com", "me.com", "mac.com",
    "aol.com", "protonmail.com", "proton.me", "mail.com", "gmx.com", "yandex.com",
    "docomo.ne.jp", "ezweb.ne.jp", "au.com", "softbank.ne.jp", "i.softbank.jp",
  ];
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  if (FREE_MAIL_DOMAINS.includes(domain)) {
    return NextResponse.json({ ok: false, error: "free_mail" }, { status: 400 });
  }

  const webhookUrl = process.env.SLACK_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("SLACK_CONTACT_WEBHOOK_URL is not set");
    // 通知が飛ばなくてもダウンロード自体は提供する（リード獲得よりUX優先の判断はSlack側で気づける）
    return NextResponse.json({ ok: true, notified: false });
  }

  const slackBody = {
    text: `📘 出島入門WPがダウンロードされました（${name}様 / ${company}）`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "📘 WPダウンロード（出島入門）", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*会社名:*\n${company}` },
          { type: "mrkdwn", text: `*お名前:*\n${name}` },
          { type: "mrkdwn", text: `*メール:*\n${email}` },
        ],
      },
      {
        type: "context",
        elements: [{ type: "mrkdwn", text: "co-studio.co.jp /co-dezima ダウンロードフォーム" }],
      },
    ],
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackBody),
    });
    if (!res.ok) {
      console.error("Slack webhook failed", res.status, await res.text());
    }
  } catch (e) {
    console.error("Slack webhook error", e);
  }

  return NextResponse.json({ ok: true });
}
