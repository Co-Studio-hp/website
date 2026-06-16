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
    photo: "/team/sawada.jpg",
    bio: "Yahoo! JAPAN、SOMPO、OMRONにて国内外のイノベーション推進に従事。オープンイノベーションに関する論文研究をベースに、2019年Co-Studioを設立。大企業と外部エコシステムをつなぐ「出島スキーム」の設計・推進をリードする。",
    former: ["Yahoo! JAPAN", "SOMPO", "OMRON"],
  },
  {
    name: "今林 知柔",
    nameEn: "Tomoyasu Imabayashi",
    role: "取締役 COO",
    photo: "/team/imabayashi.webp",
    bio: "OMRONにてエンジニアとして10年勤務後、戦略室にて新規事業開発を5年担当。異業種の新結合をファシリテートし、Co-Creationをリードするオペレーションの要。技術×事業の両面から、事業化プロセスをドライブする。",
    former: ["OMRON"],
  },
];

const companyInfo = [
  { label: "会社名", value: "Co-Studio株式会社" },
  { label: "設立", value: "2019年12月" },
  { label: "代表取締役", value: "澤田 真賢" },
  { label: "所在地", value: "東京都中央区日本橋本町3丁目8-3 日本橋ライフサイエンスビルディング3 8階" },
  { label: "事業内容", value: "新規事業開発支援・出島スタートアップ設立支援・共創プログラムの設計・運営・投資ファンド事業" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero + Mission — 1セクションに統合 */}
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-end">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-6">About Us</p>
              <h1 className="text-5xl md:text-7xl font-normal leading-tight mb-8">
                共感を軸に<br />拡がる<br />コミュニティの実現
              </h1>
              <p className="text-gray-500 italic text-lg">"創ろう、共に、未来から。"</p>
            </div>
            <div className="border-l border-gray-700 pl-12">
              <p className="text-sm text-gray-400 leading-loose mb-6">
                答えのない課題に向き合い、想いある担当者が諦めないような仕組みを社会に実装する。
              </p>
              <p className="text-sm text-gray-400 leading-loose mb-6">
                Co-Studioは、大企業とスタートアップ、異なる業種と価値観をつなぎ、新しい事業と社会的価値を共に生み出します。
              </p>
              <div className="flex flex-wrap gap-8 pt-6 border-t border-gray-800">
                {[
                  { num: "2019", label: "年設立" },
                  { num: "50社+", label: "支援実績" },
                  { num: "7年", label: "の実績" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-normal text-white">{s.num}</p>
                    <p className="text-xs text-gray-600 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-10">Message from CEO</p>
          <p className="text-base text-gray-500 italic mb-10 leading-relaxed">
            「未知なるものを、みずから受け入れる。すべての人、知恵それぞれの可能性を信じる。小さく素早く、大きく確実に、いま始める。」
          </p>
          <div className="text-left max-w-2xl mx-auto">
            <p className="text-sm text-gray-600 leading-loose mb-5">
              VUCAと言われるこの時代、確定的な答えはどこにもありません。誰もが問いを立て、集団で解を探し続けることが求められています。
            </p>
            <p className="text-sm text-gray-600 leading-loose mb-5">
              自己組織化がグローバルなトレンドとなり、個人も組織もコミュニティも変化への対応を迫られています。しかし大企業の中では、イノベーションへの意欲と実際の行動には大きな乖離があります。その壁の多くは「信頼の欠如」から来ています。
            </p>
            <p className="text-sm text-gray-600 leading-loose mb-5">
              Co-Studioは、信頼と共感を軸に新結合を促し、オープン・イノベーションを推進する「Co-creation studio」です。従来の組織では対応できない社会変化に対し、共に参加しクリエーションする機会を作ること——それが私たちの役割だと考えています。
            </p>
            <p className="text-sm text-gray-600 leading-loose">
              共感を軸に拡がるコミュニティの実現。これが私たちのミッションです。
            </p>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-100 inline-block">
            <p className="text-sm font-medium">澤田 真賢</p>
            <p className="text-xs text-gray-400">Co-Studio株式会社 代表取締役CEO</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-10">Team</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {team.map((m) => (
              <div key={m.name} className="bg-white p-7 border border-gray-100">
                <div className="bg-gray-100 aspect-square mb-5 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs text-gray-400 mb-1">{m.role}</p>
                <h3 className="text-xl font-normal mb-3">{m.name}</h3>
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
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-10">Company</p>
        <div className="max-w-2xl">
          <dl>
            {companyInfo.map((item) => (
              <div key={item.label} className="grid grid-cols-3 gap-4 py-4 border-b border-gray-100">
                <dt className="text-xs text-gray-400 col-span-1 pt-0.5">{item.label}</dt>
                <dd className="text-sm text-gray-700 col-span-2">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 py-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-normal mb-4">一緒に、事業を作りませんか。</h2>
        <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
          想いはあるのに、進められない。そのもどかしさに寄り添うことが、私たちの出発点です。
        </p>
        <Link href="/contact" className="inline-block px-10 py-4 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors font-medium">
          お問い合わせ
        </Link>
      </section>
    </>
  );
}
