import type { Metadata } from "next";
import Link from "next/link";
import { getOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Hers HeAlth Technologies | Portfolio",
  alternates: { canonical: "/portfolio/hers" },
};

const pressReleases = [
  { title: "旭化成ファーマ発ヘルスケアベンチャー「Hers HeAlth Technologies Inc.」を設立（旭化成ファーマ）", url: "https://prtimes.jp/main/html/rd/p/000000191.000079452.html", date: "2025.05" },
  { title: "旭化成ファーマ発スタートアップ Hers HeAlth Technologies と総合健診センターヘルチェックが骨密度検査における社会課題へのアプローチで共同取組を開始", url: "https://hers-ht.com/news1/", date: "2025.10" },
  { title: "「美しさの土台は骨でした」Hers HeAlth Technologies、旭化成ホームズ大阪北支店と共同セミナーを開催", url: "https://hers-ht.com/news_2/", date: "2025.10" },
];

const mediaLinks = [
  { title: "【インタビュー】Hers HeAlth Technologies 代表・大黒聡氏 ─ 出向起業から出島へ、骨ケアで更年期女性の人生を変える", url: "https://www.co-studio.co.jp/post/hers-interview" },
];

export default async function HersPage() {
  const ogMap = await getOgImages([
    ...pressReleases.map((p) => p.url),
    ...mediaLinks.map((m) => m.url),
  ]);
  return (
    <>
      <section className="bg-gradient-to-br from-pink-950 to-black text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/portfolio" className="text-xs text-white/40 hover:text-white/80 transition-colors mb-8 block tracking-widest">← PORTFOLIO</Link>
          <div className="inline-flex bg-white rounded-md px-5 py-3 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/portfolio/hers.png" alt="Hers HeAlth Technologies" className="h-10 w-auto object-contain" />
          </div>
          <p className="text-xs text-white/40 tracking-[0.3em] uppercase mb-4">旭化成ファーマ × Co-Studio → Co-DEZIMA第3号</p>
          <h1 className="text-4xl md:text-6xl font-medium mb-6 leading-tight">Hers HeAlth<br />Technologies</h1>
          <p className="text-lg text-white/70 max-w-xl leading-relaxed">
            My Life. 私らしい人生を。女性の健康と自立を、骨から支える。
          </p>
        </div>
      </section>

      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-px bg-gray-100">
          {[
            { label: "Co-Studio関与開始", value: "2024年" },
            { label: "出島設立", value: "2025年5月" },
            { label: "スキーム", value: "Co-DEZIMA第3号" },
            { label: "フェーズ", value: "PoC実施中" },
          ].map((item) => (
            <div key={item.label} className="bg-white p-6">
              <p className="text-xs text-gray-400 mb-2">{item.label}</p>
              <p className="text-xl font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-medium mb-5">事業概要</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              女性の健康と自立を支える「骨ケア」サービスを展開するヘルステック企業。更年期女性の健康課題（転倒・骨折リスク、姿勢悪化、体型変化）に向き合い、旭化成ファーマと連携して事業を創出。
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              骨と筋肉を同時にアプローチする新しいフィットネス体験「Re:BONE」「CORE-FIT」を開発。週1回10分で体の変化を実感できるプログラムで、更年期女性の運動習慣化を促進。
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              2025年5月設立後、検診センター・自治体・健保との実証実験が進行中。骨に係る唯一無二のデータプラットフォーム構築を目指しています。
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-medium mb-5">Co-Studioとの関与経緯</h2>
            <div className="space-y-3">
              {[
                { phase: "2024年〜", desc: "旭化成ファーマ内で事業の出口を模索している状況でCo-Studioと接触。子会社・出向起業・JV・出島など複数の選択肢を比較検討する中で伴走開始。" },
                { phase: "検討期間", desc: "「まだプロダクトもない状況には出島スキームが最適」と判断。Co-DEZIMA第3号として実行を決定。出向起業の支援からスタートし、最終的に出島の形に落ち着いた。" },
                { phase: "2025.05", desc: "Co-DEZIMA第3号案件として設立。Co-Studioが設立する子会社への投資という位置付けで、エコシステム構築・VC壁打ち・アカデミア連携を伴走。" },
              ].map((item) => (
                <div key={item.phase} className="flex gap-4 p-4 border border-gray-100">
                  <span className="text-xs border border-gray-200 px-2 py-1 text-gray-500 h-fit font-medium shrink-0 whitespace-nowrap">{item.phase}</span>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 p-5 bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-400 mb-3">関連記事</p>
              <div className="space-y-3">
                {mediaLinks.map((m) => (
                  <a key={m.url} href={m.url} target="_blank" rel="noopener noreferrer"
                    className="group flex gap-3 items-center bg-white border border-gray-100 hover:border-black transition-colors p-2"
                  >
                    {ogMap[m.url] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={ogMap[m.url] as string} alt="" className="w-24 h-16 object-cover shrink-0 bg-gray-100" loading="lazy" />
                    ) : null}
                    <span className="text-sm text-gray-600 group-hover:text-black transition-colors leading-snug">{m.title} →</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-medium mb-6">プレスリリース・ニュース</h2>
        <div className="space-y-0">
          {pressReleases.map((p) => (
            <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer"
              className="flex gap-4 items-center py-3.5 border-b border-gray-100 hover:text-black group"
            >
              {ogMap[p.url] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ogMap[p.url] as string} alt="" className="w-24 h-16 object-cover shrink-0 bg-gray-100 hidden sm:block" loading="lazy" />
              ) : null}
              <span className="text-xs text-gray-400 shrink-0 w-14">{p.date}</span>
              <p className="text-sm text-gray-600 group-hover:text-black transition-colors flex-1">{p.title}</p>
              <span className="text-xs text-gray-300 group-hover:text-black transition-colors shrink-0">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="py-8 px-6 max-w-7xl mx-auto border-t border-gray-100">
        <div className="flex gap-4 flex-wrap">
          <Link href="/portfolio" className="px-6 py-3 border border-black text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors font-medium">← ポートフォリオ一覧</Link>
          <Link href="/contact" className="px-6 py-3 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors font-medium">出島について相談する</Link>
        </div>
      </section>
    </>
  );
}
