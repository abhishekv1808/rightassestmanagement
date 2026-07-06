import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  TrendingUp,
  PieChart,
  Heart,
  Shield,
  Home,
  Banknote,
  Car,
  PiggyBank,
  BarChart3,
  FileText,
  Building2,
  Landmark,
  Coins,
  Star,
  Clock,
  Gem,
  Rocket,
  Calculator,
  CreditCard,
  Target,
  MessageCircle,
} from "lucide-react";
import { getServiceBySlug } from "@/lib/services-data";

export const metadata: Metadata = {
  alternates: { canonical: "/financial" },
  title: "Financial Services in Bangalore — Investments, Insurance & Loans",
  description:
    "Comprehensive financial services in Bangalore — mutual funds, SIP, insurance, home loans, tax planning, and more. Expert advisors at Right Assets Management.",
};

// ─── Cards config ─────────────────────────────────────────────────────────────

const CARDS = [
  { slug: "mutual-funds",       Icon: PieChart,    color: "#1B3A6B", lightBg: "#EEF2F8",  badge: "Most Popular", highlight: "Expert Advisory" },
  { slug: "health-insurance",   Icon: Heart,       color: "#0D7E7E", lightBg: "#E6F4F4",  badge: null,           highlight: "Family Cover Plans" },
  { slug: "home-loan",          Icon: Home,        color: "#C9A84C", lightBg: "#FBF5E6",  badge: "Best Rates",   highlight: "From 8.4% p.a." },
  { slug: "life-insurance",     Icon: Shield,      color: "#6B46C1", lightBg: "#F0EBF9",  badge: null,           highlight: "Term & ULIP Plans" },
  { slug: "equity-commodity",   Icon: TrendingUp,  color: "#1B3A6B", lightBg: "#EEF2F8",  badge: null,           highlight: "Expert Advisory" },
  { slug: "personal-loan",      Icon: Banknote,    color: "#0D7E7E", lightBg: "#E6F4F4",  badge: null,           highlight: "Quick Disbursal" },
  { slug: "portfolio-management", Icon: BarChart3, color: "#C9A84C", lightBg: "#FBF5E6",  badge: null,           highlight: "HNI Clients" },
  { slug: "vehicle-loan",       Icon: Car,         color: "#6B46C1", lightBg: "#F0EBF9",  badge: null,           highlight: "Car & Two-Wheeler" },
  { slug: "fixed-deposits",     Icon: PiggyBank,   color: "#1B3A6B", lightBg: "#EEF2F8",  badge: null,           highlight: "Safe Returns" },
  { slug: "nps",                Icon: Landmark,    color: "#0D7E7E", lightBg: "#E6F4F4",  badge: null,           highlight: "Tax Benefit u/s 80CCD" },
  { slug: "tax-planning",       Icon: Calculator,  color: "#C9A84C", lightBg: "#FBF5E6",  badge: null,           highlight: "ITR Filing Included" },
  { slug: "bonds-ncd",          Icon: FileText,    color: "#6B46C1", lightBg: "#F0EBF9",  badge: null,           highlight: "Fixed Income" },
  { slug: "ppf",                Icon: Coins,       color: "#1B3A6B", lightBg: "#EEF2F8",  badge: null,           highlight: "15-Year Lock-in" },
  { slug: "gold-investment",    Icon: Gem,         color: "#C9A84C", lightBg: "#FBF5E6",  badge: null,           highlight: "SGB & Gold ETF" },
  { slug: "financial-planning", Icon: Target,      color: "#0D7E7E", lightBg: "#E6F4F4",  badge: "Recommended",  highlight: "Comprehensive Plans" },
  { slug: "credit-score",       Icon: CreditCard,  color: "#6B46C1", lightBg: "#F0EBF9",  badge: null,           highlight: "Improve in 30–90 Days" },
  { slug: "aif",                Icon: Building2,   color: "#1B3A6B", lightBg: "#EEF2F8",  badge: null,           highlight: "Min. ₹1 Cr Investment" },
  { slug: "sukanya-samriddhi",  Icon: Star,        color: "#0D7E7E", lightBg: "#E6F4F4",  badge: null,           highlight: "For Girl Child" },
  { slug: "startup-funding",    Icon: Rocket,      color: "#C9A84C", lightBg: "#FBF5E6",  badge: null,           highlight: "Startup Advisory" },
  { slug: "atal-pension",       Icon: Clock,       color: "#6B46C1", lightBg: "#F0EBF9",  badge: null,           highlight: "Guaranteed Pension" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FinancialHubPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What financial services does Right Assets Management offer in Bangalore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Right Assets Management offers 21+ financial services including mutual fund SIP, health and life insurance, home loans, personal loans, equity investments, fixed deposits, tax planning, NPS, PPF, portfolio management, and more — all under one roof in Bangalore."
        }
      },
      {
        "@type": "Question",
        "name": "Are Right Assets Management's advisors qualified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Right Assets Management's advisors bring deep domain expertise and work with you to make informed, well-researched investment decisions aligned with your financial goals."
        }
      },
      {
        "@type": "Question",
        "name": "How do I start investing with Right Assets Management?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book a free 30-minute consultation by calling us, WhatsApping, or filling the contact form on our website. Our advisor will assess your goals and recommend the right investment plan."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum investment amount for mutual funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can start a SIP (Systematic Investment Plan) with as little as ₹500 per month. There is no minimum for lump sum investments in most mutual fund schemes."
        }
      },
      {
        "@type": "Question",
        "name": "Does Right Assets Management charge fees for financial advisory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Initial consultations are completely free. Fee structures vary by service — your advisor will explain all charges transparently before you commit to any plan."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
            <defs>
              <pattern id="fin-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fin-grid)" />
          </svg>
          <div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <nav
            className="flex items-center gap-1.5 text-sm mb-4 sm:mb-6"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#C9A84C" }}>Financial Services</span>
          </nav>

          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
              style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              20 Financial Services
            </div>

            <h1
              className="font-heading font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.25rem)", lineHeight: 1.15 }}
            >
              Financial Services
              <br />
              <span style={{ color: "#C9A84C" }}>Built Around Your Goals</span>
            </h1>

            <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              From your first SIP to your retirement corpus — our experienced advisors
              guide every financial decision with clarity, transparency, and no sales pressure.
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
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.25)", color: "white" }}
              >
                Explore All Services
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Services grid ─────────────────────────────────────────────── */}
      <section id="services" className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-3">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#C9A84C" }}
              >
                Financial Services
              </p>
              <div className="flex-1 h-px" style={{ backgroundColor: "#C9A84C", maxWidth: "60px" }} />
            </div>
            <h2
              className="font-heading font-bold mb-2"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#1A1A1A" }}
            >
              Everything You Need,{" "}
              <span style={{ color: "#C9A84C" }}>One Advisor</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-lg">
              Investments, insurance, loans, and retirement planning — expert guidance
              across all 20 financial services under one roof.
            </p>
          </div>

          {/* 4-col card grid */}
          <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4 sm:gap-3 md:gap-5">
            {CARDS.map((card) => {
              const svc = getServiceBySlug(card.slug);
              if (!svc) return null;
              return (
                <Link
                  key={card.slug}
                  href={`/financial/${card.slug}`}
                  className="group block h-full"
                >
                  {/* Mobile: compact icon tile */}
                  <div className="flex sm:hidden flex-col items-center text-center gap-1.5 transition-transform active:scale-95">
                    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl" style={{ backgroundColor: card.lightBg }}>
                      <card.Icon className="h-6 w-6" style={{ color: card.color }} />
                    </div>
                    <span className="line-clamp-2 text-[11px] font-medium leading-tight text-gray-600">{svc.title}</span>
                  </div>

                  {/* Tablet / desktop: full card */}
                  <div
                    className="relative hidden h-full flex-col gap-2.5 rounded-2xl bg-white p-4 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-xl sm:flex md:p-5"
                    style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                  >
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-heading font-bold text-base leading-snug"
                        style={{ color: "#1A1A1A" }}
                      >
                        {svc.title}
                      </p>
                      <p
                        className="text-xs font-semibold mt-1"
                        style={{ color: card.color }}
                      >
                        {card.highlight}
                      </p>
                    </div>
                    {/* Icon box */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: card.lightBg }}
                    >
                      <card.Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed flex-1">
                    {svc.tagline}
                  </p>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
                    style={{ color: card.color }}
                  >
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-center text-xs text-gray-400">
            Returns are subject to market risk ·
            Past performance is not indicative of future results
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section
        className="py-12 sm:py-16"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-4">
            Ready to Build Your Financial Future?
          </h2>
          <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>
            Book a free 30-minute consultation with our experienced advisors —
            no commitment, no sales pressure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919742826804"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "white" }}
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
