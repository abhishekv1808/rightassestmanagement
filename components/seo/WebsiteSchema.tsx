/**
 * WebsiteSchema.tsx
 *
 * Renders the root WebSite JSON-LD node, linked to the Organization node
 * defined in LocalBusinessSchema.tsx via matching @id. This reinforces the
 * site-as-entity signal Google uses for brand search results and Knowledge
 * Panels — separate from (and complementary to) individual page metadata.
 *
 * No SearchAction is declared: the site has no server-rendered /search?q=
 * results page (the header search is a client-side command palette), and
 * declaring a SearchAction without a working target is invalid structured
 * data. Add one only after a real search results route exists.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rightassetsmanagement.com";

export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Right Assets Management",
    url: SITE_URL,
    inLanguage: "en",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
