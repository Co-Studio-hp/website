import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CONTACT | Co-Studio株式会社",
  description: "お問い合わせ・壁打ちのご相談はこちらから。",
};

export default function ContactPage() {
  return (
    <section className="py-24 px-6 max-w-2xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Contact</p>
      <h1 className="text-4xl font-light mb-4">まずは、話しましょう。</h1>
      <p className="text-sm text-gray-500 leading-relaxed mb-16">
        新規事業の壁打ちから、中長期のプログラムまで。お気軽にご連絡ください。
      </p>
      <form className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-400 mb-2">会社名</label>
            <input type="text" className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors" placeholder="Co-Studio株式会社" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">お名前</label>
            <input type="text" className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors" placeholder="澤田 真賢" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-2">メールアドレス</label>
          <input type="email" className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors" placeholder="example@co-studio.co.jp" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-2">ご相談内容</label>
          <textarea rows={5} className="w-full border-b border-gray-200 py-2 text-sm outline-none focus:border-black transition-colors resize-none" placeholder="新規事業のアイデア検討から始めたいと考えています..." />
        </div>
        <button
          type="submit"
          className="px-10 py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
          送信する
        </button>
      </form>
    </section>
  );
}
