import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SERVICE | Co-Studio株式会社",
  description: "0→1の新規事業開発から、出島による1→10の事業化まで。Co-Studioのサービス一覧。",
};

const services = [
  {
    id: "dezima",
    label: "1 → 10",
    name: "Co-DEZIMA",
    tagline: "大企業の資産と可能性を、組織の外に解き放つ。",
    description:
      "大企業が社外に出島スタートアップを設立し、事業化を目指すスキームです。Co-Studioがリスクを共に取り、株式参画のかたちで事業化の果実を共に追求します。",
    forWhom: [
      "社内での出口戦略に困っている",
      "既存事業の枠を超えて外で事業化したい",
      "スタートアップスピードで動ける環境が必要",
    ],
    info: [
      { label: "期間", value: "1年〜（共同開発）" },
      { label: "費用", value: "100〜200万円/月 ＋ 株式参画" },
      { label: "フェーズ", value: "1 → 10" },
    ],
    highlight: true,
  },
  {
    id: "sprint",
    label: "0 → 1",
    name: "SPRINT",
    tagline: "1年で事業を作る。近未来デザイン×ビジネスモデル×特許を一体開発。",
    description:
      "Biz&Pat（3ヶ月）＋ Scrum（3ヶ月）の2フェーズで構成される6ヶ月集中プログラム。近未来デザイン・ビジネスモデル設計・特許権利設計を一体で開発し、実証可能な事業仮説を高速で作り上げます。",
    forWhom: [
      "1年以内に新規事業の形を作る必要がある",
      "ビジネスモデルと知財を同時に設計したい",
      "外部の力を借りて開発をスピードアップしたい",
    ],
    info: [
      { label: "期間", value: "6ヶ月（Biz&Pat 3ヶ月 ＋ Scrum 3ヶ月）" },
      { label: "費用", value: "1,500万円/3ヶ月〜" },
      { label: "フェーズ", value: "0 → 1" },
    ],
    highlight: false,
  },
  {
    id: "bizlab",
    label: "0 → 1",
    name: "BUSINESS LAB",
    tagline: "ビジネスモデルの悩みを、即座に解きほぐす。",
    description:
      "隔週1〜2時間のセッションを通じて、ビジネスモデルに関わる課題を継続的に解決します。担当者の思考を整理し、次の一手を一緒に考える伴走型プログラムです。",
    forWhom: [
      "ビジネスモデルに関する悩みをすぐに解決したい",
      "社内に壁打ち相手がいない",
      "定期的に外部視点でフィードバックを受けたい",
    ],
    info: [
      { label: "期間", value: "3ヶ月〜" },
      { label: "頻度", value: "隔週 1〜2時間" },
      { label: "費用", value: "360万円/3ヶ月〜" },
    ],
    highlight: false,
  },
  {
    id: "livinglab",
    label: "0 → 1",
    name: "LIVING LAB",
    tagline: "フィールドがなくても、PoCができる。",
    description:
      "実証フィールドを持たない企業に対し、PoC（概念実証）の設計から実施までを支援します。Co-Studioのネットワークを活用し、適切なフィールドを設定。仮説検証を通じて、事業化判断に必要なエビデンスを揃えます。",
    forWhom: [
      "PoCを実施したいがフィールドがない",
      "外部環境での検証を経てから意思決定したい",
      "PoC設計の経験・知見が社内に不足している",
    ],
    info: [
      { label: "期間", value: "3〜6ヶ月" },
      { label: "費用", value: "360万円/3ヶ月〜" },
      { label: "フェーズ", value: "0 → 1" },
    ],
    highlight: false,
  },
  {
    id: "spot",
    label: "単発",
    name: "Spot Assist",
    tagline: "1時間で、霧を晴らす。",
    description:
      "具体的な課題を持つ担当者向けの単発壁打ちセッション。新規事業に取り組む経験豊富なCo-Studioメンバーが、課題の論点整理から次の一手の提示まで、1時間で集中対応します。",
    forWhom: [
      "今すぐ相談できる相手が欲しい",
      "特定の課題についてプロの意見を聞きたい",
      "大きな契約前に雰囲気を確かめたい",
    ],
    info: [
      { label: "時間", value: "1時間" },
      { label: "費用", value: "25万円〜" },
      { label: "形式", value: "オンライン or 対面" },
    ],
    highlight: false,
  },
];

const clients = [
  "住友ファーマ", "小野薬品", "日産化学", "SOMPO", "JT", "ダイキン",
  "JT", "ENEOS", "ロート製薬", "ニット", "旭化成ファーマ", "サントリー",
  "神戸新聞", "キリン", "Cowellnex", "福岡地所",
];

export default function ServicePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Services</p>
        <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
          事業フェーズと課題に合わせて<br />選べる、5つのプログラム。
        </h1>
        <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
          0→1の探索から、出島による1→10の事業化まで、一貫してご支援します。
        </p>
      </section>

      {/* Approach overview */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-8">Our Approach</p>
          <div className="grid md:grid-cols-3 gap-px bg-gray-200">
            {[
              { phase: "0 → 1", desc: "アイデアを事業に", services: "SPRINT / BUSINESS LAB / LIVING LAB" },
              { phase: "1 → 10", desc: "組織の外で事業化", services: "Co-DEZIMA" },
              { phase: "Spot", desc: "今すぐ相談・壁打ち", services: "Spot Assist" },
            ].map((item) => (
              <div key={item.phase} className="bg-white p-8">
                <p className="text-3xl font-light mb-2">{item.phase}</p>
                <p className="text-sm text-gray-500 mb-3">{item.desc}</p>
                <p className="text-xs text-gray-400 border-t border-gray-100 pt-3">{item.services}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <div className="max-w-6xl mx-auto px-6">
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={`py-20 ${i < services.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <span className="text-xs border border-gray-200 px-2 py-1 text-gray-400 mr-3">{s.label}</span>
                <h2 className="text-3xl md:text-4xl font-light mt-6 mb-4">{s.name}</h2>
                <p className="text-base text-gray-600 mb-6 leading-relaxed">{s.tagline}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">{s.description}</p>
                <div>
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">こんな企業に</p>
                  <ul className="space-y-2">
                    {s.forWhom.map((f) => (
                      <li key={f} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-gray-300">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <div className="bg-gray-50 p-8">
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">基本情報</p>
                  <dl className="space-y-4">
                    {s.info.map((item) => (
                      <div key={item.label} className="flex gap-4">
                        <dt className="text-xs text-gray-400 w-16 flex-shrink-0">{item.label}</dt>
                        <dd className="text-sm text-gray-700">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <Link
                      href="/contact"
                      className="block text-center px-6 py-3 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors"
                    >
                      詳しく相談する
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Who We Work With */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Who We Work With</p>
          <h2 className="text-3xl font-light mb-12">
            Co-Studioが最も力を発揮できる、<br />担当者・企業の状況。
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "社内で新規事業を進めているが、スピードが出ない",
              "外部と連携したいが、何から始めればいいかわからない",
              "事業アイデアはあるが、ビジネスモデルに自信が持てない",
              "社内での出口が見えず、外で事業化したい",
              "PoCをやりたいが、フィールドがない",
              "「このプロジェクトを成功させたい」という強い意志がある",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm text-gray-600 bg-white p-5">
                <span className="text-gray-300 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-8">支援実績（一部）</p>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {clients.map((c) => (
            <span key={c} className="text-sm text-gray-500">{c}</span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-light mb-4">どのサービスか迷ったら、まず話しましょう。</h2>
        <p className="text-sm text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
          課題の状況をお聞きした上で、最適なプログラムをご提案します。<br />
          Spot Assistからでも、中長期の共創からでも、入口は自由です。
        </p>
        <Link
          href="/contact"
          className="inline-block px-10 py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
          お問い合わせ・壁打ちの申し込み
        </Link>
      </section>
    </>
  );
}
