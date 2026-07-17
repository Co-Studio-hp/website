import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ページが見つかりません",
};

export default function NotFound() {
  return (
    <section className="bg-[#0a0a0a] text-white min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6">404</p>
      <h1 className="text-4xl md:text-6xl font-medium leading-tight mb-6">
        お探しのページが<br />見つかりませんでした。
      </h1>
      <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-md mx-auto mb-10">
        URLが変更されたか、削除された可能性があります。以下のページからお探しのコンテンツをご覧ください。
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="px-8 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-200 transition-colors"
        >
          トップへ戻る →
        </Link>
        <Link
          href="/service"
          className="px-8 py-3.5 border border-white/30 text-white text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
        >
          サービス一覧
        </Link>
        <Link
          href="/contact"
          className="px-8 py-3.5 border border-white/30 text-white text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
        >
          お問い合わせ
        </Link>
      </div>
    </section>
  );
}
