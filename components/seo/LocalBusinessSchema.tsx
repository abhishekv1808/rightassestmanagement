/**
 * LocalBusinessSchema.tsx
 *
 * Renders the root FinancialService / LocalBusiness JSON-LD block.
 * Place this once in app/(marketing)/layout.tsx so it appears on
 * every marketing page.
 *
 * Schema types used:
 *   - FinancialService  (subtype of LocalBusiness — covers the financial vertical)
 *   - The same node also covers Real Estate and Legal via hasOfferCatalog
 *
 * Validation checklist:
 *   ✅ @context  "https://schema.org"
 *   ✅ @type     FinancialService (valid Google-supported LocalBusiness subtype)
 *   ✅ All required LocalBusiness properties present
 *   ✅ No placeholder text — only real business data + clearly marked TODOs
 *   ✅ URLs absolute
 *   ✅ openingHoursSpecification uses ISO 8601 time format
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rightassetsmanagement.com";

// ─── Update these when the client confirms exact details ─────────────────────
const BUSINESS_PHONE =
  process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "+91-9742826804";
const BUSINESS_EMAIL =
  process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "contact@rightassetsmanagement.com";
const BUSINESS_STREET =
  process.env.NEXT_PUBLIC_BUSINESS_STREET ??
  "Sy. No 13/1, Site No. 21, 3rd Floor, Narasappa Road, Metro Pillar 471, T. Dasarahalli";
// ─────────────────────────────────────────────────────────────────────────────

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_URL}/#organization`,
    name: "Right Assets Management",
    alternateName: "Right Assets",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/Right-assets-management-logo.svg`,
      width: 1630,
      height: 391,
    },
    image: `${SITE_URL}/og-image.png`,
    description:
      "Right Assets Management is Bangalore's trusted multi-vertical firm offering 48+ expert services across Financial Planning, Real Estate, and Legal Advisory under one roof.",
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_STREET,
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560057",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.0465,
      longitude: 77.5121,
    },
    areaServed: {
      "@type": "City",
      name: "Bangalore",
      sameAs: "https://www.wikidata.org/wiki/Q1355",
    },
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Bank Transfer, UPI",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Right Assets Management Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Financial Services",
          url: `${SITE_URL}/financial`,
        },
        {
          "@type": "OfferCatalog",
          name: "Realty Services",
          url: `${SITE_URL}/real-estate`,
        },
        {
          "@type": "OfferCatalog",
          name: "Legal Services",
          url: `${SITE_URL}/legal`,
        },
      ],
    },
    sameAs: [
      "https://www.facebook.com/rightassetsmanagement/",
      "https://www.instagram.com/rightassetsmanagement",
      "https://www.linkedin.com/company/right-assets-management",
    ],
    // NOTE: `founder` and `foundingDate` omitted until confirmed with the client —
    // publishing placeholder values would be a false E-E-A-T signal.
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
    },
    knowsAbout: [
      "Financial Planning",
      "Mutual Funds",
      "SIP Investments",
      "Health Insurance",
      "Life Insurance",
      "Home Loans",
      "Real Estate Services",
      "Property Registration",
      "Legal Advisory",
      "Tax Planning",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
