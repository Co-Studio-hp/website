# Weekly SEO Report

Co-Studio HP（https://www.co-studio.co.jp）の週次SEOレポートを自動生成し、Slackへ投稿するスクリプトです。
Google Search Console / GA4 / PageSpeed Insights の3つのAPIからデータを取得し、Block Kit形式で1本のメッセージにまとめます。

GitHub Actions（`.github/workflows/weekly-seo-report.yml`）から毎週月曜9:00 JSTに自動実行されます。

## 構成

| ファイル | 役割 |
|---|---|
| `index.js` | エントリポイント。各モジュールを呼び出し、Slackへ投稿する |
| `dates.js` | 「直近7日 / 前週7日」の日付レンジを計算する |
| `gsc.js` | Search Console API（`searchanalytics.query`）からデータを取得する |
| `ga4.js` | GA4 Data API（`runReport`）からデータを取得する |
| `psi.js` | PageSpeed Insights APIからmobileパフォーマンスを取得する（任意） |
| `slack.js` | 取得結果をBlock Kit形式に整形し、Incoming Webhookへ投稿する |

いずれかのAPI取得に失敗しても、他のセクションの取得・投稿は続行されます（失敗したセクションはエラー概要として表示されます）。

## 事前準備: GCPサービスアカウントの作成と権限付与

1. **GCPプロジェクトを用意し、サービスアカウントを作成する**
   - GCP Console → 「IAMと管理」→「サービスアカウント」→「作成」
   - 用途がわかる名前を付ける（例: `hp-weekly-seo-report`）
2. **JSON鍵を発行する**
   - 作成したサービスアカウント →「鍵」タブ →「鍵を追加」→「新しい鍵を作成」→ JSON形式でダウンロード
   - このJSONファイルの中身がそのままSecretの値になります。**絶対にリポジトリにコミットしない**
3. **APIを有効化する**
   - GCPプロジェクトで以下を有効化: `Google Search Console API`, `Google Analytics Data API`
   - PSIを使う場合は `PageSpeed Insights API` も有効化（こちらはAPIキー方式、後述）
4. **Search Consoleへの権限付与**
   - Search Console（https://search.google.com/search-console）→ 対象プロパティ →「設定」→「ユーザーと権限」
   - サービスアカウントのメールアドレス（`xxxx@xxxx.iam.gserviceaccount.com`）を「フル」権限で追加
5. **GA4への権限付与**
   - GA4管理画面 →「アカウント管理」または「プロパティ設定」→「アクセス管理」
   - サービスアカウントのメールアドレスを「閲覧者」以上の権限で追加
6. **PageSpeed Insights APIキーを発行する（任意）**
   - GCP Console →「APIとサービス」→「認証情報」→「APIキーを作成」
   - 作成したキーを `PSI_API_KEY` に流量制限をかけて使う（未設定ならPSIセクションはスキップされる）

## GitHub Secretsへの登録

リポジトリの Settings → Secrets and variables → Actions に以下を登録してください。

| Secret名 | 値 |
|---|---|
| `GOOGLE_SA_KEY_JSON` | 上記でダウンロードしたサービスアカウントJSON鍵ファイルを **Base64エンコードした文字列**（下記コマンド参照） |
| `GA4_PROPERTY_ID` | GA4のプロパティID（数字のみ。「プロパティ設定」で確認できる） |
| `PSI_API_KEY` | PageSpeed Insights APIキー（任意。未設定ならPSIセクションをスキップ） |
| `SLACK_HP_WEBHOOK_URL` | 投稿先SlackチャンネルのIncoming Webhook URL |

JSON鍵をBase64エンコードするコマンド例:

```sh
base64 -i service-account.json | tr -d '\n' | pbcopy
```

（`pbcopy` はmacOS用。クリップボードへコピーされるのでそのままSecretへ貼り付ける）

### 任意の環境変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `GSC_SITE_URL` | `sc-domain:co-studio.co.jp` | Search Console側のプロパティ表記に合わせて変更可能 |

## ローカルでの実行方法

1. 依存関係をインストール

   ```sh
   cd scripts/weekly-seo-report
   npm ci
   ```

2. `.env` ファイルを作成（**このファイルはコミットしない**。`.gitignore`済み）

   ```sh
   # scripts/weekly-seo-report/.env
   export GOOGLE_SA_KEY_JSON="<base64エンコードしたサービスアカウントJSON>"
   export GA4_PROPERTY_ID="123456789"
   export PSI_API_KEY="<PSI用APIキー（任意）>"
   export SLACK_HP_WEBHOOK_URL="<Slack Incoming Webhook URL>"
   ```

3. 環境変数を読み込んで実行（dotenvパッケージは使わず、シェルの`source`で読み込む）

   ```sh
   source .env && node index.js
   ```

必須の環境変数が未設定の場合は、クラッシュではなく「どの変数が足りないか」を示すエラーメッセージを表示して終了します。

## GitHub Actionsでの手動実行

Actions タブ →「Weekly SEO Report」→「Run workflow」から手動トリガー可能です（`workflow_dispatch`）。
