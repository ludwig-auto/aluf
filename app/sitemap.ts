import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://automationsludwig.se",
      lastModified: new Date("2026-03-01"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://automationsludwig.se/kontakt",
      lastModified: new Date("2026-03-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://automationsludwig.se/integritetspolicy",
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://automationsludwig.se/villkor",
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://automationsludwig.se/cookie-policy",
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
