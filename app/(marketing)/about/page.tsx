import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  Building2,
  Scale,
  ShieldCheck,
  FileCheck,
  Users,
  Banknote,
  MapPin,
  ArrowRight,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Us — Right Assets Management India",
  description:
    "Learn about Right Assets Management — India's trusted multi-vertical firm offering financial planning, real estate, and legal advisory services under one roof.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const VERTICALS = [
  {
    Icon: TrendingUp,
    name: "Financial Services",
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
    href: "/financial",
    count: "20 services",
    headline: "Your complete financial guide.",
    body: "From SIPs to portfolio management, health insurance to home loans, tax planning to retirement — we cover every stage of your financial life with qualified, experienced advisors.",
    services: [
      "Mutual Funds & SIP",
      "Insurance Planning",
      "Home & Personal Loans",
      "Portfolio Management",
      "Tax Planning & ITR",
      "NPS, PPF & Govt. Schemes",
    ],
  },
  {
    Icon: Building2,
    name: "Real Estate",
    color: "#0D7E7E",
    lightBg: "#E6F4F4",
    href: "/real-estate",
    count: "17 services",
    headline: "We handle all of it.",
    body: "Buying, selling, legal documentation, government records, Khata Certificate, encumbrance certificates, property registration, land conversion — every piece of the real estate puzzle in one place.",
    services: [
      "Buy & Sell Properties",
      "Property Registration",
      "Khata Certificate & Mutation",
      "Sale Deed & Agreement",
      "Encumbrance Certificate",
      "DC Conversion & NOC",
    ],
  },
  {
    Icon: Scale,
    name: "Legal Services",
    color: "#6B46C1",
    lightBg: "#F0EBF9",
    href: "/legal",
    count: "11 services",
    headline: "Expert advisory without the confusion.",
    body: "Property disputes, family cases, cyber crime, insurance claim cases, consumer forum — experienced legal advisory that gives you clarity and direction when you need it most.",
    services: [
      "Property Disputes",
      "Family Case Support",
      "Cyber Crime Cases",
      "Insurance Claim Cases",
      "Consumer Disputes",
      "Banking Case Advisory",
    ],
  },
];

const WHY_CHOOSE = [
  {
    Icon: ShieldCheck,
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
    title: "48+ Services Under One Roof",
    body: "From your first SIP to your last legal dispute, we cover every major financial and property need — eliminating the hassle of managing multiple advisors.",
  },
  {
    Icon: FileCheck,
    color: "#0D7E7E",
    lightBg: "#E6F4F4",
    title: "Qualified, Experienced Advisors",
    body: "Our financial advisors bring deep expertise and domain knowledge. Every recommendation we make is qualified, well-researched, and in your best interest — always.",
  },
  {
    Icon: Banknote,
    color: "#C9A84C",
    lightBg: "#FBF5E6",
    title: "Transparent Fee Structure",
    body: "No hidden charges. No vague retainers. We explain our fees clearly before any engagement — you always know exactly what you're paying for and why.",
  },
  {
    Icon: Users,
    color: "#6B46C1",
    lightBg: "#F0EBF9",
    title: "End-to-End Execution Support",
    body: "We don't hand you a plan and disappear. We manage paperwork, coordinate with authorities, follow up on your behalf, and keep you updated at every step.",
  },
  {
    Icon: MapPin,
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
    title: "Pan India Coverage",
    body: "We serve clients across all zones of India — from HSR Layout to Yelahanka, Whitefield to Rajajinagar. Wherever you are, we're accessible.",
  },
];

const STATS = [
  { value: "48+", label: "Expert Services" },
  { value: "500+", label: "Clients Served" },
  { value: "10+", label: "Years Experience" },
  { value: "3", label: "Verticals Covered" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Hero banner ────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)",
        }}
      >
        {/* Gold grid */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
            <defs>
              <pattern id="about-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-grid)" />
          </svg>
          <div
            className="absolute -top-32 -right-32 w-[440px] h-[440px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)" }}
          />
          <div
            className="absolute -bottom-40 -left-20 w-[360px] h-[360px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-sm mb-6"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#C9A84C" }}>About Us</span>
          </nav>

          <div className="max-w-3xl">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{
                background: "rgba(201,168,76,0.12)",
                border: "1px solid rgba(201,168,76,0.3)",
                color: "#C9A84C",
              }}
            >
              India&apos;s Multi-Vertical Advisory Firm
            </span>
            <h1
              className="font-heading font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.25rem)", lineHeight: 1.15 }}
            >
              About Right Assets Management
            </h1>
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              We were built to solve a real problem — great financial, property, and legal
              advice rarely comes with great execution. We changed that.
            </p>
          </div>
        </div>
      </div>

      {/* ── 2. Who We Are ────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">

            {/* Left — narrative */}
            <div className="lg:col-span-7">
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] mb-4"
                style={{ color: "#C9A84C" }}
              >
                Our Story
              </p>
              <h2
                className="font-heading font-bold text-[26px] sm:text-5xl mb-6 sm:mb-8"
                style={{ color: "#1B3A6B", lineHeight: 1.15 }}
              >
                Who We Are
              </h2>

              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  Right Assets Management was founded with a single mission — to make financial
                  planning, real estate transactions, and legal support accessible, transparent,
                  and reliable for every Indiaan.
                </p>
                <p>
                  We bring together expertise across three critical areas of life under one roof,
                  so you never have to coordinate between multiple advisors. Whether you&apos;re
                  planning your first SIP, registering a property, or navigating a legal dispute —
                  one call to Right Assets Management is all it takes.
                </p>
                <p>
                  Over the years we have served 500+ clients across India — from salaried
                  professionals starting their investment journey to HNI individuals managing
                  complex portfolios, from first-time homebuyers to seasoned real estate investors,
                  from individuals seeking legal guidance to businesses resolving commercial disputes.
                </p>
                <p>
                  We are not a marketplace or a referral service. We are a dedicated team of
                  advisors, documentation specialists, and legal professionals who take
                  ownership of your outcome — not just your appointment.
                </p>
              </div>
            </div>

            {/* Right — highlights */}
            <div className="lg:col-span-5 space-y-4">
              {/* Mission card */}
              <div
                className="rounded-2xl p-7"
                style={{ backgroundColor: "#1B3A6B" }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
                  style={{ color: "#C9A84C" }}
                >
                  Our Mission
                </p>
                <p
                  className="text-white font-medium text-base sm:text-lg leading-relaxed"
                  style={{ lineHeight: 1.65 }}
                >
                  To make financial planning, real estate, and legal services accessible,
                  transparent, and reliable for every Indiaan.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-6 text-center"
                    style={{
                      backgroundColor: "#F9F8F5",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <p
                      className="font-heading font-bold text-2xl sm:text-3xl mb-1"
                      style={{ color: "#1B3A6B" }}
                    >
                      {s.value}
                    </p>
                    <div
                      className="w-6 h-[2px] mx-auto mb-2 rounded-full"
                      style={{ backgroundColor: "#C9A84C" }}
                    />
                    <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Expert advisors badge */}
              <div
                className="rounded-2xl p-5 flex items-start gap-4"
                style={{ backgroundColor: "#EEF2F8" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#1B3A6B" }}
                >
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: "#1B3A6B" }}>
                    Expert Advisory
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    All financial advisory services are provided by experienced professionals
                    committed to your best interest and full transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Three Verticals ──────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-28" style={{ backgroundColor: "#F9F8F5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-9 sm:mb-14">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#C9A84C" }}
            >
              Our Three Verticals
            </p>
            <h2
              className="font-heading font-bold text-[26px] sm:text-5xl mb-3 sm:mb-4"
              style={{ color: "#1B3A6B" }}
            >
              Everything Under One Roof
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Three specialised verticals. One cohesive team. No need to coordinate
              between different firms ever again.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {VERTICALS.map((v) => (
              <div
                key={v.name}
                className="bg-white rounded-2xl overflow-hidden flex flex-col"
                style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}
              >
                {/* Colour top bar */}
                <div className="h-[4px]" style={{ backgroundColor: v.color }} />

                <div className="p-8 flex flex-col flex-1">
                  {/* Icon + count */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: v.lightBg }}
                    >
                      <v.Icon className="w-6 h-6" style={{ color: v.color }} />
                    </div>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ backgroundColor: v.lightBg, color: v.color }}
                    >
                      {v.count}
                    </span>
                  </div>

                  <h3
                    className="font-heading font-bold text-2xl mb-2"
                    style={{ color: "#1A1A1A" }}
                  >
                    {v.name}
                  </h3>
                  <p
                    className="font-medium text-sm mb-3"
                    style={{ color: v.color }}
                  >
                    {v.headline}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {v.body}
                  </p>

                  {/* Service list */}
                  <ul className="space-y-2 mb-8 flex-1">
                    {v.services.map((svc) => (
                      <li key={svc} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <CheckCircle
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: v.color }}
                        />
                        {svc}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={v.href}
                    className="group mt-auto flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
                    style={{ color: v.color }}
                  >
                    Explore all {v.count}
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Why Choose Right Assets ────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-9 sm:mb-14">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#C9A84C" }}
            >
              Why Us
            </p>
            <h2
              className="font-heading font-bold text-[26px] sm:text-5xl mb-3 sm:mb-4"
              style={{ color: "#1B3A6B" }}
            >
              Why Choose Right Assets?
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
              Five reasons clients consistently choose us over other advisors across India.
            </p>
          </div>

          {/* Grid — 3 top, 2 centred bottom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {WHY_CHOOSE.slice(0, 3).map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-8"
                style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)", backgroundColor: "#fff" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: item.lightBg }}
                >
                  <item.Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3
                  className="font-heading font-semibold text-xl mb-3"
                  style={{ color: "#1A1A1A" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:max-w-[66%] lg:mx-auto">
            {WHY_CHOOSE.slice(3).map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-8"
                style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)", backgroundColor: "#fff" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: item.lightBg }}
                >
                  <item.Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3
                  className="font-heading font-semibold text-xl mb-3"
                  style={{ color: "#1A1A1A" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Our Promise ───────────────────────────────────────────────── */}
      <section
        className="py-14 sm:py-20 lg:py-28 relative overflow-hidden"
        style={{ backgroundColor: "#1B3A6B" }}
      >
        {/* Gold grid + glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
            <defs>
              <pattern id="promise-grid" x="0" y="0" width="52" height="52" patternUnits="userSpaceOnUse">
                <path d="M 52 0 L 0 0 0 52" fill="none" stroke="#C9A84C" strokeWidth="0.7" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#promise-grid)" />
          </svg>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 60%)" }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em] mb-6"
            style={{ color: "rgba(201,168,76,0.7)" }}
          >
            Our Promise to You
          </p>

          {/* Opening quote mark */}
          <div
            className="font-heading font-bold text-[8rem] leading-none select-none mb-[-2rem]"
            style={{ color: "rgba(201,168,76,0.18)", lineHeight: 1 }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <blockquote
            className="font-heading font-bold text-white mb-6"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", lineHeight: 1.3 }}
          >
            We don&apos;t just advise — we execute.
            From the first consultation to the final outcome,
            we stay with you.
          </blockquote>

          <p
            className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-7 sm:mb-10"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Every client engagement at Right Assets Management comes with a commitment: we
            take ownership of your outcome, not just your appointment. We follow through,
            follow up, and stay accountable until the job is done.
          </p>

          {/* Divider */}
          <div
            className="w-16 h-[3px] mx-auto rounded-full"
            style={{ backgroundColor: "#C9A84C" }}
          />
        </div>
      </section>

      {/* ── 6. CTA Banner ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "360px" }}>
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/cta-banner.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,30,56,0.82) 0%, rgba(14,30,56,0.72) 50%, rgba(14,30,56,0.82) 100%)",
          }}
        />

        {/* Content — centered */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 text-center flex flex-col items-center">
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] mb-6"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(201,168,76,0.3)",
              color: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "#C9A84C",
                boxShadow: "0 0 6px rgba(201,168,76,0.6)",
              }}
            />
            Let&apos;s Improve Your Finances
          </span>

          {/* Heading */}
          <h2
            className="font-heading font-bold text-white mb-8"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
            }}
          >
            Work With Our{" "}
            <span
              style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, #C9A84C 0%, #E8CC6E 50%, #C9A84C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Experienced Financial
            </span>
            <br />
            Coaches To Create Better Money Habits.
          </h2>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #B8953F)",
              color: "#1A1A1A",
              boxShadow:
                "0 0 24px rgba(201,168,76,0.3), 0 4px 14px rgba(0,0,0,0.2)",
            }}
          >
            Meet Your Coach Today
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 50%, transparent 100%)",
          }}
        />
      </section>
    </>
  );
}
