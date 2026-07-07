"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { sendGAEvent } from "@next/third-parties/google";

type Status = "idle" | "sending" | "success" | "error";

// 問い合わせの入口を種別で取り、Slack通知とGA4イベントに載せる
export const CONTACT_CATEGORIES = [
  "新規事業・出島のご相談",
  "サービスについて（SPRINT・Lab等）",
  "Night DEZIMA・イベント",
  "採用：インターン",
  "採用：CXO・プロ人材",
  "取材・提携・その他",
] as const;

export default function ContactForm({ defaultCategory }: { defaultCategory?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [category, setCategory] = useState<string>(
    defaultCategory && (CONTACT_CATEGORIES as readonly string[]).includes(defaultCategory) ? defaultCategory : ""
  );
  const [categoryError, setCategoryError] = useState(false);
  const [form, setForm] = useState({ company: "", name: "", email: "", message: "" });

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [key]: e.target.value });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (!category) {
      setCategoryError(true);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, category }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ company: "", name: "", email: "", message: "" });
        track("contact_submit", { category });
        sendGAEvent("event", "contact_submit", { category });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gray-100 p-10 text-center">
        <p className="text-2xl font-medium mb-3">送信しました。</p>
        <p className="text-sm text-gray-500 leading-relaxed">
          お問い合わせありがとうございます。担当者より折り返しご連絡いたします。
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs tracking-[0.2em] uppercase border-b border-gray-400 pb-0.5 hover:border-black hover:text-black text-gray-500 transition-colors"
        >
          続けて送信する →
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div>
        <label className="block text-xs text-gray-400 mb-3">ご相談の種類 <span className="text-red-400">*</span></label>
        <div className="flex flex-wrap gap-2">
          {CONTACT_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => { setCategory(c); setCategoryError(false); }}
              className={`text-xs px-4 py-2.5 border transition-colors ${
                category === c
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-500 hover:border-black hover:text-black"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        {categoryError && (
          <p className="text-xs text-red-500 mt-2">ご相談の種類を選択してください。</p>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs text-gray-400 mb-2">会社名</label>
          <input
            type="text"
            value={form.company}
            onChange={update("company")}
            className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors placeholder:text-gray-300"
            placeholder="例：株式会社◯◯"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-2">お名前 <span className="text-red-400">*</span></label>
          <input
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors placeholder:text-gray-300"
            placeholder="例：山田 太郎"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-2">メールアドレス <span className="text-red-400">*</span></label>
        <input
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors placeholder:text-gray-300"
          placeholder="例：taro.yamada@example.co.jp"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-2">ご相談内容 <span className="text-red-400">*</span></label>
        <textarea
          rows={5}
          required
          value={form.message}
          onChange={update("message")}
          className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors resize-none placeholder:text-gray-300"
          placeholder="例：新規事業のアイデア検討から始めたいと考えています…"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500">
          送信に失敗しました。お手数ですが時間をおいて再度お試しいただくか、メールにてご連絡ください。
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="px-10 py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "送信中..." : "送信する"}
      </button>

      <p className="text-xs text-gray-400 leading-relaxed">
        送信により
        <a href="/privacy" className="underline underline-offset-2 hover:text-gray-600 transition-colors">
          プライバシーポリシー
        </a>
        に同意したものとします。
      </p>
    </form>
  );
}
