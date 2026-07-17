// GA4 Data API から週次データを取得するモジュール

import { BetaAnalyticsDataClient } from '@google-analytics/data';

// GA4側で計測設定済みのキーイベント名
const KEY_EVENTS = ['contact_submit', 'shindan_lead_submit', 'wp_download_submit'];

function buildClient(credentials) {
  return new BetaAnalyticsDataClient({ credentials });
}

async function fetchOrganicSessions(client, propertyId, startDate, endDate) {
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }],
  });
  const rows = response.rows || [];
  const organicRow = rows.find((r) => r.dimensionValues?.[0]?.value === 'Organic Search');
  return Number(organicRow?.metricValues?.[0]?.value ?? 0);
}

async function fetchKeyEventCounts(client, propertyId, startDate, endDate) {
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        inListFilter: { values: KEY_EVENTS },
      },
    },
  });
  const rows = response.rows || [];
  const result = Object.fromEntries(KEY_EVENTS.map((name) => [name, 0]));
  for (const row of rows) {
    const name = row.dimensionValues?.[0]?.value;
    const count = Number(row.metricValues?.[0]?.value ?? 0);
    if (name && name in result) {
      result[name] = count;
    }
  }
  return result;
}

async function fetchTopLandingPages(client, propertyId, startDate, endDate, limit = 5) {
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'landingPage' }],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit,
  });
  const rows = response.rows || [];
  return rows.map((r) => ({
    page: r.dimensionValues?.[0]?.value ?? '(unknown)',
    sessions: Number(r.metricValues?.[0]?.value ?? 0),
  }));
}

function translateGa4Error(err) {
  const message = err?.message || String(err);
  if (err?.code === 7 || /PERMISSION_DENIED/i.test(message)) {
    return new Error(
      'GA4 Data APIへのアクセスが拒否されました（PERMISSION_DENIED）。サービスアカウントのメールアドレスをGA4プロパティの「アカウント管理」＞「プロパティのアクセス管理」に「閲覧者」以上で追加しているか確認してください。'
    );
  }
  if (err?.code === 5 || /NOT_FOUND/i.test(message)) {
    return new Error(
      `GA4プロパティが見つかりません（NOT_FOUND）。GA4_PROPERTY_ID の値（プロパティIDの数字のみ、"properties/"は不要）を確認してください。`
    );
  }
  return new Error(`GA4 Data API呼び出しに失敗しました: ${message}`);
}

/**
 * @param {object} params
 * @param {object} params.credentials サービスアカウント認証情報
 * @param {string} params.propertyId GA4プロパティID（数字のみ）
 * @param {{current: {start: string, end: string}, previous: {start: string, end: string}}} params.dateRanges
 */
export async function getGa4Report({ credentials, propertyId, dateRanges }) {
  const client = buildClient(credentials);

  try {
    const [currentSessions, previousSessions, currentEvents, previousEvents, topLandingPages] = await Promise.all([
      fetchOrganicSessions(client, propertyId, dateRanges.current.start, dateRanges.current.end),
      fetchOrganicSessions(client, propertyId, dateRanges.previous.start, dateRanges.previous.end),
      fetchKeyEventCounts(client, propertyId, dateRanges.current.start, dateRanges.current.end),
      fetchKeyEventCounts(client, propertyId, dateRanges.previous.start, dateRanges.previous.end),
      fetchTopLandingPages(client, propertyId, dateRanges.current.start, dateRanges.current.end),
    ]);

    return {
      organicSessions: { current: currentSessions, previous: previousSessions },
      keyEvents: { current: currentEvents, previous: previousEvents },
      topLandingPages,
    };
  } catch (err) {
    throw translateGa4Error(err);
  }
}

export { KEY_EVENTS };
