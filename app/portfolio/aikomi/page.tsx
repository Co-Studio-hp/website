import type { Metadata } from "next";
import Link from "next/link";
import { getOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Aikomi | Portfolio",
  alternates: { canonical: "/portfolio/aikomi" },
};

const pressReleases = [
  { title: "株式会社Aikomiの株式取得およびCo-Studioからの代表取締役CEO派遣について", url: "https://prtimes.jp/main/html/rd/p/000000037.000059402.html", date: "2023" },
  { title: "【クラウドファンディング】Aikomi ─ 認知症ケアのAIデジタルセラピー（Fundinno）", url: "https://fundinno.com/projects/588", date: "2024〜" },
];

export default async function AikomiPage() {
  const ogMap = await getOgImages(pressReleases.map((p) => p.url));
  return (
    <>
      <section className="bg-gradient-to-br from-green-950 to-black text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/portfolio" className="text-xs text-white/40 hover:text-white/80 transition-colors mb-8 block tracking-widest">← PORTFOLIO</Link>
          <div className="inline-flex bg-white rounded-md px-5 py-3 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/portfolio/aikomi.png" alt="Aikomi" className="h-9 w-auto object-contain" />
          </div>
          <p className="text-xs text-white/40 tracking-[0.3em] uppercase mb-4">大手製薬スピンアウト → 住友ファーマ出資 × Co-Studio経営参画（2023年〜）</p>
          <h1 className="text-5xl md:text-7xl font-medium mb-6">Aikomi</h1>
          <p className="text-lg text-white/70 max-w-xl leading-relaxed">
            AIを活用した認知症ケアで、一人ひとりの尊厳ある生を支える。
          </p>
        </div>
      </section>

      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-px bg-gray-100">
          {[
            { label: "スピンアウト元", value: "大手製薬企業" },
            { label: "出資", value: "住友ファーマ" },
            { label: "Co-Studio参画", value: "2023年〜" },
            { label: "クラウドファンディング", value: "約1億円調達" },
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
              認知症には「有効薬がない」「相互性が損失する」「孤立する」という3つの未解決問題があります。AikomiはAIを用いたデジタルセラピーでこれらに向き合い、パーソンセンタードケアのアプローチで個人に最適化されたケアを提供します。
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              クラウドファンディングで1億円近くを調達し、医療・介護現場での展開を加速しています。
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              元々は大手製薬企業からスピンアウトしたベンチャーとして設立。その後住友ファーマが出資し、Co-Studioは2023年に取締役派遣・事業開発支援の形で経営参画。現在はポートフォリオ経営として継続支援中。
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-medium mb-5">Co-Studioの関与形態</h2>
            <div className="space-y-3">
              {[
                { phase: "経緯", desc: "大手製薬企業スピンアウトのスタートアップに住友ファーマが出資。そのポートフォリオ支援の延長でCo-Studioが関与を開始。" },
                { phase: "2023年〜", desc: "Co-Studioから経営参画。取締役派遣・事業開発支援・資金調達伴走を担当。" },
                { phase: "現在", desc: "クラウドファンディングで1億円近く調達。ポートフォリオ経営として継続支援中。" },
              ].map((item) => (
                <div key={item.phase} className="flex gap-4 p-4 border border-gray-100">
                  <span className="text-xs border border-gray-200 px-2 py-1 text-gray-500 h-fit font-medium shrink-0 whitespace-nowrap">{item.phase}</span>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 p-5 bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-400 mb-2">資金調達</p>
              <p className="text-2xl font-medium mb-1">約1億円</p>
              <p className="text-xs text-gray-500 mb-3">クラウドファンディング（Fundinno）にて調達</p>
              <a href="https://fundinno.com/projects/588" target="_blank" rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-black border-b border-gray-200 pb-0.5 transition-colors"
              >Fundinnoプロジェクトページ →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-medium mb-6">プレスリリース・関連リンク</h2>
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
