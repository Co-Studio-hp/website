import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PORTFOLIO",
  description: "Co-Studioの出島スキームから生まれた独立スタートアップ。",
  alternates: { canonical: "/portfolio" },
};

const companies = [
  {
    slug: "do-sukasu",
    name: "do.Sukasu",
    logo: "/portfolio/dosukasu.png",
    tags: ["ヘルスケア", "教育", "自動車"],
    parent: "大手製薬企業",
    founded: "2020年",
    stage: "シード調達済",
    oneliner: "視空間認知技術で、あらゆる場面の「動き」を最適化する。",
    body: "視空間認知能力の評価・トレーニングを通じて社会課題解決に取り組むスタートアップ。教習所・療育・労災の分野でPoCを実施し、シードラウンドで4,500万円を調達。複数の大手企業との業務提携も進む。",
    color: "from-blue-950 to-black",
  },
  {
    slug: "aikomi",
    name: "Aikomi",
    logo: "/portfolio/aikomi.png",
    tags: ["認知症ケア", "AI", "デジタルセラピー"],
    parent: "大手製薬企業",
    founded: "2021年",
    stage: "事業展開中",
    oneliner: "AIを活用した認知症ケアで、一人ひとりの尊厳ある生を支える。",
    body: "認知症の3つの未解決問題（有効薬がない・相互性損失・孤立）に向き合い、AIを用いたデジタルセラピーを提供。パーソンセンタードケアのアプローチで、医療・介護現場に展開中。",
    color: "from-green-950 to-black",
  },
  {
    slug: "hers",
    name: "Hers HeAlth Technologies",
    logo: "/portfolio/hers.png",
    tags: ["ヘルステック", "更年期女性", "骨ケア"],
    parent: "大手製薬企業",
    founded: "2025年5月",
    stage: "PoC実施中",
    oneliner: "My Life. 私らしい人生を。女性の健康と自立を、骨から支える。",
    body: "更年期女性の健康課題に向き合うヘルステック企業。骨密度×美容の観点から「骨ケア」サービスを展開。大手製薬企業と連携し、2025年設立。検診センターや自治体との実証実験が進行中。",
    color: "from-pink-950 to-black",
  },
];

const groupCompanies = [
  {
    name: "Life Reversal Gaming",
    logo: "/portfolio/lrg.png",
    url: "https://life-reversal-gaming.co.jp/",
    tags: ["ゲーム", "社会課題", "eSports"],
    category: "コミュニティ",
    body: "ゲームと社会・組織課題をかけ合わせたeSportsイベント企画・運営会社。ゲームの力で社会課題を解決する新しいアプローチを展開。",
  },
  {
    name: "Comunion",
    logo: "/portfolio/comunion.png",
    url: "https://comunion.jp/",
    tags: ["地域コミュニティ", "宗教", "メディア"],
    category: "コミュニティ",
    body: "地域コミュニティ支援・宗像経済新聞・Ntownの運営を行う会社。地方創生と地域のつながりを事業として実現する。",
  },
  {
    name: "SG Lab（一般社団法人）",
    logo: "/portfolio/sglab.png",
    url: "https://prtimes.jp/main/html/rd/p/000000041.000059402.html",
    tags: ["生成AI", "量子力学", "R&D"],
    category: "R&D",
    body: "生成AIと量子力学をかけ合わせたR&D機関。SINIC理論をベースに、未来社会の構造を研究・実装する。",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">Portfolio</p>
        <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-6 leading-tight">
          出島スキームから生まれた、<br />独立スタートアップ。
        </h1>
        <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
          Co-Studio は大企業とともにリスクを取り、社外にスタートアップを設立します。
          ここに掲載するのは、その「出島」から生まれた事業の一部です。
        </p>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-28">
        <div className="grid md:grid-cols-2 gap-6">
          {companies.map((c) => (
            <Link key={c.slug} href={`/portfolio/${c.slug}`} className="group block">
              <div className={`bg-gradient-to-br ${c.color} text-white p-10 mb-0 h-64 flex flex-col justify-between relative overflow-hidden`}>
                <div className="absolute top-6 right-6 text-xs text-white/30 group-hover:text-white/60 transition-colors">→</div>
                <div className="bg-white rounded-md px-4 py-3 self-start inline-flex items-center max-w-[60%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.logo} alt={c.name} className="h-7 md:h-8 w-auto max-w-full object-contain" />
                </div>
                <div>
                  <p className="text-xs text-white/50 mb-2">{c.parent}</p>
                  <h2 className="text-2xl font-medium mb-2">{c.name}</h2>
                  <p className="text-xs text-white/60 leading-relaxed">{c.oneliner}</p>
                </div>
              </div>
              <div className="border border-t-0 border-gray-100 p-6 group-hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex flex-wrap gap-1">
                    {c.tags.map((t) => (
                      <span key={t} className="text-xs bg-gray-50 border border-gray-100 px-2 py-0.5 text-gray-500 font-medium">{t}</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{c.stage}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{c.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Group companies */}
      <section className="bg-gray-50 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">Group Companies</p>
          <h2 className="text-3xl font-medium mb-10">Co-Studioグループ事業</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {groupCompanies.map((c) => (
              <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="group bg-white border border-gray-100 p-7 hover:border-black transition-colors block">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-9 flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.logo} alt={c.name} className="h-8 w-auto max-w-[160px] object-contain" />
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 font-medium shrink-0">{c.category}</span>
                </div>
                <h3 className="text-lg font-medium mb-3 inline-flex items-center gap-1.5">{c.name}<span className="text-xs text-gray-300 group-hover:text-black transition-colors">↗</span></h3>
                <div className="flex flex-wrap gap-1 mb-4">
                  {c.tags.map((t) => (
                    <span key={t} className="text-xs border border-gray-100 px-2 py-0.5 text-gray-400">{t}</span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{c.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-medium mb-4">出島スキームに興味がありますか？</h2>
          <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            大企業の担当者として、社外での事業化を検討している方へ。Co-Studioがともに設計します。
          </p>
          <Link href="/service#dezima" className="inline-block px-8 py-3 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors font-medium">
            Co-DEZIMAについて →
          </Link>
        </div>
      </section>
    </>
  );
}
