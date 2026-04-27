"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "HOME", href: "/" },
  { label: "SERVICE", href: "/service" },
  { label: "ABOUT US", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-lg font-light tracking-widest uppercase">
            Co
            <span className="inline-block mx-2 text-xs leading-none align-middle">
              <span className="block w-5 h-px bg-black mb-0.5" />
              <span className="block w-5 h-px bg-black" />
            </span>
            STUDIO
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-xs tracking-widest uppercase transition-opacity ${
                pathname === l.href ? "opacity-100 border-b border-black pb-0.5" : "opacity-50 hover:opacity-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
        >
          <span className={`block w-6 h-px bg-black transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-black transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-black transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-widest uppercase opacity-70 hover:opacity-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
