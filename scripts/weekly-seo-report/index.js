#!/usr/bin/env node
// Co-Studio HP 週次SEOレポート エントリポイント
// Search Console / GA4 / PageSpeed Insights を取得し、Slackへ1本のレポートとして投稿する。
// 一部のAPI取得に失敗しても、成功したセクションのみで投稿を続行する。

import { getDateRanges } from './dates.js';
import { getGscReport } from './gsc.js';
import { getGa4Report } from './ga4.js';
import { getPsiReport } from './psi.js';
import { postToSlack } from './slack.js';

class ConfigError extends Error {}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new ConfigError(`環境変数 ${name} が設定されていません。README.mdのセットアップ手順を確認してください。`);
  }
  return value;
}

function loadServiceAccountCredentials() {
  const b64 = requireEnv('GOOGLE_SA_KEY_JSON');

  let jsonStr;
  try {
    jsonStr = Buffer.from(b64, 'base64').toString('utf-8');
  } catch {
    throw new ConfigError('GOOGLE_SA_KEY_JSON のBase64デコードに失敗しました。サービスアカウントのJSON鍵ファイル全体をBase64エンコードした値を設定してください。');
  }

  let credentials;
  try {
    credentials = JSON.parse(jsonStr);
  } catch {
    throw new ConfigError('GOOGLE_SA_KEY_JSON のデコード結果が正しいJSONではありません。Base64エンコードの方法を確認してください（例: base64 -i service-account.json | tr -d "\\n"）。');
  }

  if (!credentials.client_email || !credentials.private_key) {
    throw new ConfigError('GOOGLE_SA_KEY_JSON の中身に client_email / private_key が含まれていません。サービスアカウントのJSON鍵ファイル全体を使用しているか確認してください。');
  }

  return credentials;
}

async function runSection(name, fn, sections, errors) {
  try {
    sections[name] = await fn();
  } catch (err) {
    const message = err?.message || String(err);
    errors[name] = message;
    console.error(`[${name}] failed: ${message}`);
  }
}

async function main() {
  // 必須の環境変数を先にすべて検証する（設定不足は投稿前に分かるようにする）
  const webhookUrl = requireEnv('SLACK_HP_WEBHOOK_URL');
  const ga4PropertyId = requireEnv('GA4_PROPERTY_ID');
  const credentials = loadServiceAccountCredentials();

  const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:co-studio.co.jp';
  const psiApiKey = process.env.PSI_API_KEY; // 未設定ならpsi.js側でスキップ

  const dateRanges = getDateRanges();

  const sections = {};
  const errors = {};

  await Promise.all([
    runSection('gsc', () => getGscReport({ credentials, siteUrl, dateRanges: dateRanges.gsc }), sections, errors),
    runSection('ga4', () => getGa4Report({ credentials, propertyId: ga4PropertyId, dateRanges: dateRanges.ga4 }), sections, errors),
    runSection(
      'psi',
      () =>
        getPsiReport({
          apiKey: psiApiKey,
          baseUrl: 'https://www.co-studio.co.jp',
          paths: ['/', '/co-dezima'],
        }),
      sections,
      errors
    ),
  ]);

  if (!sections.gsc && !sections.ga4 && !sections.psi) {
    throw new Error('GSC / GA4 / PSI のすべてのセクション取得に失敗したため、Slackへの投稿を中止しました。上記のエラーログを確認してください。');
  }

  await postToSlack({
    webhookUrl,
    dateRanges,
    gsc: sections.gsc ?? null,
    ga4: sections.ga4 ?? null,
    psi: sections.psi ?? null,
    errors,
  });

  console.log('週次SEOレポートをSlackへ投稿しました。');
}

main().catch((err) => {
  if (err instanceof ConfigError) {
    console.error(`[設定エラー] ${err.message}`);
  } else {
    console.error(`週次SEOレポートの実行に失敗しました: ${err?.message || err}`);
  }
  process.exit(1);
});
