# Co-Studio コーポレートサイト

Co-Studio株式会社の公式HP（[co-studio.co.jp](https://www.co-studio.co.jp)）。Next.js 16 + Tailwind v4 で構築し、Vercel でホスティングしています。

- **本番URL**: https://co-studio.co.jp （切替後）/ https://co-studio-hp-v2.vercel.app
- **リポジトリ**: Co-Studio-hp/website
- **ホスティング**: Vercel（プロジェクト名 `co-studio-hp-v2`）

## 更新方法（保守運用ガイド）

### 1. 記事・ニュースは「自動」— コード不要
- **MEDIA**ページ … note（[note.com/co_studio](https://note.com/co_studio)）に投稿すると自動反映（RSS連携）
- **NEWS**ページ … 各社のPR TIMESリリースを自動集約・表示
- **Night DEZIMA**ページ … noteのDEZIMA記事バナーを自動表示

→ 日常の情報発信は **note と PR TIMES に出すだけ** でサイトに反映されます。

### 2. 文言・デザインの修正 — コードを編集
このリポジトリにアクセス権のあるメンバーなら誰でも更新できます。

**かんたんな文言修正（GitHubブラウザ上で完結）**
1. GitHubでこのリポジトリを開く
2. 該当ファイル（例：`app/page.tsx`）を開いて鉛筆アイコンで編集
3. 「Commit changes」で保存 → **Vercelが自動でビルド＆公開**

**本格的な編集（ローカル）**
```bash
git clone https://github.com/Co-Studio-hp/website.git
cd website
npm install
npm run dev      # http://localhost:3000 で確認
# 編集後：
git add -A && git commit -m "変更内容" && git push
# push すると Vercel が自動デプロイ
```

### 3. 主要ページの場所
| ページ | ファイル |
|---|---|
| トップ | `app/page.tsx` |
| サービス | `app/service/page.tsx` |
| 実績 | `app/results/page.tsx` |
| ポートフォリオ | `app/portfolio/` |
| Night DEZIMA | `app/dezima/page.tsx` |
| NEWS | `app/news/page.tsx` |
| MEDIA | `app/media/page.tsx` |
| ABOUT | `app/about/page.tsx` |
| お問い合わせ | `app/contact/` |
| 旧URLの転送設定 | `next.config.ts` |

### 4. 環境変数（Vercel側で管理）
- `SLACK_CONTACT_WEBHOOK_URL` … お問い合わせフォーム→Slack通知用。Vercelプロジェクトの Settings → Environment Variables で管理（コードには含めない）。

## 技術スタック
Next.js 16 (App Router) / React 19 / Tailwind CSS v4 / TypeScript
