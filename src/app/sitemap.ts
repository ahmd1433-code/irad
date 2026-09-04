import type { MetadataRoute } from "next";
import { articles } from "@/data/publisher";
import { normalizeSiteOrigin } from "@/lib/site-origin";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? "");
  if (!base) return [];

  const paths = [
    "/site",
    "/site/about",
    "/site/privacy",
    "/site/disclosure",
    "/site/contact",
    ...articles.map((article) => `/site/${article.slug}`),
  ];

  return paths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "/site" ? 1 : 0.7,
  }));
}
