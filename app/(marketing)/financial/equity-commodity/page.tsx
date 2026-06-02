import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  FileText,
  ChevronDown,
  TrendingUp,
  BarChart3,
  Layers,
  PieChart,
  FileSearch,
  Receipt,
  ShieldCheck,
  Users,
  Clock,
  Star,
  ChevronRight,
  Target,
  BookOpen,
} from "lucide-react";
import { getServiceBySlug, allServices } from "@/lib/services-data";
import LeadForm from "@/components/forms/LeadForm";
import TopStocksWidget from "@/components/widgets/TopStocksWidget";
import ServiceSchema from "@/components/seo/ServiceSchema";
import ServiceStickyBar from "@/components/service/ServiceStickyBar";

// ─── Metadata ──────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Equity & Commodity Market Advisory in Bangalore | Right Assets Management",
  description:
    "Expert equity and commodity market advisory in Bangalore. Research-backed stock picks, commodity strategies on MCX/NCDEX, portfolio management, and tax-efficient exits. Book a free consultation today.",
};

// ─── Static data ───────────────────────────────────────────────────────────

const offerings = [
  {
    icon: TrendingUp,
    title: "Equity Advisory",
    description:
      "Research-backed stock picks across large-cap, mid-cap, and small-cap segments on NSE and BSE with clear entry, target, and stop-loss levels.",
    color: "#1B3A6B",
  },
  {
    icon: BarChart3,
    title: "Commodity Trading",
    description:
      "Structured strategies for gold, silver, crude oil, and agricultural commodity futures on MCX and NCDEX with risk-managed position sizing.",
    color: "#C9A84C",
  },
  {
    icon: Layers,
    title: "F&O Strategies",
    description:
      "Options and futures strategies for experienced investors — hedging, income generation, and leveraged directional plays with defined risk.",
    color: "#0D7E7E",
  },
  {
    icon: PieChart,
    title: "Portfolio Building",
    description:
      "Customised diversified portfolios across sectors, market caps, and asset classes, aligned to your risk profile and investment horizon.",
    color: "#6B46C1",
  },
  {
    icon: FileSearch,
    title: "Research Reports",
    description:
      "Regular fundamental and technical research reports on top stocks and commodities, helping you make informed investment decisions.",
    color: "#1B3A6B",
  },
  {
    icon: Receipt,
    title: "Tax-Efficient Exits",
    description:
      "Strategic exit planning to minimise STCG and LTCG tax liability, ensuring your net returns are maximised under the Income Tax Act.",
    color: "#C9A84C",
  },
];

const markets = [
  {
    name: "NSE",
    full: "National Stock Exchange",
    desc: "India's largest equity derivatives exchange with 2,000+ listed stocks.",
    color: "#1B3A6B",
  },
  {
    name: "BSE",
    full: "Bombay Stock Exchange",
    desc: "Asia's oldest exchange, home to 5,000+ listed companies including blue chips.",
    color: "#C9A84C",
  },
  {
    name: "MCX",
    full: "Multi Commodity Exchange",
    desc: "India's premier commodity futures exchange for gold, silver, crude, and base metals.",
    color: "#0D7E7E",
  },
  {
    name: "NCDEX",
    full: "National Commodity & Derivatives Exchange",
    desc: "Leading exchange for agricultural commodity futures including soybean, cotton, and spices.",
    color: "#6B46C1",
  },
];

const trustStats = [
  { value: "10+", label: "Years of Market Experience" },
  { value: "500+", label: "Clients Across Bangalore" },
  { value: "₹50Cr+", label: "Portfolio Value Advised" },
  { value: "NSE · BSE · MCX", label: "All Major Exchanges" },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: "SEBI-Compliant Advisory",
    desc: "All recommendations follow SEBI regulations — no unregistered tips, ever.",
  },
  {
    icon: FileSearch,
    title: "Full Research Transparency",
    desc: "Every recommendation comes with a rationale — we never say 'just trust us'.",
  },
  {
    icon: Users,
    title: "Dedicated Advisor",
    desc: "One point of contact who knows your portfolio, goals, and risk appetite deeply.",
  },
  {
    icon: Clock,
    title: "Timely Alerts",
    desc: "Real-time WhatsApp alerts for entry, exit, and stop-loss triggers.",
  },
  {
    icon: Target,
    title: "Goal-Linked Strategy",
    desc: "Your investments are tied to specific life goals — not just random stock picks.",
  },
  {
    icon: BookOpen,
    title: "Investor Education",
    desc: "We explain every trade — building your own market knowledge over time.",
  },
];

const consultationPoints = [
  "Risk profiling and goal discussion",
  "Recommended strategy for your profile",
  "Market outlook and current opportunities",
  "Answers to all your investment questions",
];

// ─── Page ──────────────────────────────────────────────────────────────────

export default function EquityCommodityPage() {
  const svc = getServiceBySlug("equity-commodity")!;
  const related = svc.relatedServices
    .map((slug) => allServices.find((s) => s.slug === slug))
    .filter(Boolean);

  return (
    <>
      <ServiceSchema service={svc} />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)",
        }}
      >
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.05 }}
          >
            <defs>
              <pattern
                id="eq-grid"
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
            <rect width="100%" height="100%" fill="url(#eq-grid)" />
          </svg>
        </div>

        {/* Decorative glows */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(13,126,126,0.1) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pb-20">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-sm mb-8 flex-wrap"
            style={{ color: "rgba(255,255,255,0.45)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/financial"
              className="hover:text-white transition-colors"
            >
              Financial Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#C9A84C" }}>Equity & Commodity Market</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — headline & CTAs */}
            <div className="lg:col-span-7">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
                style={{
                  backgroundColor: "rgba(201,168,76,0.15)",
                  color: "#C9A84C",
                  border: "1px solid rgba(201,168,76,0.3)",
                }}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Financial Advisory · Bangalore
              </div>

              <h1
                className="font-heading font-bold text-white mb-5"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3rem)",
                  lineHeight: 1.15,
                }}
              >
                Equity & Commodity
                <br />
                <span style={{ color: "#C9A84C" }}>Market Advisory</span>
              </h1>

              <p
                className="text-lg mb-8 max-w-xl leading-relaxed"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                Expert, research-backed guidance for stock market and commodity
                investments. We help Bangalore investors build wealth — not just
                portfolios.
              </p>

              {/* Exchange badges */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {["NSE", "BSE", "MCX", "NCDEX"].map((ex) => (
                  <span
                    key={ex}
                    className="px-3 py-1 rounded-lg text-xs font-bold tracking-wide"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.75)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {ex}
                  </span>
                ))}
                <span
                  className="px-3 py-1 rounded-lg text-xs font-bold tracking-wide"
                  style={{
                    backgroundColor: "rgba(13,126,126,0.2)",
                    color: "#6ee7e7",
                    border: "1px solid rgba(13,126,126,0.35)",
                  }}
                >
                  SEBI Compliant
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="#consultation"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
                >
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/919999999999"
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

              {/* Trust stats */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-10 pt-8"
                style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
              >
                {trustStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading font-bold text-xl text-white">
                      {stat.value}
                    </p>
                    <p
                      className="text-xs mt-0.5 leading-snug"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — quick contact card */}
            <div className="lg:col-span-5">
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.13)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4" style={{ color: "#C9A84C" }} />
                  <p className="text-white font-semibold text-sm">
                    Free 30-min Strategy Call
                  </p>
                </div>
                <p
                  className="text-sm mb-5 leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Talk to an equity & commodity advisor. No sales pitch — just
                  clear, honest guidance for your investment goals.
                </p>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full px-5 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 mb-3"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
                <Link
                  href="#consultation"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-white/10"
                  style={{
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  Fill Enquiry Form
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p
                  className="text-center text-xs mt-3"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Usually responds within minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE MARKET DATA ─────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: "#F9F8F5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] mb-1.5"
                style={{ color: "#C9A84C" }}
              >
                Live Market Data
              </p>
              <h2
                className="font-heading font-bold text-2xl"
                style={{ color: "#1B3A6B" }}
              >
                Top NSE Stocks — Today&apos;s Prices
              </h2>
            </div>
            <p className="text-xs text-gray-400">
              For reference only. Not investment advice.
            </p>
          </div>
          <TopStocksWidget />
        </div>
      </section>

      {/* ── WHAT WE OFFER ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#C9A84C" }}
            >
              Our Services
            </p>
            <h2
              className="font-heading font-bold text-3xl mb-4"
              style={{ color: "#1B3A6B" }}
            >
              What We Offer
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              End-to-end equity and commodity market services — from your first
              investment to active portfolio management, all under one roof in
              Bangalore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {offerings.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group p-6 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  style={{ border: "1px solid #E5E7EB", backgroundColor: "#FAFAFA" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: `${item.color}18`,
                      border: `1px solid ${item.color}28`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <h3
                    className="font-heading font-bold text-base mb-2"
                    style={{ color: "#1A1A1A" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MARKETS WE COVER ─────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-20"
        style={{ backgroundColor: "#F9F8F5" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#C9A84C" }}
            >
              Market Coverage
            </p>
            <h2
              className="font-heading font-bold text-2xl lg:text-3xl"
              style={{ color: "#1B3A6B" }}
            >
              All Major Exchanges — One Advisor
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {markets.map((mkt) => (
              <div
                key={mkt.name}
                className="p-6 rounded-2xl bg-white"
                style={{ border: `2px solid ${mkt.color}22` }}
              >
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl font-heading font-black text-base mb-4"
                  style={{
                    backgroundColor: `${mkt.color}14`,
                    color: mkt.color,
                    letterSpacing: "0.04em",
                  }}
                >
                  {mkt.name}
                </div>
                <p
                  className="font-semibold text-sm mb-1"
                  style={{ color: "#1A1A1A" }}
                >
                  {mkt.full}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {mkt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY Right Assets ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left — pitch */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
                style={{ color: "#C9A84C" }}
              >
                Why Choose Us
              </p>
              <h2
                className="font-heading font-bold text-3xl mb-5 leading-tight"
                style={{ color: "#1B3A6B" }}
              >
                The Right Assets
                <br />
                Difference
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                We don&apos;t just send tips — we build a long-term advisory
                relationship based on research, transparency, and your financial
                goals. Here&apos;s what sets us apart from generic stock advisory
                services.
              </p>
              <Link
                href="#consultation"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#1B3A6B", color: "white" }}
              >
                Get Started Today
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right — benefit grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyUs.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex gap-4 p-5 rounded-2xl"
                    style={{ backgroundColor: "#F9F8F5", border: "1px solid #E5E7EB" }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(27,58,107,0.1)" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "#1B3A6B" }} />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: "#1A1A1A" }}
                      >
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ──────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-20"
        style={{ backgroundColor: "#F9F8F5" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#C9A84C" }}
            >
              Ideal For
            </p>
            <h2
              className="font-heading font-bold text-2xl lg:text-3xl"
              style={{ color: "#1B3A6B" }}
            >
              Who Is This Service For?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {svc.whoIsItFor.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 rounded-2xl bg-white"
                style={{ border: "1px solid #E5E7EB" }}
              >
                <CheckCircle2
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: "#C9A84C" }}
                />
                <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE HELP — PROCESS ────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#C9A84C" }}
            >
              How It Works
            </p>
            <h2
              className="font-heading font-bold text-2xl lg:text-3xl"
              style={{ color: "#1B3A6B" }}
            >
              Your Journey With Us — Step by Step
            </h2>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-[22px] top-4 bottom-4 w-px hidden sm:block"
              style={{ backgroundColor: "#E5E7EB" }}
            />

            <div className="space-y-6">
              {svc.process.map((step, i) => (
                <div key={step.step} className="flex gap-5 sm:gap-7">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-heading font-bold text-sm z-10"
                    style={{
                      backgroundColor: i % 2 === 0 ? "#1B3A6B" : "#C9A84C",
                      color: i % 2 === 0 ? "white" : "#1A1A1A",
                    }}
                  >
                    {String(step.step).padStart(2, "0")}
                  </div>
                  <div
                    className="flex-1 pb-6"
                    style={{
                      borderBottom:
                        i < svc.process.length - 1
                          ? "1px solid #F3F4F6"
                          : "none",
                    }}
                  >
                    <p
                      className="font-semibold text-base mb-1.5"
                      style={{ color: "#1A1A1A" }}
                    >
                      {step.title}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS — DARK SECTION ──────────────────────────────────────── */}
      <section
        className="py-16 lg:py-20"
        style={{
          background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#C9A84C" }}
            >
              Key Benefits
            </p>
            <h2
              className="font-heading font-bold text-2xl lg:text-3xl text-white"
            >
              Why Invest With Right Assets Management?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {svc.benefits.map((b, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 rounded-2xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(201,168,76,0.2)" }}
                >
                  <CheckCircle2
                    className="w-3.5 h-3.5"
                    style={{ color: "#C9A84C" }}
                  />
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.82)" }}
                >
                  {b}
                </p>
              </div>
            ))}
          </div>

          {/* Inline CTA inside dark section */}
          <div className="text-center mt-12">
            <Link
              href="#consultation"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
            >
              Start Investing with Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS REQUIRED ───────────────────────────────────────────── */}
      {svc.documentsRequired && (
        <section className="py-14 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
                style={{ color: "#C9A84C" }}
              >
                What You&apos;ll Need
              </p>
              <h2
                className="font-heading font-bold text-2xl"
                style={{ color: "#1B3A6B" }}
              >
                Documents Required
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                For Demat / trading account opening and KYC — a simple, one-time
                process.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {svc.documentsRequired.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: "#F9F8F5", border: "1px solid #E5E7EB" }}
                >
                  <FileText
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#C9A84C" }}
                  />
                  <span className="text-sm text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section
        className="py-16 lg:py-24"
        style={{ backgroundColor: "#F9F8F5" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#C9A84C" }}
            >
              Common Questions
            </p>
            <h2
              className="font-heading font-bold text-2xl lg:text-3xl"
              style={{ color: "#1B3A6B" }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {svc.faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-white overflow-hidden"
                style={{ border: "1px solid #E5E7EB" }}
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none">
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "#1A1A1A" }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                    style={{ color: "#1B3A6B" }}
                  />
                </summary>
                <div
                  className="px-5 pb-5 text-sm text-gray-500 leading-relaxed"
                  style={{ borderTop: "1px solid #F3F4F6" }}
                >
                  <p className="pt-4">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULTATION CTA + LEAD FORM ─────────────────────────────────── */}
      <section id="consultation" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left — pitch */}
            <div className="lg:pt-4">
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
                style={{ color: "#C9A84C" }}
              >
                Get Started
              </p>
              <h2
                className="font-heading font-bold text-3xl mb-5 leading-tight"
                style={{ color: "#1B3A6B" }}
              >
                Ready to Build Wealth
                <br />
                in India&apos;s Markets?
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Our equity and commodity advisors are ready to help — whether
                you are starting your investment journey or looking to
                restructure an existing portfolio. Book a free 30-minute call.
                No commitment, no sales pressure.
              </p>

              <div className="space-y-3.5 mb-8">
                {consultationPoints.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle2
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: "#C9A84C" }}
                    />
                    <span className="text-sm text-gray-600">{point}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Our Advisor
              </a>
            </div>

            {/* Right — lead form */}
            <div>
              <LeadForm
                heading="Book a Free Consultation"
                subtext="Talk to our equity & commodity advisors — no commitment, no sales pressure."
                defaultService="Equity & Commodity Market"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16" style={{ backgroundColor: "#F9F8F5" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#C9A84C" }}
            >
              You May Also Need
            </p>
            <h2
              className="font-heading font-bold text-2xl mb-8"
              style={{ color: "#1B3A6B" }}
            >
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((rel) => {
                if (!rel) return null;
                const verticalPath =
                  rel.vertical === "financial"
                    ? "financial"
                    : rel.vertical === "real-estate"
                    ? "real-estate"
                    : "legal";
                return (
                  <Link
                    key={rel.slug}
                    href={`/${verticalPath}/${rel.slug}`}
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    style={{ border: "1px solid #E5E7EB" }}
                  >
                    <div
                      className="w-2 h-10 rounded-full flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#1B3A6B" }}
                    />
                    <div className="flex-1">
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: "#1A1A1A" }}
                      >
                        {rel.title}
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                        {rel.tagline}
                      </p>
                    </div>
                    <ArrowRight
                      className="w-4 h-4 flex-shrink-0 mt-1 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5"
                      style={{ color: "#1B3A6B" }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <ServiceStickyBar serviceName="Equity & Commodity Market" />
    </>
  );
}
