# 日次ヘルスチェック

`Uptime Check`（15分ごと）は**トップページが200を返すか**しか見ていない。
そのため「200は返るが中身が壊れている」不具合を拾えない。

実際に2026-07-29、`/news` の全リリース一覧（約24,000px）が `opacity:0` のまま
表示されない状態で本番に放置されていた。Uptime Checkは正常と判定し続けていた。

このスクリプトは実ブラウザ（Playwright）でページを開き、次を確認する。

| # | 確認すること | 拾える不具合の例 |
|---|---|---|
| 1 | ページが200で開けるか | ページ消失 |
| 2 | スクロール後も `opacity:0` のセクションが残っていないか | **/news の不可視バグの再発** |
| 3 | 各ページに「あるはずの文言」が見えているか | 表示崩れ・データ取得失敗 |
| 4 | 内部リンクが404になっていないか | リンク切れ |
| 5 | `/api/newsletter` が503を返していないか | **再デプロイで環境変数が消えた** |

異常があったときだけSlackに通知する。

## 実行

GitHub Actions（`.github/workflows/health-check.yml`）から**毎日8:00 JST**に自動実行。
Actionsタブから手動実行も可能。

ローカル：

```sh
cd scripts/health-check
npm ci
npx playwright install --with-deps chromium
SLACK_HP_WEBHOOK_URL="..." node check.mjs
```

`BASE_URL` を指定すればプレビュー環境にも向けられる。
