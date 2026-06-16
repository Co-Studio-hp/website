import type { Metadata } from "next";
import { getNoteArticles, NOTE_URL, type NoteArticle } from "@/lib/note";

export const metadata: Metadata = {
  title: "MEDIA | Co-Studio株式会社",
  description:
    "Co-Studioのオウンドメディア、共同プロジェクト記事、インタビュー、イベントレポートをまとめています。",
};

const categoryColor: Record<string, string> = {
  "共同プロジェクト": "bg-black text-white",
  "Night DEZIMA": "bg-indigo-900 text-white",
  "インタビュー": "bg-emerald-900 text-white",
  "登壇・イベント": "bg-gray-800 text-white",
  "コラム": "bg-gray-100 text-gray-600",
};

function catClass(category: string) {
  return categoryColor[category] ?? "bg-gray-100 text-gray-600";
}

export default async function MediaPage() {
  const articles = await getNoteArticles();
  const featured = articles.slice(0, 3);
  const rest = articles.slice(3);

  return (
    <>
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">Media</p>
        <h1 className="text-5xl md:text-6xl font-normal tracking-tight mb-6 leading-tight">
          Co-Studioの<br />活動記録。
        </h1>
        <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
          共同プロジェクトのレポート、Night DEZIMAの開催記録、コラムなどをまとめています。
          記事は<a href={NOTE_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-black">公式note</a>で発信しており、このページは自動で最新記事を表示します。
        </p>
      </section>

      {articles.length === 0 ? (
        // RSS取得に失敗した場合のフォールバック
        <section className="px-6 max-w-7xl mx-auto pb-24">
          <div className="border border-gray-100 p-10 text-center">
            <p className="text-sm text-gray-500 mb-6">
              記事を読み込めませんでした。最新の記事はnoteでご覧ください。
            </p>
            <a
              href={NOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors font-medium"
            >
              noteを見る →
            </a>
          </div>
        </section>
      ) : (
        <>
          {/* Featured（最新3本・サムネイル付き） */}
          <section className="px-6 max-w-7xl mx-auto pb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">Featured</p>
            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((a: NoteArticle) => (
                <a
                  key={a.link}
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-100 hover:border-black transition-colors group block overflow-hidden"
                >
                  {a.thumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={a.thumbnail}
                      alt=""
                      className="w-full aspect-[16/9] object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-xs px-2 py-1 font-medium ${catClass(a.category)}`}>
                        {a.category}
                      </span>
                      <span className="text-xs text-gray-300 group-hover:text-black transition-colors">→</span>
                    </div>
                    <h3 className="text-sm font-medium leading-relaxed mb-4">{a.title}</h3>
                    <p className="text-xs text-gray-400">{a.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* 最新記事一覧 */}
          <section className="bg-gray-50 py-14 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-8">
                <p className="text-xs tracking-[0.3em] uppercase text-gray-400">最新記事</p>
                <a
                  href={NOTE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.2em] uppercase border-b border-gray-400 pb-0.5 hover:border-black text-gray-500 hover:text-black transition-colors font-medium"
                >
                  noteで全て読む →
                </a>
              </div>
              <div className="space-y-0">
                {rest.map((a: NoteArticle) => (
                  <a
                    key={a.link}
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 md:gap-6 items-start py-5 border-b border-gray-200 hover:bg-white transition-colors group px-4 -mx-4"
                  >
                    <span className={`text-xs px-2 py-1 shrink-0 font-medium ${catClass(a.category)}`}>
                      {a.category}
                    </span>
                    <p className="text-sm text-gray-700 group-hover:text-black transition-colors flex-1">{a.title}</p>
                    <p className="text-xs text-gray-400 shrink-0 hidden md:block">{a.date}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Note CTA */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="border border-gray-100 p-10 md:p-16 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">Official Note</p>
            <h2 className="text-2xl font-normal mb-2">note.com/co_studio</h2>
            <p className="text-sm text-gray-500">イベントレポート・コラム・共同プロジェクト記事を定期発信中。</p>
          </div>
          <a
            href={NOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-3.5 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors font-medium"
          >
            noteをフォローする →
          </a>
        </div>
      </section>
    </>
  );
}
