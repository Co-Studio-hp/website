// Slack Incoming Webhook へ Block Kit 形式でレポートを投稿するモジュール

function formatNumber(n) {
  if (n == null || Number.isNaN(n)) return '-';
  return Math.round(n).toLocaleString('ja-JP');
}

function formatPosition(p) {
  if (p == null || Number.isNaN(p)) return '-';
  return p.toFixed(1);
}

function formatChange(current, previous) {
  if (previous == null || previous === 0) {
    if (current == null || current === 0) return '±0%';
    return '📈 新規';
  }
  const change = ((current - previous) / previous) * 100;
  if (Math.abs(change) < 0.05) return '±0%';
  const arrow = change > 0 ? '▲' : '▼';
  const sign = change > 0 ? '+' : '';
  return `${arrow} ${sign}${change.toFixed(1)}%`;
}

function section(text) {
  return { type: 'section', text: { type: 'mrkdwn', text } };
}

function divider() {
  return { type: 'divider' };
}

function buildGscBlocks(gsc) {
  if (!gsc) return null;
  const { current, previous, topQueries, topPages } = gsc;

  const summary = [
    `*クリック数*: ${formatNumber(current.clicks)}（前週比 ${formatChange(current.clicks, previous.clicks)}）`,
    `*表示回数*: ${formatNumber(current.impressions)}（前週比 ${formatChange(current.impressions, previous.impressions)}）`,
    `*平均掲載順位*: ${formatPosition(current.position)}（前週 ${formatPosition(previous.position)}）`,
  ].join('\n');

  const queriesText =
    topQueries && topQueries.length > 0
      ? topQueries
          .map((q, i) => `${i + 1}. \`${q.query}\` — クリック ${formatNumber(q.clicks)} / 表示 ${formatNumber(q.impressions)} / 順位 ${formatPosition(q.position)}`)
          .join('\n')
      : '該当データなし';

  const pagesText =
    topPages && topPages.length > 0
      ? topPages
          .map((p, i) => `${i + 1}. ${p.page} — クリック ${formatNumber(p.clicks)}`)
          .join('\n')
      : '該当データなし';

  return [
    section('*🔎 Search Console（直近7日 vs 前週）*\n' + summary),
    section('*上位クエリ（クリック順）*\n' + queriesText),
    section('*上位ページ*\n' + pagesText),
  ];
}

function buildGa4Blocks(ga4) {
  if (!ga4) return null;
  const { organicSessions, keyEvents, topLandingPages } = ga4;

  const summary = `*オーガニック検索セッション数*: ${formatNumber(organicSessions.current)}（前週比 ${formatChange(
    organicSessions.current,
    organicSessions.previous
  )}）`;

  const eventLabels = {
    contact_submit: 'お問い合わせ送信',
    shindan_lead_submit: '診断リード送信',
    wp_download_submit: '資料DL送信',
  };

  const eventsText = Object.keys(keyEvents.current)
    .map((name) => {
      const cur = keyEvents.current[name];
      const prev = keyEvents.previous[name];
      const label = eventLabels[name] || name;
      return `・${label}（\`${name}\`）: ${formatNumber(cur)}（前週比 ${formatChange(cur, prev)}）`;
    })
    .join('\n');

  const landingText =
    topLandingPages && topLandingPages.length > 0
      ? topLandingPages.map((p, i) => `${i + 1}. ${p.page} — セッション ${formatNumber(p.sessions)}`).join('\n')
      : '該当データなし';

  return [
    section('*📊 GA4（直近7日 vs 前週）*\n' + summary),
    section('*キーイベント*\n' + eventsText),
    section('*上位ランディングページ*\n' + landingText),
  ];
}

function buildPsiBlocks(psi) {
  if (!psi) return null;
  if (psi.skipped) {
    return [section(`*⚡ PageSpeed Insights*\n${psi.reason}`)];
  }

  const resultLines = (psi.results || [])
    .map((r) => {
      const scoreLabel = r.performanceScore != null ? `${r.performanceScore}点` : '-';
      return `・${r.url}\n   パフォーマンス: *${scoreLabel}* / LCP: ${r.lcp ?? '-'} / CLS: ${r.cls ?? '-'} / INP: ${r.inp ?? '-'}`;
    })
    .join('\n');

  const errorLines = (psi.errors || []).map((e) => `⚠️ ${e.url}: ${e.message}`).join('\n');

  const text = [resultLines || '該当データなし', errorLines].filter(Boolean).join('\n');

  return [section('*⚡ PageSpeed Insights（mobile）*\n' + text)];
}

function buildErrorBlocks(errors) {
  const entries = Object.entries(errors || {});
  if (entries.length === 0) return null;

  const labels = { gsc: 'Search Console', ga4: 'GA4', psi: 'PageSpeed Insights' };
  const text = entries.map(([key, message]) => `⚠️ *${labels[key] || key}*: ${message}`).join('\n');

  return [section('*取得に失敗したセクション*\n' + text)];
}

/**
 * @param {object} params
 * @param {string} params.webhookUrl
 * @param {object|null} params.gsc getGscReport() の戻り値
 * @param {object|null} params.ga4 getGa4Report() の戻り値
 * @param {object|null} params.psi getPsiReport() の戻り値
 * @param {Record<string,string>} params.errors セクションごとのエラーメッセージ
 * @param {object} params.dateRanges dates.getDateRanges() の戻り値
 */
export async function postToSlack({ webhookUrl, gsc, ga4, psi, errors = {}, dateRanges }) {
  const blocks = [
    {
      type: 'header',
      text: { type: 'plain_text', text: '📈 HP週次SEOレポート', emoji: true },
    },
    // チャンネル全員に通知（HP問い合わせ通知と同じチャンネルに配信される想定）
    section('<!channel> 今週のHPレポートです'),
  ];

  if (dateRanges?.gsc?.current) {
    blocks.push(
      section(`対象期間（GSC）: ${dateRanges.gsc.current.start} 〜 ${dateRanges.gsc.current.end}`)
    );
  }

  blocks.push(divider());

  const gscBlocks = buildGscBlocks(gsc);
  if (gscBlocks) {
    blocks.push(...gscBlocks, divider());
  }

  const ga4Blocks = buildGa4Blocks(ga4);
  if (ga4Blocks) {
    blocks.push(...ga4Blocks, divider());
  }

  const psiBlocks = buildPsiBlocks(psi);
  if (psiBlocks) {
    blocks.push(...psiBlocks, divider());
  }

  const errorBlocks = buildErrorBlocks(errors);
  if (errorBlocks) {
    blocks.push(...errorBlocks);
  }

  const payload = {
    text: '📈 HP週次SEOレポート',
    blocks,
  };

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Slackへの投稿に失敗しました（HTTP ${res.status}）: ${body.slice(0, 300)}`);
  }
}
