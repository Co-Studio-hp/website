"use client";

export default function ClearbitLogo({ domain, name }: { domain: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-1 min-h-[2rem]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={name}
        className="h-7 w-auto max-w-[80px] object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = "none";
          const next = el.nextElementSibling as HTMLElement | null;
          if (next) next.style.display = "block";
        }}
      />
      <span className="text-xs text-gray-400 hidden text-center leading-tight" style={{ fontSize: "10px" }}>{name}</span>
    </div>
  );
}
