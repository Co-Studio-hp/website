import { NextResponse } from "next/server";

export const runtime = "nodejs";

// HubSpotのフォーム送信エンドポイント。認証不要（portalId と formGuid で送信先が決まる）。
// フォームと購読タイプはHubSpotの管理画面側で作成し、ここでは送信するだけにしている。
const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const FORM_GUID = process.env.HUBSPOT_NEWSLETTER_FORM_GUID;
// 購読タイプIDが設定されていれば、同意の記録も一緒に送る（特定電子メール法の同意記録）
const SUBSCRIPTION_ID = process.env.HUBSPOT_NEWSLETTER_SUBSCRIPTION_ID;

const CONSENT_TEXT =
  "Co-Studioからのイベント案内・活動報告メールの配信に同意します。配信はいつでも停止できます。";

type Payload = { email?: string; consent?: boolean; pageUri?: string };

export async function POST(request: Request) {
  if (!PORTAL_ID || !FORM_GUID) {
    console.error("newsletter: HUBSPOT_PORTAL_ID / HUBSPOT_NEWSLETTER_FORM_GUID が未設定");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let data: Payload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = (data.email ?? "").trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (data.consent !== true) {
    return NextResponse.json({ ok: false, error: "consent_required" }, { status: 400 });
  }

  const body: Record<string, unknown> = {
    fields: [{ objectTypeId: "0-1", name: "email", value: email }],
    context: {
      pageUri: data.pageUri || "https://www.co-studio.co.jp/",
      pageName: "メールマガジン登録",
    },
  };

  if (SUBSCRIPTION_ID) {
    body.legalConsentOptions = {
      consent: {
        consentToProcess: true,
        text: CONSENT_TEXT,
        communications: [
          {
            value: true,
            subscriptionTypeId: Number(SUBSCRIPTION_ID),
            text: CONSENT_TEXT,
          },
        ],
      },
    };
  }

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("newsletter: HubSpot送信に失敗", res.status, detail);
      return NextResponse.json({ ok: false, error: "upstream_error" }, { status: 502 });
    }
  } catch (err) {
    console.error("newsletter: HubSpotへの接続に失敗", err);
    return NextResponse.json({ ok: false, error: "network_error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
