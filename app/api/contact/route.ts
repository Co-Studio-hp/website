import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  company?: string;
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const company = (data.company ?? "").trim();
  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();

  // 必須項目の簡易バリデーション
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const webhookUrl = process.env.SLACK_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    // Webhook未設定。設定するまで通知は飛ばないが、フォーム自体は壊さない。
    console.error("SLACK_CONTACT_WEBHOOK_URL is not set");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  // Slack通知（Block Kit）
  const slackBody = {
    text: `📩 HPからお問い合わせがありました（${name}様 / ${company || "会社名未記入"}）`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "📩 HPお問い合わせ", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*会社名:*\n${company || "（未記入）"}` },
          { type: "mrkdwn", text: `*お名前:*\n${name}` },
          { type: "mrkdwn", text: `*メール:*\n${email}` },
        ],
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*ご相談内容:*\n${message}` },
      },
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: "co-studio.co.jp お問い合わせフォーム" },
        ],
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
      return NextResponse.json({ ok: false, error: "slack_failed" }, { status: 502 });
    }
  } catch (e) {
    console.error("Slack webhook error", e);
    return NextResponse.json({ ok: false, error: "slack_error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
