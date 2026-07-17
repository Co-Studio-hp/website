"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "HOME", href: "/" },
  { label: "SERVICE", href: "/service", children: [
    { label: "サービス概要", href: "/service" },
    { label: "Co-DEZIMA（出島）", href: "/co-dezima" },
    { label: "支援実績", href: "/results" },
  ]},
  { label: "PORTFOLIO", href: "/portfolio", children: [
    { label: "ポートフォリオ一覧", href: "/portfolio" },
    { label: "do.Sukasu", href: "/portfolio/do-sukasu" },
    { label: "Aikomi", href: "/portfolio/aikomi" },
    { label: "Hers HeAlth", href: "/portfolio/hers" },
  ]},
  { label: "NIGHT DEZIMA", href: "/dezima" },
  { label: "セルフ診断", href: "/shindan" },
  { label: "NEWS", href: "/news" },
  { label: "MEDIA", href: "/media" },
  { label: "ABOUT US", href: "/about" },
  { label: "RECRUIT", href: "/recruit" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 下スクロールで隠れ、上スクロールですぐ戻る（読むときは消え、探すときは現れる）
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > 160 && y > last && !open);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-black/10 transition-all duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"} ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.06)]" : ""}`}
      style={{background:"#F5F3EE"}}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image src="/costudio-logo.png" alt="Co STUDIO" width={120} height={24} className="h-6 w-auto object-contain" preload />
        </Link>
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {links.map((l) => (
            <div key={l.href} className="relative"
              onMouseEnter={() => l.children && setHover(l.href)}
              onMouseLeave={() => setHover(null)}
            >
              <Link href={l.href} className={`text-xs tracking-widest uppercase transition-opacity whitespace-nowrap ${pathname === l.href || pathname.startsWith(l.href + "/") ? "opacity-100 border-b border-black pb-0.5" : "opacity-40 hover:opacity-100"}`}>
                {l.label}
              </Link>
              {l.children && hover === l.href && (
                <div className="absolute top-full left-0 pt-2 min-w-40 z-50">
                  <div className="border border-black/10 shadow-lg py-2" style={{background:"#F5F3EE"}}>
                    {l.children.map((c) => (
                      <Link key={c.href} href={c.href} className="block px-4 py-2.5 text-xs text-gray-500 hover:text-black whitespace-nowrap">{c.label}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="ml-2 px-5 py-2 bg-black text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-800 transition-colors whitespace-nowrap">
            相談する
          </Link>
        </nav>
        <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)}>
          <span className={`block w-6 h-px bg-black transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-black transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-black transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-black/10 px-6 py-6 flex flex-col gap-4" style={{background:"#F5F3EE"}}>
          {links.map((l) => (
            <div key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="block text-sm tracking-widest uppercase opacity-70 hover:opacity-100 mb-1">{l.label}</Link>
              {l.children && <div className="pl-4 flex flex-col gap-2 mt-1">{l.children.map((c) => (<Link key={c.href} href={c.href} onClick={() => setOpen(false)} className="text-xs text-gray-400 hover:text-black">{c.label}</Link>))}</div>}
            </div>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 px-5 py-3 bg-black text-white text-sm tracking-[0.2em] uppercase font-medium text-center">
            相談する
          </Link>
        </nav>
      )}
    </header>
  );
}
