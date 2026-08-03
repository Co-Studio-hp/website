import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Co-DEZIMA｜出島という選択肢",
  description:
    "新規事業を独立したスタートアップとして社外に切り出す「出島」。Co-Studioが共同で設立・伴走するCo-DEZIMAスキームを、3分の動画と出島ガイドでご紹介します。",
  alternates: { canonical: "/co-dezima" },
  openGraph: {
    title: "Co-DEZIMA｜出島という選択肢",
    description:
      "新規事業を独立したスタートアップとして社外に切り出す「出島」。Co-Studioが共同で設立・伴走する事業共創スキームを、3分の動画と出島ガイドでご紹介します。",
  },
};

const points = [
  {
    title: "リスクは出資額まで",
    desc: "新会社は連結対象外。挑戦の損失は出資額の範囲に限定され、本体のPLを傷つけません。",
  },
  {
    title: "現場で即断即決",
    desc: "稟議・予算サイクルから切り離し、スタートアップのスピードで学習ループを回します。",
  },
  {
    title: "国も後押しする型",
    desc: "出向起業の補助金やスピンオフ税制など、外に出して育てる型への支援が整っています。",
  },
];

export default function CoDezimaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0a0a0a] text-white min-h-[60vh] flex flex-col justify-center px-6 py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto w-full relative z-10">
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6">Co-DEZIMA</p>
          <h1 className="text-4xl md:text-6xl font-medium leading-tight mb-8">
            出島という、<br />新規事業の選択肢。
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed">
            新規事業を、独立したスタートアップとして社外に切り出す。
            Co-Studioが共同で設立し、共に経営する事業共創スキームです。
          </p>
        </div>
      </section>

      {/* Movie */}
      <section className="bg-[#0a0a0a] text-white px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-3 text-center">Movie</p>
          <h2 className="text-2xl md:text-3xl font-medium mb-10 text-center">3分でわかる Co-DEZIMA</h2>
          <video
            src="/videos/dezima-intro.mp4"
            poster="/videos/dezima-intro-poster.jpg"
            controls
            preload="metadata"
            playsInline
            className="w-full border border-white/10"
          />
        </div>
      </section>

      {/* 3 Points */}
      <section className="bg-[#F5F3EE] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-4">Why DEZIMA</p>
          <h2 className="text-3xl md:text-4xl font-medium leading-snug mb-12">なぜ、外に出すのか。</h2>
          <div className="grid md:grid-cols-3 gap-px bg-black/10 fx-stagger">
            {points.map((p, i) => (
              <div key={p.title} className="bg-[#F5F3EE] p-8">
                <p className="text-xs text-black/30 mb-4">0{i + 1}</p>
                <h3 className="text-lg font-medium mb-3">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mt-12 max-w-2xl">
            出島とは、学習ループを所有する装置である——。
            新規事業を外に出すことは、逃げではなく、学びを最速で回すための戦略です。
          </p>
        </div>
      </section>

      {/* Shindan CTA */}
      {/* 実績：Co-DEZIMAから実際に生まれた会社 */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">Track record</p>
          <h2 className="text-2xl md:text-3xl font-medium leading-snug mb-4">
            この方法で、実際に会社が生まれています。
          </h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-10 max-w-2xl">
            Co-Studioは提案するだけでなく、自ら出資し経営に入る形で出島スタートアップを設立・運営しています。
          </p>
          <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-8">
            {[
              {
                slug: "do-sukasu",
                name: "do.Sukasu",
                parent: "住友ファーマ 発",
                desc: "視空間認知能力の評価・トレーニング。教習所・療育・医療で実証を重ね、シリーズA調達中。",
              },
              {
                slug: "aikomi",
                name: "Aikomi",
                parent: "大手製薬 発",
                desc: "AIを活用した認知症ケアのデジタルセラピー。Co-Studioは代表取締役を派遣して経営参画。",
              },
              {
                slug: "hers",
                name: "Hers HeAlth Technologies",
                parent: "旭化成ファーマ 発",
                desc: "更年期女性の健康課題に骨ケアで向き合うヘルステック。2025年5月設立。",
              },
            ].map((c) => (
              <Link
                key={c.slug}
                href={`/portfolio/${c.slug}`}
                className="group border border-gray-300 hover:border-gray-800 transition-colors p-6 flex flex-col"
              >
                <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-2">{c.parent}</p>
                <h3 className="text-base md:text-lg font-medium mb-3">{c.name}</h3>
                <p className="text-xs text-gray-700 leading-relaxed flex-1">{c.desc}</p>
                <span className="mt-5 pt-4 border-t border-gray-100 text-xs text-gray-700 group-hover:text-black transition-colors">
                  詳しく見る →
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/results"
            className="text-sm text-gray-700 underline underline-offset-4 hover:text-black transition-colors"
          >
            出島以外も含めた支援実績を見る
          </Link>
        </div>
      </section>

      <section className="bg-[#111111] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto md:flex items-center justify-between gap-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Self Check</p>
            <h2 className="text-2xl md:text-3xl font-medium leading-snug mb-3">
              あなたのテーマは、出島向きか？
            </h2>
            <p className="text-sm text-white/50 leading-relaxed max-w-md">
              社内で育てるべきか、外で育てるべきか。10の質問で「出島適合度」を判定します。3分・登録不要。
            </p>
          </div>
          <div className="mt-8 md:mt-0 shrink-0">
            <Link
              href="/shindan"
              className="inline-block px-8 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              3分セルフ診断へ →
            </Link>
          </div>
        </div>
      </section>

      {/* 資料ダウンロード（2点セット） */}
      {/* 出島ガイドへの導線（旧・資料ダウンロード枠） */}
      <section id="guide" className="bg-[#0a0a0a] text-white py-20 px-6 scroll-mt-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Guide</p>
            <h2 className="text-3xl md:text-4xl font-medium leading-snug mb-6">
              出島のことは、全部ここに書きました。
              <span className="text-white/40 text-xl md:text-2xl block mt-2">— 登録不要で読めます</span>
            </h2>
            <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-md">
              カーブアウトとの違い、なぜ社内では育たないのか、他の立ち上げ方との比較、
              そして出島が向く事業・向かない事業まで。実案件から体系化した内容を公開しています。
            </p>
            <Link
              href="/co-dezima/guide"
              className="inline-block px-8 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-white/80 transition-colors"
            >
              出島ガイドを読む →
            </Link>
          </div>
          <div className="space-y-px">
            {[
              { n: "01", t: "出島とは何か", d: "カーブアウト・スピンオフ・スピンアウト・出向起業との違いを、経済産業省の整理に沿って解きほぐします。" },
              { n: "02", t: "なぜ社内では育たないのか", d: "意思決定の速度、100億円の壁、ステージゲートの硬直性。出島が解こうとしている構造問題。" },
              { n: "03", t: "他の立ち上げ方との比較", d: "社内事業化・100%子会社・JV・出向起業・スピンアウトと並べ、主要な観点で比較します。" },
              { n: "04", t: "向く事業・向かない事業", d: "出島は万能ではありません。先に見積もっておくべきコストと、判断の軸を示します。" },
            ].map((s) => (
              <div key={s.n} className="bg-white/5 border border-white/10 p-5">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-1.5">{s.n}</p>
                <p className="text-sm font-medium mb-1">{s.t}</p>
                <p className="text-xs text-white/50 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-medium mb-6">出島について、話してみませんか。</h2>
        <p className="text-sm text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
          「うちの事業案は出島向きか」という段階のご相談から承っています。<br />
          同じ立場の新規事業担当者と話したい方には、月次の交流イベント
          <Link href="/dezima" className="underline underline-offset-4 hover:text-black transition-colors">
            Night DEZIMA
          </Link>
          もあります。
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-black text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-800 transition-colors"
          >
            お問い合わせ →
          </Link>
          <Link
            href="/service"
            className="px-8 py-3.5 border border-black/30 text-black text-xs tracking-[0.2em] uppercase hover:bg-black/5 transition-colors"
          >
            サービス一覧
          </Link>
        </div>
      </section>
    </>
  );
}
