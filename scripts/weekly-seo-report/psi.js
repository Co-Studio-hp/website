// PageSpeed Insights API から mobile パフォーマンススコアと Core Web Vitals を取得するモジュール
// PSI_API_KEY が未設定の場合はこのモジュール自体をスキップする（呼び出し元でハンドリング）

const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

async function runPsi(apiKey, url) {
  const params = new URLSearchParams({
    url,
    key: apiKey,
    strategy: 'mobile',
    category: 'performance',
  });

  const res = await fetch(`${PSI_ENDPOINT}?${params.toString()}`);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`PageSpeed Insights APIエラー（HTTP ${res.status}）: ${body.slice(0, 300)}`);
  }
  const data = await res.json();

  const perfScore = data.lighthouseResult?.categories?.performance?.score;
  const audits = data.lighthouseResult?.audits || {};
  const lcp = audits['largest-contentful-paint']?.displayValue ?? null;
  const cls = audits['cumulative-layout-shift']?.displayValue ?? null;
  // INPはLighthouseラボデータに無い場合があるため、CrUXフィールドデータにフォールバックする
  const inpLab = audits['interaction-to-next-paint']?.displayValue;
  const inpFieldMs = data.loadingExperience?.metrics?.INTERACTION_TO_NEXT_PAINT?.percentile;

  return {
    url,
    performanceScore: perfScore != null ? Math.round(perfScore * 100) : null,
    lcp,
    cls,
    inp: inpLab ?? (inpFieldMs != null ? `${inpFieldMs} ms` : null),
  };
}

/**
 * @param {object} params
 * @param {string|undefined} params.apiKey
 * @param {string} params.baseUrl 例: https://www.co-studio.co.jp
 * @param {string[]} params.paths 例: ['/', '/co-dezima']
 */
export async function getPsiReport({ apiKey, baseUrl, paths }) {
  if (!apiKey) {
    return { skipped: true, reason: 'PSI_API_KEY が未設定のため、PageSpeed Insightsの計測をスキップしました。' };
  }

  const results = [];
  const errors = [];

  // PSIはレート制限があるため直列実行する
  for (const path of paths) {
    const url = new URL(path, baseUrl).toString();
    try {
      const result = await runPsi(apiKey, url);
      results.push(result);
    } catch (err) {
      errors.push({ url, message: err?.message || String(err) });
    }
  }

  return { skipped: false, results, errors };
}
