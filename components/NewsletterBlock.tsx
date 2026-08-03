import NewsletterForm from "./NewsletterForm";

// フッター直上に全ページ共通で出るメールマガジンの登録ブロック。
// HubSpot側のフォームが未作成のうちは何も描画しない（環境変数が入った時点で出る）。
export default function NewsletterBlock() {
  if (!process.env.HUBSPOT_PORTAL_ID || !process.env.HUBSPOT_NEWSLETTER_FORM_GUID) {
    return null;
  }

  return (
    <section className="bg-[#F5F3EE] border-t border-gray-200 py-14 md:py-16 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.1fr] gap-8 md:gap-14 items-center">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">Newsletter</p>
          <h2 className="text-xl md:text-2xl font-medium leading-snug mb-4">
            Night DEZIMAの案内と、
            <br className="hidden md:block" />
            出島の実例をお届けします。
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            月1〜2回。イベントの開催告知と開催レポート、新会社の設立や登壇のお知らせをお送りします。
          </p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}
