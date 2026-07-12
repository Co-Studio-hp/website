import type { Metadata } from "next";
import Link from "next/link";
import { getOgImages } from "@/lib/og";

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
    caseLink: "/portfolio",
    caseLinkLabel: "ポートフォリオ事例を見る",
    info: [
      { label: "期間", value: "1年〜（共同開発）" },
      { label: "フェーズ", value: "1 → 10" },
    ],
    highlight: true,
  },
  {
    id: "sprint",
    video: "/videos/service-sprint.mp4",
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
    caseLink: "https://www.co-studio.co.jp/post/%E3%80%90%E5%89%8D%E7%B7%A8%E3%80%91co-studio-%E4%BD%8F%E5%8F%8B%E3%83%95%E3%82%A1%E3%83%BC%E3%83%9E%E3%80%8C%E5%8D%8A%E5%B9%B4%E3%81%A7%E7%89%B9%E8%A8%B1%E5%87%BA%E9%A1%98%EF%BC%9F%E3%80%8D%E3%82%B7%E3%83%BC%E3%82%BA%E3%82%82%E3%82%A2%E3%82%A4%E3%83%87%E3%82%A2%E3%82%82%E3%81%AA%E3%81%8F%E5%A7%8B%E3%81%BE%E3%81%A3%E3%81%9F%E6%96%B0%E8%A6%8F%E4%BA%8B%E6%A5%AD%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88",
    caseLinkLabel: "事例記事：Co-Studio×住友ファーマ",
    info: [
      { label: "期間", value: "6ヶ月（Biz&Pat 3ヶ月 ＋ Scrum 3ヶ月）" },
      { label: "フェーズ", value: "0 → 1" },
    ],
    highlight: false,
  },
  {
    id: "bizlab",
    video: "/videos/service-bizlab.mp4",
    label: "0 → 1",
    name: "BUSINESS LAB",
    tagline: "ビジネスモデル・知財・近未来デザイン。事業の悩みを、即座に解きほぐす。",
    description:
      "隔週1〜2時間のセッションを通じて、新規事業に関わる課題を継続的に解決します。ビジネスモデルの設計にとどまらず、特許・知的財産戦略の活用方法や、近未来デザインを用いた未来洞察・事業構想まで扱います。担当者の思考を整理し、次の一手を一緒に考える伴走型プログラムです。",
    forWhom: [
      "ビジネスモデルに関する悩みをすぐに解決したい",
      "特許・知財をどう新規事業に活かすか相談したい",
      "近未来デザインを使った事業構想を一緒に考えたい",
      "社内に壁打ち相手がいない",
      "定期的に外部視点でフィードバックを受けたい",
    ],
    caseLink: "https://www.co-studio.co.jp/post/%E3%80%90%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%93%E3%83%A5%E3%83%BC%E3%80%91%E3%81%BE%E3%81%A0%E8%A6%8B%E3%81%AC%E3%81%8A%E5%AE%A2%E6%A7%98%E3%81%AE%E7%AC%91%E9%A1%94%E3%82%92%E6%B1%82%E3%82%81%E3%81%A6%E3%80%82%E4%BC%91%E7%9C%A0%E7%89%B9%E8%A8%B1%E3%81%AE%E8%A6%9A%E9%86%92%E3%83%8E%E3%82%A6%E3%83%8F%E3%82%A6%E3%81%A7%E7%A0%94%E7%A9%B6%E9%96%8B%E7%99%BA%E3%81%AE%E6%B4%BB%E6%80%A7%E5%8C%96%E3%82%92%E3%80%82-1",
    caseLinkLabel: "事例記事：休眠特許の覚醒ノウハウで研究開発の活性化",
    info: [
      { label: "期間", value: "3ヶ月〜" },
      { label: "頻度", value: "隔週 1〜2時間" },
    ],
    highlight: false,
  },
  {
    id: "livinglab",
    video: "/videos/service-livinglab.mp4",
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
    caseLink: "https://www.co-studio.co.jp/post/%E3%80%90%E5%A1%A9%E9%87%8E%E7%BE%A9%E8%A3%BD%E8%96%AC%E3%80%91%E8%A3%BD%E8%96%AC%E4%BC%9A%E7%A4%BE%E3%81%AE%E6%96%B0%E8%A6%8F%E4%BA%8B%E6%A5%AD%E3%81%AE%E6%8D%89%E3%81%88%E6%96%B9%E3%80%81living-lab%E3%81%AE%E6%B4%BB%E7%94%A8%E6%96%B9%E6%B3%95",
    caseLinkLabel: "事例記事：塩野義製薬 Living Labの活用方法",
    info: [
      { label: "期間", value: "3〜6ヶ月" },
      { label: "フェーズ", value: "0 → 1" },
    ],
    highlight: false,
  },
  {
    id: "spot",
    video: "/videos/service-spotassist.mp4",
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
    caseLink: "https://www.co-studio.co.jp/post/%E3%80%8Cco-studio%E3%81%AE%E6%94%AF%E6%8F%B4%E3%81%AF%E3%83%9B%E3%83%B3%E3%83%88%E3%81%AB%E4%BD%BF%E3%81%88%E3%82%8B%EF%BC%9F-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%81%AB%E3%83%AA%E3%82%A2%E3%83%AB%E3%81%AA%E5%A3%B0%E3%82%92%E8%81%9E%E3%81%84%E3%81%A6%E3%81%BF%E3%81%9F%E3%80%8D",
    caseLinkLabel: "クライアントにリアルな声を聞いてみた",
    info: [
      { label: "時間", value: "1時間" },
      { label: "形式", value: "オンライン or 対面" },
    ],
    highlight: false,
  },
  {
    id: "workshop",
    label: "単発 / 社内研修",
    name: "出島・知財 勉強会",
    tagline: "社内の「知らない」を「やってみたい」に変える。",
    description:
      "出島スキームや知的財産戦略について、社内担当者向けに実施する勉強会・ワークショップです。「出島って何？」「特許はどう使う？」という基礎から、実際のスキーム設計まで、事例を交えて解説します。新規事業推進に向けた社内理解の醸成や、担当者の動機づけにも効果的です。",
    forWhom: [
      "出島スキームを社内に説明したい",
      "知財戦略を新規事業に活かしたい",
      "社内のイノベーション文化を醸成したい",
    ],
    caseLink: "https://note.com/co_studio/n/n3aa24f4f26fa",
    caseLinkLabel: "出島勉強会レポート（note）",
    info: [
      { label: "時間", value: "2〜3時間（応相談）" },
      { label: "形式", value: "社内研修 / 対面 or オンライン" },
    ],
    highlight: false,
  },
  {
    id: "kicker",
    label: "海外連携",
    name: "Kicker Japan Fit",
    tagline: "日本の大企業と、北米スタートアップをつなぐ。",
    description:
      "Kicker Ventures（米国）との連携により、グローバルマーケット視点でのVC主導型新規事業創出・事業拡張プログラムを提供します。大手日本企業が米国スタートアップへ協業提案を行い、グローバルレベルのオープンイノベーション機会を獲得します。味の素・大正製薬・デンカ・塩野義・NTT西日本などとの実績があります。",
    forWhom: [
      "海外スタートアップと協業したい",
      "グローバルのトレンドを事業開発に活かしたい",
      "通常のオープンイノベーションに限界を感じている",
    ],
    caseLink: "https://www.co-studio.co.jp/post/%E5%A4%A7%E6%89%8B%E6%97%A5%E6%9C%AC%E4%BC%81%E6%A5%AD%E3%81%8C%E7%B1%B3%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%88%E3%82%A2%E3%83%83%E3%83%97%E3%81%AB%E5%8D%94%E6%A5%AD%E6%8F%90%E6%A1%88%E2%80%95%E3%80%8Ckicker-japan-fit%E3%80%8D%E8%AA%95%E7%94%9F%E7%A7%98%E8%A9%B1",
    caseLinkLabel: "「Kicker Japan Fit」誕生秘話",
    info: [
      { label: "期間", value: "3〜6ヶ月" },
      { label: "形式", value: "プログラム参加型" },
      { label: "フェーズ", value: "0→1 / 10→100" },
    ],
    highlight: false,
  },
  {
    id: "adventure",
    label: "体験型プログラム",
    name: "アドベンチャーレース",
    tagline: "フィールドで「一緒に決断する」経験が、チームを変える。",
    description:
      "新規事業チームのチームビルディング・マインドセット変革を目的とした野外体験型プログラムです。不確実性の高い環境での判断・行動を通じて、イノベーションに必要な「試行錯誤する力」「仲間を信頼する力」を体で学びます。東京ガスとの実施実績があります。",
    forWhom: [
      "新規事業チームの結束力を高めたい",
      "担当者のマインドセットを変えたい",
      "研修と体験を組み合わせたプログラムを探している",
    ],
    caseLink: "https://www.co-studio.co.jp/post/tokyo-gas-real-discovery-outdoors",
    caseLinkLabel: "事例：東京ガス×Co-Studio アドベンチャーレース",
    info: [
      { label: "期間", value: "1〜2日間" },
      { label: "形式", value: "野外フィールド" },
    ],
    highlight: false,
  },
  {
    id: "event",
    label: "イベント設計",
    name: "イベント設計支援",
    tagline: "Night DEZIMAの経験知を、貴社のコミュニティに。",
    description:
      "Co-StudioがナイトDEZIMAで培ってきたイントレプレナー向けコミュニティ設計・イベント企画・運営のノウハウを提供します。社内外のイノベーターコミュニティの立ち上げや、オープンイノベーション型イベントの企画・設計を支援します。福岡地所のライフサイエンス拠点では、全3回の交流イベントを設計・運営しました。",
    forWhom: [
      "社内イノベーターコミュニティを作りたい",
      "業界横断型の交流イベントを企画したい",
      "既存の社内勉強会をリニューアルしたい",
    ],
    caseLinks: [
      { url: "https://fj-lifescience.jp/topics/event-report-251027/", label: "福岡地所×Co-Studio 開催レポート（2025.10）" },
      { url: "https://fj-lifescience.jp/topics/event-report-251120/", label: "福岡地所×Co-Studio 開催レポート（2025.11）" },
      { url: "https://fj-lifescience.jp/topics/event-report-260227/", label: "福岡地所×Co-Studio 開催レポート（2026.02）" },
    ],
    info: [
      { label: "形式", value: "設計支援 / 当日運営 / 両方対応" },
    ],
    highlight: false,
  },
];

const clients = [
  "住友ファーマ", "小野薬品", "日産化学", "SOMPO", "JT", "ダイキン",
  "ロート製薬", "ニット", "旭化成ファーマ", "サントリー",
  "神戸新聞", "キリン", "Cowellnex", "福岡地所",
];

export default async function ServicePage() {
  const caseUrls = services.flatMap((s) => {
    const urls: string[] = [];
    if ("caseLink" in s && typeof s.caseLink === "string" && s.caseLink.startsWith("http")) {
      urls.push(s.caseLink);
    }
    if ("caseLinks" in s && Array.isArray(s.caseLinks)) {
      urls.push(...s.caseLinks.map((c) => c.url));
    }
    return urls;
  });
  const ogMap = await getOgImages(caseUrls);

  return (
    <>
      {/* Hero */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">Services</p>
        <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-6">
          事業フェーズと課題に合わせて<br />選べる、多様なプログラム。
        </h1>
        <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
          0→1の探索から、出島による1→10の事業化、10→100のスケールまで。<br />単発の壁打ちや社内勉強会、海外連携、体験型プログラムも対応します。
        </p>
      </section>

      {/* Approach overview */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">Our Approach</p>
          <div className="grid md:grid-cols-4 gap-px bg-gray-200">
            {[
              { phase: "0 → 1", desc: "アイデアを事業に", services: "SPRINT / BUSINESS LAB / LIVING LAB / 知財支援" },
              { phase: "1 → 10", desc: "組織の外で事業化", services: "Co-DEZIMA" },
              { phase: "10 → 100", desc: "事業をスケール", services: "ACCELERATION / Kicker Japan Fit" },
              { phase: "Spot", desc: "今すぐ相談・単発", services: "Spot Assist / 勉強会 / イベント設計 / アドベンチャーレース" },
            ].map((item) => (
              <div key={item.phase} className="bg-white p-8">
                <p className="text-3xl font-medium mb-2">{item.phase}</p>
                <p className="text-sm text-gray-500 mb-3">{item.desc}</p>
                <p className="text-xs text-gray-400 border-t border-gray-100 pt-3">{item.services}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step overview movie */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3 text-center">Movie</p>
          <h2 className="text-2xl md:text-3xl font-normal mb-8 text-center">2分でわかる 新規事業のStep</h2>
          <video
            src="/videos/service-steps.mp4"
            controls
            preload="metadata"
            playsInline
            className="w-full border border-black/10"
          />
        </div>
      </section>

      {/* Service Details */}
      <div className="max-w-7xl mx-auto px-6">
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={`py-20 ${i < services.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <span className="text-xs border border-gray-200 px-2 py-1 text-gray-400 mr-3">{s.label}</span>
                <h2 className="text-3xl md:text-4xl font-medium mt-6 mb-4">{s.name}</h2>
                <p className="text-base text-gray-600 mb-6 leading-relaxed">{s.tagline}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">{s.description}</p>
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">こんな企業に</p>
                  <ul className="space-y-2">
                    {s.forWhom.map((f) => (
                      <li key={f} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-gray-300">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                {"caseLink" in s && s.caseLink && (
                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <p className="text-xs text-gray-400 mb-3">事例・参考記事</p>
                    <a
                      href={s.caseLink as string}
                      target={s.caseLink.startsWith("http") ? "_blank" : undefined}
                      rel={s.caseLink.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex gap-4 items-center border border-gray-100 hover:border-black transition-colors p-3"
                    >
                      {ogMap[s.caseLink as string] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={ogMap[s.caseLink as string] as string}
                          alt=""
                          className="w-28 h-20 object-cover shrink-0 bg-gray-100"
                          loading="lazy"
                        />
                      ) : null}
                      <span className="text-sm text-gray-600 group-hover:text-black transition-colors leading-snug">
                        {s.caseLinkLabel as string} →
                      </span>
                    </a>
                  </div>
                )}
                {"caseLinks" in s && Array.isArray(s.caseLinks) && s.caseLinks.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <p className="text-xs text-gray-400 mb-3">事例・開催レポート</p>
                    <div className="space-y-3">
                      {s.caseLinks.map((c) => (
                        <a
                          key={c.url}
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex gap-4 items-center border border-gray-100 hover:border-black transition-colors p-3"
                        >
                          {ogMap[c.url] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={ogMap[c.url] as string}
                              alt=""
                              className="w-28 h-20 object-cover shrink-0 bg-gray-100"
                              loading="lazy"
                            />
                          ) : null}
                          <span className="text-sm text-gray-600 group-hover:text-black transition-colors leading-snug">
                            {c.label} →
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className="bg-gray-50 p-8">
                  <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">基本情報</p>
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
                      className="block text-center px-6 py-3 bg-black text-white text-xs tracking-[0.3em] uppercase hover:bg-gray-800 transition-colors"
                    >
                      詳しく相談する
                    </Link>
                  </div>
                  {"video" in s && typeof s.video === "string" && (
                    <div className="mt-6">
                      <p className="text-xs text-gray-400 mb-2">動画で見る（2分）</p>
                      <video
                        src={s.video}
                        controls
                        preload="metadata"
                        playsInline
                        className="w-full border border-black/10"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Who We Work With */}
      <section className="bg-gray-50 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">Who We Work With</p>
          <h2 className="text-3xl font-medium mb-6">
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
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">支援実績（一部）</p>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {clients.map((c) => (
            <span key={c} className="text-sm text-gray-500">{c}</span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 py-14 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-medium mb-4">どのサービスか迷ったら、まず話しましょう。</h2>
        <p className="text-sm text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
          課題の状況をお聞きした上で、最適なプログラムをご提案します。<br />
          Spot Assistからでも、中長期の共創からでも、入口は自由です。
        </p>
        <Link
          href="/contact"
          className="inline-block px-10 py-4 bg-black text-white text-xs tracking-[0.3em] uppercase hover:bg-gray-800 transition-colors"
        >
          お問い合わせ・壁打ちの申し込み
        </Link>
      </section>
    </>
  );
}
