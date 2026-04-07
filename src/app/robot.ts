import { siteConfig } from "@/site-config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/*", "/auth/*"],
    },
    sitemap: `${siteConfig.baseURL}/sitemap.xml`,
  };
}
