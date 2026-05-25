import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ArrowDown,
  Download,
  CheckCircle2,
  BookOpen,
  FileText,
  Users,
  ShieldCheck,
} from "lucide-react";
import { ALL_RESOURCES } from "@/lib/resources-data";
import type { Resource } from "@/lib/resources-data";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Free Financial & Property Guides — Download Now | Right Asset Management",
  description:
    "Download free expert guides on financial planning, property transactions, and legal rights in Bangalore. Practical, jargon-free, and written by our advisors.",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  financial: "Financial",
  "real-estate": "Real Estate",
  legal: "Legal",
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  financial: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
  "real-estate": "linear-gradient(135deg, #0D7E7E 0%, #065858 100%)",
  legal: "linear-gradient(135deg, #6B46C1 0%, #4C2E8A 100%)",
};

// ─── Resource Card ────────────────────────────────────────────────────────────

function ResourceCard({ resource }: { resource: Resource }) {
  const gradient = CATEGORY_GRADIENTS[resource.category];

  return (
    <Link href={`/resources/${resource.slug}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #EEF0F3",
          borderRadius: 16,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "box-shadow 0.2s, transform 0.2s",
        }}
        className="hover:shadow-lg hover:-translate-y-1 transition-all"
      >
        {/* Colored gradient band */}
        <div
          style={{
            background: gradient,
            height: 80,
            padding: "16px 20px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <BookOpen
            style={{ width: 22, height: 22, color: "rgba(255,255,255,0.7)" }}
          />
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 10px",
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              fontSize: 11,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            <FileText style={{ width: 10, height: 10 }} />
            {resource.pages} pages
          </span>
        </div>

        {/* Card body */}
        <div
          style={{
            padding: "20px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Category pill */}
          <span
            style={{
              display: "inline-block",
              padding: "3px 10px",
              borderRadius: 999,
              backgroundColor: resource.lightBg,
              color: resource.color,
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginBottom: 10,
              alignSelf: "flex-start",
            }}
          >
            {CATEGORY_LABELS[resource.category]}
          </span>

          {/* Title */}
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.3,
              marginBottom: 6,
            }}
          >
            {resource.title}
          </h3>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 13,
              color: "#64748B",
              lineHeight: 1.5,
              marginBottom: 14,
            }}
          >
            {resource.subtitle}
          </p>

          {/* First 2 highlights */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {resource.highlights.slice(0, 2).map((h) => (
              <li
                key={h}
                style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
              >
                <CheckCircle2
                  style={{
                    width: 14,
                    height: 14,
                    color: resource.color,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                />
                <span style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>
                  {h}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div
            style={{
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 10,
              backgroundColor: resource.lightBg,
              justifyContent: "center",
            }}
          >
            <Download style={{ width: 14, height: 14, color: resource.color }} />
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: resource.color,
              }}
            >
              Download Free →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const validCategories = ["financial", "real-estate", "legal"] as const;
  type Category = (typeof validCategories)[number];

  const activeCategory: Category | "all" =
    category && (validCategories as readonly string[]).includes(category)
      ? (category as Category)
      : "all";

  const filteredResources =
    activeCategory === "all"
      ? ALL_RESOURCES
      : ALL_RESOURCES.filter((r) => r.category === activeCategory);

  const tabs: { label: string; value: string }[] = [
    { label: "All Guides", value: "all" },
    { label: "Financial", value: "financial" },
    { label: "Real Estate", value: "real-estate" },
    { label: "Legal", value: "legal" },
  ];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)",
          position: "relative",
          overflow: "hidden",
          paddingTop: "clamp(60px, 8vw, 100px)",
          paddingBottom: "clamp(60px, 8vw, 100px)",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.12)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.08)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "0 20px",
            position: "relative",
            textAlign: "center",
          }}
        >
          {/* Breadcrumb */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontSize: 13,
              color: "rgba(255,255,255,0.55)",
              marginBottom: 24,
            }}
          >
            <Link
              href="/"
              style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
            >
              Home
            </Link>
            <ChevronRight style={{ width: 14, height: 14 }} />
            <span style={{ color: "rgba(255,255,255,0.85)" }}>Free Resources</span>
          </nav>

          {/* Eyebrow pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              backgroundColor: "rgba(201,168,76,0.15)",
              border: "1px solid rgba(201,168,76,0.35)",
              marginBottom: 20,
            }}
          >
            <BookOpen style={{ width: 14, height: 14, color: "#C9A84C" }} />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#C9A84C",
              }}
            >
              8 Free Guides — No Cost, No Spam
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Free Expert Guides for Bangalore Residents
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.65,
              maxWidth: 620,
              margin: "0 auto 36px",
            }}
          >
            Download practical, jargon-free guides on financial planning, property
            transactions, and legal rights — written by our advisors.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#resources"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                borderRadius: 12,
                border: "1.5px solid rgba(255,255,255,0.4)",
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              <ArrowDown style={{ width: 16, height: 16 }} />
              View All Guides
            </a>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                borderRadius: 12,
                backgroundColor: "#C9A84C",
                color: "#1B3A6B",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats strip ───────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #EEF0F3",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 20px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
          className="grid-cols-2 sm:grid-cols-4"
        >
          {[
            { value: "8", label: "Free Guides" },
            { value: "3", label: "Topics Covered" },
            { value: "100+", label: "Pages of Content" },
            { value: "0", label: "Spam Ever" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: "24px 16px",
                textAlign: "center",
                borderRight:
                  i < 3 ? "1px solid #EEF0F3" : "none",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#1B3A6B",
                  marginBottom: 2,
                }}
              >
                {stat.value}
              </p>
              <p style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Resources grid ────────────────────────────────────────────── */}
      <div
        id="resources"
        style={{
          backgroundColor: "#F9F8F5",
          paddingTop: 60,
          paddingBottom: 80,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

          {/* Section heading */}
          <div style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 700,
                color: "#1B3A6B",
                marginBottom: 6,
              }}
            >
              All Free Resources
            </h2>
            <p style={{ fontSize: 14, color: "#64748B" }}>
              {filteredResources.length} guide
              {filteredResources.length !== 1 ? "s" : ""} available
              {activeCategory !== "all"
                ? ` in ${CATEGORY_LABELS[activeCategory]}`
                : ""}
            </p>
          </div>

          {/* Category filter tabs */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 36,
              flexWrap: "wrap",
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.value;
              return (
                <Link
                  key={tab.value}
                  href={
                    tab.value === "all"
                      ? "/resources"
                      : `/resources?category=${tab.value}`
                  }
                  style={{
                    display: "inline-block",
                    padding: "8px 18px",
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    backgroundColor: isActive ? "#1B3A6B" : "#FFFFFF",
                    color: isActive ? "#FFFFFF" : "#64748B",
                    border: `1.5px solid ${isActive ? "#1B3A6B" : "#E2E8F0"}`,
                    transition: "all 0.15s",
                  }}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          {/* Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.slug} resource={resource} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "64px 20px",
                color: "#64748B",
              }}
            >
              <BookOpen
                style={{
                  width: 40,
                  height: 40,
                  color: "#CBD5E1",
                  margin: "0 auto 12px",
                }}
              />
              <p style={{ fontSize: 15 }}>
                No guides found in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Trust strip ───────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #EEF0F3",
          paddingTop: 56,
          paddingBottom: 56,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 700,
              color: "#1B3A6B",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Why trust our guides?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: ShieldCheck,
                heading: "Written by SEBI-registered advisors",
                body: "Every guide is reviewed by our in-house financial and legal advisors to ensure accuracy and regulatory compliance.",
                color: "#1B3A6B",
                lightBg: "#EEF2F8",
              },
              {
                Icon: Users,
                heading: "Karnataka-specific advice",
                body: "Our guides cover Bangalore and Karnataka-specific procedures, stamp duties, and government portals — not generic national content.",
                color: "#0D7E7E",
                lightBg: "#E6F4F4",
              },
              {
                Icon: FileText,
                heading: "Updated for 2025–26",
                body: "All content reflects the latest tax slabs, stamp duty rates, RERA regulations, and government processes as of 2025–26.",
                color: "#6B46C1",
                lightBg: "#F0EBF9",
              },
            ].map((point) => (
              <div
                key={point.heading}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: point.lightBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <point.Icon
                    style={{ width: 22, height: 22, color: point.color }}
                  />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#1A1A1A",
                      marginBottom: 6,
                    }}
                  >
                    {point.heading}
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>
                    {point.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
          padding: "56px 20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: 10,
          }}
        >
          Need personalised advice beyond the guides?
        </p>
        <p
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.68)",
            marginBottom: 28,
            maxWidth: 480,
            margin: "0 auto 28px",
          }}
        >
          Our advisors offer a free first consultation — no commitment required.
        </p>
        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "13px 28px",
            borderRadius: 12,
            backgroundColor: "#C9A84C",
            color: "#1B3A6B",
            fontSize: 15,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Book Free Consultation →
        </Link>
      </div>
    </>
  );
}
