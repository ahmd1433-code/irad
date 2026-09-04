import type { MetadataRoute } from "next";
import { articles } from "@/data/publisher";
import { normalizeSiteOrigin } from "@/lib/site-origin";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL ?? "");
  if (!base) return [];

  const paths = [
    "/",
    "/about",
    "/privacy",
    "/disclosure",
    "/contact",
    ...articles.map((article) => `/${article.slug}`),
  ];

  return paths.map((path) => ({
    url: path === "/" ? base : `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
