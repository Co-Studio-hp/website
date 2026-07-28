#!/usr/bin/env node
// Co-Studio HP スポット監査スクリプト（1回実行用）
// 過去90日・28日のページ別データを GA4 / Search Console から取得し、
// audit-result.json として出力する。ページ棚卸し（残す/直す/取り下げ）の判断材料に使う。
//
// 必要な環境変数は weekly-seo-report と同じ:
//   GOOGLE_SA_KEY_JSON (base64) / GA4_PROPERTY_ID / GSC_SITE_URL(任意)

import { writeFileSync } from 'node:fs';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { google } from 'googleapis';

const KEY_EVENTS = ['contact_submit', 'shindan_lead_submit', 'wp_download_submit'];

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`環境変数 ${name} が設定されていません。`);
    process.exit(1);
  }
  return value;
}

function loadCredentials() {
  const b64 = requireEnv('GOOGLE_SA_KEY_JSON');
  const credentials = JSON.parse(Buffer.from(b64, 'base64').toString('utf-8'));
  if (!credentials.client_email || !credentials.private_key) {
    console.error('GOOGLE_SA_KEY_JSON に client_email / private_key がありません。');
    process.exit(1);
  }
  return credentials;
}

function fmt(d) {
  return d.toISOString().slice(0, 10);
}

// GSCのデータ反映遅延を考慮し、終端は3日前にする
function buildRanges() {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3);
  const start90 = new Date(end);
  start90.setUTCDate(start90.getUTCDate() - 89);
  const start28 = new Date(end);
  start28.setUTCDate(start28.getUTCDate() - 27);
  return {
    d90: { start: fmt(start90), end: fmt(end) },
    d28: { start: fmt(start28), end: fmt(end) },
  };
}

// ---- GA4 ----

async function ga4PagesReport(client, propertyId, range) {
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: range.start, endDate: range.end }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [
      { name: 'screenPageViews' },
      { name: 'sessions' },
      { name: 'activeUsers' },
      { name: 'userEngagementDuration' },
    ],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 250,
  });
  return (response.rows || []).map((r) => ({
    page: r.dimensionValues?.[0]?.value ?? '(unknown)',
    views: Number(r.metricValues?.[0]?.value ?? 0),
    sessions: Number(r.metricValues?.[1]?.value ?? 0),
    users: Number(r.metricValues?.[2]?.value ?? 0),
    engagementSeconds: Number(r.metricValues?.[3]?.value ?? 0),
  }));
}

async function ga4KeyEventsByPage(client, propertyId, range) {
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: range.start, endDate: range.end }],
    dimensions: [{ name: 'pagePath' }, { name: 'eventName' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: { fieldName: 'eventName', inListFilter: { values: KEY_EVENTS } },
    },
    limit: 500,
  });
  return (response.rows || []).map((r) => ({
    page: r.dimensionValues?.[0]?.value ?? '(unknown)',
    event: r.dimensionValues?.[1]?.value ?? '(unknown)',
    count: Number(r.metricValues?.[0]?.value ?? 0),
  }));
}

async function ga4ChannelsByLandingPage(client, propertyId, range) {
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: range.start, endDate: range.end }],
    dimensions: [{ name: 'landingPage' }, { name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 500,
  });
  return (response.rows || []).map((r) => ({
    page: r.dimensionValues?.[0]?.value ?? '(unknown)',
    channel: r.dimensionValues?.[1]?.value ?? '(unknown)',
    sessions: Number(r.metricValues?.[0]?.value ?? 0),
  }));
}

// ---- Search Console ----

async function gscPages(searchconsole, siteUrl, range) {
  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate: range.start, endDate: range.end, dimensions: ['page'], rowLimit: 1000 },
  });
  return (res.data.rows || []).map((r) => ({
    page: r.keys?.[0] ?? '(unknown)',
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  }));
}

async function gscQueries(searchconsole, siteUrl, range) {
  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate: range.start, endDate: range.end, dimensions: ['query'], rowLimit: 1000 },
  });
  return (res.data.rows || []).map((r) => ({
    query: r.keys?.[0] ?? '(unknown)',
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  }));
}

async function gscPageQueries(searchconsole, siteUrl, range) {
  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: range.start,
      endDate: range.end,
      dimensions: ['page', 'query'],
      rowLimit: 5000,
    },
  });
  const byPage = {};
  for (const r of res.data.rows || []) {
    const page = r.keys?.[0] ?? '(unknown)';
    (byPage[page] ||= []).push({
      query: r.keys?.[1] ?? '(unknown)',
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      position: r.position ?? 0,
    });
  }
  for (const page of Object.keys(byPage)) {
    byPage[page] = byPage[page]
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 10);
  }
  return byPage;
}

async function main() {
  const credentials = loadCredentials();
  const propertyId = requireEnv('GA4_PROPERTY_ID');
  const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:co-studio.co.jp';
  const ranges = buildRanges();

  const ga4Client = new BetaAnalyticsDataClient({ credentials });
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const result = { generatedAt: new Date().toISOString(), ranges, ga4: {}, gsc: {}, errors: {} };

  const tasks = [
    ['ga4.pages90', async () => (result.ga4.pages90 = await ga4PagesReport(ga4Client, propertyId, ranges.d90))],
    ['ga4.pages28', async () => (result.ga4.pages28 = await ga4PagesReport(ga4Client, propertyId, ranges.d28))],
    ['ga4.keyEventsByPage90', async () => (result.ga4.keyEventsByPage90 = await ga4KeyEventsByPage(ga4Client, propertyId, ranges.d90))],
    ['ga4.channelsByLandingPage90', async () => (result.ga4.channelsByLandingPage90 = await ga4ChannelsByLandingPage(ga4Client, propertyId, ranges.d90))],
    ['gsc.pages90', async () => (result.gsc.pages90 = await gscPages(searchconsole, siteUrl, ranges.d90))],
    ['gsc.pages28', async () => (result.gsc.pages28 = await gscPages(searchconsole, siteUrl, ranges.d28))],
    ['gsc.queries90', async () => (result.gsc.queries90 = await gscQueries(searchconsole, siteUrl, ranges.d90))],
    ['gsc.pageQueries90', async () => (result.gsc.pageQueries90 = await gscPageQueries(searchconsole, siteUrl, ranges.d90))],
  ];

  for (const [name, fn] of tasks) {
    try {
      await fn();
      console.error(`[ok] ${name}`);
    } catch (err) {
      result.errors[name] = err?.message || String(err);
      console.error(`[fail] ${name}: ${result.errors[name]}`);
    }
  }

  writeFileSync('audit-result.json', JSON.stringify(result, null, 2));
  console.error('audit-result.json written');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
