import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Home,
  FileText,
  MapPin,
  FileCheck,
  GitBranch,
  Building,
  Search,
  Receipt,
  Trees,
  Layers,
  Scale,
  Key,
  Handshake,
  Landmark,
  ClipboardList,
  MessageCircle,
} from "lucide-react";
import { getServiceBySlug } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Real Estate Services in Bangalore — Property, Documentation & Registration",
  description:
    "Complete real estate services in Bangalore — buy/sell properties, sale deed, khatha, EC, land conversion, property registration, and more. Right Asset Management.",
};

// ─── Cards config ─────────────────────────────────────────────────────────────

const CARDS = [
  { slug: "buy-sell",            Icon: Home,          color: "#0D7E7E", lightBg: "#E6F4F4",  badge: "Most Popular", highlight: "Buy & Sell Assistance" },
  { slug: "property-registration", Icon: FileCheck,   color: "#1B3A6B", lightBg: "#EEF2F8",  badge: null,           highlight: "SRO Coordination" },
  { slug: "sale-deed",           Icon: FileText,      color: "#C9A84C", lightBg: "#FBF5E6",  badge: null,           highlight: "Legal Document Drafting" },
  { slug: "e-khatha",            Icon: ClipboardList, color: "#6B46C1", lightBg: "#F0EBF9",  badge: "High Demand",  highlight: "BBMP & Gram Panchayat" },
  { slug: "encumbrance",         Icon: Search,        color: "#0D7E7E", lightBg: "#E6F4F4",  badge: null,           highlight: "Clear Title Verification" },
  { slug: "rent-agreement",      Icon: Key,           color: "#1B3A6B", lightBg: "#EEF2F8",  badge: null,           highlight: "Registered Agreements" },
  { slug: "mutation",            Icon: GitBranch,     color: "#C9A84C", lightBg: "#FBF5E6",  badge: null,           highlight: "Khatha Transfer" },
  { slug: "land-conversion",     Icon: Layers,        color: "#6B46C1", lightBg: "#F0EBF9",  badge: null,           highlight: "Agri → Residential" },
  { slug: "property-valuation",  Icon: Receipt,       color: "#0D7E7E", lightBg: "#E6F4F4",  badge: null,           highlight: "Certified Reports" },
  { slug: "building-plan",       Icon: Building,      color: "#1B3A6B", lightBg: "#EEF2F8",  badge: null,           highlight: "BBMP / BDA Approval" },
  { slug: "rtc-pahani",          Icon: FileText,      color: "#C9A84C", lightBg: "#FBF5E6",  badge: null,           highlight: "Revenue Records" },
  { slug: "noc",                 Icon: FileCheck,     color: "#6B46C1", lightBg: "#F0EBF9",  badge: null,           highlight: "No Objection Certificate" },
  { slug: "power-of-attorney",   Icon: Scale,         color: "#0D7E7E", lightBg: "#E6F4F4",  badge: null,           highlight: "Registered PoA" },
  { slug: "property-tax",        Icon: Receipt,       color: "#1B3A6B", lightBg: "#EEF2F8",  badge: null,           highlight: "BBMP Tax Services" },
  { slug: "vamshavruksha",       Icon: Trees,         color: "#C9A84C", lightBg: "#FBF5E6",  badge: null,           highlight: "Family Tree Document" },
  { slug: "joint-development",   Icon: Handshake,     color: "#6B46C1", lightBg: "#F0EBF9",  badge: null,           highlight: "JDA Drafting" },
  { slug: "home-loan-property",  Icon: Landmark,      color: "#0D7E7E", lightBg: "#E6F4F4",  badge: null,           highlight: "Loan Against Property" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RealEstateHubPage() {
  return (
    <>
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
              <pattern id="re-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#re-grid)" />
          </svg>
          <div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav
            className="flex items-center gap-1.5 text-sm mb-6"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#C9A84C" }}>Real Estate Services</span>
          </nav>

          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
              style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <Home className="w-3.5 h-3.5" />
              17 Real Estate Services
            </div>

            <h1
              className="font-heading font-bold text-white mb-4"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 1.15 }}
            >
              Real Estate Services
              <br />
              <span style={{ color: "#C9A84C" }}>From Purchase to Registration</span>
            </h1>

            <p className="text-lg mb-8 max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              Buying, selling, or managing property in Bangalore? We handle every aspect —
              documentation, government records, legal verification, and registration —
              all under one roof.
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

      {/* ── Stats strip ───────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "#C9A84C" }} className="py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "17", label: "Real Estate Services" },
              { value: "BBMP", label: "BDA & SRO Expertise" },
              { value: "100%", label: "End-to-End Support" },
              { value: "Free", label: "First Consultation" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading font-bold text-2xl" style={{ color: "#1B3A6B" }}>{s.value}</p>
                <p className="text-xs font-medium" style={{ color: "rgba(27,58,107,0.75)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services grid ─────────────────────────────────────────────── */}
      <section id="services" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#C9A84C" }}
              >
                Real Estate Services
              </p>
              <div className="flex-1 h-px" style={{ backgroundColor: "#C9A84C", maxWidth: "60px" }} />
            </div>
            <h2
              className="font-heading font-bold mb-2"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#1A1A1A" }}
            >
              Complete Property Solutions,{" "}
              <span style={{ color: "#1B3A6B" }}>One Platform</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-lg">
              From buying your first home to complex joint development agreements —
              Karnataka-specific expertise for every property need.
            </p>
          </div>

          {/* 4-col card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {CARDS.map((card) => {
              const svc = getServiceBySlug(card.slug);
              if (!svc) return null;
              return (
                <Link
                  key={card.slug}
                  href={`/real-estate/${card.slug}`}
                  className="group relative flex flex-col gap-3 p-5 rounded-2xl bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                  style={{ border: "1px solid #E5E7EB" }}
                >
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
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: card.lightBg }}
                    >
                      <card.Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed flex-1">
                    {svc.tagline}
                  </p>

                  <div
                    className="flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
                    style={{ color: card.color }}
                  >
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>

          <p className="mt-8 text-center text-xs text-gray-400">
            All property transactions are subject to applicable Karnataka stamp duty and registration charges ·
            Right Asset Management assists with documentation and coordination — not legal representation
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">
            Planning a Property Transaction?
          </h2>
          <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>
            Talk to our real estate experts — free first consultation, complete
            documentation support, and zero hassle.
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
              href="https://wa.me/919999999999"
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
