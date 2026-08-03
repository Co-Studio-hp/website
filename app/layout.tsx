import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NewsletterBlock from "@/components/NewsletterBlock";
import ScrollFx from "@/components/ScrollFx";

const siteTitle = "Co-Studio株式会社｜大企業と新規事業を共創するオープンスタジオ";
const siteDescription = "共感を軸に拡がるコミュニティの実現。大企業と共にリスクを取り、出島スキームで新規事業を社外に生み出すオープンスタジオ。";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.co-studio.co.jp"),
  title: {
    template: "%s | Co-Studio株式会社",
    default: siteTitle,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Co-Studio株式会社",
    title: siteTitle,
    description: siteDescription,
    url: "https://www.co-studio.co.jp",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        {/*
          Organization構造化データ。記載する事実は正史（会社概要）に準拠し、
          確定していない項目（資本金・従業員数等）は載せない。
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Co-Studio株式会社",
              alternateName: "Co-Studio",
              url: "https://www.co-studio.co.jp",
              logo: "https://www.co-studio.co.jp/icon.png",
              description: siteDescription,
              foundingDate: "2019-12",
              address: {
                "@type": "PostalAddress",
                streetAddress: "日本橋本町3-8-3 日本橋ライフサイエンスビルディング",
                addressLocality: "中央区",
                addressRegion: "東京都",
                addressCountry: "JP",
              },
              sameAs: ["https://note.com/co_studio"],
            }),
          }}
        />
        <Nav />
        <ScrollFx />
        <main className="flex-1 pt-16">{children}</main>
        <NewsletterBlock />
        <Footer />
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-V7CNMQ8NWV" />
    </html>
  );
}
