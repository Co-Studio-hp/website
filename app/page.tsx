import Link from "next/link";

const clients = [
  "アース製薬", "塩野義製薬", "フィリップス", "NTT西日本", "エーザイ",
  "旭化成ファーマ", "小野薬品", "ダイキン", "デンカ", "学研",
  "ロート製薬", "大正製薬", "住友ファーマ", "OMRON", "味の素",
  "三井物産", "東京ガス", "ENEOS", "三井不動産", "サントリー",
  "JT", "キリン", "SOMPO", "神戸新聞", "福岡地所",
  "日産化学", "MITSUI&CO.", "Wismettac", "Gakken", "YUTAKA",
];

const services = [
  {
    phase: "0→1",
    title: "新規事業の種を育てる",
    body: "アイデアの探索からビジネスモデル設計、PoC実施まで。正解のない問いに向き合い、事業の「芽」を確かにします。",
    programs: ["SPRINT", "BUSINESS LAB", "LIVING LAB"],
  },
  {
    phase: "1→10",
    title: "外で事業を育てる",
    body: "大企業の資産を活かしながら、組織の外に出島スタートアップを設立。ガバナンスの制約を外し、スピードと柔軟性で事業化を加速します。",
    programs: ["Co-DEZIMA"],
  },
  {
    phase: "Spot",
    title: "今すぐ壁打ちしたい",
    body: "具体的な課題を持つ担当者向けの単発セッション。短時間で論点を整理し、次の一手を見つけます。",
    programs: ["Spot Assist"],
  },
];

const differentiators = [
  {
    title: "支援ではなく、共創",
    body: "私たちは答えを売りません。自らリスクを取り、事業化の果実（株式・ROI）を共に追求します。担当者の「想い」が社会に実装されるまで、走り続けます。",
  },
  {
    title: "External R&D という思想",
    body: "大企業のオペレーションから一部離脱させ、外部環境でR&Dを実行する。「出島方式」により、ガバナンスの制約なく新結合を引き寄せます。",
  },
  {
    title: "7年間の実績と知見",
    body: "50社以上の大企業・中小企業・自治体支援を通じて蓄積した、0→1フェーズ特有のノウハウ・ネットワーク・失敗知識を全て投入します。",
  },
];

const portfolios = [
  {
    name: "do.Sukasu",
    tags: ["ヘルスケア", "教育", "自動車"],
    parent: "住友ファーマ",
    body: "視空間認知技術を活用し、ヘルスケア・教育・運転支援領域で展開。住友ファーマから出島し、シードラウンドで4,500万円を調達。",
  },
  {
    name: "エナフォワード",
    tags: ["美容", "SaaS"],
    parent: "ENEOS",
    body: "美容師と顧客をつなぐコミュニケーションアプリ「ビーネ」を開発。ENEOSから出島し、設立2年で100店舗への導入を達成。",
  },
  {
    name: "Aikomi",
    tags: ["認知症ケア", "AI"],
    parent: "武田薬品",
    body: "AIを活用した認知症ケア向けデジタルセラピーを提供。武田薬品から出島し、医療・介護現場に展開中。",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[88vh] flex flex-col justify-center px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">Open Studio for Innovation</p>
        <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight mb-8">
          創ろう、共に、<br />未来から。
        </h1>
        <p className="text-base md:text-lg text-gray-500 max-w-xl leading-relaxed mb-12">
          Co-Studioは、大企業の新規事業開発を「共に走る」オープンスタジオです。<br className="hidden md:block" />
          コンサルとは異なり、自らリスクを取って事業化の果実を共に目指します。
        </p>
        <div className="flex flex-wrap gap-12 mb-12">
          {[
            { num: "7年", label: "の実績" },
            { num: "50社+", label: "の支援実績" },
            { num: "7社", label: "の出島スタートアップ" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-light tracking-tight">{s.num}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 flex-wrap">
          <Link href="/service" className="px-8 py-3 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors">
            サービスを見る
          </Link>
          <Link href="/contact" className="px-8 py-3 border border-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors">
            お問い合わせ
          </Link>
        </div>
      </section>

      {/* Clients */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-8">Clients</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {clients.map((c) => (
              <span key={c} className="text-sm text-gray-500">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Services</p>
        <h2 className="text-3xl md:text-4xl font-light mb-4">
          事業フェーズに合わせた、<br />3つの支援軸。
        </h2>
        <p className="text-sm text-gray-500 mb-16 max-w-lg">
          0→1の種まきから、1→10の事業化まで、一貫して共に動きます。
        </p>
        <div className="grid md:grid-cols-3 gap-px bg-gray-200">
          {services.map((s) => (
            <div key={s.phase} className="bg-white p-8 hover:bg-gray-50 transition-colors">
              <p className="text-4xl font-light text-gray-100 mb-4">{s.phase}</p>
              <h3 className="text-base font-medium mb-3">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">{s.body}</p>
              <div className="flex flex-wrap gap-2">
                {s.programs.map((p) => (
                  <span key={p} className="text-xs border border-gray-200 px-2 py-1 text-gray-400">{p}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-right">
          <Link href="/service" className="text-xs tracking-widest uppercase border-b border-black pb-0.5 hover:opacity-60 transition-opacity">
            サービス詳細 →
          </Link>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-light mb-16 max-w-xl">
            Co-Studioは、コンサルでも<br />投資会社でもありません。
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {differentiators.map((d, i) => (
              <div key={d.title}>
                <p className="text-6xl font-light text-gray-100 mb-4 leading-none">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-base font-medium mb-3">{d.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Portfolio</p>
        <h2 className="text-3xl md:text-4xl font-light mb-4">
          出島スキームから生まれた、<br />7社の独立スタートアップ。
        </h2>
        <p className="text-sm text-gray-500 mb-16 max-w-lg">
          大企業のリソースと、スタートアップのスピードが交わる場所で、事業は生まれます。
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {portfolios.map((p) => (
            <div key={p.name} className="border border-gray-100 p-8 hover:border-gray-300 transition-colors">
              <p className="text-xs text-gray-400 mb-1">← {p.parent}</p>
              <h3 className="text-xl font-light mb-3">{p.name}</h3>
              <div className="flex flex-wrap gap-1 mb-4">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs bg-gray-50 px-2 py-0.5 text-gray-400">{t}</span>
                ))}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Night DEZIMA */}
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start md:items-center">
          <div className="flex-1">
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Community</p>
            <h2 className="text-3xl md:text-4xl font-light mb-6">Night DEZIMA</h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-lg">
              大企業の新規事業担当者が集まる、定期交流イベント。業種・会社を超えて、
              同じ課題を抱えるイントレプレナーたちがつながります。<br /><br />
              現在、<strong className="text-white">30社超の大企業担当者</strong>が参加。
              「諦めない仕組み」を共に作るコミュニティです。
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link href="/contact" className="inline-block px-8 py-3 border border-white text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
              コミュニティについて →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Contact</p>
        <h2 className="text-3xl md:text-4xl font-light mb-6">まずは、話しましょう。</h2>
        <p className="text-sm text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
          新規事業の壁を前に、立ち止まっていませんか。<br />
          Co-Studioでは、初回の壁打ちから中長期の共創まで、あなたの状況に合わせてご提案します。
        </p>
        <Link href="/contact" className="inline-block px-10 py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors">
          お問い合わせ・壁打ちの申し込み
        </Link>
      </section>
    </>
  );
}
