"use client";

import { useState } from "react";

// YouTube埋め込みのファサード（軽量プレースホルダ）。
// 初期表示ではサムネイル画像のみを読み込み、クリック時に初めてiframeを挿入する。
// これによりページロード時のJS/CSS転送（youtube-nocookie.com由来）を回避する。
export default function LiteYouTube({
  videoId,
  title,
  className = "",
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  const [activated, setActivated] = useState(false);

  if (activated) {
    return (
      <iframe
        className={`absolute inset-0 w-full h-full ${className}`}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label={`${title} を再生`}
      className={`absolute inset-0 w-full h-full group cursor-pointer ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 group-hover:bg-white transition-colors shadow-lg"
          style={{ paddingLeft: "4px" }}
        >
          <span
            style={{
              width: 0,
              height: 0,
              borderTop: "12px solid transparent",
              borderBottom: "12px solid transparent",
              borderLeft: "20px solid black",
            }}
          />
        </span>
      </span>
    </button>
  );
}
