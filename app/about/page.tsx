import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ABOUT US | Co-Studio株式会社",
  description: "Co-Studio株式会社の会社概要、経営チーム、ミッションをご紹介します。",
};

const team = [
  {
    name: "澤田 真賢",
    nameEn: "Masayoshi Sawada",
    role: "代表取締役 CEO",
    bio: "Yahoo! JAPAN、SOMPO、OMRONにて国内外のイノベーション推進に従事。オープンイノベーションに関する論文研究をベースに、2019年Co-Studioを設立。大企業と外部エコシステムをつなぐ「出島スキーム」の設計・推進をリードする。",
    former: ["Yahoo! JAPAN", "SOMPO", "OMRON"],
  },
  {
    name: "今林 知柔",
    nameEn: "Tomoyasu Imabayashi",
    role: "取締役 COO",
    bio: "OMRONにてエンジニアとして10年勤務後、戦略室にて新規事業開発を5年担当。異業種の新結合をファシリテートし、Co-Creationをリードするオペレーションの要。技術×事業の両面から、事業化プロセスをドライブする。",
    former: ["OMRON"],
  },
  {
    name: "小宮 暢朗",
    nameEn: "Noburo Komiya",
    role: "執行役員 CMO",
    bio: "2020年11月にインターンとしてCo-Studioに参加後、正式メンバーとして参画。戦略推進・営業企画・事業企画を幅広く担当。ENEOSおよび旭化成ファーマとの共創による出島型企業の創業をリード。",
    former: ["エナフォワード", "Hers HeAlth Technologies"],
  },
];

const companyInfo = [
  { label: "会社名", value: "Co-Studio株式会社" },
  { label: "設立", value: "2019年12月" },
  { label: "代表取締役", value: "澤田 真賢" },
  { label: "所在地", value: "東京都中央区日本橋本町3丁目8-3 日本橋ライフサイエンスビルディング" },
  { label: "事業内容", value: "新規事業開発支援・出島スタートアップ設立支援・共創プログラムの設計・運営・投資ファンド事業" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">About Us</p>
        <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
          共感を軸に拡がる<br />コミュニティの実現。
        </h1>
        <p className="text-sm text-gray-500 max-w-lg leading-relaxed">
          2019年に設立されたオープンスタジオ企業です。大企業・中小企業・地方自治体と共に、7年間で50社以上の新規事業創出を支援してきました。
        </p>
      </section>

      {/* Mission */}
      <section className="bg-black text-white py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-8">Mission</p>
          <h2 className="text-4xl md:text-6xl font-light leading-tight mb-10">
            共感を軸に拡がる<br />コミュニティの実現
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
            答えのない課題に向き合い、想いある担当者が諦めないような仕組みを社会に実装する。
            Co-Studioは、大企業とスタートアップ、異なる業種と価値観をつなぎ、
            新しい事業と社会的価値を共に生み出します。
          </p>
          <p className="text-xl text-gray-500 mt-10 font-light italic">
            "創ろう、共に、未来から。"
          </p>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-12">Message from CEO</p>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="bg-gray-100 aspect-[4/5] flex items-end p-6">
            <div>
              <p className="text-sm font-medium">澤田 真賢</p>
              <p className="text-xs text-gray-500">代表取締役 CEO</p>
            </div>
          </div>
          <div className="pt-4">
            <p className="text-sm text-gray-600 leading-loose mb-6">
              大企業には、世の中を変えるだけのリソース・ネットワーク・知見があります。
              しかし、それを活かす「場」と「仕組み」が足りない。
            </p>
            <p className="text-sm text-gray-600 leading-loose mb-6">
              私はYahoo! JAPAN、SOMPO、OMRONでの経験を通じて、
              その矛盾と可能性を目の当たりにしてきました。
            </p>
            <p className="text-sm text-gray-600 leading-loose mb-6">
              Co-Studioは、その課題に正面から向き合うために設立しました。
              コンサルとして「答え」を売るのではなく、共にリスクを取り、共に価値を作る。
              答えのない問いを前に、諦めない担当者の隣に立ち続ける会社でありたい。
            </p>
            <p className="text-sm text-gray-600 leading-loose">
              想いのある担当者と、本気で向き合います。
            </p>
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-sm font-medium">澤田 真賢</p>
              <p className="text-xs text-gray-400">Co-Studio株式会社 代表取締役CEO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-12">Team</p>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((m) => (
              <div key={m.name} className="bg-white p-8">
                <div className="bg-gray-100 aspect-square mb-6 flex items-end p-4">
                  <div>
                    <p className="text-xs text-gray-500">{m.nameEn}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-1">{m.role}</p>
                <h3 className="text-xl font-light mb-4">{m.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{m.bio}</p>
                <div className="flex flex-wrap gap-1">
                  {m.former.map((f) => (
                    <span key={f} className="text-xs bg-gray-50 border border-gray-100 px-2 py-0.5 text-gray-400">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-12">Company</p>
        <div className="max-w-2xl">
          <dl className="space-y-6">
            {companyInfo.map((item) => (
              <div key={item.label} className="grid grid-cols-3 gap-4 pb-6 border-b border-gray-100">
                <dt className="text-xs text-gray-400 col-span-1">{item.label}</dt>
                <dd className="text-sm text-gray-700 col-span-2">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-light mb-4">一緒に、事業を作りませんか。</h2>
        <p className="text-sm text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
          想いはあるのに、進められない。そのもどかしさに寄り添うことが、私たちの出発点です。<br />
          まずはお気軽にご連絡ください。
        </p>
        <Link
          href="/contact"
          className="inline-block px-10 py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
          お問い合わせ
        </Link>
      </section>
    </>
  );
}
