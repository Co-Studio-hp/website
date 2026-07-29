// 出島ガイドの説明図。装飾ではなく、本文の主張をそのまま図にしたもの。
// 線と文字は currentColor を使うので、置いた場所の文字色にそのまま追従する
// （明るいセクションでは黒、暗いセクションでは白）。
// 数値を直すときはこのファイルだけ触ればよい。

const FONT =
  '-apple-system, BlinkMacSystemFont, "Hiragino Sans", "Noto Sans JP", sans-serif';

/**
 * 図1｜本体と出島の関係（ヒーロー）
 * 「同じ会社の資産を使いながら、意思決定の層が違う」ことを1枚で示す。
 */
export function DiagramStructure({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 660 420"
      role="img"
      aria-label="大企業の本体と、社外に切り出した出島スタートアップの関係図。本体からは出資・知財・人材が渡り、出島には外部資本も入る。本体では稟議・決裁・ステージゲートの承認層を通るのに対し、出島では代表に決裁権が集約される。"
      className={className}
      style={{ fontFamily: FONT }}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {/* 本体 */}
        <rect x="24" y="70" width="250" height="250" opacity="0.35" />
        {/* 承認の層 */}
        <line x1="54" y1="170" x2="244" y2="170" opacity="0.25" />
        <line x1="54" y1="212" x2="244" y2="212" opacity="0.25" />
        <line x1="54" y1="254" x2="244" y2="254" opacity="0.25" />

        {/* 出島 */}
        <rect x="430" y="120" width="206" height="150" />
        {/* 決裁点 */}
        <circle cx="533" cy="212" r="4" fill="currentColor" stroke="none" />

        {/* 橋（本体 → 出島） */}
        <line x1="274" y1="160" x2="424" y2="160" />
        <path d="M424 160 l-9 -4 v8 z" fill="currentColor" stroke="none" />

        {/* 還流（出島 → 本体） */}
        <line x1="430" y1="238" x2="280" y2="238" opacity="0.4" />
        <path d="M274 238 l9 -4 v8 z" fill="currentColor" stroke="none" opacity="0.4" />

        {/* 外部資本 */}
        <line x1="533" y1="80" x2="533" y2="114" opacity="0.55" />
        <path d="M533 120 l-4 -9 h8 z" fill="currentColor" stroke="none" opacity="0.55" />
      </g>

      <g fill="currentColor" style={{ fontFamily: FONT }}>
        {/* ラベル：本体 */}
        <text x="54" y="106" fontSize="15">本体（既存組織）</text>
        <text x="54" y="128" fontSize="11" opacity="0.55">意思決定は承認の層を通る</text>
        <text x="54" y="164" fontSize="11" opacity="0.55">稟議</text>
        <text x="54" y="206" fontSize="11" opacity="0.55">決裁</text>
        <text x="54" y="248" fontSize="11" opacity="0.55">ステージゲート</text>
        <text x="54" y="292" fontSize="11" opacity="0.4">一周ごとに説明が挟まる</text>

        {/* ラベル：出島 */}
        <text x="458" y="158" fontSize="15">出島（新会社）</text>
        <text x="458" y="182" fontSize="11" opacity="0.55">代表に決裁権を集約</text>
        <text x="458" y="240" fontSize="11" opacity="0.55">即断即決で検証を回す</text>

        {/* ラベル：線 */}
        <text x="290" y="150" fontSize="11" opacity="0.7">出資・知財・人材</text>
        <text x="290" y="258" fontSize="11" opacity="0.45">リターン・学習の還流</text>
        <text x="551" y="86" fontSize="11" opacity="0.6">外部資本</text>

        {/* 注記 */}
        <text x="430" y="300" fontSize="11" opacity="0.4">連結対象外。損失は出資額の範囲に限定</text>
      </g>
    </svg>
  );
}

/**
 * 図2｜用語の位置関係（01 Terms）
 * 表だけでは掴みにくい「入れ子」と「円の外」を可視化する。
 */
export function DiagramTerms({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 660 312"
      role="img"
      aria-label="カーブアウトの中に起業家主導型カーブアウトがあり、その中に出島（Co-DEZIMA）が含まれる入れ子の関係図。円の外にはスピンオフとスピンアウトがあり、出向起業は人の出し方の制度として併用される。"
      className={className}
      style={{ fontFamily: FONT }}
    >
      <g fill="none" stroke="currentColor">
        <rect x="20" y="40" width="420" height="220" rx="4" opacity="0.35" />
        <rect x="48" y="86" width="364" height="150" rx="4" opacity="0.55" />
        <rect x="76" y="132" width="308" height="76" rx="4" />
        {/* 併用の線 */}
        <line x1="230" y1="260" x2="230" y2="276" strokeDasharray="3 3" opacity="0.4" />
      </g>
      <g fill="currentColor">
        <text x="36" y="66" fontSize="12" opacity="0.6">カーブアウト</text>
        <text x="64" y="112" fontSize="12" opacity="0.75">起業家主導型カーブアウト</text>
        <text x="96" y="164" fontSize="16">出島（Co-DEZIMA）</text>
        <text x="96" y="188" fontSize="11" opacity="0.55">外部調達の前に準備期間を確保する型</text>

        {/* 円の外 */}
        <text x="474" y="112" fontSize="12">スピンオフ</text>
        <text x="474" y="132" fontSize="11" opacity="0.5">外部資本を入れない</text>
        <text x="474" y="176" fontSize="12">スピンアウト</text>
        <text x="474" y="196" fontSize="11" opacity="0.5">親会社と資本関係を持たない</text>
        <text x="474" y="66" fontSize="11" opacity="0.4">— 円の外 —</text>

        <text x="230" y="296" fontSize="11" opacity="0.5" textAnchor="middle">出向起業＝人の出し方の制度。出島と併用する</text>
      </g>
    </svg>
  );
}

/**
 * 図3｜学習ループの比較（03 Concept）
 * 「ループを所有する」という主張を、承認が挟まるか否かの差として描く。
 */
export function DiagramLoop({ className = "" }: { className?: string }) {
  // 円周上の4点（仮説・検証・学習・意思決定）
  const pts = (cx: number, cy: number, r: number) =>
    [0, 1, 2, 3].map((i) => {
      const a = (-90 + i * 90) * (Math.PI / 180);
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    });
  const left = pts(170, 168, 78);
  const right = pts(490, 168, 78);

  return (
    <svg
      viewBox="0 0 660 300"
      role="img"
      aria-label="社内で回す学習ループと、出島が所有する学習ループの比較図。社内側はループの各区間に承認と説明が挟まって止まるのに対し、出島側は途切れずに回り続ける。"
      className={className}
      style={{ fontFamily: FONT }}
    >
      {/* 社内：破線＝止まる */}
      <g fill="none" stroke="currentColor">
        <circle cx="170" cy="168" r="78" strokeDasharray="8 10" opacity="0.45" />
        {left.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="currentColor" stroke="none" opacity="0.6" />
        ))}
        {/* 承認の関門 */}
        <line x1="240" y1="140" x2="262" y2="128" opacity="0.5" />
        <line x1="240" y1="196" x2="262" y2="208" opacity="0.5" />
      </g>
      {/* 出島：実線＝回り続ける */}
      <g fill="none" stroke="currentColor">
        <circle cx="490" cy="168" r="78" />
        {right.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="currentColor" stroke="none" />
        ))}
      </g>

      <g fill="currentColor">
        <text x="112" y="44" fontSize="13" opacity="0.6">社内で回す</text>
        <text x="430" y="44" fontSize="13">出島が所有する</text>

        <text x="146" y="78" fontSize="10" opacity="0.55">仮説</text>
        <text x="256" y="172" fontSize="10" opacity="0.55">検証</text>
        <text x="146" y="264" fontSize="10" opacity="0.55">学習</text>
        <text x="82" y="172" fontSize="10" opacity="0.55" textAnchor="end">意思決定</text>

        <text x="466" y="78" fontSize="10" opacity="0.75">仮説</text>
        <text x="576" y="172" fontSize="10" opacity="0.75">検証</text>
        <text x="466" y="264" fontSize="10" opacity="0.75">学習</text>
        <text x="402" y="172" fontSize="10" opacity="0.75" textAnchor="end">意思決定</text>

        <text x="268" y="124" fontSize="10" opacity="0.5">承認</text>
        <text x="268" y="216" fontSize="10" opacity="0.5">説明</text>

        <text x="112" y="292" fontSize="10" opacity="0.4">一周ごとに止まる</text>
        <text x="430" y="292" fontSize="10" opacity="0.6">止まらずに周回数を稼げる</text>
      </g>
    </svg>
  );
}
