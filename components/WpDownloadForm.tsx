"use client";

import { useState } from "react";

export default function WpDownloadForm() {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/wp-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, name, email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="border border-white/20 p-8 text-center">
        <p className="text-sm text-white/70 mb-6">ありがとうございます。下のボタンから資料をご覧いただけます。</p>
        <a
          href="/wp/dezima-nyumon.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-200 transition-colors"
        >
          出島入門（PDF）を開く →
        </a>
      </div>
    );
  }

  const input =
    "w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/60 transition-colors";

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <input className={input} placeholder="会社名 *" value={company} onChange={(e) => setCompany(e.target.value)} required />
      <input className={input} placeholder="お名前 *" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className={input} type="email" placeholder="メールアドレス *" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 px-8 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "送信中…" : "無料でダウンロード →"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400">送信に失敗しました。時間をおいて再度お試しください。</p>
      )}
      <p className="text-[11px] text-white/30 leading-relaxed">
        ご入力いただいた情報は、資料のご案内およびCo-Studioからのご連絡にのみ使用します。
      </p>
    </form>
  );
}
