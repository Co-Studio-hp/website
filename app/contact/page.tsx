import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "CONTACT | Co-Studio株式会社",
  description: "お問い合わせ・壁打ちのご相談はこちらから。",
};

// /contact?topic=xxx で種別を事前選択できる（採用ページ等からの導線用）
const TOPIC_MAP: Record<string, string> = {
  dezima: "新規事業・出島のご相談",
  service: "サービスについて（SPRINT・Lab等）",
  event: "Night DEZIMA・イベント",
  intern: "採用：インターン",
  cxo: "採用：CXO・プロ人材",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  const defaultCategory = topic ? TOPIC_MAP[topic] : undefined;

  return (
    <section className="py-14 px-6 max-w-2xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Contact</p>
      <h1 className="text-4xl font-medium mb-4">まずは、話しましょう。</h1>
      <p className="text-sm text-gray-500 leading-relaxed mb-8">
        新規事業の壁打ちから、中長期のプログラムまで。お気軽にご連絡ください。
      </p>
      <ContactForm defaultCategory={defaultCategory} />
    </section>
  );
}
