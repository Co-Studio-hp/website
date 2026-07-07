"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// ページ内の <section> をスクロールで順にフェードインさせる。
// 初期表示時に画面内にあるセクションは対象外（ヒーローはCSSのスタッガー入場に任せる）。
export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("fx-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    // stagger用CSSを有効化（JS到達済みの印。no-JS環境では初期非表示にならない）
    document.documentElement.classList.add("fx-ready");

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    for (const s of sections) {
      if (s.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
      s.classList.add("fx");
      io.observe(s);
    }

    // カードグリッド等の子要素を時間差で入場させる
    const staggers = Array.from(document.querySelectorAll<HTMLElement>(".fx-stagger"));
    for (const g of staggers) {
      if (g.getBoundingClientRect().top < window.innerHeight * 0.9) {
        g.classList.add("fx-in");
        continue;
      }
      io.observe(g);
    }

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
