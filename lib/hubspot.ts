// HubSpotのフォーム送信ヘルパー。
//
// 【重要】HubSpotのフォーム送信は、同じメールアドレスの既存コンタクトの
// プロパティを必ず上書きする。上書きを止めるネイティブ設定は存在しない
// （回避策はワークフローかプログレッシブフィールドのみ）。
//
// 既存の8,000件超は名刺由来で 会社名97% / 姓97% / 役職87% と充足率が高い。
// そこで、サイトのフォームからは標準プロパティ（company / lastname / jobtitle）を
// 一切触らず、email と message だけを送る。
// message プロパティは既存の利用が0件なので、上書きしても失うものがない。
//
// 氏名・会社名などの詳細は message にまとめて入れる。HubSpot側では
// フォーム送信の記録としてコンタクトのタイムラインに残るため、情報は失われない。

// 送信先は api.hubapi.com ではなく api.hsforms.com。
// api.hubapi.com へ送るとHTMLの404が返る（実機で確認済み）。認証は不要。
const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;

type SubmitArgs = {
  formGuid: string | undefined;
  email: string;
  /** message プロパティに入れる本文。氏名・会社名などをここに集約する */
  message: string;
  pageName: string;
  pageUri?: string;
};

/**
 * HubSpotへフォーム送信する。設定が無い場合や失敗した場合も例外は投げない。
 * 呼び出し側の主処理（Slack通知）を止めないため、結果はboolで返すだけにしている。
 */
export async function submitToHubSpot({
  formGuid,
  email,
  message,
  pageName,
  pageUri,
}: SubmitArgs): Promise<boolean> {
  if (!PORTAL_ID || !formGuid) return false;

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${formGuid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [
            { objectTypeId: "0-1", name: "email", value: email },
            { objectTypeId: "0-1", name: "message", value: message },
          ],
          context: {
            pageUri: pageUri || "https://www.co-studio.co.jp/",
            pageName,
          },
        }),
      }
    );
    if (!res.ok) {
      console.error("HubSpot送信に失敗", pageName, res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("HubSpotへの接続に失敗", pageName, err);
    return false;
  }
}
