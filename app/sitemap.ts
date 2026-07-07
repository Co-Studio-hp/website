import type { MetadataRoute } from "next";

const BASE = "https://www.co-studio.co.jp";

// 静的ページのみ（NEWS/MEDIAの外部記事はPR TIMES/note側のURLのため含めない）
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/",                     priority: 1.0, changeFrequency: "weekly" },
  { path: "/service",              priority: 0.9, changeFrequency: "monthly" },
  { path: "/results",              priority: 0.8, changeFrequency: "monthly" },
  { path: "/portfolio",            priority: 0.8, changeFrequency: "monthly" },
  { path: "/portfolio/do-sukasu",  priority: 0.6, changeFrequency: "monthly" },
  { path: "/portfolio/aikomi",     priority: 0.6, changeFrequency: "monthly" },
  { path: "/portfolio/hers",       priority: 0.6, changeFrequency: "monthly" },
  { path: "/dezima",               priority: 0.8, changeFrequency: "monthly" },
  { path: "/news",                 priority: 0.7, changeFrequency: "daily" },
  { path: "/media",                priority: 0.7, changeFrequency: "daily" },
  { path: "/about",                priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact",              priority: 0.9, changeFrequency: "yearly" },
  { path: "/privacy",              priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
