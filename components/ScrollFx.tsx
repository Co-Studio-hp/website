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
      // threshold は割合ではなく 0 を使う。
      // 割合（旧: 0.08）だと、ビューポートより大幅に高いセクションが
      // 「8%以上見えている」状態に永久に到達できず、opacity:0 のまま表示されない。
      // 実際に /news の全リリース一覧（約24,000px）がこれで丸ごと不可視になっていた。
      // 少しスクロールしてから入場させたい意図は rootMargin の下マージンで担保する。
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
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
