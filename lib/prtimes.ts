// PR TIMES の企業別フィード（companyrdf.php）を集約するユーティリティ。
// Co-Studio + ポートフォリオ/グループ各社のプレスリリースを横断取得し、
// 日付の新しい順にマージして返す。1日ごとに自動更新（新リリースは自動反映）。

export type PrCompany = { id: string; name: string; color: string };

// 各社の PR TIMES 企業ID。新しいグループ会社が増えたらここに1行追加するだけ。
export const PR_COMPANIES: PrCompany[] = [
  { id: "59402", name: "Co-Studio", color: "bg-black text-white" },
  { id: "66976", name: "do.Sukasu", color: "bg-blue-950 text-white" },
  { id: "115817", name: "Aikomi", color: "bg-green-900 text-white" },
  { id: "129383", name: "エナフォワード", color: "bg-orange-900 text-white" },
  { id: "166603", name: "Hers HeAlth", color: "bg-pink-900 text-white" },
  { id: "77755", name: "Life Reversal Gaming", color: "bg-red-900 text-white" },
  { id: "91514", name: "Comunion", color: "bg-amber-700 text-white" },
];

// 自社アカウントに無いが重要なリリース（Hers設立は旭化成ファーマのアカウント発行）。
const EXTRA_RELEASES: { company: string; title: string; url: string; iso: string }[] = [
  {
    company: "Hers HeAlth",
    title:
      "旭化成ファーマ発ヘルスケアベンチャー「Hers HeAlth Technologies Inc.」を設立",
    url: "https://prtimes.jp/main/html/rd/p/000000191.000079452.html",
    iso: "2025-05-23",
  },
];

export type PrRelease = {
  title: string;
  url: string;
  date: string; // 表示用 2026.01.20
  iso: string; // ソート用 2026-01-20
  company: string;
  color: string;
  excerpt: string;
};

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function fmt(iso: string): string {
  const m = iso.match(/(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[1]}.${m[2]}.${m[3]}` : iso;
}

function colorOf(name: string): string {
  return PR_COMPANIES.find((c) => c.name === name)?.color ?? "bg-gray-100 text-gray-600";
}

function parseFeed(xml: string, company: PrCompany): PrRelease[] {
  const chunks = xml.split(/<item[\s>]/).slice(1);
  const out: PrRelease[] = [];
  for (const chunk of chunks) {
    const body = chunk.split(/<\/item>/)[0];
    const link = (body.match(/<link>([^<]+)<\/link>/)?.[1] ?? "").trim();
    if (!link.includes("/main/html/rd/p/")) continue;
    const title = decode(body.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
    const iso = (body.match(/<dc:date>([^<]+)<\/dc:date>/)?.[1] ?? "").trim().slice(0, 10);
    let excerpt = decode(body.match(/<description>([\s\S]*?)<\/description>/)?.[1] ?? "");
    excerpt = excerpt.replace(/^\[[^\]]*\]\s*/, ""); // 先頭の[会社名]を除去
    if (!title || !iso) continue;
    out.push({
      title,
      url: link,
      date: fmt(iso),
      iso,
      company: company.name,
      color: company.color,
      excerpt,
    });
  }
  return out;
}

async function fetchFeed(company: PrCompany): Promise<PrRelease[]> {
  try {
    const res = await fetch(`https://prtimes.jp/companyrdf.php?company_id=${company.id}`, {
      next: { revalidate: 86400 }, // 1日
      headers: { "User-Agent": "Mozilla/5.0 (compatible; co-studio-hp/1.0)" },
    });
    if (!res.ok) return [];
    return parseFeed(await res.text(), company);
  } catch {
    return [];
  }
}

/** 全社のリリースを横断取得し、新しい順にマージして返す。 */
export async function getPrtimesReleases(): Promise<PrRelease[]> {
  const lists = await Promise.all(PR_COMPANIES.map(fetchFeed));
  const all = lists.flat();

  // 自社アカウント外の重要リリースを追加
  for (const e of EXTRA_RELEASES) {
    all.push({
      title: e.title,
      url: e.url,
      date: fmt(e.iso),
      iso: e.iso,
      company: e.company,
      color: colorOf(e.company),
      excerpt: "",
    });
  }

  // URL重複排除
  const seen = new Set<string>();
  const deduped = all.filter((r) => {
    if (seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });

  deduped.sort((a, b) => (a.iso < b.iso ? 1 : a.iso > b.iso ? -1 : 0));
  return deduped;
}

/** 各社の最新1件。 */
export function latestPerCompany(releases: PrRelease[]): PrRelease[] {
  const seen = new Set<string>();
  const out: PrRelease[] = [];
  for (const r of releases) {
    if (seen.has(r.company)) continue;
    seen.add(r.company);
    out.push(r);
  }
  return out;
}

export type MajorRelease = PrRelease & { category: string };

// タイトルから「大きめのニュース」を判定。weightが高いほど重要（資金調達・設立を優先）。
const MAJOR_RULES: { cat: string; weight: number; re: RegExp }[] = [
  { cat: "資金調達", weight: 3, re: /資金調達|増資|シリーズ\s?[A-Za-z]|プレシリーズ|シードラウンド|募集額を達成/ },
  { cat: "設立", weight: 3, re: /設立|創業|誕生|新会社|新法人/ },
  { cat: "M&A", weight: 3, re: /株式取得|買収|M&A|EXIT|事業譲渡/ },
  { cat: "上場", weight: 3, re: /上場|IPO/ },
  { cat: "資本提携", weight: 2, re: /資本提携|資本業務提携/ },
  { cat: "業務提携", weight: 1, re: /業務提携/ },
];

function classifyMajor(title: string): { cat: string; weight: number } | null {
  for (const rule of MAJOR_RULES) {
    if (rule.re.test(title)) return { cat: rule.cat, weight: rule.weight };
  }
  return null;
}

/**
 * 資金調達・会社設立・提携などの主要ニュースを重要度→新しさの順で抽出（Featured表示用）。
 */
export function majorReleases(releases: PrRelease[], limit = 8): MajorRelease[] {
  const scored = releases
    .map((r) => {
      const c = classifyMajor(r.title);
      return c ? { ...r, category: c.cat, _w: c.weight } : null;
    })
    .filter((r): r is MajorRelease & { _w: number } => r !== null);

  scored.sort((a, b) => (b._w - a._w) || (a.iso < b.iso ? 1 : a.iso > b.iso ? -1 : 0));

  return scored.slice(0, limit).map(({ _w, ...rest }) => {
    void _w;
    return rest;
  });
}
