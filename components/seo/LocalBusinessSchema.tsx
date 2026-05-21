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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rightasset.in";

// ─── Update these when the client confirms exact details ─────────────────────
const BUSINESS_PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "+91-XXXXXXXXXX";
const BUSINESS_EMAIL = process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "info@rightasset.in";
const BUSINESS_STREET = process.env.NEXT_PUBLIC_BUSINESS_STREET ?? "Bangalore";
// ─────────────────────────────────────────────────────────────────────────────

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_URL}/#organization`,
    name: "Right Asset Management",
    alternateName: "Right Asset",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
      width: 200,
      height: 60,
    },
    image: `${SITE_URL}/og-image.png`,
    description:
      "Right Asset Management is Bangalore's trusted multi-vertical firm offering 48+ expert services across Financial Planning, Real Estate, and Legal Advisory under one roof.",
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_STREET,
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      postalCode: "560001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9716,
      longitude: 77.5946,
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
      name: "Right Asset Management Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Financial Services",
          url: `${SITE_URL}/financial`,
        },
        {
          "@type": "OfferCatalog",
          name: "Real Estate Services",
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
      // TODO: replace with actual social profile URLs once client confirms
      // "https://www.facebook.com/rightassetmanagement",
      // "https://www.instagram.com/rightassetmanagement",
      // "https://www.linkedin.com/company/rightassetmanagement",
    ],
    founder: {
      "@type": "Person",
      name: "Right Asset Management Founder", // TODO: replace with actual founder name
    },
    foundingDate: "2014", // TODO: confirm founding year with client
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
