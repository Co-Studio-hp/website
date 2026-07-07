"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";

type Category = "theme" | "person" | "money" | "sponsor" | "ops";

type Question = {
  id: string;
  cat: Category;
  catLabel: string;
  weighted?: boolean;
  text: string;
  options: { label: string; points: number }[];
};

// 設問（確定コピー。意図・配点は変更禁止）。Q4-6は重み込みで 4/2/0。
const QUESTIONS: Question[] = [
  {
    id: "Q1",
    cat: "theme",
    catLabel: "テーマ",
    text: "そのテーマは、自社の技術・知財・顧客基盤など既存の資産に根ざしていますか。",
    options: [
      { label: "明確に根ざしている", points: 2 },
      { label: "一部関係する", points: 1 },
      { label: "ほぼ関係ない", points: 0 },
    ],
  },
  {
    id: "Q2",
    cat: "theme",
    catLabel: "テーマ",
    text: "そのテーマは、本業のコア領域から少し離れた「周辺・非連続」の領域ですか。",
    options: [
      { label: "周辺・非連続の領域だ", points: 2 },
      { label: "どちらとも言えない", points: 1 },
      { label: "本業のど真ん中だ", points: 0 },
    ],
  },
  {
    id: "Q3",
    cat: "theme",
    catLabel: "テーマ",
    text: "社外の顧客や市場から、初期の引き合い・反応がすでにありますか。",
    options: [
      { label: "具体的な引き合いがある", points: 2 },
      { label: "関心の声はある", points: 1 },
      { label: "まだ社外に出していない", points: 0 },
    ],
  },
  {
    id: "Q4",
    cat: "person",
    catLabel: "人",
    weighted: true,
    text: "「自分がやり切りたい」と手を挙げる個人がいますか。（出向などで社外に出る覚悟を含む）",
    options: [
      { label: "いる（本人の意思確認済み）", points: 4 },
      { label: "候補はいるが未確認", points: 2 },
      { label: "いない", points: 0 },
    ],
  },
  {
    id: "Q5",
    cat: "money",
    catLabel: "資金",
    weighted: true,
    text: "親会社として資金（共同研究費・出資枠など）を出す余地がありますか。",
    options: [
      { label: "出す枠・意思がある", points: 4 },
      { label: "検討の余地はある", points: 2 },
      { label: "難しい", points: 0 },
    ],
  },
  {
    id: "Q6",
    cat: "sponsor",
    catLabel: "決裁",
    weighted: true,
    text: "役員クラスに、このテーマの外部化を後押しし得るスポンサーがいますか。",
    options: [
      { label: "いる", points: 4 },
      { label: "候補はいるが未接触", points: 2 },
      { label: "いない", points: 0 },
    ],
  },
  {
    id: "Q7",
    cat: "ops",
    catLabel: "実務",
    text: "知財・技術資産は切り出せる状態ですか。（権利関係の整理の見込みが立つ）",
    options: [
      { label: "整理できる見込み", points: 2 },
      { label: "未整理だが障害は少なそう", points: 1 },
      { label: "複雑で見通せない", points: 0 },
    ],
  },
  {
    id: "Q8",
    cat: "ops",
    catLabel: "実務",
    text:
      "このテーマは、社内の事業化ゲートや稟議で停滞した経験がありますか。（※停滞経験は「社内では育てにくい」サイン＝加点）",
    options: [
      { label: "ある", points: 2 },
      { label: "これから最初の関門", points: 1 },
      { label: "社内で順調に進んでいる", points: 0 },
    ],
  },
  {
    id: "Q9",
    cat: "ops",
    catLabel: "実務",
    text: "業界や主要取引先との関係で、「外に出すこと」自体が難しくなる事情はありませんか。",
    options: [
      { label: "特にない", points: 2 },
      { label: "確認が必要", points: 1 },
      { label: "明確な制約がある", points: 0 },
    ],
  },
  {
    id: "Q10",
    cat: "ops",
    catLabel: "実務",
    text: "18ヶ月以内に何らかの意思決定ができる体制・時間軸ですか。",
    options: [
      { label: "できる", points: 2 },
      { label: "努力目標", points: 1 },
      { label: "難しい", points: 0 },
    ],
  },
];

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

const VERDICT_CONTENT = {
  A: {
    badge: "出島適合度：高い",
    body:
      "組成の前提（テーマ・人・資金・決裁）が揃いつつあります。次の論点は「どう出すか」——資本構成・親会社の関与設計・出口の設計です。Co-Studioは出島の設立・運営を実際に4社で行ってきました。スキーム設計の個別相談へどうぞ。",
    primary: { label: "個別相談を申し込む", kind: "form" as const },
    sub: null,

  },
  B: {
    badge: "可能性あり——検証が必要です",
    body:
      "テーマには出島の素質がありますが、前提のいくつかが未確定です。Co-Studioでは、テーマ2〜3件を6週間で評価する「出島適合診断」を提供しています。社内説明に使える外部評価レポートの形でお返しします。",
    primary: { label: "診断サービスについて問い合わせる", kind: "form" as const },
    sub: { label: "社内説明用の資料を受け取る", href: "/co-dezima#download" },

  },
  C: {
    badge: "まずは情報収集から",
    body:
      "いま無理に外へ出す段階ではありません。まずは「出島とはどんな選択肢か」を知るところから。プレイブック抜粋版（無料）と、月次イベント「ナイトDEZIMA」をご案内します。",
    primary: { label: "プレイブック抜粋版を読む", kind: "link" as const, href: "/co-dezima#download" },
    sub: { label: "イベント案内を受け取る", href: "#lead-form" },

  },
};

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

      <button
        onClick={onRestart}
        className="mt-8 mx-auto block text-xs text-white/40 hover:text-white/80 transition-colors tracking-widest uppercase"
      >
        ↻ もう一度診断する
      </button>
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
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/shindan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, name, role, email, verdict, total, scores, answers }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      track("shindan_lead_submit", { verdict });
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
        診断結果をふまえて、Co-Studioからご連絡します。（メールのみ必須）
        <br />
        送信により
        <a href="/privacy" className="underline underline-offset-2 text-white/30 hover:text-white/60 transition-colors">
          プライバシーポリシー
        </a>
        に同意したものとします。
      </p>
      <div className="flex flex-col gap-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input className={input} placeholder="会社名" value={company} onChange={(e) => setCompany(e.target.value)} />
          <input className={input} placeholder="お名前" value={name} onChange={(e) => setName(e.target.value)} />
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
