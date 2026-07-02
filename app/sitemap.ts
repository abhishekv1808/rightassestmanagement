import type { MetadataRoute } from "next";
import { allServices } from "@/lib/services-data";
import { allBlogPosts } from "@/lib/blog-data";
import { ALL_LOCALITIES } from "@/lib/localities-data";
import { ALL_RESOURCES } from "@/lib/resources-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rightassetsmanagement.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static core pages ──────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ── Vertical hub pages ─────────────────────────────────────────────────────
  const hubPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/financial`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/real-estate`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/legal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // ── Financial service pages ────────────────────────────────────────────────
  const financialPages: MetadataRoute.Sitemap = allServices
    .filter((s) => s.vertical === "financial")
    .map((s) => ({
      url: `${SITE_URL}/financial/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // ── Real estate service pages ──────────────────────────────────────────────
  const realEstatePages: MetadataRoute.Sitemap = allServices
    .filter((s) => s.vertical === "real-estate")
    .map((s) => ({
      url: `${SITE_URL}/real-estate/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // ── Legal service pages ────────────────────────────────────────────────────
  const legalPages: MetadataRoute.Sitemap = allServices
    .filter((s) => s.vertical === "legal")
    .map((s) => ({
      url: `${SITE_URL}/legal/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // ── Tools pages ────────────────────────────────────────────────────────────
  const toolSlugs = [
    "sip-calculator",
    "emi-calculator",
    "fd-calculator",
    "insurance-premium",
    "rent-yield",
  ];

  const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${SITE_URL}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Tools index + Success stories ──────────────────────────────────────────
  const secondaryPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/success-stories`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // ── Bangalore locality landing pages (local SEO) ───────────────────────────
  const bangalorePages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/bangalore`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...ALL_LOCALITIES.map((l) => ({
      url: `${SITE_URL}/bangalore/${l.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  // ── Free resources / guides (lead magnets) ─────────────────────────────────
  const resourcePages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...ALL_RESOURCES.map((r) => ({
      url: `${SITE_URL}/resources/${r.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  // ── Blog index + published posts ───────────────────────────────────────────
  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const blogPostPages: MetadataRoute.Sitemap = allBlogPosts
    .filter((p) => p.published)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    ...staticPages,
    ...hubPages,
    ...financialPages,
    ...realEstatePages,
    ...legalPages,
    ...toolPages,
    ...secondaryPages,
    ...bangalorePages,
    ...resourcePages,
    ...blogIndex,
    ...blogPostPages,
  ];
}
