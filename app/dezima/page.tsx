import type { Metadata } from "next";
import Link from "next/link";
import { getDezimaContent, NOTE_URL } from "@/lib/note";

export const metadata: Metadata = {
  title: "Night DEZIMA | Co-Studio株式会社",
  description:
    "大企業の新規事業担当者（イントレプレナー）が集まる定期交流イベント。業種・会社を超えて、同じ課題を抱える仲間がつながります。",
};

const themes = [
  "組織効力感とイントレプレナーのリアル",
  "思考の違いを明確にする概念思考ワーク",
  "エフェクチュエーションでアイデア創出",
  "未病予防×企業×医療で拓く未来のヘルスケア",
  "SINIC理論×近未来デザイン",
  "新規事業の「出口」戦略",
  "越境する新規事業担当者",
  "CDOを囲む夜",
];

const voices = [
  {
    role: "大手製薬企業 新規事業担当",
    text: "同じ「できない理由」に縛られている人たちに会える場所。社内では絶対に話せない本音が出る。",
  },
  {
    role: "大手食品メーカー イントレプレナー",
    text: "業種を超えた横のつながりが生まれる。ここで出会った人と実際にプロジェクトを組んだこともある。",
  },
  {
    role: "エネルギー系企業 新規事業推進室",
    text: "毎回テーマが違うから飽きない。自分の課題だけじゃなく、他社の課題が自分ごとに聞こえてくる。",
  },
];

export default async function DezimaPage() {
  const { guide, reports } = await getDezimaContent();

  return (
    <>
      {/* Hero */}
      <section
        className="min-h-[80vh] flex flex-col justify-end px-6 pb-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #080818 0%, #0d0d2b 50%, #0a0a0a 100%)" }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 40%)"
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6">Co-Studio Community</p>
            <h1 className="text-6xl md:text-8xl font-medium text-white mb-6 leading-tight">
              Night<br />DEZIMA
            </h1>
            <p className="text-lg text-white/60 max-w-xl leading-relaxed mb-10">
              大企業の新規事業担当者（イントレプレナー）が集まる、定期交流イベント。<br />
              業種・役職・会社の枠を外し、本音で語り合う夜。
            </p>
            <div className="flex flex-wrap gap-12 mb-10">
              {[
                { num: "30社+", label: "参加企業" },
                { num: "12回+", label: "開催実績" },
                { num: "全国", label: "東京・福岡など各地で開催" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-4xl font-medium text-white">{s.num}</p>
                  <p className="text-xs text-white/40 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 border border-white/40 text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors font-medium"
            >
              参加を申し込む →
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="overflow-hidden border border-white/10 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/dezima/group.png"
                alt="Night DEZIMA 参加者の集合写真"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Movie */}
      <section className="bg-[#0a0a0a] text-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-3 text-center">Movie</p>
          <h2 className="text-2xl md:text-3xl font-medium mb-10 text-center">映像で見る Night DEZIMA</h2>
          <div className="relative w-full overflow-hidden border border-white/10" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube-nocookie.com/embed/yoDGXup-FJQ"
              title="Night DEZIMA"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 完全ガイド（大解説）feature */}
      {guide && (
        <section className="bg-[#0a0a0a] text-white px-6 py-16">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <a href={guide.link} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden border border-white/10">
              {guide.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={guide.thumbnail}
                  alt={guide.title}
                  className="w-full aspect-[16/9] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              )}
            </a>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">完全ガイド</p>
              <h2 className="text-3xl font-medium mb-5 leading-snug">
                ナイトDEZIMA大解説。<br />
                <span className="text-white/60 text-xl">30社以上のイントレプレナーが集う"夜会"の全貌</span>
              </h2>
              <p className="text-sm text-white/60 leading-relaxed mb-8">
                「立ち上げの高揚感の裏にある、社内調整の難しさ。正解の見えない意思決定。」
                ──大企業で新規事業に挑む担当者たちのリアルな葛藤を共有し、共に次の一歩を探る場。
                その成り立ちから当日の雰囲気まで、noteの完全ガイドで詳しく解説しています。
              </p>
              <a
                href={guide.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3.5 border border-white/40 text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors font-medium"
              >
                完全ガイドを読む →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* What is Night DEZIMA */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">What is Night DEZIMA?</p>
            <h2 className="text-4xl font-medium mb-8 leading-tight">
              「できない理由」に<br />縛られない夜。
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              大企業の中で新規事業を推進する担当者（イントレプレナー）は、孤独です。
              社内では「なぜやるのか」を問われ、承認を取り、予算を守り、リスクを避けながら動かなければならない。
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Night DEZIMAは、そんな担当者たちが会社の看板を外して本音で語り合う場です。
              毎回テーマを変え、参加者の「今の課題」を中心に、ディスカッションと交流を行います。
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              東京・福岡など全国で開催。「自分だけじゃない」という感覚と、「一緒にやれる仲間」が見つかる夜です。
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">過去のテーマ（抜粋）</p>
            {themes.map((t, i) => (
              <div key={i} className="flex gap-4 items-start py-3 border-b border-gray-100">
                <span className="text-xs text-gray-300 font-medium w-4 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm text-gray-600">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Participant Voices */}
      <section className="bg-gray-50 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-10">Voices</p>
          <div className="grid md:grid-cols-3 gap-6">
            {voices.map((v, i) => (
              <div key={i} className="bg-white p-8 border border-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed mb-6">&quot;{v.text}&quot;</p>
                <p className="text-xs text-gray-400">{v.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events — note開催レポートのバナーギャラリー（自動取得） */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">Past Events</p>
            <h2 className="text-2xl font-medium">開催記録</h2>
          </div>
          <a
            href={NOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase border-b border-gray-400 pb-0.5 hover:border-black hover:text-black text-gray-500 transition-colors font-medium"
          >
            noteで全て読む →
          </a>
        </div>

        {reports.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((e) => (
              <a
                key={e.link}
                href={e.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-gray-100 hover:border-black transition-colors overflow-hidden"
              >
                {e.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={e.thumbnail}
                    alt={e.title}
                    className="w-full aspect-[16/9] object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2">{e.date}</p>
                  <h3 className="text-sm font-medium leading-relaxed group-hover:text-black text-gray-700">{e.title}</h3>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">開催レポートを読み込めませんでした。noteをご覧ください。</p>
        )}
      </section>

      {/* Who should join */}
      <section className="bg-black text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-6">こんな方へ</p>
          <h2 className="text-3xl font-medium mb-10">あなたが「イントレプレナー」なら、<br />ここが居場所になる。</h2>
          <div className="grid md:grid-cols-2 gap-3 max-w-2xl">
            {[
              "大企業で新規事業を推進しているが、孤独を感じている",
              "社内では話せない本音を、同じ立場の人と共有したい",
              "業種を超えた横のネットワークをつくりたい",
              "自分の課題を、外の視点で整理したい",
              "出島・スピンアウトを検討していて、先行事例を聞きたい",
              "単純に、同志に会いたい",
            ].map((item) => (
              <div key={item} className="flex gap-3 py-3 border-b border-white/10">
                <span className="text-white/20 shrink-0">—</span>
                <p className="text-sm text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-medium mb-4">次回のNight DEZIMAに参加する</h2>
        <p className="text-sm text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
          参加希望の方はお問い合わせフォームよりご連絡ください。<br />
          次回開催の案内をお送りします。
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors font-medium"
          >
            参加申し込み・お問い合わせ
          </Link>
          <a
            href={NOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 border border-black text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors font-medium"
          >
            noteで活動を見る
          </a>
        </div>
      </section>
    </>
  );
}
