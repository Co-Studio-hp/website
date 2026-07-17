import type { Metadata } from "next";
import Link from "next/link";
import { getOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "do.Sukasu | Portfolio",
  alternates: { canonical: "/portfolio/do-sukasu" },
};

const timeline = [
  { year: "2019", event: "住友ファーマとのSPRINTプログラム開始。視空間認知能力の評価Indexを共同開発。シーズもアイデアもない状態から近未来デザイン・ビジネスモデル・特許設計を一体で進める。" },
  { year: "2020", event: "MVP作成。介護・福祉施設でのPoC開始。療育×運転の教習所との協業スタート。" },
  { year: "2021", event: "プロダクト開発・MVP改修・データ解析を本格化。アイムと発達障害者の視覚認知問題の事業検証開始。" },
  { year: "2022", event: "XR総合展に出展し250名以上から資料請求。サービスイン。" },
  { year: "2023", event: "シードラウンドで総額4,500万円の資金調達。南都銀行・Capital Medica・Kicker Venturesが出資。住友ファーマから出島スタートアップとして独立。" },
  { year: "2024", event: "スマートフォンアプリ「de.Sukasu DRIVE」をリリース。東京都リハビリテーション病院との共同研究開始。日本安全運転医療学会で空間認知能力評価ツールの成果発表。" },
  { year: "2025", event: "プレシリーズAで6,000万円を追加調達。大阪・関西万博に出展。奈良女子大学との共同研究成果発表。" },
  { year: "2026", event: "アクシスと空間認知能力の可視化技術を活用した交通事故リスク低減に向けた業務提携。ムジコ・クリエイトとも業務提携し「安全な交通社会人」育成を推進。" },
];

const pressReleases = [
  { title: "do.Sukasu、株式会社アイムと発達障害者の抱える視覚認知問題を解決する事業検証に着手", url: "https://prtimes.jp/main/html/rd/p/000000004.000066976.html", date: "2021" },
  { title: "視覚認知能力の低下が引き起こす社会課題に取り組むdo.Sukasuがシードラウンドで資金調達を実施", url: "https://prtimes.jp/main/html/rd/p/000000006.000066976.html", date: "2023.12" },
  { title: "新規事業開発支援サービスから誕生した子会社do.Sukasuが視覚認知能力の社会課題解決に向けて資金調達（Co-Studio側リリース）", url: "https://prtimes.jp/main/html/rd/p/000000040.000059402.html", date: "2023" },
  { title: "ドライバーの安全運転と健康寿命の延伸をサポートする「de.Sukasu DRIVE」アプリをリリース", url: "https://prtimes.jp/main/html/rd/p/000000008.000066976.html", date: "2024.08" },
  { title: "do.Sukasu、東京都リハビリテーション病院と共同研究を開始", url: "https://prtimes.jp/main/html/rd/p/000000009.000066976.html", date: "2024.09" },
  { title: "do.SukasuがプレシリーズAで6,000万円を資金調達。加齢による「交通事故ゼロ」を実現へ", url: "https://prtimes.jp/main/html/rd/p/000000016.000066976.html", date: "2025" },
  { title: "do.Sukasu、空間認知のトレーニングシステムを大阪・関西万博に出展", url: "https://prtimes.jp/main/html/rd/p/000000014.000066976.html", date: "2025" },
  { title: "do.Sukasuが日本安全運転医療学会にて空間認知能力評価ツール「de.Sukasu KEEP」の成果を発表", url: "https://prtimes.jp/main/html/rd/p/000000013.000066976.html", date: "2025.02" },
  { title: "do.Sukasu、奈良女子大学との共同研究・VRを利用した健常高齢者の空間認知トレーニング効果を発表", url: "https://prtimes.jp/main/html/rd/p/000000017.000066976.html", date: "2025.10" },
  { title: "do.Sukasuがアクシスと空間認知能力の可視化技術を活用した交通事故リスク低減に向け業務提携を開始", url: "https://prtimes.jp/main/html/rd/p/000000019.000066976.html", date: "2026.01" },
  { title: "do.Sukasuとムジコ・クリエイトが業務提携。「安全な交通社会人」育成で交通事故ゼロへ", url: "https://prtimes.jp/main/html/rd/p/000000018.000066976.html", date: "2026" },
];

const mediaLinks = [
  { title: "【前編】Co-Studio×住友ファーマ「半年で特許出願？」シーズもアイデアもなく始まった新規事業プロジェクト", url: "https://www.co-studio.co.jp/post/%E3%80%90%E5%89%8D%E7%B7%A8%E3%80%91co-studio-%E4%BD%8F%E5%8F%8B%E3%83%95%E3%82%A1%E3%83%BC%E3%83%9E%E3%80%8C%E5%8D%8A%E5%B9%B4%E3%81%A7%E7%89%B9%E8%A8%B1%E5%87%BA%E9%A1%98%EF%BC%9F%E3%80%8D%E3%82%B7%E3%83%BC%E3%82%BA%E3%82%82%E3%82%A2%E3%82%A4%E3%83%87%E3%82%A2%E3%82%82%E3%81%AA%E3%81%8F%E5%A7%8B%E3%81%BE%E3%81%A3%E3%81%9F%E6%96%B0%E8%A6%8F%E4%BA%8B%E6%A5%AD%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88" },
];

export default async function DoSukasuPage() {
  const ogMap = await getOgImages([
    ...pressReleases.map((p) => p.url),
    ...mediaLinks.map((m) => m.url),
  ]);
  return (
    <>
      <section className="bg-gradient-to-br from-blue-950 to-black text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/portfolio" className="text-xs text-white/40 hover:text-white/80 transition-colors mb-8 block tracking-widest">← PORTFOLIO</Link>
          <div className="inline-flex bg-white rounded-md px-5 py-3 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/portfolio/dosukasu.png" alt="do.Sukasu" className="h-9 w-auto object-contain" />
          </div>
          <p className="text-xs text-white/40 tracking-[0.3em] uppercase mb-4">住友ファーマ × Co-Studio → スピンアウト</p>
          <h1 className="text-5xl md:text-7xl font-medium mb-6">do.Sukasu</h1>
          <p className="text-lg text-white/70 max-w-xl leading-relaxed">
            視空間認知能力の評価・トレーニングで、社会のあらゆる「動き」を最適化する。
          </p>
        </div>
      </section>

      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-px bg-gray-100">
          {[
            { label: "設立", value: "2020年" },
            { label: "スピンアウト元", value: "住友ファーマ" },
            { label: "シード調達", value: "4,500万円" },
            { label: "プレシリーズA", value: "6,000万円" },
          ].map((item) => (
            <div key={item.label} className="bg-white p-6">
              <p className="text-xs text-gray-400 mb-2">{item.label}</p>
              <p className="text-xl font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-medium mb-5">事業概要</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              視空間認知能力（空間の中で動くものを正確に把握する力）の評価・トレーニングを通じて社会課題を解決するスタートアップ。住友ファーマとのSPRINTプログラムで、視空間認知能力を評価するIndexを共同開発し、スピンアウトとして独立。
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              教習所・療育・労災・スポーツ・医療など幅広い分野でPoCを実施。2024年にはドライバー向けアプリをリリースし、東京都リハビリテーション病院との共同研究も開始。
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              2026年にはアクシスおよびムジコ・クリエイトとの業務提携が決定。交通事故ゼロを目指し事業を加速中。
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-medium mb-5">Co-Studioの関与</h2>
            <div className="space-y-3">
              {[
                { phase: "0→1", desc: "住友ファーマとのSPRINTで視空間認知能力IndexをIndexを共同設計。近未来デザイン・ビジネスモデル・特許を一体開発。" },
                { phase: "スピンアウト", desc: "住友ファーマから出島スタートアップとして独立。会社設立・経営体制構築・資金調達を全面支援。" },
                { phase: "1→10", desc: "シードおよびプレシリーズAの調達設計・投資家紹介を伴走。合計1億円超の調達を実現。" },
              ].map((item) => (
                <div key={item.phase} className="flex gap-4 p-4 border border-gray-100">
                  <span className="text-xs border border-gray-200 px-2 py-1 text-gray-500 h-fit font-medium shrink-0">{item.phase}</span>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-5 bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-400 mb-3">関連記事</p>
              <div className="space-y-3">
                {mediaLinks.map((m) => (
                  <a key={m.url} href={m.url} target="_blank" rel="noopener noreferrer"
                    className="group flex gap-3 items-center bg-white border border-gray-100 hover:border-black transition-colors p-2"
                  >
                    {ogMap[m.url] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={ogMap[m.url] as string} alt="" className="w-24 h-16 object-cover shrink-0 bg-gray-100" loading="lazy" />
                    ) : null}
                    <span className="text-sm text-gray-600 group-hover:text-black transition-colors leading-snug">{m.title} →</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-medium mb-8">成長の軌跡</h2>
          <div className="space-y-0">
            {timeline.map((t, i) => (
              <div key={t.year} className="flex gap-5 pb-6">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-black mt-1.5 shrink-0" />
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                </div>
                <div className="pb-1">
                  <p className="text-xs font-medium text-gray-400 mb-1">{t.year}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-medium mb-6">プレスリリース</h2>
        <div className="space-y-0">
          {pressReleases.map((p) => (
            <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer"
              className="flex gap-4 items-center py-3.5 border-b border-gray-100 hover:text-black group"
            >
              {ogMap[p.url] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ogMap[p.url] as string} alt="" className="w-24 h-16 object-cover shrink-0 bg-gray-100 hidden sm:block" loading="lazy" />
              ) : null}
              <span className="text-xs text-gray-400 shrink-0 w-14">{p.date}</span>
              <p className="text-sm text-gray-600 group-hover:text-black transition-colors flex-1">{p.title}</p>
              <span className="text-xs text-gray-300 group-hover:text-black transition-colors shrink-0">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="py-8 px-6 max-w-7xl mx-auto border-t border-gray-100">
        <div className="flex gap-4 flex-wrap">
          <Link href="/portfolio" className="px-6 py-3 border border-black text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors font-medium">← ポートフォリオ一覧</Link>
          <Link href="/contact" className="px-6 py-3 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors font-medium">出島について相談する</Link>
        </div>
      </section>
    </>
  );
}
