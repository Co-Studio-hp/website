import type { Metadata } from "next";
import Link from "next/link";
import ShindanForm from "./ShindanForm";
import { QUESTIONS, VERDICT_CONTENT } from "./content";

export const metadata: Metadata = {
  title: "出島適合セルフ診断",
  description:
    "新規事業テーマの『出島（カーブアウト）適合度』を10問・3分で判定。テーマ・人・資金・決裁の4観点から、外に出して育てる選択肢を診断します。",
  alternates: { canonical: "/shindan" },
  openGraph: {
    title: "出島適合セルフ診断",
    description:
      "そのテーマは、社内で育てるべきか。外で育てるべきか。10の質問で「出島適合度」を判定します。3分・登録不要。",
  },
};

export default function ShindanPage() {
  return (
    <section className="bg-[#0a0a0a] text-white min-h-screen px-6 py-24 md:py-28">
      <div className="max-w-3xl mx-auto w-full mb-14 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6">Self Check</p>
        <h1 className="text-3xl md:text-4xl font-medium leading-tight mb-6">出島適合セルフ診断</h1>
        <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl mx-auto">
          そのテーマは、社内で育てるべきか。外で育てるべきか。
          10の質問で「出島適合度」を判定します。
          <span className="text-white/80">3分・登録不要。</span>
        </p>
      </div>
      <ShindanForm />

      {/*
        診断の中身をサーバー側で常に描画する解説セクション。
        診断UI（ShindanForm）はクリックして進めないと設問が出ないため、
        設問・判定タイプが初期HTMLに一切現れない状態だった。
        設問と判定文は content.ts の単一ソースを参照しているので、内容がずれることはない。
      */}
      <div className="max-w-3xl mx-auto w-full mt-28 border-t border-white/10 pt-16">
        <h2 className="text-xl md:text-2xl font-medium mb-4">この診断で聞いていること</h2>
        <p className="text-sm text-white/50 leading-relaxed mb-10">
          出島（カーブアウト）で事業を外に出せるかどうかは、事業計画の精度より
          「テーマ・人・資金・決裁」という前提が揃っているかで決まります。
          診断では次の10問を通じて、その前提がどこまで整っているかを確認します。
        </p>

        <ol className="space-y-6 mb-20">
          {QUESTIONS.map((q, i) => (
            <li key={q.id} className="border-l border-white/10 pl-5">
              <p className="text-[11px] tracking-widest uppercase text-white/30 mb-1">
                Q{i + 1}・{q.catLabel}
              </p>
              <h3 className="text-sm md:text-base text-white/80 leading-relaxed mb-2">{q.text}</h3>
              <p className="text-xs text-white/40 leading-relaxed">
                選択肢：{q.options.map((o) => o.label).join(" ／ ")}
              </p>
            </li>
          ))}
        </ol>

        <h2 className="text-xl md:text-2xl font-medium mb-4">判定は3タイプ</h2>
        <p className="text-sm text-white/50 leading-relaxed mb-10">
          10問の回答から出島適合度を算出し、次の3タイプのいずれかで結果をお返しします。
        </p>

        <div className="space-y-8 mb-16">
          {(["A", "B", "C"] as const).map((k) => (
            <div key={k} className="border-l border-white/10 pl-5">
              <h3 className="text-sm md:text-base font-medium text-white/80 mb-2">
                {VERDICT_CONTENT[k].badge}
              </h3>
              <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                {VERDICT_CONTENT[k].body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 text-xs">
          <Link href="/co-dezima" className="text-white/60 underline underline-offset-4 hover:text-white transition-colors">
            出島スキーム（Co-DEZIMA）について詳しく →
          </Link>
          <Link href="/dezima" className="text-white/60 underline underline-offset-4 hover:text-white transition-colors">
            イントレプレナーが集まる Night DEZIMA →
          </Link>
        </div>
      </div>
    </section>
  );
}
