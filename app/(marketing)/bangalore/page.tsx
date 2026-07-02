import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Building2,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { ALL_LOCALITIES } from "@/lib/localities-data";

// ─── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  alternates: { canonical: "/bangalore" },
  title:
    "Right Assets Management — Financial, Real Estate & Legal Services Across Bangalore",
  description:
    "Right Assets Management serves 15 key localities across Bangalore — Whitefield, Koramangala, Indiranagar, HSR Layout, Jayanagar, and more. Find expert financial, real estate, and legal services near you.",
  openGraph: {
    title:
      "Financial, Real Estate & Legal Services Across Bangalore — Right Assets Management",
    description:
      "Serving 15 Bangalore localities — investments, property, and legal advisory near you.",
    url: "https://rightassetsmanagement.com/bangalore",
    type: "website",
  },
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function BangaloreIndexPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)",
        }}
      >
        {/* Gold grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.04 }}
          >
            <defs>
              <pattern
                id="blr-grid"
                x="0"
                y="0"
                width="56"
                height="56"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 56 0 L 0 0 0 56"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blr-grid)" />
          </svg>
          <div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-sm mb-6"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#C9A84C" }}>Bangalore</span>
          </nav>

          <div className="max-w-3xl">
            {/* Eyebrow pill */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
              style={{
                backgroundColor: "rgba(201,168,76,0.15)",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            >
              <MapPin className="w-3.5 h-3.5" />
              15 Localities · Pan Bangalore
            </div>

            <h1
              className="font-heading font-bold text-white mb-4"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                lineHeight: 1.15,
              }}
            >
              Right Assets Management —{" "}
              <span style={{ color: "#C9A84C" }}>Serving All of Bangalore</span>
            </h1>

            <p
              className="text-lg mb-8 max-w-2xl"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              Find our financial, real estate &amp; legal services near your
              locality. From Whitefield to Malleshwaram, we bring expert
              advisory to every corner of Bangalore.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
              >
                Book a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919742826804"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "white",
                }}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats strip ───────────────────────────────────────────────────── */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: "Localities Served", value: "15+" },
              { label: "Services Offered", value: "48+" },
              { label: "Clients Helped", value: "500+" },
              { label: "Years Experience", value: "10+" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <p
                  className="font-heading font-bold text-2xl"
                  style={{ color: "#1B3A6B" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs font-medium" style={{ color: "#64748B" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Localities grid ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: "#F9F8F5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#C9A84C" }}
              >
                Localities
              </p>
              <div
                className="h-px"
                style={{ backgroundColor: "#C9A84C", width: "60px" }}
              />
            </div>
            <h2
              className="font-heading font-bold mb-2"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                color: "#1A1A1A",
              }}
            >
              Find Services Near{" "}
              <span style={{ color: "#C9A84C" }}>Your Neighbourhood</span>
            </h2>
            <p className="text-sm max-w-lg" style={{ color: "#64748B" }}>
              Select your locality to see the most relevant financial, real
              estate, and legal services, along with local property insights and
              area-specific FAQs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALL_LOCALITIES.map((locality) => (
              <Link
                key={locality.slug}
                href={`/bangalore/${locality.slug}`}
                className="group flex flex-col gap-4 bg-white rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-heading font-bold text-lg leading-tight"
                      style={{ color: "#1A1A1A" }}
                    >
                      {locality.name}
                    </h3>
                    <p
                      className="text-xs font-semibold mt-0.5 uppercase tracking-wide"
                      style={{ color: "#C9A84C" }}
                    >
                      {locality.areaType}
                    </p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#EEF2F8" }}
                  >
                    <Building2
                      className="w-5 h-5"
                      style={{ color: "#1B3A6B" }}
                    />
                  </div>
                </div>

                {/* Tagline */}
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "#64748B" }}
                >
                  {locality.tagline}
                </p>

                {/* Property price */}
                <div
                  className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
                  style={{ backgroundColor: "#F9F8F5" }}
                >
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#C9A84C" }} />
                  <span className="font-medium" style={{ color: "#1B3A6B" }}>
                    {locality.avgPropertyPrice}
                  </span>
                  <span style={{ color: "#64748B" }}>· {locality.distanceFromCenter}</span>
                </div>

                {/* CTA */}
                <div
                  className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5"
                  style={{ color: "#1B3A6B" }}
                >
                  View Services
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Right Assets ───────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: "#C9A84C" }}
            >
              Why Choose Us
            </p>
            <h2
              className="font-heading font-bold"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "#1A1A1A",
              }}
            >
              Bangalore-First,{" "}
              <span style={{ color: "#C9A84C" }}>Client-Always</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏙️",
                title: "Deep Local Knowledge",
                body: "Our advisors understand each Bangalore locality — from property price trends in Whitefield to encumbrance issues in Jayanagar to land conversion complexities in Yelahanka.",
              },
              {
                icon: "🤝",
                title: "End-to-End Execution",
                body: "We don't just advise — we do the work. From home loan processing to property registration to court filings, we stay with you through every step.",
              },
              {
                icon: "💎",
                title: "Transparent, Honest Advisory",
                body: "No hidden charges, no product pushing. We recommend what's right for you and explain exactly what you're paying for before you commit to anything.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "#F9F8F5",
                  border: "1px solid #E5E7EB",
                }}
              >
                <div className="text-3xl mb-4" role="img" aria-hidden="true">
                  {item.icon}
                </div>
                <h3
                  className="font-heading font-bold text-base mb-2"
                  style={{ color: "#1B3A6B" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{
          background:
            "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-heading font-bold text-white mb-4"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            Not Sure Which Service You Need?
          </h2>
          <p
            className="text-base mb-8 max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Book a free 30-minute consultation and our advisors will identify
            exactly what you need — whether it&apos;s financial planning, a
            property transaction, or a legal matter.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919742826804"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-white/10"
              style={{
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
              }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
