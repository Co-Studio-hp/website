"use client";

import { useState } from "react";
import type { PrRelease } from "@/lib/prtimes";

export default function NewsList({
  releases,
  companies,
}: {
  releases: PrRelease[];
  companies: { name: string; color: string }[];
}) {
  const [filter, setFilter] = useState<string>("ALL");
  // 全件（約370件）を一度に描画するとページが3万px近くなりフッターまで辿り着けないため、
  // 初期は50件だけ出して「もっと見る」で追加する。
  const PAGE_SIZE = 50;
  const [shown, setShown] = useState(PAGE_SIZE);
  const filtered = filter === "ALL" ? releases : releases.filter((r) => r.company === filter);

  return (
    <div>
      {/* フィルタ */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => { setFilter("ALL"); setShown(PAGE_SIZE); }}
          className={`text-xs px-3 py-1.5 border transition-colors ${
            filter === "ALL" ? "bg-black text-white border-black" : "border-gray-200 text-gray-500 hover:border-black"
          }`}
        >
          すべて（{releases.length}）
        </button>
        {companies.map((c) => {
          const count = releases.filter((r) => r.company === c.name).length;
          if (count === 0) return null;
          return (
            <button
              key={c.name}
              onClick={() => { setFilter(c.name); setShown(PAGE_SIZE); }}
              className={`text-xs px-3 py-1.5 border transition-colors ${
                filter === c.name ? "bg-black text-white border-black" : "border-gray-200 text-gray-500 hover:border-black"
              }`}
            >
              {c.name}（{count}）
            </button>
          );
        })}
      </div>

      {/* 一覧 */}
      <div className="space-y-0">
        {filtered.slice(0, shown).map((r) => (
          <a
            key={r.url}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 md:gap-5 items-start py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group px-3 -mx-3"
          >
            <span className="text-xs text-gray-400 shrink-0 w-20 pt-0.5 tabular-nums">{r.date}</span>
            <span className={`text-xs px-2 py-0.5 font-medium shrink-0 ${r.color}`}>{r.company}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 group-hover:text-black transition-colors leading-relaxed">{r.title}</p>
              {r.excerpt && (
                <p className="text-xs text-gray-400 leading-relaxed mt-1 line-clamp-2">{r.excerpt}</p>
              )}
            </div>
            <span className="text-xs text-gray-300 group-hover:text-black transition-colors shrink-0 hidden md:block">→</span>
          </a>
        ))}
      </div>

      {filtered.length > shown && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShown((n) => n + PAGE_SIZE)}
            className="px-8 py-3.5 border border-gray-300 text-xs tracking-[0.2em] uppercase font-medium hover:border-black hover:bg-white transition-colors"
          >
            もっと見る（残り{filtered.length - shown}件）
          </button>
          <p className="text-xs text-gray-500 mt-3 tabular-nums">
            {shown} / {filtered.length} 件を表示中
          </p>
        </div>
      )}
    </div>
  );
}
