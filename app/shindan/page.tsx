import type { Metadata } from "next";
import ShindanForm from "./ShindanForm";

export const metadata: Metadata = {
  title: "出島適合セルフ診断｜Co-Studio",
  description:
    "新規事業テーマの『出島（カーブアウト）適合度』を10問・3分で判定。テーマ・人・資金・決裁の4観点から、外に出して育てる選択肢を診断します。",
};

export default function ShindanPage() {
  return (
    <section className="bg-[#0a0a0a] text-white min-h-screen px-6 py-24 md:py-28">
      <div className="max-w-3xl mx-auto w-full mb-14 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6">Self Check</p>
        <h1 className="text-3xl md:text-4xl font-normal leading-tight mb-6">出島適合セルフ診断</h1>
        <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl mx-auto">
          そのテーマは、社内で育てるべきか。外で育てるべきか。
          10の質問で「出島適合度」を判定します。
          <span className="text-white/80">3分・登録不要。</span>
        </p>
      </div>
      <ShindanForm />
    </section>
  );
}
