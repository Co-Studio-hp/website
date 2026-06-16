// 任意のURLからOGP画像（og:image）を取得するユーティリティ。
// note・Wix記事などのサムネイルを、サイト側でカード表示するために使う。
// ビルド時に取得し1週間キャッシュ（記事のサムネはほぼ変わらないため）。

export async function getOgImage(url: string): Promise<string | null> {
  if (!url || !url.startsWith("http")) return null;
  try {
    const res = await fetch(url, {
      next: { revalidate: 604800 }, // 1週間
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; co-studio-hp/1.0; +https://co-studio.co.jp)",
      },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const m =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    return m ? m[1].replace(/&amp;/g, "&") : null;
  } catch {
    return null;
  }
}

/** 複数URLのOGP画像をまとめて取得。URL→画像URL（取得失敗はnull）のMapをPromiseで返す。 */
export async function getOgImages(urls: string[]): Promise<Record<string, string | null>> {
  const unique = Array.from(new Set(urls.filter((u) => u && u.startsWith("http"))));
  const entries = await Promise.all(
    unique.map(async (u) => [u, await getOgImage(u)] as const)
  );
  return Object.fromEntries(entries);
}
