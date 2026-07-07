import Link from "next/link";
import CountUp from "@/components/CountUp";

const portfolios = [
  { slug: "do-sukasu",  name: "do.Sukasu",               year: "2020", field: "ヘルスケア / 教育 / 自動車", milestone: "シリーズA調達中" },
  { slug: "aikomi",     name: "Aikomi",                   year: "2021", field: "認知症ケア / AI",            milestone: "約1億円調達" },
  { slug: "hers",       name: "Hers HeAlth Technologies", year: "2025", field: "ヘルステック / 更年期",      milestone: "PoC実施中" },
  { slug: "enaforward", name: "エナフォワード",             year: "2023", field: "美容 / SaaS",              milestone: "EXIT（2026）", href: "/results" },
];

const clients = [
  "住友ファーマ","ダイキン","OMRON","味の素","JT","キリン","SOMPO",
  "三井物産","東京ガス","三井不動産","サントリー","アース製薬","塩野義製薬","エーザイ","旭化成ファーマ",
];

const serviceGroups = [
  {
    phase: "0→1",
    label: "事業の種を見つけ、形にする",
    items: [
      { name: "SPRINT",        desc: "近未来デザイン×Bizモデル×特許を一体開発。6ヶ月で事業の骨格をつくる。" },
      { name: "BUSINESS LAB",  desc: "隔週セッション。ビジネスモデル・知財・近未来デザインの悩みを継続解決。" },
      { name: "LIVING LAB",    desc: "PoCフィールドがない企業の検証設計から実施まで。" },
    ],
  },
  {
    phase: "1→10",
    label: "独立した会社として、共に育てる",
    items: [
      { name: "Co-DEZIMA",     desc: "出島スタートアップを設立し、株式参画でCo-Studioが共に走る。" },
    ],
  },
  {
    phase: "10→100",
    label: "スケールを加速させる",
    items: [
      { name: "Growth Support", desc: "事業基盤が整った段階での戦略・組織・資金調達の加速支援。" },
    ],
  },
  {
    phase: "Spot",
    label: "まず動く、試す",
    items: [
      { name: "Spot Assist 他", desc: "壁打ち・勉強会・イベント設計・アドベンチャーレース。" },
    ],
  },
];

export default function Home() {
  return (
    <>
      {/* 1. HERO */}
      <section className="bg-[#F5F3EE] min-h-screen flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 cross-grid opacity-30 pointer-events-none" />

        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-10">
          <div className="w-px h-16 bg-black/15" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-black/25 whitespace-nowrap" style={{writingMode:"vertical-rl"}}>Open Studio for Innovation</span>
          <div className="w-px h-16 bg-black/15" />
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto w-full py-28 relative z-10">
          <p className="text-xs tracking-[0.5em] uppercase text-black/30 mb-8 fx-up">Co-Studio — Since 2019</p>
          <div className="mb-10">
            <h1 className="text-[clamp(4rem,11vw,9rem)] font-medium leading-[0.95] tracking-[-0.03em] text-black fx-up fx-d1">創ろう、</h1>
            <h1 className="text-[clamp(4rem,11vw,9rem)] font-medium leading-[0.95] tracking-[-0.03em] text-black/25 fx-up fx-d2">共に、</h1>
            <h1 className="text-[clamp(4rem,11vw,9rem)] font-medium leading-[0.95] tracking-[-0.03em] text-black fx-up fx-d3">未来から。</h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16 fx-up fx-d4">
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              大企業の新規事業開発を「共に走る」オープンスタジオ。自らリスクを取り事業化の果実を共に目指します。
            </p>
            <div className="flex gap-8">
              {[
                { prefix: "延べ", end: 60, suffix: "社+", l: "支援実績" },
                { prefix: "", end: 4, suffix: "社+", l: "出島SU" },
                { prefix: "", end: 7, suffix: "年", l: "の実績" },
              ].map(s => (
                <div key={s.l}>
                  <p className="text-3xl font-medium text-black">
                    <CountUp prefix={s.prefix} end={s.end} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-black/30 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-black/10 px-8 md:px-16 py-4 flex gap-4">
          <Link href="/service" className="px-6 py-2.5 bg-black text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-800 transition-colors">サービスを見る</Link>
          <Link href="/contact" className="px-6 py-2.5 border border-black/30 text-black text-xs tracking-[0.2em] uppercase hover:bg-black/5 transition-colors">お問い合わせ</Link>
        </div>
      </section>

      {/* 1.5 Co-DEZIMA TEASER */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            <video
              src="/videos/dezima-teaser.mp4"
              poster="/videos/dezima-teaser-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full border border-white/10"
            />
          </div>
          <div className="md:col-span-2">
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Co-DEZIMA</p>
            <h2 className="text-2xl md:text-3xl font-medium leading-snug mb-4">
              新規事業は、<br />社内でやるもの？
            </h2>
            <p className="text-sm text-white/50 leading-relaxed mb-8">
              新規事業を独立したスタートアップとして社外に切り出す「出島」。
              Co-Studioの事業共創スキームを45秒でご覧ください。
            </p>
            <Link
              href="/co-dezima"
              className="inline-block px-6 py-2.5 border border-white/40 text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors"
            >
              出島について詳しく →
            </Link>
          </div>
        </div>
      </section>

      {/* 1.6 Shindan CTA */}
      <section className="bg-[#111111] text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-14 md:flex items-center justify-between gap-10">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-3">Self Check</p>
            <h2 className="text-2xl md:text-3xl font-medium leading-snug mb-2">
              あなたのテーマは、出島向きか？
            </h2>
            <p className="text-sm text-white/50 leading-relaxed max-w-md">
              社内で育てるべきか、外で育てるべきか。10の質問で「出島適合度」を判定します。3分・登録不要。
            </p>
          </div>
          <div className="mt-8 md:mt-0 shrink-0">
            <Link
              href="/shindan"
              className="inline-block px-8 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              3分セルフ診断へ →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. MISSION */}
      <section className="bg-[#F5F3EE] py-20 px-8 md:px-16 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16 items-start">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-4">Our Mission</p>
              <h2 className="text-3xl md:text-4xl font-medium leading-snug mb-6">共感を軸に拡がる<br />コミュニティの実現</h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                Co-Studioは「コンサルタント」でも「投資家」でもありません。大企業の中に眠る可能性を一緒に引き出し、リスクを共に取りながら事業として育てる——そういう存在です。
              </p>
            </div>
            <div className="pt-2">
              <blockquote className="border-l-2 border-black/20 pl-6">
                <p className="text-lg font-medium leading-relaxed text-gray-700">
                  「答えを売る」のではなく、<br />「共に問い、共に走る」。<br />それがCo-Studioのスタンスです。
                </p>
              </blockquote>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-black/10 fx-stagger">
            {[
              { no:"01", title:"リスクを、共に取る",    body:"コンサルは成果物を納品して終わり。Co-Studioは株式参画を前提に、事業の成否を自分ごととして走り続けます。フィーだけで稼ぐビジネスモデルは持ちません。" },
              { no:"02", title:"出島で、制約を超える",  body:"大企業の中では動けない。そう感じたら「外に出る」。Co-DEZIMAスキームで独立した出島スタートアップを設立し、ガバナンスの制約なく本気で事業を作ります。" },
              { no:"03", title:"コミュニティで、繋がる",body:"一社の知見には限界がある。Night DEZIMAを通じ、業種を超えたイントレプレナー同士が繋がり、お互いの経験・ネットワーク・知見を持ち寄れる場を作ります。" },
            ].map(c => (
              <div key={c.no} className="bg-white/70 p-8">
                <p className="text-[10px] tracking-[0.4em] text-gray-300 mb-4">{c.no}</p>
                <h3 className="text-base font-medium mb-3">{c.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-px bg-black/10 fx-stagger">
            {[
              { label:"一般的なコンサル・支援会社", points:["フィー収入が主。成果物を納品して終わり","社内論理・承認フローに縛られた提言","プロジェクト単位で関与が完結する"], dark:false },
              { label:"Co-Studioの関与スタイル",    points:["株式参画で長期的に利害が一致","出島スキームで大企業の制約を突破","案件に深くコミットし、がっつり伴走する"], dark:true },
            ].map(col => (
              <div key={col.label} className={`p-8 ${col.dark ? "bg-[#111111] text-white" : "bg-white/70"}`}>
                <p className={`text-[10px] tracking-[0.3em] uppercase mb-4 ${col.dark ? "text-white/30" : "text-gray-400"}`}>{col.label}</p>
                <ul className="space-y-3">
                  {col.points.map(p => (
                    <li key={p} className={`text-sm flex gap-3 items-start ${col.dark ? "text-white/70" : "text-gray-600"}`}>
                      <span className={`mt-1 w-1 h-1 rounded-full shrink-0 ${col.dark ? "bg-white/40" : "bg-black/20"}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CLIENTS */}
      <section className="bg-[#F5F3EE] py-16 overflow-hidden border-y border-black/10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 text-center mb-8">Clients — 延べ60社以上</p>
        <div className="flex gap-14 whitespace-nowrap marquee mb-4">
          {[...clients, ...clients].map((c, i) => (
            <span key={i} className="text-base text-gray-400 shrink-0 font-medium">{c}</span>
          ))}
        </div>
        <div className="flex gap-14 whitespace-nowrap marquee-rev">
          {[...clients, ...clients].map((c, i) => (
            <span key={i} className="text-base text-gray-300 shrink-0">{c}</span>
          ))}
        </div>
      </section>

      {/* 4. Co-DEZIMA */}
      <section className="bg-[#F5F3EE] py-20 px-8 md:px-16 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-4">Co-DEZIMA</p>
              <h2 className="text-3xl md:text-4xl font-medium leading-snug mb-6">大企業の「外」に、<br />本気の出島を作る。</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                日本のイノベーションが失速する理由のひとつは、新規事業が「会社の中」にある限り、意思決定・採用・調達・スピードすべてが親会社の論理に縛られることです。
              </p>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Co-DEZIMAは、独立した株式会社として「出島スタートアップ」を設立するスキームです。Co-Studioが子会社に出資し、株式を持ちながら共同創業者として経営に参画。大企業の資産（技術・顧客・ブランド）と、スタートアップのスピード・柔軟性を両立させます。
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">現在4社が稼働中・EXIT済み。調達総額は累計数億円規模に達しています。</p>
              <div className="mt-8">
                <Link href="/portfolio" className="inline-block px-7 py-3 border border-black text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors font-medium">ポートフォリオを見る →</Link>
              </div>
            </div>
            <div className="space-y-px">
              {[
                { step:"01", title:"事業テーマの定義",  desc:"大企業内の埋もれた技術・アセットからテーマを絞り込む。SPRINTやBUSINESS LABでの0→1フェーズが前提となることも多い。" },
                { step:"02", title:"出島法人の設立",    desc:"Co-Studioが設立する子会社に出資する形で独立法人を設立。代表者は大企業からの出向起業か、Co-Studioが招聘する人材。" },
                { step:"03", title:"PoC・事業検証",     desc:"スタートアップとして自由に動きながら、市場検証・顧客開拓・資金調達を進める。Co-Studioがエコシステム構築・VC壁打ちを伴走。" },
                { step:"04", title:"独立・スケール",    desc:"外部調達・黒字化・M&A・EXITなど各社の戦略に合わせて成長フェーズを設計。エナフォワードは2026年にEXIT完了。" },
              ].map(s => (
                <div key={s.step} className="flex gap-5 p-5 bg-white/70 border border-black/5">
                  <span className="text-[10px] text-gray-300 font-medium shrink-0 mt-0.5 w-6">{s.step}</span>
                  <div>
                    <p className="text-sm font-medium mb-1">{s.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PORTFOLIO */}
      <section className="bg-[#111111] py-16 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-2">Portfolio</p>
              <h2 className="text-2xl font-medium text-white">出島から生まれた独立SU</h2>
            </div>
            <Link href="/portfolio" className="text-xs text-white/40 border-b border-white/20 pb-0.5 hover:text-white transition-colors tracking-widest uppercase">一覧 →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 fx-stagger">
            {portfolios.map((p) => (
              <Link key={p.slug} href={"href" in p && p.href ? p.href : `/portfolio/${p.slug}`} className="group bg-[#111111] p-6 hover:bg-white/5 transition-colors">
                <p className="text-[10px] text-white/20 mb-4">{p.year}</p>
                <h3 className="text-base font-medium text-white mb-2 leading-tight">{p.name}</h3>
                <p className="text-xs text-white/40 mb-4 leading-relaxed">{p.field}</p>
                <span className="text-xs text-white/20 bg-white/5 px-2 py-0.5">{p.milestone}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SERVICES */}
      <section className="bg-[#F5F3EE] py-16 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline gap-4 mb-10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400">Services</p>
            <div className="flex-1 h-px bg-black/10" />
            <Link href="/service" className="text-xs text-gray-400 hover:text-black transition-colors tracking-widest uppercase">詳細 →</Link>
          </div>
          <div className="space-y-6">
            {serviceGroups.map((g) => (
              <div key={g.phase}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] border border-black/15 text-gray-400 px-2 py-1 font-medium tracking-widest">{g.phase}</span>
                  <span className="text-xs text-gray-400">{g.label}</span>
                  <div className="flex-1 h-px bg-black/8" />
                </div>
                <div className="space-y-px">
                  {g.items.map((s) => (
                    <div key={s.name} className="px-5 py-4 bg-white/60 hover:bg-black/5 transition-colors">
                      <p className="text-sm font-medium mb-0.5">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NIGHT DEZIMA */}
      <section className="py-20 px-8 md:px-16 overflow-hidden relative"
        style={{background:"linear-gradient(135deg, #0a0a1a 0%, #111130 100%)"}}>
        <div className="absolute inset-0 cross-grid opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/20 mb-4">Community</p>
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 leading-tight">Night DEZIMA</h2>
            <p className="text-base text-white/50 max-w-lg leading-relaxed">大企業のイントレプレナーが業種を超えて集まる、定期交流イベント。</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm text-white/40 leading-relaxed mb-6">
                新規事業担当者が抱える悩みは、社内に話せる相手がいないことも多い。Night DEZIMAは、そんなイントレプレナーが「同じ境遇の仲間」と出会い、経験や知見を分かち合える場です。
              </p>
              <p className="text-sm text-white/40 leading-relaxed mb-6">
                コンサルや投資家は来ない、売り込みもない。純粋に「事業を前に進めたい人」だけが集まる、クローズドな交流の場です。東京・福岡・大阪など全国各地で開催しており、参加企業同士の横連携から新たな事業機会が生まれることも少なくありません。
              </p>
              <div className="flex gap-4">
                <Link href="/dezima" className="inline-block px-7 py-3 border border-white/20 text-white text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-colors">Night DEZIMAについて →</Link>
                <Link href="/contact" className="inline-block px-7 py-3 bg-white/10 text-white text-xs tracking-[0.2em] uppercase hover:bg-white/20 transition-colors">参加を申し込む</Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-px bg-white/5 fx-stagger">
              {[["30社+","参加企業"],["12回+","開催実績"],["全国","各地で開催"],["異業種","業種を超えた繋がり"],["クローズド","招待制の安心感"],["横連携","担当者間の協業も"]].map(([n,l]) => (
                <div key={l} className="bg-black/30 px-4 py-5 text-center">
                  <p className="text-xl font-medium text-white mb-1">{n}</p>
                  <p className="text-[10px] text-white/20 leading-tight">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONTACT CTA */}
      <section className="bg-[#F5F3EE] py-16 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#111111] text-white p-10 md:p-14 md:flex items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[8rem] font-bold text-white/[0.04] select-none pointer-events-none leading-none">→</div>
            <div className="relative z-10">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">Contact</p>
              <h2 className="text-3xl md:text-4xl font-medium mb-4 leading-tight">まずは、話しましょう。</h2>
              <p className="text-sm text-white/40 max-w-sm leading-relaxed">新規事業の壁を前に、立ち止まっていませんか。単発の壁打ちから、中長期の共創まで。</p>
            </div>
            <div className="relative z-10 mt-8 md:mt-0 shrink-0">
              <Link href="/contact" className="block px-10 py-4 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-100 transition-colors whitespace-nowrap text-center">
                お問い合わせ・壁打ちの申し込み
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
