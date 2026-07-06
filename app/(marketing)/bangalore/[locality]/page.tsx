import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Home,
  TrendingUp,
  Scale,
  MapPin,
  Building2,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Phone,
} from "lucide-react";
import { ALL_LOCALITIES, getLocalityBySlug } from "@/lib/localities-data";
import { getServiceBySlug } from "@/lib/services-data";

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return ALL_LOCALITIES.map((l) => ({ locality: l.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locality: string }>;
}): Promise<Metadata> {
  const { locality: slug } = await params;
  const locality = getLocalityBySlug(slug);
  if (!locality) return { title: "Not Found" };
  return {
    title: locality.metaTitle,
    description: locality.metaDescription,
    alternates: { canonical: `/bangalore/${locality.slug}` },
    openGraph: {
      title: locality.metaTitle,
      description: locality.metaDescription,
      url: `https://rightassetsmanagement.com/bangalore/${locality.slug}`,
      type: "website",
    },
  };
}

// ─── Vertical helpers ──────────────────────────────────────────────────────────

const VERTICAL_CONFIG = {
  financial: {
    label: "Financial Services",
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
    href: "/financial",
    description:
      "SIP investments, home loans, insurance, tax planning, and wealth advisory tailored for your neighbourhood.",
    Icon: TrendingUp,
  },
  "real-estate": {
    label: "Realty Services",
    color: "#0D7E7E",
    lightBg: "#E6F4F4",
    href: "/real-estate",
    description:
      "Property buying, selling, registration, e-Khatha, legal documents, and land records assistance.",
    Icon: Building2,
  },
  legal: {
    label: "Legal Services",
    color: "#6B46C1",
    lightBg: "#F0EBF9",
    href: "/legal",
    description:
      "Property disputes, family cases, consumer grievances, and banking legal advisory.",
    Icon: Scale,
  },
} as const;

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function LocalityPage({
  params,
}: {
  params: Promise<{ locality: string }>;
}) {
  const { locality: slug } = await params;
  const locality = getLocalityBySlug(slug);
  if (!locality) notFound();

  // ── Schema markup ────────────────────────────────────────────────────────────

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Right Assets Management — ${locality.name}`,
    description: `Financial, real estate, and legal services in ${locality.name}, Bangalore. ${locality.description}`,
    areaServed: `${locality.name}, Bangalore, Karnataka`,
    url: `https://rightassetsmanagement.com/bangalore/${locality.slug}`,
    telephone: "+91-9742826804",
    address: {
      "@type": "PostalAddress",
      addressLocality: locality.name,
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    priceRange: "₹₹",
    openingHours: "Mo-Sa 09:00-19:00",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: locality.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* ── Schema ────────────────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── A. Hero ───────────────────────────────────────────────────────── */}
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
                id={`loc-grid-${locality.slug}`}
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
            <rect
              width="100%"
              height="100%"
              fill={`url(#loc-grid-${locality.slug})`}
            />
          </svg>
          <div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-sm mb-6 flex-wrap"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link
              href="/bangalore"
              className="hover:text-white transition-colors"
            >
              Bangalore
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span style={{ color: "#C9A84C" }}>{locality.name}</span>
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
              Serving {locality.name}, Bangalore
            </div>

            {/* H1 */}
            <h1
              className="font-heading font-bold text-white mb-4"
              style={{
                fontSize: "clamp(1.6rem, 4.5vw, 3rem)",
                lineHeight: 1.15,
              }}
            >
              Financial, Real Estate &amp; Legal Services
              <br />
              <span style={{ color: "#C9A84C" }}>in {locality.name}</span>
            </h1>

            {/* Subheading */}
            <p
              className="text-base mb-8 max-w-2xl"
              style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }}
            >
              <span className="font-medium text-white">{locality.tagline}</span>
              {" · "}
              {locality.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
              >
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+919742826804"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "white",
                }}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── B. Quick Stats strip ──────────────────────────────────────────── */}
      <section className="py-8 sm:py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Avg Property Price */}
            <div className="flex flex-col gap-1">
              <p
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: "#C9A84C" }}
              >
                Avg Property Price
              </p>
              <p
                className="font-heading font-bold text-lg leading-tight"
                style={{ color: "#1B3A6B" }}
              >
                {locality.avgPropertyPrice}
              </p>
            </div>

            {/* Area Type */}
            <div className="flex flex-col gap-1">
              <p
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: "#C9A84C" }}
              >
                Area Type
              </p>
              <p
                className="font-heading font-bold text-lg leading-tight"
                style={{ color: "#1B3A6B" }}
              >
                {locality.areaType}
              </p>
            </div>

            {/* Popular Profile */}
            <div className="flex flex-col gap-1">
              <p
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: "#C9A84C" }}
              >
                Residents
              </p>
              <p
                className="font-heading font-bold text-lg leading-tight"
                style={{ color: "#1B3A6B" }}
              >
                {locality.popularProfile}
              </p>
            </div>

            {/* Distance */}
            <div className="flex flex-col gap-1">
              <p
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: "#C9A84C" }}
              >
                Distance from Centre
              </p>
              <p
                className="font-heading font-bold text-lg leading-tight"
                style={{ color: "#1B3A6B" }}
              >
                {locality.distanceFromCenter}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── C. Three Verticals ────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: "#F9F8F5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 text-center">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: "#C9A84C" }}
            >
              Our Services
            </p>
            <h2
              className="font-heading font-bold"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "#1A1A1A",
              }}
            >
              Three Verticals,{" "}
              <span style={{ color: "#C9A84C" }}>One Advisor</span>
            </h2>
            <p
              className="mt-2 text-sm max-w-lg mx-auto"
              style={{ color: "#64748B" }}
            >
              Everything you need for financial security, property, and legal
              peace of mind — in {locality.name} and across Bangalore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(
              Object.entries(VERTICAL_CONFIG) as [
                keyof typeof VERTICAL_CONFIG,
                (typeof VERTICAL_CONFIG)[keyof typeof VERTICAL_CONFIG],
              ][]
            ).map(([key, v]) => (
              <div
                key={key}
                className="bg-white rounded-2xl p-6 flex flex-col gap-4"
                style={{
                  borderTop: `3px solid ${v.color}`,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: v.lightBg }}
                >
                  <v.Icon className="w-6 h-6" style={{ color: v.color }} />
                </div>
                <div>
                  <h3
                    className="font-heading font-bold text-lg mb-1"
                    style={{ color: "#1A1A1A" }}
                  >
                    {v.label}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
                    {v.description}
                  </p>
                </div>
                <Link
                  href={v.href}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
                  style={{ color: v.color }}
                >
                  Explore {v.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── D. Most Requested Services ────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-3">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#C9A84C" }}
              >
                Locality Services
              </p>
              <div
                className="h-px"
                style={{ backgroundColor: "#C9A84C", width: "60px" }}
              />
            </div>
            <h2
              className="font-heading font-bold mb-2"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "#1A1A1A",
              }}
            >
              Popular Services in{" "}
              <span style={{ color: "#C9A84C" }}>{locality.name}</span>
            </h2>
            <p className="text-sm" style={{ color: "#64748B", maxWidth: "520px" }}>
              The services most in demand from Right Assets Management clients
              in {locality.name} — based on enquiries from your neighbourhood.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {locality.topServices.map(({ slug: svcSlug, vertical }) => {
              const svc = getServiceBySlug(svcSlug);
              if (!svc) return null;
              const vc = VERTICAL_CONFIG[vertical];
              return (
                <Link
                  key={svcSlug}
                  href={`/${vertical}/${svcSlug}`}
                  className="group flex flex-col gap-3 p-5 rounded-2xl bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* Icon + title row */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: vc.lightBg }}
                    >
                      <vc.Icon
                        className="w-5 h-5"
                        style={{ color: vc.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-heading font-bold text-sm leading-snug"
                        style={{ color: "#1A1A1A" }}
                      >
                        {svc.title}
                      </p>
                      <p
                        className="text-xs font-semibold mt-0.5 uppercase tracking-wide"
                        style={{ color: vc.color }}
                      >
                        {vc.label}
                      </p>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p
                    className="text-xs leading-relaxed flex-1"
                    style={{ color: "#64748B" }}
                  >
                    {svc.tagline}
                  </p>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
                    style={{ color: vc.color }}
                  >
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── E. Local Insights ─────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: "#F9F8F5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-3">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#C9A84C" }}
              >
                Local Insights
              </p>
              <div
                className="h-px"
                style={{ backgroundColor: "#C9A84C", width: "60px" }}
              />
            </div>
            <h2
              className="font-heading font-bold"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "#1A1A1A",
              }}
            >
              What We Know About{" "}
              <span style={{ color: "#C9A84C" }}>{locality.name}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locality.localInsights.map((insight, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6"
                style={{
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  border: "1px solid #E5E7EB",
                }}
              >
                <div className="text-3xl mb-4" role="img" aria-hidden="true">
                  {insight.icon}
                </div>
                <h3
                  className="font-heading font-bold text-base mb-2"
                  style={{ color: "#1B3A6B" }}
                >
                  {insight.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#64748B" }}
                >
                  {insight.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── F. FAQs ───────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 text-center">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: "#C9A84C" }}
            >
              FAQs
            </p>
            <h2
              className="font-heading font-bold"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "#1A1A1A",
              }}
            >
              Common Questions from{" "}
              <span style={{ color: "#C9A84C" }}>{locality.name}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {locality.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl overflow-hidden"
                style={{ border: "1px solid #E5E7EB" }}
              >
                <summary
                  className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none font-semibold text-sm"
                  style={{ color: "#1A1A1A", backgroundColor: "#FAFAFA" }}
                >
                  <span>{faq.question}</span>
                  <ChevronRight
                    className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-90"
                    style={{ color: "#C9A84C" }}
                  />
                </summary>
                <div
                  className="px-5 py-4 text-sm leading-relaxed"
                  style={{ color: "#64748B", borderTop: "1px solid #E5E7EB" }}
                >
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── G. CTA Banner ─────────────────────────────────────────────────── */}
      <section
        className="py-12 sm:py-16 lg:py-20"
        style={{
          background:
            "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)",
        }}
      >
        {/* Gold grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
          style={{ position: "relative" }}
        >
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
            style={{
              backgroundColor: "rgba(201,168,76,0.15)",
              color: "#C9A84C",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            <Home className="w-3.5 h-3.5" />
            {locality.name}, Bangalore
          </div>

          <h2
            className="font-heading font-bold text-white mb-3"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            Ready to Get Started in{" "}
            <span style={{ color: "#C9A84C" }}>{locality.name}</span>?
          </h2>
          <p
            className="text-base mb-8 max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Our advisors know {locality.name} — book a free consultation today
            and get expert guidance on financial planning, property, or legal
            matters.
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
