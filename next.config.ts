import type { NextConfig } from "next";

// 旧Wixサイト（co-studio.co.jp）の各URL → 新サイトの対応ページへの恒久リダイレクト。
// ドメイン切替後、古いURLや外部からの被リンクの評価を新ページへ引き継ぐため。
// Next.jsの permanent:true は 308（SEO上は301と同等にGoogleが扱う）。
const legacyRedirects = [
  // favicon.ico を新ロゴアイコンへ（古いブックマーク/クローラ対策）
  { source: "/favicon.ico", destination: "/icon.png", permanent: true },

  // --- ブログ記事（/post/*）: 記事はnoteへ移行済みのため MEDIA ハブへ集約 ---
  { source: "/post/:slug*", destination: "/media", permanent: true },
  { source: "/blog", destination: "/media", permanent: true },
  { source: "/report", destination: "/media", permanent: true },
  { source: "/report-previous", destination: "/media", permanent: true },
  { source: "/column", destination: "/media", permanent: true },
  { source: "/column-report", destination: "/media", permanent: true },
  { source: "/co-project", destination: "/media", permanent: true },
  { source: "/interview", destination: "/media", permanent: true },
  { source: "/media-sglab", destination: "/media", permanent: true },

  // --- 会社情報・代表メッセージ → ABOUT ---
  { source: "/company", destination: "/about", permanent: true },
  { source: "/company-pre", destination: "/about", permanent: true },
  { source: "/message", destination: "/about", permanent: true },
  { source: "/message-pre", destination: "/about", permanent: true },
  { source: "/co-creators", destination: "/about", permanent: true },
  { source: "/co-creators/:slug*", destination: "/about", permanent: true },

  // --- サービス系 → SERVICE ---
  { source: "/service-1", destination: "/service", permanent: true },
  { source: "/service-home", destination: "/service", permanent: true },
  { source: "/solution-previous", destination: "/service", permanent: true },
  { source: "/support-incubation-program", destination: "/service", permanent: true },
  { source: "/method-venture-investment", destination: "/service", permanent: true },
  { source: "/cost-subsidiary-established", destination: "/service", permanent: true },
  { source: "/organization-transformation", destination: "/service", permanent: true },

  // --- コミュニティ・イベント → NIGHT DEZIMA ---
  { source: "/community", destination: "/dezima", permanent: true },
  { source: "/event", destination: "/dezima", permanent: true },

  // --- グループ・ポートフォリオ系 → PORTFOLIO ---
  { source: "/sg-lab", destination: "/portfolio", permanent: true },
  { source: "/socialbrain", destination: "/portfolio", permanent: true },
  // 日本語スラッグは percent-encoded で記述（受信パスはエンコード済みのため）
  { source: "/%E3%83%98%E3%83%AB%E3%82%B9%E3%82%B1%E3%82%A2%E4%BA%8B%E6%A5%AD%E9%83%A8", destination: "/portfolio/hers", permanent: true }, // /ヘルスケア事業部

  // --- News（旧複製ページ）→ /news。
  //   注: Vercelのリダイレクトは大文字小文字を区別しないため、旧 "/News" 用の
  //   ルールは作らない（/news 実ページへの自己ループを防ぐ）。 ---
  { source: "/%E8%A4%87%E8%A3%BD-news", destination: "/news", permanent: true }, // /複製-news

  // --- Home の重複ページ → トップ ---
  { source: "/home", destination: "/", permanent: true },
  { source: "/%E8%A4%87%E8%A3%BD-home", destination: "/", permanent: true }, // /複製-home

  // --- 規約・ポリシー ---
  // 利用規約は新サイトに未設置のため暫定でトップへ
  { source: "/terms-of-use", destination: "/", permanent: true },
  // 旧プライバシーポリシー → 新設の /privacy へ
  { source: "/privacy-policy", destination: "/privacy", permanent: true },
];

const nextConfig: NextConfig = {
  images: {
    // next/image で読み込む外部画像は app/news/page.tsx の PR TIMES OGP画像のみ
    // （lib/og.ts が prtimes.jp の記事から og:image を取得し、実体は PR TIMES の
    // 画像CDNである prcdn.freetls.fastly.net から配信される）。
    // 他ページの外部サムネイル（note等）は <img> タグで表示しておりnext/image対象外。
    remotePatterns: [{ protocol: "https", hostname: "prcdn.freetls.fastly.net" }],
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
