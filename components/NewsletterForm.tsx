"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { sendGAEvent } from "@next/third-parties/google";

type Status = "idle" | "sending" | "done" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent,
          pageUri: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      track("newsletter_submit");
      sendGAEvent("event", "newsletter_submit", {});
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-gray-300 bg-white p-6 md:p-7">
        <p className="text-sm font-medium mb-2">ご登録ありがとうございます。</p>
        <p className="text-xs text-gray-600 leading-relaxed">
          次回の配信からお届けします。配信はいつでも停止できます。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-gray-300 bg-white p-6 md:p-7">
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <label htmlFor="newsletter-email" className="sr-only">
          メールアドレス
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          autoComplete="email"
          className="flex-1 border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
        />
        <button
          type="submit"
          disabled={status === "sending" || !consent}
          className="px-8 py-3 bg-black text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === "sending" ? "送信中…" : "登録する →"}
        </button>
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 shrink-0 accent-black"
        />
        <span className="text-xs text-gray-600 leading-relaxed">
          イベント案内・活動報告メールの配信に同意します。配信はいつでも停止できます。
          <Link href="/privacy" className="underline underline-offset-2 hover:text-black transition-colors ml-1">
            プライバシーポリシー
          </Link>
        </span>
      </label>

      {status === "error" && (
        <p className="text-xs text-red-700 mt-3">
          送信に失敗しました。時間をおいて再度お試しください。
        </p>
      )}
    </form>
  );
}
