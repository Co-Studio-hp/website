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
  const filtered = filter === "ALL" ? releases : releases.filter((r) => r.company === filter);

  return (
    <div>
      {/* フィルタ */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter("ALL")}
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
              onClick={() => setFilter(c.name)}
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
        {filtered.map((r) => (
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
    </div>
  );
}
