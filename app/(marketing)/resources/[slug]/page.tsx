import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  CheckCircle2,
  FileText,
  Download,
  Users,
  BookOpen,
} from "lucide-react";
import { ALL_RESOURCES, getResourceBySlug } from "@/lib/resources-data";
import DownloadGateForm from "@/components/resources/DownloadGateForm";

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return ALL_RESOURCES.map((r) => ({ slug: r.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return {
    title: resource.metaTitle,
    description: resource.metaDescription,
    alternates: { canonical: `/resources/${resource.slug}` },
  };
}

// ─── Category helpers ─────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  financial: "Financial",
  "real-estate": "Real Estate",
  legal: "Legal",
};

const CATEGORY_USE_CASES: Record<string, string[]> = {
  financial: [
    "You want to make smarter decisions with your money",
    "You are planning a major financial move — investment, loan, or insurance",
    "You want to reduce your tax outgo legally before the financial year ends",
  ],
  "real-estate": [
    "You are buying, selling, or registering property in Bangalore",
    "You need to complete government documentation for your property",
    "You want to protect yourself from common property fraud and disputes",
  ],
  legal: [
    "You need clarity on your legal rights before entering an agreement",
    "You are dealing with a dispute and want to understand your options",
    "You want to take the right steps without paying for a lawyer's first consultation",
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ResourceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const otherResources = ALL_RESOURCES.filter((r) => r.slug !== slug).slice(0, 3);
  const useCases = CATEGORY_USE_CASES[resource.category] ?? [];

  return (
    <>
      {/* ── Schema markup ────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: resource.title,
            description: resource.metaDescription,
            url: `https://rightassetsmanagement.com/resources/${resource.slug}`,
            publisher: {
              "@type": "Organization",
              name: "Right Assets Management",
              url: "https://rightassetsmanagement.com",
            },
            isAccessibleForFree: true,
            inLanguage: "en-IN",
          }),
        }}
      />

      <div
        style={{
          backgroundColor: "#F9F8F5",
          minHeight: "100vh",
          paddingTop: 32,
          paddingBottom: 80,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          {/* ── Breadcrumb ─────────────────────────────────────────────── */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "#64748B",
              marginBottom: 28,
              flexWrap: "wrap",
            }}
          >
            <Link href="/" style={{ color: "#64748B", textDecoration: "none" }}>
              Home
            </Link>
            <ChevronRight style={{ width: 14, height: 14 }} />
            <Link
              href="/resources"
              style={{ color: "#64748B", textDecoration: "none" }}
            >
              Free Resources
            </Link>
            <ChevronRight style={{ width: 14, height: 14 }} />
            <span style={{ color: "#1A1A1A", fontWeight: 500 }}>
              {resource.title}
            </span>
          </nav>

          {/* ── Two-column grid ────────────────────────────────────────── */}
          <div
            className="lg:grid lg:grid-cols-12 lg:gap-12"
            style={{ display: "block" }}
          >
            {/* ═══ LEFT COLUMN ═══════════════════════════════════════════ */}
            <div className="lg:col-span-7" style={{ marginBottom: 40 }}>

              {/* Category badge */}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 12px",
                  borderRadius: 999,
                  backgroundColor: resource.lightBg,
                  color: resource.color,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                <BookOpen style={{ width: 12, height: 12 }} />
                {CATEGORY_LABELS[resource.category]} Guide
              </span>

              {/* H1 */}
              <h1
                style={{
                  fontSize: "clamp(26px, 4vw, 38px)",
                  fontWeight: 800,
                  color: "#1B3A6B",
                  lineHeight: 1.2,
                  marginBottom: 12,
                }}
              >
                {resource.title}
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: 18,
                  color: "#64748B",
                  fontWeight: 400,
                  marginBottom: 20,
                  lineHeight: 1.5,
                }}
              >
                {resource.subtitle}
              </p>

              {/* Description */}
              <p
                style={{
                  fontSize: 15,
                  color: "#374151",
                  lineHeight: 1.75,
                  marginBottom: 40,
                }}
              >
                {resource.description}
              </p>

              {/* What's Inside */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #EEF0F3",
                  borderRadius: 16,
                  padding: "28px 32px",
                  marginBottom: 28,
                }}
              >
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#1B3A6B",
                    marginBottom: 20,
                  }}
                >
                  What You&apos;ll Learn in This Guide
                </h2>

                {/* Highlights */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {resource.highlights.map((point) => (
                    <li
                      key={point}
                      style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                    >
                      <CheckCircle2
                        style={{
                          width: 18,
                          height: 18,
                          color: "#C9A84C",
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      />
                      <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.5 }}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Stats strip */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0,
                    borderTop: "1px solid #F1F5F9",
                    paddingTop: 20,
                  }}
                >
                  {[
                    { label: `${resource.pages} Pages` },
                    { label: "Free Download" },
                    { label: "PDF Format" },
                    { label: "Instant Access" },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "0 16px",
                        borderRight:
                          i < 3 ? "1px solid #E2E8F0" : "none",
                        paddingLeft: i === 0 ? 0 : 16,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#1B3A6B",
                        }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* This Guide is For You If */}
              <div
                style={{
                  backgroundColor: resource.lightBg,
                  border: `1px solid ${resource.color}22`,
                  borderRadius: 16,
                  padding: "28px 32px",
                  marginBottom: 40,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  <Users
                    style={{ width: 20, height: 20, color: resource.color }}
                  />
                  <h2
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#1B3A6B",
                      margin: 0,
                    }}
                  >
                    This Guide is For You If...
                  </h2>
                </div>

                <p
                  style={{
                    fontSize: 14,
                    color: "#374151",
                    marginBottom: 16,
                    lineHeight: 1.6,
                  }}
                >
                  {resource.forWhom}
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {useCases.map((uc) => (
                    <li
                      key={uc}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: resource.color,
                          flexShrink: 0,
                          marginTop: 6,
                        }}
                      />
                      <span style={{ fontSize: 14, color: "#374151" }}>{uc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Document cover mockup */}
              <div
                style={{
                  background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
                  borderRadius: 16,
                  padding: "40px 36px",
                  position: "relative",
                  overflow: "hidden",
                  marginBottom: 16,
                }}
              >
                {/* Decorative circles */}
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -60,
                    left: -30,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    border: "1px solid rgba(201,168,76,0.1)",
                  }}
                />

                <div style={{ position: "relative" }}>
                  {/* Gold line */}
                  <div
                    style={{
                      width: 40,
                      height: 3,
                      backgroundColor: "#C9A84C",
                      borderRadius: 2,
                      marginBottom: 20,
                    }}
                  />

                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(201,168,76,0.8)",
                      marginBottom: 12,
                    }}
                  >
                    Right Assets Management
                  </p>

                  <h3
                    style={{
                      fontSize: "clamp(18px, 3vw, 26px)",
                      fontWeight: 800,
                      color: "#C9A84C",
                      lineHeight: 1.25,
                      marginBottom: 10,
                    }}
                  >
                    {resource.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.65)",
                      marginBottom: 24,
                    }}
                  >
                    {resource.subtitle}
                  </p>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 14px",
                      borderRadius: 999,
                      border: "1px solid rgba(201,168,76,0.4)",
                      backgroundColor: "rgba(201,168,76,0.1)",
                    }}
                  >
                    <FileText
                      style={{
                        width: 13,
                        height: 13,
                        color: "rgba(201,168,76,0.9)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 12,
                        color: "rgba(201,168,76,0.9)",
                        fontWeight: 600,
                      }}
                    >
                      {resource.pages}-Page Free Guide
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══ RIGHT COLUMN ══════════════════════════════════════════ */}
            <div className="lg:col-span-5">
              <DownloadGateForm resource={resource} />
            </div>
          </div>

          {/* ── Other free resources ────────────────────────────────────── */}
          <div style={{ marginTop: 64 }}>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#1B3A6B",
                marginBottom: 8,
              }}
            >
              Other Free Resources
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#64748B",
                marginBottom: 28,
              }}
            >
              Explore more practical guides from our advisors — all free to download.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {otherResources.map((r) => (
                <Link
                  key={r.slug}
                  href={`/resources/${r.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #EEF0F3",
                      borderRadius: 16,
                      overflow: "hidden",
                      transition: "box-shadow 0.2s, transform 0.2s",
                    }}
                    className="hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    {/* Colored band */}
                    <div
                      style={{
                        height: 6,
                        backgroundColor: r.color,
                      }}
                    />

                    <div style={{ padding: "20px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          borderRadius: 999,
                          backgroundColor: r.lightBg,
                          color: r.color,
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          marginBottom: 12,
                        }}
                      >
                        {CATEGORY_LABELS[r.category]}
                      </span>

                      <h3
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "#1A1A1A",
                          marginBottom: 6,
                          lineHeight: 1.3,
                        }}
                      >
                        {r.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#64748B",
                          marginBottom: 16,
                          lineHeight: 1.5,
                        }}
                      >
                        {r.subtitle}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 13,
                          fontWeight: 600,
                          color: r.color,
                        }}
                      >
                        <Download style={{ width: 14, height: 14 }} />
                        Download Free →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
