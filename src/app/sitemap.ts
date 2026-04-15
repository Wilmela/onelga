import { getNews } from "@/lib/actions/news.actions";
import { siteConfig } from "@/site-config";
import { NewsType } from "@/types";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news: NewsType[] = await getNews();
  const url = siteConfig.baseURL

  const newsEntries: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${url}/news/${n.slug}`,
    lastModified: n.createdAt ? new Date(n.createdAt) : new Date(),
    changeFrequency: "never" as const,
    priority: 0.6,
  }));

  return [
    {
      url: url,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${url}/about`,
      changeFrequency: "never" as const,
      priority: 0.8,
    },
    {
      url: `${url}/leadership`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${url}/leadership/councilors`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${url}/leadership/past-leaders`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${url}/contact`,
      changeFrequency: "never" as const,
      priority: 0.6,
    },
    {
      url: `${url}/portals`,
      changeFrequency: "never" as const,
      priority: 0.6,
    },
    {
      url: `${url}/news`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    {
      url: `${url}/projects`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },

    ...newsEntries,
  ];
}
