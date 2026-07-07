import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Scores = {
  theme: number;
  person: number;
  money: number;
  sponsor: number;
  ops: number;
};

type ShindanPayload = {
  company?: string;
  name?: string;
  role?: string;
  email?: string;
  message?: string;
  verdict?: "A" | "B" | "C";
  total?: number;
  scores?: Partial<Scores>;
  answers?: number[];
};

const VERDICT_LABEL: Record<string, string> = {
  A: "A（適合度：高い）",
  B: "B（可能性あり・要検証）",
  C: "C（情報収集フェーズ）",
};

// 通知の見出しは「診断の回答」ではなく「フォーム送信の目的」で出す
// （このAPIが呼ばれる＝結果画面のリードフォームを送信した人だけ。診断のみの完了者は通知されない）
const PURPOSE_HEADER: Record<string, string> = {
  A: "🤝 個別相談の申込",
  B: "🔍 出島適合診断サービスの問い合わせ",
  C: "📩 イベント案内の希望",
};

export async function POST(request: Request) {
  let data: ShindanPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = (data.email ?? "").trim();
  const company = (data.company ?? "").trim();
  const name = (data.name ?? "").trim();
  const role = (data.role ?? "").trim();
  const message = (data.message ?? "").trim();

  // 会社名・氏名・メールを必須にする（お悩み・役職は任意）
  if (!email || !company || !name) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const verdict = data.verdict ?? "-";
  const total = typeof data.total === "number" ? data.total : "-";
  const s = data.scores ?? {};
  const scoreLine =
    `テーマ ${s.theme ?? "-"}/6｜人 ${s.person ?? "-"}/4｜資金 ${s.money ?? "-"}/4｜` +
    `決裁 ${s.sponsor ?? "-"}/4｜実務 ${s.ops ?? "-"}/8`;

  const webhookUrl = process.env.SLACK_HP_WEBHOOK_URL ?? process.env.SLACK_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("SLACK_HP_WEBHOOK_URL / SLACK_CONTACT_WEBHOOK_URL is not set");
    // 通知が飛ばなくても診断体験は成立させる
    return NextResponse.json({ ok: true, notified: false });
  }

  const nameLine = name
    ? `${name}${role ? `（${role}）` : ""}`
    : role || "（氏名未入力）";

  const header = PURPOSE_HEADER[verdict] ?? "🧭 セルフ診断からのお問い合わせ";
  const slackBody = {
    text: `${header}：${name}様（${company}）/ セルフ診断${VERDICT_LABEL[verdict] ?? verdict}・${total}点`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: header, emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*判定:*\n${VERDICT_LABEL[verdict] ?? verdict}（${total}/26点）` },
          { type: "mrkdwn", text: `*内訳:*\n${scoreLine}` },
          { type: "mrkdwn", text: `*会社:*\n${company || "（未入力）"}` },
          { type: "mrkdwn", text: `*氏名:*\n${nameLine}` },
          { type: "mrkdwn", text: `*メール:*\n${email}` },
        ],
      },
      ...(message
        ? [
            {
              type: "section",
              text: { type: "mrkdwn", text: `*お悩み・ご相談内容:*\n${message}` },
            },
          ]
        : []),
      {
        type: "context",
        elements: [{ type: "mrkdwn", text: "co-studio.co.jp /shindan 出島適合セルフ診断" }],
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
