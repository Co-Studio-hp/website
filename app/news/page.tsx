import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getOgImages } from "@/lib/og";
import { getPrtimesReleases, majorReleases, PR_COMPANIES } from "@/lib/prtimes";
import NewsList from "./NewsList";

const companyFilters = PR_COMPANIES.map((c) => ({ name: c.name, color: c.color }));

const categoryColor: Record<string, string> = {
  "資金調達": "bg-emerald-700 text-white",
  "設立": "bg-indigo-800 text-white",
  "M&A": "bg-purple-800 text-white",
  "上場": "bg-amber-600 text-white",
  "資本提携": "bg-sky-800 text-white",
  "業務提携": "bg-gray-700 text-white",
};

export const metadata: Metadata = {
  title: "NEWS | Co-Studio株式会社",
  description:
    "Co-Studioおよびポートフォリオ・グループ各社の新会社設立・資金調達・業務提携などのニュースリリースを横断的にまとめています。",
};

export default async function NewsPage() {
  const releases = await getPrtimesReleases();
  const featured = majorReleases(releases, 6);
  const ogMap = await getOgImages(featured.map((r) => r.url));

  return (
    <>
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">News</p>
        <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-6 leading-tight">
          ニュースリリース。
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
          Co-Studioおよびポートフォリオ・グループ各社の新会社設立・資金調達・業務提携などの公式リリース（PR TIMES）を横断的に掲載しています。
          イベントレポートやコラムなどの記事は
          <Link href="/media" className="underline hover:text-black">MEDIA</Link>
          ページをご覧ください。
        </p>
      </section>

      {/* Featured：各社の最新リリース */}
      {featured.length > 0 && (
        <section className="px-6 max-w-7xl mx-auto pb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">Pick Up</p>
          <h2 className="text-2xl font-medium mb-8">資金調達・設立・提携などの主要ニュース</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-gray-100 hover:border-black transition-colors overflow-hidden"
              >
                <div className="relative aspect-[16/9] bg-gray-100">
                  {ogMap[r.url] && (
                    <Image
                      src={ogMap[r.url] as string}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  )}
                  <span className={`absolute top-3 left-3 text-xs px-2 py-1 font-medium ${categoryColor[r.category] ?? "bg-black text-white"}`}>
                    {r.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-0.5 font-medium ${r.color}`}>{r.company}</span>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <h3 className="text-sm font-medium leading-relaxed text-gray-700 group-hover:text-black transition-colors">{r.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 全リリース（会社フィルタ付き） */}
      <section className="bg-gray-50 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">All Releases</p>
          {releases.length > 0 ? (
            <NewsList releases={releases} companies={companyFilters} />
          ) : (
            <p className="text-sm text-gray-400">リリースを読み込めませんでした。時間をおいて再度お試しください。</p>
          )}
        </div>
      </section>

      <section className="border-t border-gray-100 py-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-medium mb-4">Co-Studioと一緒に、事業を作りませんか。</h2>
        <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
          新規事業の壁打ちから、出島による事業化まで。まずはお気軽にご相談ください。
        </p>
        <Link href="/contact" className="inline-block px-10 py-4 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors font-medium">
          お問い合わせ
        </Link>
      </section>
    </>
  );
}
