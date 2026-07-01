import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Clock,
  TrendingUp,
  Building2,
  Scale,
  ArrowRight,
} from "lucide-react";

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  alternates: { canonical: "/success-stories" },
  title: "Success Stories — Right Assets Management",
  description:
    "Real client outcomes from Right Assets Management Bangalore — tax savings, property deals, legal victories across financial planning, real estate, and legal advisory.",
};

// ─── Types ────────────────────────────────────────────────────────────────────

type CaseStudy = {
  id: string;
  vertical: "financial" | "real-estate" | "legal";
  title: string;
  client: string;
  service: string;
  challenge: string;
  solution: string;
  outcome: string;
  metric: string;
  metricLabel: string;
  duration: string;
  tags: string[];
};

// ─── Case Studies Data ────────────────────────────────────────────────────────

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "whitefield-tax-savings",
    vertical: "financial",
    title: "How a Whitefield IT couple saved ₹3.2L in taxes",
    client: "Rahul & Priya S., Whitefield",
    service: "Tax Planning & Mutual Fund SIP",
    challenge:
      "An IT couple in Whitefield earning a combined ₹28L per annum had no structured tax planning. All savings were in a single savings account earning 3.5%, and they were paying the maximum tax slab with no exemptions or deductions beyond basic PF contributions.",
    solution:
      "Right Assets Management restructured their salary components — optimising HRA, NPS employer contribution, and meal vouchers — and initiated ELSS SIP investments under Section 80C. A term life cover and health insurance were added to unlock Section 80D deductions, and they were guided through ITR filing with all applicable deductions correctly claimed.",
    outcome:
      "The couple saved ₹3.2L in total tax outflow for FY 2024-25 and simultaneously built an ELSS corpus now growing at 16.4% CAGR.",
    metric: "₹3.2L Saved",
    metricLabel: "in taxes (FY 2024-25)",
    duration: "3 months",
    tags: ["Tax Planning", "ELSS", "SIP", "ITR Filing"],
  },
  {
    id: "jayanagar-property-inheritance",
    vertical: "real-estate",
    title: "Inherited property registered in 3 weeks despite missing EC records",
    client: "S. Venkataraman, Jayanagar",
    service: "Encumbrance Certificate, Mutation & Property Registration",
    challenge:
      "A retired government employee in Jayanagar inherited a 40-year-old residential property from his father. The property had incomplete encumbrance certificate records for a 12-year period, a missing khatha entry, and no mutation in the current owner's name — making registration legally impossible without resolving all three issues first.",
    solution:
      "Right Assets Management filed for a fresh EC from the Sub-Registrar's office and coordinated the missing record gap with BBMP's records department. Simultaneously, a mutation application was filed with supporting heirship documents, and the khatha was transferred to the client's name. All three were tracked and expedited in parallel.",
    outcome:
      "The property was fully regularised and registered in the client's name in just 3 weeks — a process that typically takes 2–3 months when handled individually.",
    metric: "3 Weeks",
    metricLabel: "from engagement to registration",
    duration: "3 weeks",
    tags: ["Encumbrance Certificate", "Mutation", "Property Registration", "Khatha"],
  },
  {
    id: "rajajinagar-consumer-dispute",
    vertical: "legal",
    title: "₹1.8L consumer dispute resolved without a single court appearance",
    client: "Mohan K., Rajajinagar",
    service: "Consumer Dispute Cases",
    challenge:
      "A small business owner in Rajajinagar paid ₹1.8L to a vendor for customised office equipment that was never delivered. The vendor became unresponsive after multiple follow-ups. The client was unfamiliar with the consumer forum process and had been told by a local lawyer it could take 2–3 years in court.",
    solution:
      "Right Assets Management's legal team assessed the case and determined it was well-suited for consumer forum mediation under the Consumer Protection Act 2019. A formal complaint was drafted with all payment proofs and communication records, filed at the District Consumer Disputes Redressal Commission, and mediation was proposed to the opposite party before the first hearing.",
    outcome:
      "The vendor agreed to full settlement during pre-hearing mediation. The client recovered the entire ₹1.8L within 6 weeks — no court appearances required.",
    metric: "₹1.8L Recovered",
    metricLabel: "via consumer forum mediation",
    duration: "6 weeks",
    tags: ["Consumer Dispute", "Mediation", "Legal Advisory"],
  },
  {
    id: "hsr-layout-portfolio",
    vertical: "financial",
    title: "₹15L idle in savings account — now growing at 14.2% CAGR",
    client: "Arjun T., HSR Layout",
    service: "Comprehensive Financial Planning",
    challenge:
      "A 29-year-old software engineer in HSR Layout had accumulated ₹15L in a savings account earning 3.5% p.a. He had no investments, no health insurance, and no financial plan. He was aware he was losing to inflation but overwhelmed by the options — mutual funds, stocks, FDs, NPS — and had been postponing action for over a year.",
    solution:
      "Right Assets Management built a full financial plan: a diversified SIP across large-cap, mid-cap, and flexi-cap funds (₹40,000/month); a 3-year FD ladder with quarterly renewals for liquidity; a comprehensive health insurance cover with critical illness rider; and a small-cap allocation for long-term aggressive growth. All investments were aligned to his 10-year financial goals.",
    outcome:
      "Within 14 months of implementation, his portfolio is growing at a blended 14.2% CAGR with full liquidity coverage for 6 months of expenses maintained in the FD ladder.",
    metric: "14.2% CAGR",
    metricLabel: "blended portfolio return",
    duration: "4 weeks setup",
    tags: ["Mutual Funds", "SIP", "FD", "Health Insurance", "Financial Planning"],
  },
  {
    id: "nri-ancestral-property-sale",
    vertical: "real-estate",
    title: "NRI client sold Bangalore ancestral property remotely in 45 days",
    client: "Deepa R., USA (property in Indiranagar)",
    service: "Power of Attorney, Property Sale & Khatha Transfer",
    challenge:
      "An NRI based in the United States needed to sell an ancestral property in Indiranagar, Bangalore. She had no local representative and was unable to travel. The property had outstanding BBMP tax dues, an outdated khatha in her late father's name, and required a registered Power of Attorney to enable any local transactions.",
    solution:
      "Right Assets Management coordinated end-to-end: a Power of Attorney was notarised in the US and apostilled, then registered in Bangalore with the Sub-Registrar. The outstanding BBMP dues were cleared, khatha was transferred to the NRI client's name, an EC was obtained for buyer due diligence, and the firm represented the client in all buyer negotiations and the final sale deed registration.",
    outcome:
      "The property was sold and fully registered within 45 days of initial engagement, with the sale proceeds remitted to the client's US bank account under FEMA guidelines.",
    metric: "45 Days",
    metricLabel: "from engagement to sale completion",
    duration: "45 days",
    tags: ["Power of Attorney", "NRI Property", "Khatha Transfer", "Property Sale"],
  },
  {
    id: "koramangala-cyber-fraud",
    vertical: "legal",
    title: "₹3.8L recovered after UPI fraud — startup founder's account hacked",
    client: "Vikram S., Koramangala",
    service: "Cyber Crime Cases",
    challenge:
      "A Koramangala startup founder's business UPI account was compromised through a SIM swap attack. ₹4.5L was fraudulently transferred across multiple accounts within a 2-hour window. The bank's initial response was that the transaction appeared authorised from the registered device, and the founder had no idea how to navigate the cybercrime complaint process.",
    solution:
      "Right Assets Management's legal team immediately guided the client in filing an emergency complaint on cybercrime.gov.in and simultaneously escalating to the bank's grievance officer with a formal legal notice referencing RBI's circular on unauthorised electronic transactions (RBI/2017-18/15). The firm coordinated with the cyber cell and bank's fraud team, provided detailed transaction trace evidence, and tracked freezing orders on the recipient accounts.",
    outcome:
      "₹3.8L out of ₹4.5L was successfully traced, frozen, and recovered within 11 weeks. A formal police complaint resulted in an FIR being registered against two identified intermediaries.",
    metric: "₹3.8L Recovered",
    metricLabel: "of ₹4.5L defrauded via UPI",
    duration: "11 weeks",
    tags: ["Cyber Crime", "UPI Fraud", "Legal Advisory", "Bank Fraud"],
  },
];

// ─── Vertical config ──────────────────────────────────────────────────────────

const VERTICAL_CONFIG = {
  financial: {
    label: "Financial",
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
    Icon: TrendingUp,
  },
  "real-estate": {
    label: "Real Estate",
    color: "#0D7E7E",
    lightBg: "#E6F4F4",
    Icon: Building2,
  },
  legal: {
    label: "Legal",
    color: "#6B46C1",
    lightBg: "#F0EBF9",
    Icon: Scale,
  },
};

// ─── Hero stats ───────────────────────────────────────────────────────────────

const HERO_STATS = [
  { value: "500+", label: "Clients Helped" },
  { value: "₹50Cr+", label: "Assets Managed" },
  { value: "98%", label: "Client Satisfaction" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function VerticalBadge({ vertical }: { vertical: CaseStudy["vertical"] }) {
  const cfg = VERTICAL_CONFIG[vertical];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide"
      style={{ backgroundColor: cfg.lightBg, color: cfg.color }}
    >
      <cfg.Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const cfg = VERTICAL_CONFIG[cs.vertical];

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{
        border: "1px solid #E5E7EB",
        boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
      }}
    >
      {/* Colour top bar */}
      <div className="h-[4px]" style={{ backgroundColor: cfg.color }} />

      <div className="p-7 flex flex-col flex-1 gap-5">

        {/* Top row — badge + duration */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <VerticalBadge vertical={cs.vertical} />
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium"
            style={{ backgroundColor: "#F1F5F9", color: "#64748B" }}
          >
            <Clock className="w-3 h-3" />
            {cs.duration}
          </span>
        </div>

        {/* Big metric */}
        <div>
          <p
            className="font-heading font-bold leading-none"
            style={{
              color: "#C9A84C",
              fontSize: "clamp(1.75rem, 3.5vw, 2.4rem)",
            }}
          >
            {cs.metric}
          </p>
          <p className="text-xs text-gray-400 mt-1 font-medium">{cs.metricLabel}</p>
        </div>

        {/* Title */}
        <h2
          className="font-heading font-bold text-xl leading-snug"
          style={{ color: "#1B3A6B" }}
        >
          {cs.title}
        </h2>

        {/* Client + service */}
        <div className="flex flex-col gap-1.5">
          <p
            className="flex items-center gap-1.5 text-sm"
            style={{ color: "#64748B" }}
          >
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: cfg.color }} />
            {cs.client}
          </p>
          <p
            className="text-xs font-semibold uppercase tracking-[0.12em] pl-5"
            style={{ color: cfg.color }}
          >
            {cs.service}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ backgroundColor: "#F1F5F9" }} />

        {/* Challenge + Solution */}
        <div className="space-y-4">
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2"
              style={{ color: "#94A3B8" }}
            >
              The Challenge
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">{cs.challenge}</p>
          </div>
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2"
              style={{ color: cfg.color }}
            >
              Our Solution
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">{cs.solution}</p>
          </div>
        </div>

        {/* Outcome highlight box */}
        <div
          className="rounded-xl p-4"
          style={{
            backgroundColor: "#FBF5E6",
            border: "1px solid rgba(201,168,76,0.25)",
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5"
            style={{ color: "#C9A84C" }}
          >
            Outcome
          </p>
          <p
            className="text-sm font-medium leading-relaxed"
            style={{ color: "#78580A" }}
          >
            {cs.outcome}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {cs.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
              style={{
                backgroundColor: cfg.lightBg,
                color: cfg.color,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SuccessStoriesPage() {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)",
        }}
      >
        {/* Gold grid overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.04 }}
          >
            <defs>
              <pattern
                id="stories-hero-grid"
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
            <rect width="100%" height="100%" fill="url(#stories-hero-grid)" />
          </svg>
          <div
            className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute -bottom-40 -left-20 w-[360px] h-[360px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)",
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
            <span style={{ color: "#C9A84C" }}>Success Stories</span>
          </nav>

          <div className="max-w-3xl">
            {/* Overline */}
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider mb-6"
              style={{
                background: "rgba(201,168,76,0.12)",
                border: "1px solid rgba(201,168,76,0.3)",
                color: "#C9A84C",
              }}
            >
              Real Results
            </span>

            <h1
              className="font-heading font-bold text-white mb-5"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                lineHeight: 1.15,
              }}
            >
              Stories of Trust &amp; Results
            </h1>

            <p
              className="text-lg leading-relaxed mb-12"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Real clients, real outcomes — anonymised to protect privacy. See how Right
              Asset Management has helped hundreds of Bangalore families and businesses
              achieve their financial, property, and legal goals.
            </p>

            {/* Stats bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <p
                    className="font-heading font-bold"
                    style={{
                      color: "#C9A84C",
                      fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <div
                    className="w-8 h-[2px] rounded-full"
                    style={{ backgroundColor: "rgba(201,168,76,0.45)" }}
                  />
                  <p
                    className="text-sm font-medium"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Case Studies Grid ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: "#F9F8F5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#C9A84C" }}
            >
              6 Case Studies — All Verticals
            </p>
            <h2
              className="font-heading font-bold text-3xl sm:text-4xl mb-4"
              style={{ color: "#1B3A6B" }}
            >
              Client Outcomes That Speak for Themselves
            </h2>
            <p className="text-gray-500 text-base max-w-2xl leading-relaxed">
              Every engagement below is based on a real client situation. Names and
              specific identifying details have been changed to protect client privacy.
            </p>
          </div>

          {/* Cards grid — 2 columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CASE_STUDIES.map((cs) => (
              <CaseStudyCard key={cs.id} cs={cs} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Trust note ────────────────────────────────────────────────── */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#94A3B8" }}
          >
            <span className="font-semibold" style={{ color: "#64748B" }}>
              Privacy note:
            </span>{" "}
            All case studies are based on real client engagements. Client names are
            anonymised and identifying details generalised. Specific figures (tax savings,
            recovery amounts, timelines) are accurate to the best of our knowledge and
            have been shared with client consent.
          </p>
        </div>
      </section>

      {/* ── 4. Bottom CTA ────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{ backgroundColor: "#1B3A6B" }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.04 }}
          >
            <defs>
              <pattern
                id="cta-grid"
                x="0"
                y="0"
                width="52"
                height="52"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 52 0 L 0 0 0 52"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="0.7"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em] mb-4"
            style={{ color: "rgba(201,168,76,0.7)" }}
          >
            Your Turn
          </p>
          <h2
            className="font-heading font-bold text-white mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.2 }}
          >
            Ready to write your own success story?
          </h2>
          <p
            className="text-base leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Book your free 30-minute consultation today. Our advisors cover financial
            planning, real estate transactions, and legal guidance — all in one call.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-[15px] transition-all hover:opacity-90 active:scale-[0.97] shadow-lg"
              style={{ backgroundColor: "#C9A84C", color: "#1B3A6B" }}
            >
              Book Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="https://wa.me/919742826804?text=Hi%2C%20I%20read%20your%20success%20stories%20and%20would%20like%20a%20free%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-[15px] transition-all hover:opacity-80 border-2"
              style={{ borderColor: "rgba(255,255,255,0.35)", color: "white" }}
            >
              {/* WhatsApp icon via SVG to avoid a new dependency */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
