/**
 * ServiceSchema.tsx
 *
 * Renders three JSON-LD blocks for every service page:
 *
 *   1. schema.org/Service        — the core service entity
 *   2. schema.org/FAQPage        — from the service's faqs array
 *                                  (benefits AI/LLM citations on commercial sites;
 *                                   Google rich results restricted to gov/health)
 *   3. schema.org/BreadcrumbList — 3-item path: Home > [Vertical Hub] > [Service]
 *
 * Usage (in any [service]/page.tsx):
 *
 *   import ServiceSchema from "@/components/seo/ServiceSchema";
 *   // inside the JSX return, before the first visible section:
 *   <ServiceSchema service={svc} />
 *
 * Validation checklist:
 *   ✅ @context  "https://schema.org"
 *   ✅ @type     Service, FAQPage, BreadcrumbList — all valid and not deprecated
 *   ✅ Required properties present on each type
 *   ✅ URLs are absolute
 *   ✅ FAQPage: mainEntity items use Question + acceptedAnswer
 *   ✅ BreadcrumbList: position values are 1-indexed integers
 */

import type { Service } from "@/lib/services-data";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rightassetsmanagement.com";

/** Maps the Service vertical to its hub label and URL path. */
const VERTICAL_META: Record<
  Service["vertical"],
  { label: string; path: string }
> = {
  financial: { label: "Financial Services", path: "financial" },
  "real-estate": { label: "Realty Services", path: "real-estate" },
  legal: { label: "Legal Services", path: "legal" },
};

/** Maps vertical to the most accurate schema.org Service subtype. */
const VERTICAL_SERVICE_TYPE: Record<Service["vertical"], string> = {
  financial: "FinancialProduct",       // closest for financial advisory
  "real-estate": "RealEstateAgent",    // real estate services
  legal: "LegalService",               // legal advisory
};

// ─── Props ───────────────────────────────────────────────────────────────────

interface ServiceSchemaProps {
  service: Service;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ServiceSchema({ service }: ServiceSchemaProps) {
  const verticalMeta = VERTICAL_META[service.vertical];
  const serviceUrl = `${SITE_URL}/${verticalMeta.path}/${service.slug}`;
  const hubUrl = `${SITE_URL}/${verticalMeta.path}`;

  // ── 1. Service schema ─────────────────────────────────────────────────────
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}/#service`,
    name: service.title,
    description: service.description || service.tagline,
    url: serviceUrl,
    serviceType: service.title,
    provider: {
      "@type": "FinancialService",
      "@id": `${SITE_URL}/#organization`,
      name: "Right Assets Management",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Global",
    },
    audience: {
      "@type": "Audience",
      audienceType: service.whoIsItFor.length > 0
        ? service.whoIsItFor.join(", ")
        : "Individuals and businesses",
    },
    ...(service.benefits.length > 0 && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.title} — Key Benefits`,
        itemListElement: service.benefits.map((benefit, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: benefit,
        })),
      },
    }),
    // Link back to the vertical hub as the parent service
    isPartOf: {
      "@type": "Service",
      name: verticalMeta.label,
      url: hubUrl,
      provider: {
        "@type": "FinancialService",
        "@id": `${SITE_URL}/#organization`,
        name: "Right Assets Management",
      },
    },
    offers: {
      "@type": "Offer",
      url: serviceUrl,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "FinancialService",
        name: "Right Assets Management",
        url: SITE_URL,
      },
    },
  };

  // ── 2. FAQPage schema ─────────────────────────────────────────────────────
  // Note: Google rich results for FAQPage are restricted to gov/health sites
  // (August 2023). This schema still benefits AI/LLM citations and
  // Bing / other search engines. Keep it — do not remove.
  const faqSchema =
    service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${serviceUrl}/#faq`,
          name: `${service.title} — Frequently Asked Questions`,
          url: serviceUrl,
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  // ── 3. BreadcrumbList schema ──────────────────────────────────────────────
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${serviceUrl}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: verticalMeta.label,
        item: hubUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: serviceUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
