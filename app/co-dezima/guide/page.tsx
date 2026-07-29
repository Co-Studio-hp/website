import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DiagramStructure, DiagramTerms, DiagramLoop } from "./diagrams";

export const metadata: Metadata = {
  title: "出島（カーブアウト）とは｜新規事業を社外に出すという選択肢",
  description:
    "出島（カーブアウト）とは何か。スピンオフ・スピンアウト・出向起業との違い、なぜ有望なテーマほど社内で育たないのか、他の立ち上げ方との比較、向く事業・向かない事業までを、経済産業省のカーブアウト・ガイダンスの整理に沿って解説します。",
  alternates: { canonical: "/co-dezima/guide" },
  openGraph: {
    title: "出島（カーブアウト）とは｜新規事業を社外に出すという選択肢",
    description:
      "カーブアウト・スピンオフ・スピンアウト・出向起業の違いから、社内で育たない構造的理由、他の立ち上げ方との比較まで。Co-Studioの出島ガイド。",
    url: "/co-dezima/guide",
  },
};

// ---- 用語の整理（経済産業省「カーブアウトの戦略的活用に係る研究会」ガイダンスの整理に準拠）----
const terms = [
  {
    term: "カーブアウト",
    def: "事業会社が、自社の組織では事業化できない技術・事業を、別法人（スタートアップ）を創設して切り出す手法の総称。親会社の資本関係を残しつつ、外部資本も受け入れられる。",
    rel: "出島はこの中に含まれる",
  },
  {
    term: "起業家主導型カーブアウト",
    def: "起業家（担当者）がカーブアウトのプロセスと経営を主導し、外部資金の調達まで行う型。",
    rel: "出島の直接の上位概念",
  },
  {
    term: "スピンオフ",
    def: "親会社との資本関係を残して事業を分離・独立させる形。親会社以外からの出資は受けない。",
    rel: "外部資本を入れる点で出島と異なる",
  },
  {
    term: "スピンアウト",
    def: "親会社と資本関係を持たずに独立する形（退職して起業）。",
    rel: "親会社の関与が残る点で出島と異なる",
  },
  {
    term: "出向起業",
    def: "所属元に在籍したまま新会社へ出向して起業する「人の出し方」の枠組み。国が制度整備と情報提供を行っている。",
    rel: "出島と併用する制度。スキームではなく人事の器",
  },
];

// ---- 社内で育たない構造 ----
const dilemmas = [
  {
    t: "意思決定が遅い",
    d: "不確実性の高い事業に、既存事業と同じ稟議・決裁・リスク審査が適用され、検証速度が市場に負ける。",
  },
  {
    t: "「100億円の壁」の幻想",
    d: "初年度から既存事業並みの規模を求められ、芽の段階で「小さすぎる」と評価されて摘まれる。",
  },
  {
    t: "ステージゲートの硬直性",
    d: "最初に決めた期限とマイルストーンで硬直的に評価され、ピボットの学習が「計画未達」と扱われる。",
  },
  {
    t: "人材・処遇の構造衝突",
    d: "挑戦する人ほど評価制度・キャリアパスと衝突する。撤退時の受け皿がなく、誰も手を挙げなくなる。",
  },
  {
    t: "現場から遠い",
    d: "大きな組織の中では会議室の戦略と社内調整で終わり、顧客の現場に入り込めない。",
  },
];

// ---- 出口の3択比較 ----
const exitRows = [
  {
    axis: "検証スピード",
    a: "稟議・決裁を経由し数か月単位",
    b: "—（学習が止まる）",
    c: "代表に決裁権を集約し、即断即決で検証を回せる",
  },
  {
    axis: "ピボットのし易さ",
    a: "計画変更のたびに再承認が必要",
    b: "—",
    c: "探索型の柔軟な方針転換が前提の設計",
  },
  {
    axis: "本体PLへの影響",
    a: "あり（赤字が本体に乗り続ける）",
    b: "なし",
    c: "なし（連結対象外。損失は出資額の範囲に限定）",
  },
  {
    axis: "担当者・人材",
    a: "評価制度・キャリアパスと衝突",
    b: "担当者の離職・意欲喪失リスク",
    c: "出向スキームで挑戦と復帰を両立できる",
  },
  {
    axis: "将来のリターン",
    a: "100%保有だが成長速度が上がらない",
    b: "ゼロ（技術・学習が死蔵）",
    c: "保有シェア分のリターン＋学習の還流＋将来の取り込み余地",
  },
];

// ---- 経済合理性：出口4択 ----
const economics = [
  {
    label: "カーブアウト（マイナー出資）",
    now: "外部投資家が付くことで事業価値が発生する",
    future: "事業が成長すれば保有シェア分のリターン",
    example: "企業価値 1000 × 20%保有 ＝ 200",
    highlight: true,
  },
  {
    label: "完全子会社化・既存部署に移管",
    now: "赤字事業の場合、事業価値が付かない",
    future: "自社で抱えてもスピードある成長は期待しにくい",
    example: "企業価値 100 × 100%保有 ＝ 100",
    highlight: false,
  },
  {
    label: "M&Aで売却",
    now: "その時点の事業価値でキャッシュ化（未成熟なため評価は低い）",
    future: "売却時のキャッシュのみ。将来成長のリターンはない",
    example: "—",
    highlight: false,
  },
  {
    label: "事業化を断念",
    now: "死蔵化され、事業価値が付かない",
    future: "ゼロ（担当者の離職・技術の陳腐化というマイナスも）",
    example: "—",
    highlight: false,
  },
];

// ---- 立ち上げ方の比較（星取表）----
const methods = ["社内事業化", "100%子会社", "JV", "出島", "出向起業", "スピンアウト"];
const matrix = [
  { axis: "ブランド力", v: ["○", "○", "○", "○", "○", "△"] },
  { axis: "ピボットのし易さ", v: ["×", "×", "×", "○", "○", "○"] },
  { axis: "資金の制限", v: ["×", "×", "×", "△", "○", "○"] },
  { axis: "オーナーシップ", v: ["×", "×", "×", "○", "○", "○"] },
  { axis: "人事権", v: ["×", "×", "×", "○", "○", "○"] },
  { axis: "社員のモチベーション", v: ["×", "×", "×", "○", "○", "×"] },
  { axis: "キャピタルゲイン", v: ["○", "○", "△", "○", "△", "×"] },
  { axis: "本体の赤字影響", v: ["あり", "あり", "あり", "なし", "なし", "なし"] },
];

// ---- デメリット ----
const costs = [
  {
    t: "複雑さ",
    d: "会社法・税務・会計の高度な専門知識が必要。特に知財管理と資本政策の設計は、社内リソースだけでは難しく専門家のサポートが不可欠です。",
  },
  {
    t: "コスト",
    d: "法人設立費用・バックオフィス運営費などの初期投資とランニングコスト。社内で進めるより固定費が先行する構造になります。",
  },
  {
    t: "コントロールの喪失",
    d: "外部資本が入ると、親会社は完全なコントロール権を失います。",
  },
  {
    t: "社内調整",
    d: "出向条件・知財ライセンス・既存事業との棲み分け。特に「なぜ外に出すのか」の社内説明に労力を要します。",
  },
];

// ---- Q&A（FAQPage構造化データにも使う）----
const faqs = [
  {
    q: "技術・知財が流出しないか",
    a: "譲渡・ライセンス契約で提供範囲と対価を明確化して管理します。段階的な提供（初期はライセンス、検証成功後に譲渡）など知財提供の型が確立しており、経済産業省の手引書にも整理されています。",
  },
  {
    q: "人材が流出するのでは",
    a: "出向スキームなら在籍のまま挑戦できます。復帰オプションを契約に明記し、キャリアを可逆に設計します。挑戦の受け皿があることは、むしろ社内人材のリテンションに働きます。",
  },
  {
    q: "ガバナンスが利かなくなるのでは",
    a: "月次の株主会と四半期の評価ゲートで運営します。継続・撤退の評価基準を設立時に数値で合意しておき、感情ではなく条項で判断します。",
  },
  {
    q: "失敗したらどうするのか",
    a: "出口の3分岐（外部調達で自走／売却／撤退）を最初から契約に内蔵します。親会社の損失は出資額の範囲に限定され、本体のPLを傷つけません。撤退時も学習資産を親会社に還流させます。",
  },
];

// ---- 進め方 ----
const steps = [
  {
    n: "STEP 1",
    t: "社内勉強会",
    span: "半日",
    items: [
      "役員・関係部門向けに、出島の仕組みと実例を共有して「共通言語」を作る",
      "カーブアウトの一般論（経産省の整理）から実例の裏側までを1回で",
      "テーマが決まっていなくても実施できる",
    ],
    link: { href: "/service#workshop", label: "勉強会のサービス詳細を見る" },
  },
  {
    n: "STEP 2",
    t: "出島適合診断",
    span: "テーマ2〜3件・6週間",
    items: [
      "候補テーマを〈社内継続／出島／中止〉の判断軸で診断する",
      "経済合理性の試算と、出資・知財・人材など主要条件の仮置き",
      "「出島に向かない」という結論も含めて、根拠を持って役員会に説明できる状態に",
    ],
    link: { href: "/shindan", label: "まず3分のセルフ診断で当たりをつける" },
  },
  {
    n: "STEP 3",
    t: "組成検討",
    span: "適合テーマのみ",
    items: [
      "資金の器、出資比率、出向条件、出口の分岐条件を設計",
      "役員会向けの説明資料と契約の骨格まで伴走して作り込む",
      "設立実務（登記・契約・広報）へ接続",
    ],
    link: { href: "/contact", label: "組成について相談する" },
  },
];

// 目次（各セクションのid・アンカーと対応）
const contents = [
  { id: "terms", n: "01", t: "まず、言葉を揃える", s: "カーブアウト／スピンオフ／スピンアウト／出向起業" },
  { id: "why", n: "02", t: "なぜ社内で育たないのか", s: "出島が解こうとしている5つの構造問題" },
  { id: "concept", n: "03", t: "学習ループを所有する装置", s: "出島とは何か" },
  { id: "options", n: "04", t: "出口は2択ではない", s: "社内継続／中止／出島の比較" },
  { id: "economics", n: "05", t: "「20%で200」の経済学", s: "出口4択を現在価値と将来リターンで並べる" },
  { id: "comparison", n: "06", t: "他の立ち上げ方と並べる", s: "6手法 × 8観点の比較表" },
  { id: "background", n: "07", t: "特殊な手法ではない", s: "国が示した型と、他社の実例" },
  { id: "tradeoffs", n: "08", t: "出島は万能ではない", s: "4つの覚悟と、向く事業・向かない事業" },
  { id: "faq", n: "09", t: "よくいただく4つの懸念", s: "知財／人材／ガバナンス／失敗時" },
  { id: "how", n: "10", t: "小さく始める3ステップ", s: "勉強会 → 適合診断 → 組成検討" },
];

// 出典・参考リンク（すべて公的機関の公開情報）
const sources = [
  {
    label: "起業家主導型カーブアウト実践のガイダンス（2024年4月）",
    note: "本ページの用語整理は、このガイダンスの分類に準拠しています。",
    href: "https://www.meti.go.jp/press/2024/04/20240426003/20240426003.html",
  },
  {
    label: "カーブアウト実践ガイドブック Why編・How編（2026年4月）",
    note: "経営層の合意形成に向けたWhy編と、実務のHow編。経済合理性の考え方はWhy編の整理に基づきます。",
    href: "https://www.meti.go.jp/press/2026/04/20260417003/20260417003.html",
  },
  {
    label: "カーブアウトの戦略的活用に係る研究会",
    note: "ガイダンスがまとめられた研究会。議事と配布資料が公開されています。",
    href: "https://www.meti.go.jp/shingikai/economy/carve_out/index.html",
  },
  {
    label: "出向起業の促進",
    note: "所属企業に在籍したまま起業する「出向起業」について、国が制度整備と情報提供を行っています。",
    href: "https://www.meti.go.jp/policy/economy/jinzai/shukkokigyo/shukkoukigyou.html",
  },
  {
    label: "「スピンオフ」の活用に向けた取組について",
    note: "スピンオフに関する税制措置（パーシャルスピンオフ税制）の解説と手引。",
    href: "https://www.meti.go.jp/policy/economy/keiei_innovation/keizaihousei/saihenzeisei/spin-off.html",
  },
];

const Label = ({ n, children }: { n?: string; children: React.ReactNode }) => (
  <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
    {n && <span className="text-gray-800 mr-3 tabular-nums">{n}</span>}
    {children}
  </p>
);

export default function DezimaGuidePage() {
  return (
    <>
      {/* 構造化データ：パンくず・FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "ホーム", item: "https://www.co-studio.co.jp" },
              { "@type": "ListItem", position: 2, name: "Co-DEZIMA", item: "https://www.co-studio.co.jp/co-dezima" },
              { "@type": "ListItem", position: 3, name: "出島ガイド", item: "https://www.co-studio.co.jp/co-dezima/guide" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-[#0a0a0a] text-white px-6 pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6">Guide</p>
            <h1 className="text-[1.75rem] md:text-4xl xl:text-5xl font-medium leading-tight mb-8">
              <span className="whitespace-nowrap">出島（カーブアウト）とは</span>
              <span className="block text-white/40 text-lg md:text-xl xl:text-2xl mt-3">
                ― 新規事業を社外に出すという選択肢
              </span>
            </h1>
            <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5">
              有望なテーマほど、社内では育たないことがあります。
              決裁の速度、評価制度、ステージゲート。事業の筋の良し悪しとは別のところで、芽が摘まれていく。
            </p>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              出島は、その構造から抜けるための選択肢です。
              言葉の定義から他の立ち上げ方との比較、向かない場合の判断まで、実案件から体系化した内容を公開しています。
              <span className="text-white/80">登録は不要です。</span>
            </p>
          </div>
          <div className="text-white/90">
            <DiagramStructure className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* 目次 */}
      <section className="bg-[#0a0a0a] text-white px-6 pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto border-t border-white/10 pt-10">
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">Contents</p>
          <ol className="grid md:grid-cols-2 gap-x-12 gap-y-px">
            {contents.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="group flex gap-5 items-baseline py-3.5 border-b border-white/5 hover:border-white/30 transition-colors"
                >
                  <span className="text-xs text-white/25 tabular-nums shrink-0 group-hover:text-white/65 transition-colors">
                    {c.n}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm text-white/80 group-hover:text-white transition-colors">{c.t}</span>
                    <span className="block text-xs text-white/30 mt-0.5 leading-relaxed">{c.s}</span>
                  </span>
                  <span className="text-white/20 group-hover:text-white/70 transition-colors shrink-0">↓</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 01 用語の整理 */}
      <section id="terms" className="py-16 md:py-20 px-6 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <Label n="01">Terms</Label>
          <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-snug">
            まず、言葉を揃える。
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-2xl">
            カーブアウト、スピンオフ、スピンアウト、出向起業。
            現場では曖昧に混ざりがちですが、資本関係と外部資本の扱いで整理できます。
            以下は経済産業省「カーブアウトの戦略的活用に係る研究会」ガイダンスの整理に準拠しています。
          </p>
          <div className="border-t border-gray-200">
            {terms.map((t) => (
              <div key={t.term} className="border-b border-gray-100 py-5 px-2 -mx-2 hover:bg-white/70 transition-colors grid md:grid-cols-[190px_1fr_19rem] gap-1.5 md:gap-6">
                <p className="text-sm font-medium">{t.term}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{t.def}</p>
                <p className="text-xs text-gray-500 leading-relaxed md:text-right md:whitespace-nowrap">{t.rel}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-gray-800">
            <DiagramTerms className="w-full h-auto" />
          </div>
          <p className="text-xs text-gray-500 mt-6 leading-relaxed">
            Co-Studioの「Co-DEZIMA」は、この中の<b className="text-gray-700">起業家主導型カーブアウト</b>にあたります。
            スタジオが共同創業者として新会社を組成し、外部調達の前に準備期間を確保する型です。
          </p>
        </div>
      </section>

      {/* 02 社内で育たない構造 */}
      <section id="why" className="bg-[#F5F3EE] py-16 md:py-20 px-6 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <Label n="02">Why</Label>
          <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-snug">
            なぜ、有望なテーマほど社内で育たないのか。
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-2xl">
            担当者の能力でも、アイデアの質でもありません。組織の構造がそうさせています。
          </p>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
            {dilemmas.map((d, i) => (
              <div key={d.t} className="border-t border-gray-300 pt-4">
                <p className="text-xs text-gray-500 mb-1.5 tabular-nums">0{i + 1}</p>
                <h3 className="text-sm font-medium mb-2">{d.t}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 学習ループ */}
      <section id="concept" className="bg-[#111111] text-white py-24 md:py-28 px-6 scroll-mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">
            <span className="text-white/70 mr-3 tabular-nums">03</span>Concept
          </p>
          <h2 className="text-3xl md:text-5xl font-medium leading-[1.35] mb-10">
            出島とは、<br />
            学習ループを<br className="md:hidden" />所有する装置である。
          </h2>
          <p className="text-sm md:text-base text-white/70 leading-loose max-w-xl mx-auto">
            新規事業は、学習速度の競争です。
            仮説を立て、顧客に当て、外し、直す。このループを何周できるかで結果が決まります。
            社内に置いたままだと、ループの一周ごとに承認と説明が挟まる。
            出島は、そのループを新会社が丸ごと所有する形にするための器です。
          </p>
        </div>
        <div className="max-w-3xl mx-auto mt-14 text-white/85">
          <DiagramLoop className="w-full h-auto" />
        </div>
      </section>

      {/* 04 出口は2択ではない */}
      <section id="options" className="py-16 md:py-20 px-6 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <Label n="04">Options</Label>
          <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-snug">
            テーマの出口は「継続か、中止か」の2択ではない。
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-2xl">
            〈社内継続／中止〉に〈出島〉を加えた3択で並べると、判断の材料が変わります。
          </p>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[680px] text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 pr-4 font-medium text-xs text-gray-500 w-36">観点</th>
                  <th className="text-left py-3 pr-4 font-medium text-xs text-gray-600">1 社内継続</th>
                  <th className="text-left py-3 pr-4 font-medium text-xs text-gray-600">2 中止・凍結</th>
                  <th className="text-left py-3 pr-3 font-medium text-xs text-black bg-black/[0.025]">3 出島</th>
                </tr>
              </thead>
              <tbody>
                {exitRows.map((r) => (
                  <tr key={r.axis} className="border-b border-gray-100 align-top group hover:bg-black/[0.035] transition-colors">
                    <td className="py-4 pr-4 text-xs text-gray-600">{r.axis}</td>
                    <td className="py-4 pr-4 text-xs text-gray-600 leading-relaxed">{r.a}</td>
                    <td className="py-4 pr-4 text-xs text-gray-600 leading-relaxed">{r.b}</td>
                    <td className="py-4 pr-3 text-xs text-gray-900 leading-relaxed bg-black/[0.025] group-hover:bg-black/[0.06] transition-colors">{r.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 05 経済合理性 */}
      <section id="economics" className="bg-[#F5F3EE] py-16 md:py-20 px-6 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <Label n="05">Economics</Label>
          <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-snug">
            「20%で200」は、「100%で100」より大きい。
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-2xl">
            保有比率ではなく「事業価値の絶対額」で考えるのが、出島の経済学です。
            出口の4択を、現在価値と将来のリターンで並べます。
          </p>
          <div className="grid sm:grid-cols-2 gap-px bg-gray-300 mb-10 border border-gray-300">
            <div className="bg-black text-white p-8 md:p-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">出島（20%保有）</p>
              <p className="text-5xl md:text-6xl font-medium tabular-nums leading-none mb-3">200</p>
              <p className="text-xs text-white/65 leading-relaxed">企業価値 1000 × 保有 20%</p>
            </div>
            <div className="bg-white p-8 md:p-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-3">社内に抱える（100%保有）</p>
              <p className="text-5xl md:text-6xl font-medium tabular-nums leading-none mb-3 text-gray-400">100</p>
              <p className="text-xs text-gray-600 leading-relaxed">企業価値 100 × 保有 100%</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-gray-300">
            {economics.map((e) => (
              <div key={e.label} className={`p-6 transition-colors ${e.highlight ? "bg-black text-white" : "bg-white hover:bg-gray-50"}`}>
                <h3 className={`text-sm font-medium mb-3 ${e.highlight ? "" : "text-gray-900"}`}>{e.label}</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className={`text-[10px] tracking-widest uppercase mb-0.5 ${e.highlight ? "text-white/40" : "text-gray-500"}`}>現在価値</dt>
                    <dd className={`text-xs leading-relaxed ${e.highlight ? "text-white/85" : "text-gray-700"}`}>{e.now}</dd>
                  </div>
                  <div>
                    <dt className={`text-[10px] tracking-widest uppercase mb-0.5 ${e.highlight ? "text-white/40" : "text-gray-500"}`}>将来のリターン</dt>
                    <dd className={`text-xs leading-relaxed ${e.highlight ? "text-white/85" : "text-gray-700"}`}>{e.future}</dd>
                  </div>
                  {e.example !== "—" && (
                    <div>
                      <dt className={`text-[10px] tracking-widest uppercase mb-0.5 ${e.highlight ? "text-white/40" : "text-gray-500"}`}>試算例</dt>
                      <dd className={`text-sm font-medium tabular-nums ${e.highlight ? "" : "text-gray-900"}`}>{e.example}</dd>
                    </div>
                  )}
                </dl>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-5">
            出典：経済産業省「カーブアウト実践ガイドブック Why編」の整理に基づく
          </p>
        </div>
      </section>

      {/* 06 立ち上げ方の比較 */}
      <section id="comparison" className="py-16 md:py-20 px-6 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <Label n="06">Comparison</Label>
          <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-snug">
            他の立ち上げ方と、並べてみる。
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-2xl">
            6つの立ち上げ方を、主要8観点で比較しました。Co-Studioの事例分析に基づく評価です。
          </p>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[640px] text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 pr-3 font-medium text-xs text-gray-500 w-44">観点</th>
                  {methods.map((m) => (
                    <th
                      key={m}
                      className={`py-3 px-2 font-medium text-xs text-center ${m === "出島" ? "text-black bg-black/[0.045]" : "text-gray-600"}`}
                    >
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row) => (
                  <tr key={row.axis} className="border-b border-gray-100 group hover:bg-black/[0.035] transition-colors">
                    <td className="py-3 pr-3 text-xs text-gray-700 group-hover:text-black transition-colors">{row.axis}</td>
                    {row.v.map((v, i) => (
                      <td
                        key={i}
                        className={`py-3 px-2 text-center text-sm transition-colors ${
                          methods[i] === "出島"
                            ? "bg-black/[0.045] group-hover:bg-black/[0.09] font-medium text-black"
                            : "text-gray-700 group-hover:text-black"
                        }`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mt-6 max-w-3xl">
            出島は、<b>本体の信用とアセットを使いながら、オーナーシップと機動力を確保できる</b>選択肢です。
            一方で「資金の制限」は親会社側の予算確保次第であり、キャピタルゲインは買い戻し条項の設計に依存します。
          </p>
        </div>
      </section>

      {/* 07 公的な裏付け */}
      <section id="background" className="bg-[#111111] text-white py-20 md:py-24 px-6 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
            <span className="text-white/80 mr-3 tabular-nums">07</span>Background
          </p>
          <h2 className="text-2xl md:text-3xl font-medium mb-5 leading-snug">
            特殊な手法ではありません。
          </h2>
          <p className="text-sm md:text-base text-white/65 leading-relaxed mb-14 max-w-2xl">
            国が型を示し、大企業発の実例が積み上がっている領域です。
          </p>

          {/* 国が示した型 */}
          <h3 className="text-base md:text-lg font-medium mb-6">国が型を示している</h3>
          <div className="grid md:grid-cols-2 gap-px bg-white/10 mb-8">
            {[
              {
                issuer: "経済産業省",
                date: "2024年4月",
                title: "起業家主導型カーブアウト実践のガイダンス",
                href: "https://www.meti.go.jp/press/2024/04/20240426003/20240426003.html",
              },
              {
                issuer: "経済産業省",
                date: "2026年4月",
                title: "カーブアウト実践ガイドブック Why編・How編",
                href: "https://www.meti.go.jp/press/2026/04/20260417003/20260417003.html",
              },
            ].map((d) => (
              <a
                key={d.href}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#111111] hover:bg-white/[0.06] transition-colors p-7 flex flex-col"
              >
                <div className="flex items-baseline justify-between mb-5">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">{d.issuer}</span>
                  <span className="text-[10px] text-white/40 tabular-nums">{d.date}</span>
                </div>
                {/* 資料の見立て */}
                <div className="border border-white/20 group-hover:border-white/40 transition-colors p-5 mb-5 flex-1">
                  <div className="space-y-1.5 mb-4">
                    <div className="h-px bg-white/25 w-1/3" />
                    <div className="h-px bg-white/15 w-full" />
                    <div className="h-px bg-white/15 w-full" />
                    <div className="h-px bg-white/15 w-2/3" />
                  </div>
                  <p className="text-sm md:text-base leading-relaxed">{d.title}</p>
                </div>
                <span className="text-xs text-white/50 group-hover:text-white transition-colors inline-flex items-center gap-1.5">
                  経済産業省のページで見る
                  <span aria-hidden>↗</span>
                </span>
              </a>
            ))}
          </div>
          <p className="text-sm text-white/60 leading-relaxed mb-16 max-w-2xl">
            「起業家主導型カーブアウト」は、ここで整理された類型のひとつです。制度面でも、所属企業を辞めずに起業する{" "}
            <a
              href="https://www.meti.go.jp/policy/economy/jinzai/shukkokigyo/shukkoukigyou.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 text-white/80 hover:text-white transition-colors"
            >
              出向起業
            </a>
            {" "}の枠組みや、{" "}
            <a
              href="https://www.meti.go.jp/policy/economy/keiei_innovation/keizaihousei/saihenzeisei/spin-off.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 text-white/80 hover:text-white transition-colors"
            >
              スピンオフの税制措置
            </a>
            {" "}の整備が進んでいます。
            <span className="text-white/40">（最新の要件・公募状況はリンク先の公式情報をご確認ください）</span>
          </p>

          {/* 実例 */}
          <h3 className="text-base md:text-lg font-medium mb-6">実例が積み上がっている</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 mb-6">
            {[
              { from: "NEC 発", name: "dotData" },
              { from: "味の素 発", name: "つばめBHB" },
              { from: "HOYA 発", name: "ViXion" },
              { from: "大阪ガス 発", name: "SPACECOOL" },
            ].map((c) => (
              <div key={c.name} className="bg-[#111111] p-6">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">{c.from}</p>
                <p className="text-base md:text-lg">{c.name}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-white/60 leading-relaxed mb-3 max-w-2xl">
            Honda IGNITION やリコー TRIBUS のように、社内制度としてカーブアウトの出口を規定する企業も出てきました。
          </p>
          <p className="text-xs text-white/35 mb-10">いずれも経済産業省の手引書に掲載された事例です。</p>

          <p className="text-sm text-white/60 leading-relaxed">
            Co-Studio自身も出島スタートアップを設立・運営しています。{" "}
            <Link href="/portfolio" className="underline underline-offset-4 text-white/80 hover:text-white transition-colors">
              ポートフォリオを見る
            </Link>
          </p>
        </div>
      </section>


      {/* 08 デメリット */}
      <section id="tradeoffs" className="py-16 md:py-20 px-6 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <Label n="08">Trade-offs</Label>
          <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-snug">
            出島は、万能ではありません。
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-2xl">
            先に見積もっておくべきコストが4つあります。ここを飛ばすと、設立後に必ず跳ね返ってきます。
          </p>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 mb-12">
            {costs.map((c, i) => (
              <div key={c.t} className="border-t border-gray-200 pt-4">
                <p className="text-xs text-gray-500 mb-1.5 tabular-nums">0{i + 1}</p>
                <h3 className="text-sm font-medium mb-2">{c.t}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
            <div className="bg-white p-6">
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">向く事業</p>
              <p className="text-sm text-gray-800 leading-relaxed">
                既存事業とのカニバリが懸念される／新しいビジネスモデルが必要／スピードが競争条件／外部人材が要る
              </p>
            </div>
            <div className="bg-white p-6">
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">向かない事業</p>
              <p className="text-sm text-gray-800 leading-relaxed">
                既存事業との親和性が高い／社内リソースで十分に回る／低リスク／短期で収益化できる
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Link
              href="/shindan"
              className="inline-block px-8 py-3.5 border border-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-black hover:text-white transition-colors"
            >
              10問で出島適合度を診断する →
            </Link>
            <p className="text-xs text-gray-500 mt-3">3分・登録不要</p>
          </div>
        </div>
      </section>

      {/* 09 Q&A */}
      <section id="faq" className="bg-[#F5F3EE] py-16 md:py-20 px-6 scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <Label n="09">Q &amp; A</Label>
          <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-snug">
            よくいただく4つの懸念。
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-10">
            いずれも「契約と設計」で担保します。実案件で使われてきた型があります。
          </p>
          <div className="space-y-8">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-t border-gray-300 pt-5">
                <h3 className="text-sm md:text-base font-medium mb-2.5">
                  <span className="text-gray-500 mr-2 tabular-nums">Q{i + 1}.</span>
                  {f.q}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-8 leading-relaxed">
            経済産業省のガイダンスは、事業会社側の「10のつまずき」（自社事業化への揺り戻し、過半出資前提、拒否権、事後介入など）も公表しています。
            Co-DEZIMAはその回避策を織り込んで設計します。
          </p>
        </div>
      </section>

      {/* 10 進め方 */}
      <section id="how" className="py-16 md:py-20 px-6 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <Label n="10">How to start</Label>
          <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-snug">
            いきなり会社は作りません。
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-2xl">
            共通言語づくりから、テーマの診断、組成の検討へと段階を踏みます。
          </p>
          <div className="grid md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {steps.map((s) => (
              <div key={s.n} className="bg-white p-6 flex flex-col hover:bg-gray-50/80 transition-colors">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-2">{s.n}</p>
                <h3 className="text-base font-medium mb-1">{s.t}</h3>
                <p className="text-xs text-gray-500 mb-4">{s.span}</p>
                <ul className="space-y-2 flex-1">
                  {s.items.map((it) => (
                    <li key={it} className="text-xs text-gray-700 leading-relaxed flex gap-2">
                      <span className="text-gray-400 shrink-0">—</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={s.link.href}
                  className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-700 hover:text-black transition-colors inline-flex items-center gap-1.5"
                >
                  {s.link.label}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-6">
            まずはSTEP 1の勉強会から。具体的なテーマが1件もなくても始められます。
          </p>
        </div>
      </section>

      {/* 出典・参考リンク */}
      <section className="bg-[#F5F3EE] py-16 md:py-20 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <Label>Sources</Label>
          <h2 className="text-xl md:text-2xl font-medium mb-4 leading-snug">出典・参考リンク</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-2xl">
            本ページの用語整理と制度の説明は、経済産業省が公開している以下の資料に基づいています。
            一次情報にあたりたい方はこちらへ。
          </p>
          <ul className="border-t border-gray-300">
            {sources.map((src) => (
              <li key={src.href} className="border-b border-gray-200">
                <a
                  href={src.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 items-start py-5 hover:bg-white/60 transition-colors px-2 -mx-2"
                >
                  <span className="flex-1">
                    <span className="block text-sm text-gray-800 group-hover:text-black transition-colors mb-1">
                      {src.label}
                    </span>
                    <span className="block text-xs text-gray-600 leading-relaxed">{src.note}</span>
                  </span>
                  <span className="text-xs text-gray-400 group-hover:text-black transition-colors shrink-0 pt-0.5">
                    経済産業省 ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0a0a0a] text-white py-24 md:py-28 px-6 overflow-hidden">
        {/* 実際のNight DEZIMAの様子。装飾ではなく、この下のリンク先で行っている場そのもの */}
        <Image
          src="/dezima/group-scene.jpg"
          alt="Night DEZIMAに集まった大企業の新規事業担当者たち"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-6">出島について、話してみませんか。</h2>
          <p className="text-sm text-white/65 leading-relaxed mb-10">
            「うちの事業案は出島向きか」という段階のご相談から承っています。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-white/80 transition-colors"
            >
              相談する →
            </Link>
            <Link
              href="/co-dezima"
              className="px-8 py-3.5 border border-white/40 text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-black transition-colors"
            >
              Co-DEZIMAのスキームを見る
            </Link>
          </div>
          <p className="text-xs text-white/30 mt-10 leading-relaxed">
            同じ立場の新規事業担当者と話したい方には、月次の交流イベント{" "}
            <Link href="/dezima" className="underline underline-offset-4 hover:text-white/70 transition-colors">
              Night DEZIMA
            </Link>{" "}
            もあります。
          </p>
        </div>
      </section>
    </>
  );
}
