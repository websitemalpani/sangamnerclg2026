import type { MetadataRoute } from "next";
import { getLegacySlugs } from "@/lib/legacy-pages";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sangamnercollege.edu.in";
const dedicatedRoutes = ["", "arts", "commerce", "departments", "library", "photo-gallery", "science", "vocational-degrees"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...new Set([...dedicatedRoutes, ...getLegacySlugs()])];
  return routes.map((route) => ({
    url: route ? `${siteUrl}/${route}` : siteUrl,
    changeFrequency: route ? "monthly" : "weekly",
    priority: route ? 0.7 : 1,
  }));
}
