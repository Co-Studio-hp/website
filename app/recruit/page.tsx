import type { Metadata } from "next";
import Link from "next/link";

// ドラフト段階のためnoindex・ナビ/フッター/サイトマップ未掲載。
// 公開判断が出たら robots を外し、導線を追加する。
export const metadata: Metadata = {
  title: "RECRUIT | Co-Studio株式会社",
  description:
    "Co-Studioは、大企業と共に出島スタートアップを立ち上げる仲間を探しています。支援者ではなく、共同創業者として。",
  robots: { index: false, follow: false },
};

const values = [
  {
    title: "支援者ではなく、共同創業者",
    body: "納品して終わりのコンサルティングはしません。株式参画を前提に、事業の成否を自分ごととして走り続ける。それがCo-Studioの働き方です。",
  },
  {
    title: "学習ループを、最速で回す",
    body: "出島とは「学習ループを所有する装置」。仮説・検証・学習・方針修正のループを、大企業のスピードではなくスタートアップのスピードで回します。",
  },
  {
    title: "業種を超えて、繋がる",
    body: "製薬・化学・食品・エネルギー・不動産——多様な業種の大企業、そしてイントレプレナーたちと共に働きます。一社にいては出会えない現場があります。",
  },
];

const positions = [
  {
    name: "事業共創プロデューサー",
    type: "正社員 / 業務委託",
    desc: "大企業の新規事業テーマの発掘から出島設立までを伴走する中核ロール。SPRINT・BUSINESS LABなどのプログラム設計・ファシリテーションを担います。",
    want: ["新規事業開発・事業企画の経験", "大企業とスタートアップ双方の言語がわかる方", "0→1の混沌を楽しめる方"],
  },
  {
    name: "出島スタートアップ経営人材",
    type: "共同創業 / 出向起業",
    desc: "設立する出島スタートアップの経営メンバー候補。テーマとの出会い次第で、代表・COO・事業責任者など関わり方を設計します。",
    want: ["事業を「やり切りたい」という意思", "スタートアップまたは新規事業の実務経験", "出向起業・カーブアウトへの関心"],
  },
];

export default function RecruitPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6">Recruit</p>
          <h1 className="text-4xl md:text-6xl font-medium leading-tight mb-8">
            創ろう、共に。<br />次の出島を。
          </h1>
          <p className="text-base text-white/60 max-w-2xl leading-relaxed">
            Co-Studioは、大企業と共に出島スタートアップを立ち上げるベンチャースタジオです。
            支援者ではなく、共同創業者として事業に向き合う仲間を探しています。
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-10">Why Co-Studio</p>
          <div className="grid md:grid-cols-3 gap-px bg-black/10 fx-stagger">
            {values.map((v, i) => (
              <div key={v.title} className="bg-[#F5F3EE] p-8">
                <p className="text-xs text-black/30 mb-4">0{i + 1}</p>
                <h2 className="text-lg font-medium mb-3">{v.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positions */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-10">Open Positions</p>
          <div className="grid md:grid-cols-2 gap-6">
            {positions.map((p) => (
              <div key={p.name} className="bg-white border border-gray-100 p-8">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h2 className="text-xl font-medium">{p.name}</h2>
                  <span className="text-xs text-gray-400 shrink-0">{p.type}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{p.desc}</p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">こんな方に</p>
                <ul className="space-y-1.5">
                  {p.want.map((w) => (
                    <li key={w} className="text-xs text-gray-500 leading-relaxed flex gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-black/20 shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-8 leading-relaxed">
            上記に当てはまらなくても、出島・事業共創に関心のある方はお気軽にご連絡ください。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-medium mb-4">まずは、カジュアルに話しましょう。</h2>
        <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
          選考の前に、Co-Studioの働き方や出島の現場について、ざっくばらんにお話しします。
        </p>
        <Link
          href="/contact"
          className="inline-block px-10 py-4 bg-black text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-800 transition-colors"
        >
          カジュアル面談を申し込む →
        </Link>
      </section>
    </>
  );
}
