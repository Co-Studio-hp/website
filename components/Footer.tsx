import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 mt-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <p className="text-sm font-medium tracking-widest uppercase mb-1">Co-Studio株式会社</p>
          <p className="text-xs text-gray-400">東京都中央区日本橋本町3丁目8-3 日本橋ライフサイエンスビルディング</p>
        </div>
        <nav className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-6">
          {[
            { label: "HOME", href: "/" },
            { label: "SERVICE", href: "/service" },
            { label: "支援実績", href: "/results" },
            { label: "PORTFOLIO", href: "/portfolio" },
            { label: "NIGHT DEZIMA", href: "/dezima" },
            { label: "セルフ診断", href: "/shindan" },
            { label: "NEWS", href: "/news" },
            { label: "MEDIA", href: "/media" },
            { label: "ABOUT US", href: "/about" },
            { label: "CONTACT", href: "/contact" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-xs tracking-widest uppercase text-gray-400 hover:text-black transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
        <p className="text-xs text-gray-300">© 2019-{new Date().getFullYear()} Co-Studio Inc. All Rights Reserved.</p>
        <Link href="/privacy" className="text-xs text-gray-400 hover:text-black transition-colors">
          プライバシーポリシー
        </Link>
      </div>
    </footer>
  );
}
