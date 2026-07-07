import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Co-Studio株式会社",
  description: "Co-Studio株式会社の個人情報の取り扱いに関する方針をご案内します。",
};

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. 事業者情報",
    body: (
      <>
        <p className="text-sm text-gray-600 leading-loose mb-4">
          本プライバシーポリシーは、Co-Studio株式会社（所在地：東京都中央区日本橋本町3丁目8-3
          日本橋ライフサイエンスビルディング。以下「当社」といいます）が、当社ウェブサイトの利用者
          （以下「ユーザー」といいます）から取得する個人情報の取り扱いについて定めるものです。
        </p>
      </>
    ),
  },
  {
    title: "2. 取得する情報",
    body: (
      <p className="text-sm text-gray-600 leading-loose mb-4">
        当社は、当社ウェブサイト上のお問い合わせ・資料請求等の各フォームを通じて、会社名、氏名、役職、
        メールアドレスその他ユーザーにご入力いただく情報を取得します。また、当社ウェブサイトの
        利用状況に関する情報（アクセスログ等）を取得することがあります。
      </p>
    ),
  },
  {
    title: "3. 利用目的",
    body: (
      <>
        <p className="text-sm text-gray-600 leading-loose mb-4">
          当社は、取得した情報を以下の目的で利用します。
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-600 leading-loose mb-4 space-y-1">
          <li>お問い合わせへの回答のため</li>
          <li>ご請求いただいた資料の提供のため</li>
          <li>当社のサービス・イベントに関するご案内のため</li>
          <li>ウェブサイト改善のためのアクセス解析のため</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. 第三者への提供",
    body: (
      <p className="text-sm text-gray-600 leading-loose mb-4">
        当社は、法令に基づく場合を除き、ご本人の同意を得ることなく個人情報を第三者に提供することはありません。
      </p>
    ),
  },
  {
    title: "5. 委託・外部サービスの利用",
    body: (
      <p className="text-sm text-gray-600 leading-loose mb-4">
        当社は、ウェブサイトの運営、フォーム送信内容の管理、アクセス解析等のために、
        個人情報の取り扱いの全部または一部を外部サービスに委託することがあります。
        この場合、当社は委託先を適切に選定し、必要な範囲でのみ情報を取り扱わせます。
      </p>
    ),
  },
  {
    title: "6. Cookie・アクセス解析",
    body: (
      <p className="text-sm text-gray-600 leading-loose mb-4">
        当社ウェブサイトでは、サービスの改善のためにアクセス解析ツールを利用することがあります。
        アクセス解析では、Cookieまたはこれに類する技術により、個人を特定しない形で
        ウェブサイトの利用状況を収集することがあります。ユーザーは、ブラウザの設定により
        Cookieの受け入れを拒否することができます。
      </p>
    ),
  },
  {
    title: "7. 安全管理措置",
    body: (
      <p className="text-sm text-gray-600 leading-loose mb-4">
        当社は、取得した個人情報の漏えい、滅失または毀損の防止その他個人情報の安全管理のために、
        アクセス権限の管理、通信の暗号化など、必要かつ適切な措置を講じます。
      </p>
    ),
  },
  {
    title: "8. 開示・訂正・削除の請求",
    body: (
      <p className="text-sm text-gray-600 leading-loose mb-4">
        ユーザーは、当社が保有するご自身の個人情報について、開示・訂正・削除を請求することができます。
        ご請求は、当社ウェブサイトの
        <Link href="/contact" className="underline underline-offset-4 hover:text-black transition-colors">
          お問い合わせフォーム
        </Link>
        、または当社所在地（東京都中央区日本橋本町3丁目8-3
        日本橋ライフサイエンスビルディング）宛ての郵送にて受け付けます。
        ご本人であることを確認のうえ、法令に従い遅滞なく対応いたします。
      </p>
    ),
  },
  {
    title: "9. 本ポリシーの変更",
    body: (
      <p className="text-sm text-gray-600 leading-loose mb-4">
        当社は、法令の改正や事業内容の変更に応じて、本ポリシーを改定することがあります。
        重要な変更を行う場合は、当社ウェブサイト上でお知らせします。
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">Privacy Policy</p>
        <h1 className="text-3xl md:text-4xl font-medium mb-6">プライバシーポリシー</h1>
        <p className="text-sm text-gray-600 leading-loose mb-12">
          Co-Studio株式会社は、個人情報の重要性を認識し、個人情報の保護に関する法律その他の関係法令を
          遵守するとともに、以下の方針に基づき個人情報を適切に取り扱います。
        </p>

        {sections.map((s) => (
          <div key={s.title} className="mb-10">
            <h2 className="text-lg font-medium mb-4 pb-2 border-b border-gray-100">{s.title}</h2>
            {s.body}
          </div>
        ))}

        <p className="text-xs text-gray-400 mt-16">制定日：2026年7月7日</p>
        <p className="text-xs text-gray-400 mt-1">Co-Studio株式会社</p>
      </div>
    </section>
  );
}
