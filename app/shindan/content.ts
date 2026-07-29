// 診断の設問・判定文の単一ソース。
// クライアント側の診断UI（ShindanForm）と、サーバー側の静的解説セクション（page.tsx）の両方が参照する。
// 設問の文言・配点は確定コピー。変更禁止。

export type Category = "theme" | "person" | "money" | "sponsor" | "ops";

export type Question = {
  id: string;
  cat: Category;
  catLabel: string;
  weighted?: boolean;
  text: string;
  options: { label: string; points: number }[];
};

export const QUESTIONS: Question[] = [
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

export const VERDICT_CONTENT = {
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
    sub: { label: "出島ガイドを読む", href: "/co-dezima/guide" },

  },
  C: {
    badge: "まずは情報収集から",
    body:
      "いま無理に外へ出す段階ではありません。まずは「出島とはどんな選択肢か」を知るところから。出島ガイドと、月次イベント「ナイトDEZIMA」をご案内します。",
    primary: { label: "出島ガイドを読む", kind: "link" as const, href: "/co-dezima/guide" },
    sub: { label: "イベント案内を受け取る", href: "#lead-form" },

  },
};
