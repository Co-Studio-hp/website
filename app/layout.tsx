import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
        <Nav />
        <ScrollFx />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-V7CNMQ8NWV" />
    </html>
  );
}
