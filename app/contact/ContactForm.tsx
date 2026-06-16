"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ company: "", name: "", email: "", message: "" });

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [key]: e.target.value });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ company: "", name: "", email: "", message: "" });
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
        <p className="text-2xl font-normal mb-3">送信しました。</p>
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
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs text-gray-400 mb-2">会社名</label>
          <input
            type="text"
            value={form.company}
            onChange={update("company")}
            className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors"
            placeholder="Co-Studio株式会社"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-2">お名前 <span className="text-red-400">*</span></label>
          <input
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors"
            placeholder="澤田 真賢"
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
          className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors"
          placeholder="example@co-studio.co.jp"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-2">ご相談内容 <span className="text-red-400">*</span></label>
        <textarea
          rows={5}
          required
          value={form.message}
          onChange={update("message")}
          className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors resize-none"
          placeholder="新規事業のアイデア検討から始めたいと考えています..."
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
    </form>
  );
}
