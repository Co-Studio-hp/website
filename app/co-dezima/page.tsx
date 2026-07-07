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
      <section id="download" className="bg-[#0a0a0a] text-white py-20 px-6 scroll-mt-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Download</p>
            <h2 className="text-3xl md:text-4xl font-medium leading-snug mb-6">
              出島の資料<span className="text-white/40 text-xl md:text-2xl block mt-2">— 2点セットを無料でダウンロード</span>
            </h2>
            <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-md">
              「まず自分が理解する」から「社内に説明する」まで。フォーム送信で2点ともその場でご覧いただけます。
            </p>
            <div className="space-y-px">
              <div className="bg-white/5 border border-white/10 p-5">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-1.5">01 — まず知る</p>
                <p className="text-sm font-medium mb-1">出島入門（全19ページ）</p>
                <p className="text-xs text-white/50 leading-relaxed">
                  実案件から体系化したプレイブックの抜粋版。社内で進まない構造的理由、スキームの全体像、実例まで。
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-5">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-1.5">02 — 社内で共有する</p>
                <p className="text-sm font-medium mb-1">社内説得キット「出島という選択肢」（全12ページ）</p>
                <p className="text-xs text-white/50 leading-relaxed">
                  役員・関係部門への説明にそのまま使える汎用資料。経産省ガイダンス準拠の整理で「第3の出口」を提示。
                </p>
              </div>
            </div>
          </div>
          <WpDownloadForm />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-medium mb-6">出島について、話してみませんか。</h2>
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
