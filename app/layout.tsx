import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Co-Studio株式会社｜大企業と新規事業を共創するオープンスタジオ",
  description: "共感を軸に拡がるコミュニティの実現。大企業と共にリスクを取り、出島スキームで新規事業を社外に生み出すオープンスタジオ。",
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
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
