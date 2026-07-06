import type { Metadata } from "next";
import Link from "next/link";
import WpDownloadForm from "@/components/WpDownloadForm";

export const metadata: Metadata = {
  title: "Co-DEZIMA｜出島という選択肢 | Co-Studio株式会社",
  description:
    "新規事業を独立したスタートアップとして社外に切り出す「出島」。Co-Studioが共同で設立・伴走するCo-DEZIMAスキームを、3分の動画と無料資料でご紹介します。",
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
          <h1 className="text-4xl md:text-6xl font-normal leading-tight mb-8">
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
          <h2 className="text-2xl md:text-3xl font-normal mb-10 text-center">3分でわかる Co-DEZIMA</h2>
          <video
            src="/videos/dezima-intro.mp4"
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
          <h2 className="text-3xl md:text-4xl font-normal leading-snug mb-12">なぜ、外に出すのか。</h2>
          <div className="grid md:grid-cols-3 gap-px bg-black/10">
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

      {/* WP Download */}
      <section className="bg-[#0a0a0a] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Whitepaper</p>
            <h2 className="text-3xl md:text-4xl font-normal leading-snug mb-6">
              出島入門<span className="text-white/40 text-xl md:text-2xl block mt-2">— 新規事業を外に出すという選択肢</span>
            </h2>
            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-md">
              実案件の設立プロセスから体系化した「Co-DEZIMAプレイブック」の抜粋版（全19ページ）を無料でご覧いただけます。
              出島の考え方、スキームの全体像、実例までを1冊にまとめました。
            </p>
            <ul className="text-sm text-white/50 leading-loose list-disc list-inside">
              <li>新規事業が社内で進まない構造的理由</li>
              <li>Co-DEZIMAスキームの仕組みと3つのポイント</li>
              <li>実例ポートフォリオと設立実績</li>
            </ul>
          </div>
          <WpDownloadForm />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-normal mb-6">出島について、話してみませんか。</h2>
        <p className="text-sm text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
          「うちの事業案は出島向きか」という段階のご相談から承っています。
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
