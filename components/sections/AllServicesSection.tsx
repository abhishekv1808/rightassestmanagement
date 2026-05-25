"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, ChevronDown,
  // Financial icons
  PieChart, Heart, Home, Shield, Banknote, Car, BarChart3,
  PiggyBank, FileText, Building2, Landmark, Coins, Star,
  Clock, Gem, Rocket, Calculator, CreditCard, Target, TrendingUp,
  // Real Estate icons
  Key, MapPin, Layers, RefreshCw, Users, BarChart2, Receipt,
  CheckSquare, PenLine, Wallet, Award, ScrollText,
  // Legal icons
  Scale, Briefcase, Monitor, ShoppingBag,
} from "lucide-react";
import { getServiceBySlug } from "@/lib/services-data";

// ─── Types ────────────────────────────────────────────────────────
type CardConfig = {
  slug: string;
  Icon: React.ElementType;
  color: string;
  lightBg: string;
  badge?: string;
  highlight: string;
  vertical: "financial" | "real-estate" | "legal";
};

// ─── Card configs ─────────────────────────────────────────────────

const FINANCIAL_CARDS: CardConfig[] = [
  { slug: "mutual-funds",        Icon: PieChart,    color: "#1B3A6B", lightBg: "#EEF2F8", badge: "Most Popular", highlight: "Expert Advisory",          vertical: "financial" },
  { slug: "health-insurance",    Icon: Heart,       color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Family Cover Plans",       vertical: "financial" },
  { slug: "home-loan",           Icon: Home,        color: "#C9A84C", lightBg: "#FBF5E6", badge: "Best Rates",   highlight: "From 8.4% p.a.",            vertical: "financial" },
  { slug: "life-insurance",      Icon: Shield,      color: "#6B46C1", lightBg: "#F0EBF9", highlight: "Term & ULIP Plans",        vertical: "financial" },
  { slug: "equity-commodity",    Icon: TrendingUp,  color: "#1B3A6B", lightBg: "#EEF2F8", highlight: "Expert Advisory",          vertical: "financial" },
  { slug: "personal-loan",       Icon: Banknote,    color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Quick Disbursal",          vertical: "financial" },
  { slug: "portfolio-management",Icon: BarChart3,   color: "#C9A84C", lightBg: "#FBF5E6", highlight: "HNI Clients",              vertical: "financial" },
  { slug: "vehicle-loan",        Icon: Car,         color: "#6B46C1", lightBg: "#F0EBF9", highlight: "Car & Two-Wheeler",        vertical: "financial" },
  { slug: "fixed-deposits",      Icon: PiggyBank,   color: "#1B3A6B", lightBg: "#EEF2F8", highlight: "Safe Returns",             vertical: "financial" },
  { slug: "nps",                 Icon: Landmark,    color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Tax Benefit u/s 80CCD",    vertical: "financial" },
  { slug: "tax-planning",        Icon: Calculator,  color: "#C9A84C", lightBg: "#FBF5E6", highlight: "ITR Filing Included",      vertical: "financial" },
  { slug: "bonds-ncd",           Icon: FileText,    color: "#6B46C1", lightBg: "#F0EBF9", highlight: "Fixed Income",             vertical: "financial" },
  { slug: "ppf",                 Icon: Coins,       color: "#1B3A6B", lightBg: "#EEF2F8", highlight: "15-Year Lock-in",          vertical: "financial" },
  { slug: "gold-investment",     Icon: Gem,         color: "#C9A84C", lightBg: "#FBF5E6", highlight: "SGB & Gold ETF",           vertical: "financial" },
  { slug: "financial-planning",  Icon: Target,      color: "#0D7E7E", lightBg: "#E6F4F4", badge: "Recommended", highlight: "Comprehensive Plans",       vertical: "financial" },
  { slug: "credit-score",        Icon: CreditCard,  color: "#6B46C1", lightBg: "#F0EBF9", highlight: "Improve in 30–90 Days",   vertical: "financial" },
  { slug: "aif",                 Icon: Building2,   color: "#1B3A6B", lightBg: "#EEF2F8", highlight: "Min. ₹1 Cr Investment",   vertical: "financial" },
  { slug: "sukanya-samriddhi",   Icon: Star,        color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "For Girl Child",           vertical: "financial" },
  { slug: "startup-funding",     Icon: Rocket,      color: "#C9A84C", lightBg: "#FBF5E6", highlight: "Startup Advisory",        vertical: "financial" },
  { slug: "atal-pension",        Icon: Clock,       color: "#6B46C1", lightBg: "#F0EBF9", highlight: "Guaranteed Pension",      vertical: "financial" },
];

const REAL_ESTATE_CARDS: CardConfig[] = [
  { slug: "buy-sell",            Icon: Home,        color: "#0D7E7E", lightBg: "#E6F4F4", badge: "Most Sought",  highlight: "End-to-End Support",        vertical: "real-estate" },
  { slug: "e-khatha",            Icon: CheckSquare, color: "#0D7E7E", lightBg: "#E6F4F4", badge: "High Demand",  highlight: "BBMP / BDA / Gram Panchayat", vertical: "real-estate" },
  { slug: "property-registration",Icon: Award,     color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Sub-Registrar Office",     vertical: "real-estate" },
  { slug: "sale-deed",           Icon: FileText,    color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Legally Compliant",       vertical: "real-estate" },
  { slug: "rent-agreement",      Icon: Key,         color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Registered Agreement",    vertical: "real-estate" },
  { slug: "land-conversion",     Icon: MapPin,      color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Agri → Residential",      vertical: "real-estate" },
  { slug: "building-plan",       Icon: Layers,      color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "BBMP / BDA Approved",     vertical: "real-estate" },
  { slug: "encumbrance",         Icon: Shield,      color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Clear Title Verification", vertical: "real-estate" },
  { slug: "mutation",            Icon: RefreshCw,   color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Khatha Transfer",         vertical: "real-estate" },
  { slug: "property-valuation",  Icon: BarChart2,   color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Certified Reports",       vertical: "real-estate" },
  { slug: "property-tax",        Icon: Receipt,     color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "BBMP Tax",                vertical: "real-estate" },
  { slug: "rtc-pahani",          Icon: ScrollText,  color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Karnataka Land Records",  vertical: "real-estate" },
  { slug: "noc",                 Icon: CheckSquare, color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "All Authorities",         vertical: "real-estate" },
  { slug: "power-of-attorney",   Icon: PenLine,     color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Notarised & Registered",  vertical: "real-estate" },
  { slug: "joint-development",   Icon: Users,       color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Landowner & Builder JDA", vertical: "real-estate" },
  { slug: "home-loan-property",  Icon: Wallet,      color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Up to 70% LTV",          vertical: "real-estate" },
  { slug: "vamshavruksha",       Icon: Users,       color: "#0D7E7E", lightBg: "#E6F4F4", highlight: "Ancestral Property",      vertical: "real-estate" },
];

const LEGAL_CARDS: CardConfig[] = [
  { slug: "property-disputes",   Icon: Scale,       color: "#6B46C1", lightBg: "#F0EBF9", badge: "High Demand",  highlight: "Civil Court Advisory",      vertical: "legal" },
  { slug: "family-cases",        Icon: Heart,       color: "#6B46C1", lightBg: "#F0EBF9", highlight: "Divorce & Maintenance",   vertical: "legal" },
  { slug: "cyber-crime",         Icon: Monitor,     color: "#6B46C1", lightBg: "#F0EBF9", badge: "Growing Need", highlight: "Online Fraud & Hacking",    vertical: "legal" },
  { slug: "consumer-cases",      Icon: ShoppingBag, color: "#6B46C1", lightBg: "#F0EBF9", highlight: "Consumer Forum",          vertical: "legal" },
  { slug: "criminal-advisory",   Icon: Shield,      color: "#6B46C1", lightBg: "#F0EBF9", highlight: "FIR & Bail Advisory",     vertical: "legal" },
  { slug: "labour-cases",        Icon: Briefcase,   color: "#6B46C1", lightBg: "#F0EBF9", highlight: "Employee & Employer",     vertical: "legal" },
  { slug: "insurance-claims",    Icon: FileText,    color: "#6B46C1", lightBg: "#F0EBF9", highlight: "Wrongful Rejection Cases", vertical: "legal" },
  { slug: "banking-cases",       Icon: Building2,   color: "#6B46C1", lightBg: "#F0EBF9", highlight: "Loan Fraud & NPA",        vertical: "legal" },
];

const DEFAULT_VISIBLE = 8;

// ─── Single service card ──────────────────────────────────────────
function ServiceCard({ card }: { card: CardConfig }) {
  const svc = getServiceBySlug(card.slug);
  if (!svc) return null;

  const path =
    card.vertical === "real-estate"
      ? `real-estate/${card.slug}`
      : `${card.vertical}/${card.slug}`;

  return (
    <Link
      href={`/${path}`}
      className="group relative flex flex-col gap-2.5 p-4 md:p-5 rounded-2xl bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
      style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-base leading-snug" style={{ color: "#1A1A1A" }}>
            {svc.title}
          </p>
          <p className="text-xs font-semibold mt-1" style={{ color: card.color }}>
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

      <p className="text-xs text-gray-400 leading-relaxed flex-1">{svc.tagline}</p>

      <div
        className="flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
        style={{ color: card.color }}
      >
        Learn more
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

// ─── Vertical group ───────────────────────────────────────────────
type VerticalConfig = {
  key: string;
  label: string;
  tagline: string;
  color: string;
  lightBg: string;
  href: string;
  cards: CardConfig[];
};

function VerticalGroup({ config }: { config: VerticalConfig }) {
  const [expanded, setExpanded] = useState(false);

  const visible = config.cards.slice(0, DEFAULT_VISIBLE);
  const hidden  = config.cards.slice(DEFAULT_VISIBLE);
  const remaining = hidden.length;

  return (
    <div className="mb-16 last:mb-0">
      {/* Group header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: config.color }}
            >
              {config.label}
            </p>
            <div className="h-px w-14" style={{ backgroundColor: config.color }} />
          </div>
          <h3
            className="font-heading font-bold mb-1"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#1A1A1A" }}
          >
            {config.tagline}
          </h3>
          <p className="text-sm text-gray-500">
            {config.cards.length} services · Expert advisory in Bangalore
          </p>
        </div>
        <Link
          href={config.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold shrink-0 transition-opacity hover:opacity-70"
          style={{ color: config.color }}
        >
          View all {config.label} services
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Always-visible cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
        {visible.map((card) => (
          <ServiceCard key={card.slug} card={card} />
        ))}
      </div>

      {/* Expandable cards */}
      <AnimatePresence>
        {expanded && remaining > 0 && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 mt-3 md:mt-5">
              {hidden.map((card, i) => (
                <motion.div
                  key={card.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <ServiceCard card={card} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show more / less button */}
      {remaining > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
            style={{
              backgroundColor: config.lightBg,
              color: config.color,
              border: `1px solid ${config.color}30`,
            }}
          >
            <ChevronDown
              className="w-4 h-4 transition-transform duration-300"
              style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
            />
            {expanded
              ? `Show less`
              : `Show ${remaining} more ${config.label.toLowerCase()} service${remaining > 1 ? "s" : ""}`}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── VERTICALS config ─────────────────────────────────────────────
const VERTICALS: VerticalConfig[] = [
  {
    key: "financial",
    label: "Financial Services",
    tagline: "Everything You Need, One Advisor",
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
    href: "/financial",
    cards: FINANCIAL_CARDS,
  },
  {
    key: "real-estate",
    label: "Real Estate Services",
    tagline: "Property Simplified, End to End",
    color: "#0D7E7E",
    lightBg: "#E6F4F4",
    href: "/real-estate",
    cards: REAL_ESTATE_CARDS,
  },
  {
    key: "legal",
    label: "Legal Services",
    tagline: "Expert Legal Support, Plain Language",
    color: "#6B46C1",
    lightBg: "#F0EBF9",
    href: "/legal",
    cards: LEGAL_CARDS,
  },
];

// ─── Section ──────────────────────────────────────────────────────
export default function AllServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: "#C9A84C" }}
          >
            All Services
          </p>
          <h2
            className="font-heading font-bold mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#1B3A6B" }}
          >
            48+ Services.{" "}
            <span style={{ color: "#C9A84C" }}>Three Verticals.</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Financial planning, real estate documentation, and legal advisory — all under one roof in Bangalore.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full mb-16" style={{ backgroundColor: "#E5E7EB" }} />

        {/* Three vertical groups */}
        {VERTICALS.map((v) => (
          <VerticalGroup key={v.key} config={v} />
        ))}

      </div>
    </section>
  );
}
