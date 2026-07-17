import type { Metadata } from "next";
import Link from "next/link";
import { getOgImage } from "@/lib/og";

// noteのインターン記事のOGP画像取得のため週次で再生成
export const revalidate = 604800;

export const metadata: Metadata = {
  title: "RECRUIT",
  description:
    "Co-Studioは、大企業と共に出島スタートアップを立ち上げる仲間を探しています。インターン（常時募集）と、出島のCXO・プロ人材の登録を受け付けています。",
  alternates: { canonical: "/recruit" },
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
    name: "インターン",
    type: "常時募集",
    desc: "大手企業の新規事業開発支援の現場に入るサポートロール。クライアントミーティングへの参加、資料作成、顧客調査、イベント企画まで、0→1のプロセスを間近で経験できます。",
    want: ["新規事業開発に興味がある方", "多様な業務に柔軟に向き合える方", "オープンなコミュニケーションができる方"],
    cta: { label: "インターンに応募・相談する →", href: "/contact?topic=intern", primary: true },
  },
  {
    name: "出島スタートアップ CXO・プロ人材",
    type: "登録制 / プロジェクト参画",
    desc: "大企業との共創から出島スタートアップが生まれる際に、CXO・経営メンバーとして参画いただく外部プロフェッショナル。Night DEZIMAなどの共創の場から、次の出島は生まれます。ご登録いただいた方には、テーマが立ち上がったタイミングでご案内します。",
    want: ["スタートアップ経営・事業責任者の経験", "出向起業・カーブアウトへの関心", "「やり切りたい」テーマを探している方"],
    cta: { label: "CXO・プロ人材として登録する →", href: "/contact?topic=cxo", primary: false },
  },
];

const INTERN_ARTICLE = {
  url: "https://note.com/co_studio/n/n71ae419eb0a0",
  title:
    "レベル違いのインターン体験。4年間で手に入れた、IT系メガベンチャーへの切符と圧倒的な自信。",
  desc: "Co-Studioで4年間インターンとして働いた学生へのインタビュー。現場で何を任され、何を得たのか——インターンのリアルはこちらから。",
};

export default async function RecruitPage() {
  const internOg = await getOgImage(INTERN_ARTICLE.url);
  return (
    <>
      {/* Hero */}
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6">Recruit</h2>
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
          <h2 className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-10">Why Co-Studio</h2>
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
          <h2 className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-10">Open Positions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {positions.map((p) => (
              <div key={p.name} className="bg-white border border-gray-100 p-8 flex flex-col">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h2 className="text-xl font-medium">{p.name}</h2>
                  <span className="text-xs text-gray-400 shrink-0">{p.type}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{p.desc}</p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">こんな方に</p>
                <ul className="space-y-1.5 mb-6">
                  {p.want.map((w) => (
                    <li key={w} className="text-xs text-gray-500 leading-relaxed flex gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-black/20 shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Link
                    href={p.cta.href}
                    className={`inline-block px-7 py-3 text-xs tracking-[0.2em] uppercase font-medium transition-colors ${
                      p.cta.primary
                        ? "bg-black text-white hover:bg-gray-800"
                        : "border border-black/30 text-black hover:bg-black/5"
                    }`}
                  >
                    {p.cta.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-8 leading-relaxed">
            上記に当てはまらなくても、出島・事業共創に関心のある方は
            <Link href="/contact" className="underline underline-offset-2 hover:text-black transition-colors">お問い合わせフォーム</Link>
            からお気軽にご連絡ください。
          </p>
        </div>
      </section>

      {/* インターンの声（note記事） */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-10">Voice</h2>
          <a
            href={INTERN_ARTICLE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid md:grid-cols-2 border border-gray-200 hover:border-black transition-colors overflow-hidden"
          >
            <div className="relative aspect-[16/9] md:aspect-auto md:min-h-56 bg-gray-100">
              {internOg && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={internOg}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <p className="text-xs text-gray-400 mb-3">インターン経験者インタビュー</p>
              <h2 className="text-lg md:text-xl font-medium leading-relaxed mb-4 group-hover:underline underline-offset-4">
                {INTERN_ARTICLE.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">{INTERN_ARTICLE.desc}</p>
              <span className="text-xs text-gray-400 tracking-widest uppercase">note.com/co_studio ↗</span>
            </div>
          </a>
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
