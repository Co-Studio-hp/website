// Google Search Console（Search Analytics API）から週次データを取得するモジュール

import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

function buildAuth(credentials) {
  return new google.auth.GoogleAuth({ credentials, scopes: SCOPES });
}

async function fetchTotals(searchconsole, siteUrl, startDate, endDate) {
  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate, endDate, dimensions: [] },
  });
  const row = (res.data.rows || [])[0];
  return {
    clicks: row?.clicks ?? 0,
    impressions: row?.impressions ?? 0,
    position: row?.position ?? 0,
  };
}

async function fetchTopQueries(searchconsole, siteUrl, startDate, endDate, limit = 10) {
  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate, endDate, dimensions: ['query'], rowLimit: 1000 },
  });
  const rows = res.data.rows || [];
  return rows
    .slice()
    .sort((a, b) => (b.clicks ?? 0) - (a.clicks ?? 0))
    .slice(0, limit)
    .map((r) => ({
      query: r.keys?.[0] ?? '(unknown)',
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      position: r.position ?? 0,
    }));
}

async function fetchTopPages(searchconsole, siteUrl, startDate, endDate, limit = 5) {
  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate, endDate, dimensions: ['page'], rowLimit: 1000 },
  });
  const rows = res.data.rows || [];
  return rows
    .slice()
    .sort((a, b) => (b.clicks ?? 0) - (a.clicks ?? 0))
    .slice(0, limit)
    .map((r) => ({
      page: r.keys?.[0] ?? '(unknown)',
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      position: r.position ?? 0,
    }));
}

function translateGscError(err) {
  const status = err?.code ?? err?.response?.status;
  if (status === 403) {
    return new Error(
      'Search Console APIへのアクセスが拒否されました（403）。サービスアカウントのメールアドレスをSearch Consoleのプロパティに「フル」権限で追加しているか確認してください。'
    );
  }
  if (status === 404) {
    return new Error(
      'Search Consoleにプロパティが見つかりません（404）。GSC_SITE_URL（未設定時は sc-domain:co-studio.co.jp）がSearch Console上のプロパティ表記と一致しているか確認してください。'
    );
  }
  return new Error(`Search Console API呼び出しに失敗しました: ${err?.message || err}`);
}

/**
 * @param {object} params
 * @param {object} params.credentials サービスアカウント認証情報
 * @param {string} params.siteUrl 例: sc-domain:co-studio.co.jp
 * @param {{current: {start: string, end: string}, previous: {start: string, end: string}}} params.dateRanges
 */
export async function getGscReport({ credentials, siteUrl, dateRanges }) {
  const auth = buildAuth(credentials);
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  try {
    const [currentTotals, previousTotals, topQueries, topPages] = await Promise.all([
      fetchTotals(searchconsole, siteUrl, dateRanges.current.start, dateRanges.current.end),
      fetchTotals(searchconsole, siteUrl, dateRanges.previous.start, dateRanges.previous.end),
      fetchTopQueries(searchconsole, siteUrl, dateRanges.current.start, dateRanges.current.end),
      fetchTopPages(searchconsole, siteUrl, dateRanges.current.start, dateRanges.current.end),
    ]);

    return {
      siteUrl,
      current: currentTotals,
      previous: previousTotals,
      topQueries,
      topPages,
    };
  } catch (err) {
    throw translateGscError(err);
  }
}
