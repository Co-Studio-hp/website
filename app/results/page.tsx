import type { Metadata } from "next";
import Link from "next/link";
import CountUp from "@/components/CountUp";

export const metadata: Metadata = {
  title: "支援実績 | Co-Studio株式会社",
  description: "Co-Studioが支援してきた新規事業開発の実績一覧。SPRINT・Business Lab・Living Labなどのプログラム別に掲載。",
};

const sprintResults = [
  {
    industry: "大手製薬企業",
    outcome: "6ヶ月で新規事業会社設立（出島）",
    detail: "近未来デザインからスタートし、ビジネスモデル設計・特許出願・MVP開発を経て出島スタートアップとして設立まで完走。",
    tags: ["SPRINT", "出島設立", "ヘルスケア"],
  },
  {
    industry: "大手製薬企業",
    outcome: "新規事業領域の近未来デザイン立案",
    detail: "シーズもアイデアもない状態からスタート。半年で特許出願に至るビジネスモデルと近未来デザインを創出。",
    tags: ["SPRINT", "近未来デザイン", "製薬"],
  },
  {
    industry: "大手化学メーカー",
    outcome: "ビジネスモデル〜特許案創出",
    detail: "技術シーズを起点に、ビジネスモデルの設計と特許権利化の方向性を策定。",
    tags: ["SPRINT", "知財", "製造業"],
  },
  {
    industry: "保険×ウェルネス企業（合同）",
    outcome: "合同近未来デザインワークショップ",
    detail: "異業種2社が合同でSPRINTプログラムに参加。それぞれの資産を掛け合わせた事業コンセプトを創出。",
    tags: ["SPRINT", "近未来デザイン", "オープンイノベーション"],
  },
  {
    industry: "大手食品メーカー",
    outcome: "SINIC理論を活用した近未来デザイン",
    detail: "独自の理論フレームを活用し、2030年代の社会変化を起点とした新規事業テーマを複数立案。",
    tags: ["SPRINT", "近未来デザイン", "食品"],
  },
  {
    industry: "大手空調メーカー",
    outcome: "出島機能のデザイン",
    detail: "新規事業を社外で推進するための「出島機能」の設計と組織・資金スキームの策定を実施。",
    tags: ["SPRINT", "出島設計", "製造業"],
  },
];

const labResults = [
  {
    industry: "大手食品メーカー",
    outcome: "事業案の壁打ち・方向性整理",
    tags: ["Business Lab", "食品"],
  },
  {
    industry: "大手エネルギー企業",
    outcome: "新規事業の実証実験サポート",
    tags: ["Living Lab", "エネルギー"],
  },
  {
    industry: "製薬企業",
    outcome: "特許戦略策定・弁理士連携支援",
    tags: ["Business Lab", "知財", "製薬"],
  },
  {
    industry: "食品・飲料メーカー",
    outcome: "北米スタートアップとの連携設計",
    tags: ["Business Lab", "グローバル"],
  },
  {
    industry: "大手製薬企業（複数社）",
    outcome: "出向起業支援・事業計画策定",
    tags: ["Business Lab", "出向起業", "製薬"],
  },
  {
    industry: "地方メディア企業",
    outcome: "インキュベーションプログラム設計・運営",
    tags: ["Business Lab", "メディア", "地域"],
  },
  {
    industry: "大手飲料メーカー・ヘルスケア企業",
    outcome: "仮説設計・ビジネスモデルプロトタイプ",
    tags: ["Business Lab", "ヘルスケア"],
  },
  {
    industry: "地方不動産・デベロッパー",
    outcome: "ナイトDEZIMA型イベント設計・運営",
    tags: ["Business Lab", "コミュニティ"],
  },
];

const spotResults = [
  { industry: "工業用品メーカー", outcome: "新規事業案の壁打ち", tags: ["Spot Assist"] },
  { industry: "食品卸売企業", outcome: "ToBアライアンス設計", tags: ["Spot Assist"] },
  { industry: "大手教育出版企業", outcome: "事業案の論点整理", tags: ["Spot Assist"] },
  { industry: "専門商社", outcome: "新規事業案の壁打ち", tags: ["Spot Assist"] },
  { industry: "食品メーカー", outcome: "SNSマーケティング戦略壁打ち", tags: ["Spot Assist"] },
  { industry: "産業廃棄物・環境企業", outcome: "事業課題の整理", tags: ["Spot Assist"] },
  { industry: "ヘルスケアスタートアップ", outcome: "会社設立に向けた壁打ち", tags: ["Spot Assist"] },
];

function TagBadge({ label }: { label: string }) {
  const colorMap: Record<string, string> = {
    "SPRINT": "border-black text-black",
    "Business Lab": "border-blue-300 text-blue-600",
    "Living Lab": "border-green-300 text-green-600",
    "Spot Assist": "border-gray-300 text-gray-500",
    "出島設立": "border-orange-300 text-orange-600",
    "出島設計": "border-orange-300 text-orange-600",
    "知財": "border-purple-300 text-purple-600",
  };
  const cls = colorMap[label] ?? "border-gray-200 text-gray-400";
  return (
    <span className={`text-xs border px-2 py-0.5 font-medium ${cls}`}>{label}</span>
  );
}

export default function ResultsPage() {
  return (
    <>
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">Results</p>
        <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-6 leading-tight">
          延べ60社以上との<br />共創実績。
        </h1>
        <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
          製薬・化学・食品・エネルギー・不動産・メディアなど多様な業種の企業と、新規事業の種まきから出島設立まで伴走してきました。
          ※企業名は非公開としています。
        </p>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 fx-stagger">
          {[
            { prefix: "延べ", end: 60, suffix: "社+", label: "支援企業数" },
            { prefix: "", end: 6, suffix: "", label: "SPRINTプログラム実施" },
            { prefix: "", end: 16, suffix: "+", label: "Business Lab / Living Lab" },
            { prefix: "", end: 7, suffix: "+", label: "Spot Assist" },
          ].map((s) => (
            <div key={s.label} className="bg-white p-8">
              <p className="text-4xl font-medium mb-2">
                <CountUp prefix={s.prefix} end={s.end} suffix={s.suffix} />
              </p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SPRINT */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <div className="flex items-baseline gap-4 mb-10">
          <h2 className="text-2xl font-medium">SPRINT</h2>
          <span className="text-xs text-gray-400">6ヶ月プログラム / 0→1フェーズ</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {sprintResults.map((r, i) => (
            <div key={i} className="border border-gray-100 p-7 hover:border-gray-300 transition-colors">
              <p className="text-xs text-gray-400 mb-2">{r.industry}</p>
              <h3 className="text-base font-medium mb-3">{r.outcome}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{r.detail}</p>
              <div className="flex flex-wrap gap-2">
                {r.tags.map((t) => <TagBadge key={t} label={t} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 出島設立実績（事例） */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <div className="flex items-baseline gap-4 mb-10">
          <h2 className="text-2xl font-medium">出島スタートアップ設立 実績</h2>
          <span className="text-xs text-gray-400">Co-Studioが共創し、設立した独立スタートアップ</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              logo: "/portfolio/dosukasu.png",
              name: "do.Sukasu",
              parent: "住友ファーマ × Co-Studio",
              field: "ヘルスケア / 教育 / 自動車",
              body: "視空間認知技術を起点に住友ファーマからスピンアウト。シード〜プレシリーズAで累計1億円超を調達し、シリーズA調達中。",
              note: null,
            },
            {
              logo: "/portfolio/hers.png",
              name: "Hers HeAlth Technologies",
              parent: "旭化成ファーマ × Co-Studio",
              field: "ヘルステック / 更年期 / 骨ケア",
              body: "旭化成ファーマ発のCo-DEZIMA第3号として2025年設立。骨密度×美容の観点で更年期女性の健康課題に取り組む。",
              note: null,
            },
            {
              logo: "/portfolio/aikomi.png",
              name: "Aikomi",
              parent: "大手製薬スピンアウト × Co-Studio",
              field: "認知症ケア / AI",
              body: "大手製薬発の認知症デジタルセラピー企業にCo-Studioが経営参画。クラウドファンディングで約1億円を調達。",
              note: null,
            },
            {
              logo: "/portfolio/enaforward.png",
              name: "エナフォワード",
              parent: "大手石油会社 × Co-Studio",
              field: "美容 / SaaS",
              body: "美容師向けアプリ「ビーネ」事業をCo-DEZIMAで設立し、2年で100店舗導入を達成。",
              note: null,
            },
          ].map((c) => (
            <div key={c.name} className="border border-gray-100 p-7 md:flex items-start gap-6 hover:border-gray-300 transition-colors">
              <div className="bg-white border border-gray-100 rounded-md px-5 py-4 inline-flex items-center justify-center mb-4 md:mb-0 shrink-0 w-32 h-20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.logo} alt={c.name} className="max-h-12 w-auto max-w-full object-contain" />
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <TagBadge label="出島設立" />
                  <span className="text-xs border border-gray-200 px-2 py-0.5 font-medium text-gray-400">{c.field}</span>
                </div>
                <h3 className="text-base font-medium mb-1">{c.name}</h3>
                <p className="text-xs text-gray-400 mb-2">{c.parent}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{c.body}</p>
                {c.note && <p className="text-xs text-gray-400 mt-2 leading-relaxed">{c.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Business Lab / Living Lab */}
      <section className="bg-gray-50 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline gap-4 mb-10">
            <h2 className="text-2xl font-medium">Business Lab / Living Lab</h2>
            <span className="text-xs text-gray-400">3〜6ヶ月 / 0→1フェーズ</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {labResults.map((r, i) => (
              <div key={i} className="bg-white p-6 border border-gray-100 hover:border-gray-300 transition-colors">
                <p className="text-xs text-gray-400 mb-2">{r.industry}</p>
                <p className="text-sm font-medium mb-4 leading-relaxed">{r.outcome}</p>
                <div className="flex flex-wrap gap-1">
                  {r.tags.map((t) => <TagBadge key={t} label={t} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spot Assist */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <div className="flex items-baseline gap-4 mb-10">
          <h2 className="text-2xl font-medium">Spot Assist</h2>
          <span className="text-xs text-gray-400">単発壁打ち / 1時間〜</span>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {spotResults.map((r, i) => (
            <div key={i} className="border border-gray-100 p-5 hover:border-gray-300 transition-colors">
              <p className="text-xs text-gray-400 mb-2">{r.industry}</p>
              <p className="text-sm font-medium mb-3">{r.outcome}</p>
              <div className="flex flex-wrap gap-1">
                {r.tags.map((t) => <TagBadge key={t} label={t} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 py-14 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-medium mb-4">貴社でも、一緒に動き始めましょう。</h2>
        <p className="text-sm text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
          Spot Assistの1時間壁打ちから、SPRINTの6ヶ月プログラムまで。<br />
          まずは課題をお聞かせください。
        </p>
        <Link
          href="/contact"
          className="inline-block px-10 py-4 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors font-medium"
        >
          お問い合わせ・壁打ちの申し込み
        </Link>
      </section>
    </>
  );
}
