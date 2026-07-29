"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { sendGAEvent } from "@next/third-parties/google";

import { QUESTIONS, VERDICT_CONTENT, type Category } from "./content";


type Scores = { theme: number; person: number; money: number; sponsor: number; ops: number };

const CAT_META: { key: Category; label: string; max: number }[] = [
  { key: "theme", label: "テーマ", max: 6 },
  { key: "person", label: "人", max: 4 },
  { key: "money", label: "資金", max: 4 },
  { key: "sponsor", label: "決裁", max: 4 },
  { key: "ops", label: "実務", max: 8 },
];

const GAP_TEXT: Record<string, string> = {
  person:
    "テーマを担いで外に出る個人がまだ見えていません。出島は事業計画より先に「やり切る人」で決まります。",
  money:
    "親会社側の資金の出し手が未確定です。小さくても資金コミットの設計が最初の論点になります。",
  sponsor:
    "役員クラスのスポンサー不在は最大の停滞要因です。まず決裁層に「出島という選択肢」を知ってもらうことが近道です。",
};

function computeScores(answers: number[]): Scores {
  return {
    theme: answers[0] + answers[1] + answers[2],
    person: answers[3],
    money: answers[4],
    sponsor: answers[5],
    ops: answers[6] + answers[7] + answers[8] + answers[9],
  };
}

export default function ShindanForm() {
  const [step, setStep] = useState(0); // 0..9 = questions, 10 = result
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));

  const isResult = step >= QUESTIONS.length;

  const choose = (points: number) => {
    const next = [...answers];
    next[step] = points;
    setAnswers(next);
    // 少し間を置かず次へ（1問1画面）
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));
  const restart = () => {
    setAnswers(Array(10).fill(null));
    setStep(0);
  };

  if (isResult) {
    const filled = answers.map((a) => a ?? 0);
    const total = filled.reduce((a, b) => a + b, 0);
    const verdict = total >= 18 ? "A" : total >= 10 ? "B" : "C";
    const scores = computeScores(filled);
    return (
      <Result
        verdict={verdict as "A" | "B" | "C"}
        total={total}
        scores={scores}
        answers={filled}
        onRestart={restart}
      />
    );
  }

  const q = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3 text-xs text-white/40">
          <span className="tracking-widest">
            Q{step + 1} <span className="text-white/20">/ {QUESTIONS.length}</span>
          </span>
          <span className="tracking-[0.2em] uppercase">{q.catLabel}{q.weighted && " ·重要"}</span>
        </div>
        <div className="h-px w-full bg-white/10">
          <div className="h-px bg-white transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl md:text-2xl font-medium leading-relaxed text-white mb-10 min-h-[3.5rem]">
        {q.text}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {q.options.map((o) => {
          const selected = answers[step] === o.points;
          return (
            <button
              key={o.label}
              onClick={() => choose(o.points)}
              className={`text-left px-5 py-4 border transition-colors text-sm ${
                selected
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white/80 hover:border-white/60 hover:bg-white/5"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      {/* Back */}
      {step > 0 && (
        <button
          onClick={back}
          className="mt-8 text-xs text-white/40 hover:text-white/80 transition-colors tracking-widest uppercase"
        >
          ← 前の質問へ
        </button>
      )}
    </div>
  );
}

function ScoreBars({ scores }: { scores: Scores }) {
  return (
    <div className="space-y-3">
      {CAT_META.map((c) => {
        const val = scores[c.key];
        const pct = (val / c.max) * 100;
        return (
          <div key={c.key} className="flex items-center gap-4">
            <span className="w-10 text-xs text-white/50 shrink-0">{c.label}</span>
            <div className="flex-1 h-2 bg-white/10">
              <div className="h-2 bg-white/70" style={{ width: `${pct}%` }} />
            </div>
            <span className="w-10 text-right text-xs text-white/40 shrink-0 tabular-nums">
              {val}/{c.max}
            </span>
          </div>
        );
      })}
    </div>
  );
}


function Result({
  verdict,
  total,
  scores,
  answers,
  onRestart,
}: {
  verdict: "A" | "B" | "C";
  total: number;
  scores: Scores;
  answers: number[];
  onRestart: () => void;
}) {
  const c = VERDICT_CONTENT[verdict];
  const gaps = (["person", "money", "sponsor"] as const).filter((k) => scores[k] === 0);

  // 診断完了イベント（結果表示時に1回だけ）
  useEffect(() => {
    track("shindan_complete", { verdict, total });
    sendGAEvent("event", "shindan_complete", { verdict, total });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Verdict */}
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Your Result</p>
        <p className="text-5xl md:text-6xl font-medium text-white mb-2">
          {verdict}
          <span className="text-white/30 text-2xl md:text-3xl ml-3">{total}/26</span>
        </p>
        <p className="text-lg text-white/80 mt-4">{c.badge}</p>
      </div>

      {/* Score breakdown */}
      <div className="border border-white/10 p-6 md:p-8 mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-5">カテゴリ内訳</p>
        <ScoreBars scores={scores} />
      </div>

      {/* Gap callouts */}
      {gaps.length > 0 && (
        <div className="border-l-2 border-white/40 pl-5 mb-8 space-y-3">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-1">いま足りていない前提</p>
          {gaps.map((g) => (
            <p key={g} className="text-sm text-white/60 leading-relaxed">
              {GAP_TEXT[g]}
            </p>
          ))}
        </div>
      )}

      {/* Message */}
      <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8">{c.body}</p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3 mb-14">
        {c.primary.kind === "link" ? (
          <Link
            href={c.primary.href}
            className="px-8 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-200 transition-colors text-center"
          >
            {c.primary.label} →
          </Link>
        ) : (
          <a
            href="#lead-form"
            className="px-8 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-200 transition-colors text-center"
          >
            {c.primary.label} →
          </a>
        )}
        {c.sub && (
          <Link
            href={c.sub.href}
            className="px-8 py-3.5 border border-white/30 text-white text-xs tracking-[0.2em] uppercase hover:bg-white/5 transition-colors text-center"
          >
            {c.sub.label}
          </Link>
        )}
      </div>

      {/* Lead form */}
      <LeadForm verdict={verdict} total={total} scores={scores} answers={answers} ctaLabel={c.primary.label} />

      {/* Share */}
      <ShareRow verdict={verdict} total={total} />

      <button
        onClick={onRestart}
        className="mt-8 mx-auto block text-xs text-white/40 hover:text-white/80 transition-colors tracking-widest uppercase"
      >
        ↻ もう一度診断する
      </button>
    </div>
  );
}

const SHINDAN_URL = "https://www.co-studio.co.jp/shindan";

function ShareRow({ verdict, total }: { verdict: "A" | "B" | "C"; total: number }) {
  const [copied, setCopied] = useState(false);

  const shareText = `出島適合セルフ診断をやってみた。私のテーマの判定は ${verdict}（${total}/26点）。あなたの新規事業テーマは「出島向き」か？ 10問・3分・登録不要。`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(SHINDAN_URL)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHINDAN_URL);
      setCopied(true);
      track("shindan_share", { channel: "copy" });
      sendGAEvent("event", "shindan_share", { channel: "copy" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボード不許可環境では何もしない
    }
  };

  return (
    <div className="mt-10 pt-8 border-t border-white/10 text-center">
      <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">Share</p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { track("shindan_share", { channel: "x" }); sendGAEvent("event", "shindan_share", { channel: "x" }); }}
          className="px-7 py-2.5 border border-white/25 text-white/80 text-xs tracking-[0.15em] hover:bg-white/10 transition-colors"
        >
          Xで結果をシェア
        </a>
        <button
          onClick={copyLink}
          className="px-7 py-2.5 border border-white/25 text-white/80 text-xs tracking-[0.15em] hover:bg-white/10 transition-colors"
        >
          {copied ? "コピーしました ✓" : "診断のリンクをコピー"}
        </button>
      </div>
      <p className="text-[11px] text-white/25 mt-3 leading-relaxed">
        シェアに含まれるのは判定と点数、診断ページへのリンクのみです。ご入力内容は含まれません。
      </p>
    </div>
  );
}

function LeadForm({
  verdict,
  total,
  scores,
  answers,
  ctaLabel,
}: {
  verdict: "A" | "B" | "C";
  total: number;
  scores: Scores;
  answers: number[];
  ctaLabel: string;
}) {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/shindan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, name, role, email, message, verdict, total, scores, answers }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      track("shindan_lead_submit", { verdict });
      sendGAEvent("event", "shindan_lead_submit", { verdict });
    } catch {
      setStatus("error");
    }
  };

  const input =
    "w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/60 transition-colors";

  if (status === "done") {
    return (
      <div id="lead-form" className="border border-white/20 p-8 text-center scroll-mt-24">
        <p className="text-sm text-white/70 leading-relaxed">
          ありがとうございます。診断結果とあわせて、担当より数営業日以内にご連絡します。
        </p>
      </div>
    );
  }

  return (
    <form id="lead-form" onSubmit={submit} className="border border-white/15 p-6 md:p-8 scroll-mt-24">
      <p className="text-sm text-white/70 mb-1">{ctaLabel}</p>
      <p className="text-xs text-white/40 mb-6 leading-relaxed">
        診断結果をふまえて、Co-Studioからご連絡します。
        <br />
        送信により
        <a href="/privacy" className="underline underline-offset-2 text-white/30 hover:text-white/60 transition-colors">
          プライバシーポリシー
        </a>
        に同意したものとします。
      </p>
      <div className="flex flex-col gap-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input className={input} placeholder="会社名 *" value={company} onChange={(e) => setCompany(e.target.value)} required />
          <input className={input} placeholder="お名前 *" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <input className={input} placeholder="役職" value={role} onChange={(e) => setRole(e.target.value)} />
          <input
            className={input}
            type="email"
            placeholder="メールアドレス *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <textarea
          className={`${input} resize-none`}
          rows={4}
          placeholder="お悩み・ご相談内容（任意）：いま検討中のテーマや、社内で引っかかっている点などをご自由にどうぞ"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-2 px-8 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          {status === "sending" ? "送信中…" : "送信する →"}
        </button>
        {status === "error" && (
          <p className="text-xs text-red-400">送信に失敗しました。時間をおいて再度お試しください。</p>
        )}
      </div>
    </form>
  );
}
