// 週次レポート用の日付レンジ計算ユーティリティ
// GSC/GA4はデータ反映のラグが異なるため、それぞれ別オフセットで「直近7日」を定義する。

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function addDays(date, days) {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

/**
 * @param {number} endOffsetDays 「今日」から何日前を期間の終端とするか
 * @returns {{current: {start: string, end: string}, previous: {start: string, end: string}}}
 */
function buildRanges(endOffsetDays) {
  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  const currentEnd = addDays(todayUTC, -endOffsetDays);
  const currentStart = addDays(currentEnd, -6);
  const previousEnd = addDays(currentStart, -1);
  const previousStart = addDays(previousEnd, -6);

  return {
    current: { start: formatDate(currentStart), end: formatDate(currentEnd) },
    previous: { start: formatDate(previousStart), end: formatDate(previousEnd) },
  };
}

export function getDateRanges() {
  return {
    // Search Consoleはデータ反映に2〜3日のラグがあるため、直近3日を除いた7日間を対象にする
    gsc: buildRanges(3),
    // GA4は前日までのデータが利用可能
    ga4: buildRanges(1),
  };
}
