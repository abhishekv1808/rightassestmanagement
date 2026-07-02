"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Building2,
  Scale,
  MessageCircle,
  ArrowUpRight,
  Calculator,
  Send,
  CheckCircle2,
} from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  TwitterXIcon,
  SOCIAL_PLATFORMS,
} from "@/components/icons/social-icons";

// ─── Link data ────────────────────────────────────────────────────

const FINANCIAL_LINKS = [
  { label: "Mutual Funds & SIP",       href: "/financial/mutual-funds" },
  { label: "Health Insurance",          href: "/financial/health-insurance" },
  { label: "Life Insurance",            href: "/financial/life-insurance" },
  { label: "Home Loans",               href: "/financial/home-loan" },
  { label: "Personal Loans",           href: "/financial/personal-loan" },
  { label: "Portfolio Management",     href: "/financial/portfolio-management" },
  { label: "Tax Planning & ITR",       href: "/financial/tax-planning" },
  { label: "Fixed Deposits",           href: "/financial/fixed-deposits" },
  { label: "National Pension Scheme",  href: "/financial/nps" },
  { label: "Equity & Commodity",       href: "/financial/equity-commodity" },
];

const REAL_ESTATE_LINKS = [
  { label: "Buy & Sell Properties",    href: "/real-estate/buy-sell" },
  { label: "Property Registration",    href: "/real-estate/property-registration" },
  { label: "E-Khatha Application",     href: "/real-estate/e-khatha" },
  { label: "Encumbrance Certificate",  href: "/real-estate/encumbrance" },
  { label: "Sale Deed & Agreement",    href: "/real-estate/sale-deed" },
  { label: "Rent Agreement",           href: "/real-estate/rent-agreement" },
  { label: "Property Valuation",       href: "/real-estate/property-valuation" },
  { label: "Land Conversion",          href: "/real-estate/land-conversion" },
];

const LEGAL_LINKS = [
  { label: "Property Disputes",        href: "/legal/property-disputes" },
  { label: "Family Case Support",      href: "/legal/family-cases" },
  { label: "Cyber Crime Cases",        href: "/legal/cyber-crime" },
  { label: "Consumer Disputes",        href: "/legal/consumer-cases" },
  { label: "Insurance Claim Cases",    href: "/legal/insurance-claims" },
  { label: "Banking Cases",            href: "/legal/banking-cases" },
  { label: "Criminal Advisory",        href: "/legal/criminal-advisory" },
  { label: "Labour Cases",             href: "/legal/labour-cases" },
];

const QUICK_LINKS = [
  { label: "Home",             href: "/" },
  { label: "About Us",         href: "/about" },
  { label: "Contact Us",       href: "/contact" },
  { label: "Blog",             href: "/blog" },
  { label: "Privacy Policy",   href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Disclaimer",       href: "/disclaimer" },
];

const TOOLS_LINKS = [
  { label: "SIP Calculator",           href: "/tools/sip-calculator" },
  { label: "EMI Calculator",           href: "/tools/emi-calculator" },
  { label: "FD Maturity Calculator",   href: "/tools/fd-calculator" },
  { label: "Insurance Estimator",      href: "/tools/insurance-premium" },
  { label: "Rental Yield Calculator",  href: "/tools/rent-yield" },
];

// ─── Shared constants ─────────────────────────────────────────────

const HEADING_COLOR = "rgba(255,255,255,0.45)";
const LINK_COLOR    = "rgba(255,255,255,0.62)";

// ─── Sub-components ───────────────────────────────────────────────

function ColHeading({ icon: Icon, label }: { icon?: React.ElementType; label: string }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-3">
        {Icon && (
          <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: HEADING_COLOR }} />
        )}
        <h3
          className="font-semibold text-[11px] uppercase tracking-[0.2em]"
          style={{ color: HEADING_COLOR }}
        >
          {label}
        </h3>
      </div>
      <div className="h-px w-full" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
    </div>
  );
}

function LinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-sm transition-colors duration-150 footer-link"
            style={{ color: LINK_COLOR }}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ViewAll({ href, count, label }: { href: string; count: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-xs font-semibold mt-4 transition-opacity hover:opacity-80"
      style={{ color: "#C9A84C" }}
    >
      All {count} {label} <ArrowUpRight className="w-3 h-3" />
    </Link>
  );
}

// ─── Newsletter section ───────────────────────────────────────────

function NewsletterSection() {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused]     = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to Supabase newsletter table or an email service
    setSubmitted(true);
  };

  return (
    <div
      className="border-b"
      style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "rgba(0,0,0,0.18)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

          {/* Text side */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(201,168,76,0.15)" }}
              >
                <Mail className="w-2.5 h-2.5" style={{ color: "#C9A84C" }} />
              </div>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: "#C9A84C" }}
              >
                Newsletter
              </span>
            </div>
            <h3 className="font-heading font-bold text-white text-lg mb-1">
              Stay ahead. Stay informed.
            </h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Expert tips on finance, real estate & legal matters — delivered to your inbox. No spam, ever.
            </p>
          </div>

          {/* Form side */}
          <div className="w-full lg:w-auto lg:min-w-[420px]">
            {submitted ? (
              <div
                className="flex items-center gap-3 px-5 py-4 rounded-xl"
                style={{ backgroundColor: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)" }}
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#25D366" }} />
                <div>
                  <p className="text-sm font-semibold text-white">You&apos;re subscribed!</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                    Watch your inbox for expert insights.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 min-w-0 px-4 py-3 rounded-xl text-sm outline-none transition-all placeholder:text-white/25"
                    style={{
                      backgroundColor: focused ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.06)",
                      border: `1px solid ${focused ? "rgba(201,168,76,0.45)" : "rgba(255,255,255,0.1)"}`,
                      color: "white",
                    }}
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-85 flex-shrink-0"
                    style={{ backgroundColor: "#C9A84C", color: "#0F1A2E" }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Subscribe</span>
                    <span className="sm:hidden">Go</span>
                  </button>
                </form>
                <p className="text-[11px] mt-2" style={{ color: "rgba(255,255,255,0.28)" }}>
                  No spam. Unsubscribe anytime. Your data is safe with us.
                </p>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Social icons — labeled platform pills ────────────────────────

function SocialPills() {
  return (
    <div className="mt-7">
      {/* Heading with subtle divider */}
      <div className="flex items-center gap-3 mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] whitespace-nowrap" style={{ color: "#C9A84C" }}>
          Follow Us
        </p>
        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(201,168,76,0.2)" }} />
      </div>

      {/* Platform pills — 2 per row, wrapping */}
      <div className="flex flex-wrap gap-2">
        {SOCIAL_PLATFORMS.map(({ icon: Icon, name, href, accent }) => (
          <SocialPill key={name} icon={Icon} name={name} href={href} accent={accent} />
        ))}
      </div>

      <p className="text-[11px] mt-3" style={{ color: "rgba(255,255,255,0.28)" }}>
        Daily tips · Market updates · Expert insights
      </p>
    </div>
  );
}

function SocialPill({
  icon: Icon,
  name,
  href,
  accent,
}: {
  icon: React.ElementType;
  name: string;
  href: string;
  accent: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow us on ${name}`}
      className="group/pill flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
      style={{
        backgroundColor: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "rgba(255,255,255,0.8)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.backgroundColor = `${accent}22`;
        el.style.borderColor     = `${accent}99`;
        el.style.color           = "#ffffff";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.backgroundColor = "rgba(255,255,255,0.07)";
        el.style.borderColor     = "rgba(255,255,255,0.12)";
        el.style.color           = "rgba(255,255,255,0.8)";
      }}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accent }} />
      {name}
    </a>
  );
}

// ─── Footer ───────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#0F1A2E" }}>

      {/* Gold accent bar */}
      <div
        className="h-[3px] w-full"
        style={{ background: "linear-gradient(90deg, #C9A84C 0%, #e8c97a 50%, #C9A84C 100%)" }}
      />

      {/* Newsletter strip */}
      <NewsletterSection />

      {/* ── Main body ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6">

          {/* Brand column */}
          <div className="lg:col-span-3 sm:col-span-2">
            <Link
              href="/"
              className="flex items-center mb-6 w-fit group"
              aria-label="Right Assets Management — Home"
            >
              <Image
                src="/images/Right-assets-management-logo.svg"
                alt="Right Assets Management"
                width={240}
                height={58}
                className="h-10 w-auto transition-transform group-hover:scale-[1.03]"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>

            <p className="text-sm leading-relaxed mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
              Bangalore&apos;s trusted multi-vertical firm offering expert services across
              Financial Planning, Real Estate, and Legal Advisory — all under one roof.
            </p>

            <p className="text-[11px] mb-7 font-medium tracking-wide" style={{ color: "rgba(201,168,76,0.65)" }}>
              Pan Bangalore
            </p>

            {/* Contact details */}
            <div className="space-y-3 mb-7">
              <a
                href="tel:+919742826804"
                className="flex items-center gap-3 text-sm group/link"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.15)" }}
                >
                  <Phone className="w-3.5 h-3.5" style={{ color: "#C9A84C" }} />
                </div>
                <span className="group-hover/link:text-white transition-colors">+91 97428 26804</span>
              </a>
              <a
                href="mailto:contact@rightassetsmanagement.com"
                className="flex items-center gap-3 text-sm group/link"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.15)" }}
                >
                  <Mail className="w-3.5 h-3.5" style={{ color: "#C9A84C" }} />
                </div>
                <span className="group-hover/link:text-white transition-colors">contact@rightassetsmanagement.com</span>
              </a>
              <div
                className="flex items-start gap-3 text-sm"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.15)" }}
                >
                  <MapPin className="w-3.5 h-3.5" style={{ color: "#C9A84C" }} />
                </div>
                <span>3rd Floor, Narasappa Road, Metro Pillar 471, T. Dasarahalli, Bengaluru, Karnataka 560057</span>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919742826804"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#25D366", color: "white" }}
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>

            {/* Social media pills */}
            <SocialPills />
          </div>

          {/* Financial Services */}
          <div className="lg:col-span-2">
            <ColHeading icon={TrendingUp} label="Financial" />
            <LinkList links={FINANCIAL_LINKS} />
            <ViewAll href="/financial" count="20" label="services" />
          </div>

          {/* Real Estate */}
          <div className="lg:col-span-2">
            <ColHeading icon={Building2} label="Real Estate" />
            <LinkList links={REAL_ESTATE_LINKS} />
            <ViewAll href="/real-estate" count="17" label="services" />
          </div>

          {/* Legal Services */}
          <div className="lg:col-span-2">
            <ColHeading icon={Scale} label="Legal" />
            <LinkList links={LEGAL_LINKS} />
            <ViewAll href="/legal" count="8" label="services" />
          </div>

          {/* Quick Links + Tools */}
          <div className="lg:col-span-3">
            <ColHeading label="Quick Links" />
            <LinkList links={QUICK_LINKS} />

            <div className="mt-8">
              <ColHeading icon={Calculator} label="Free Calculators" />
              <LinkList links={TOOLS_LINKS} />
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs order-2 sm:order-1" style={{ color: "rgba(255,255,255,0.3)" }}>
              © {year} Right Assets Management. All rights reserved. Designed by{" "}
              <span
                className="transition-colors hover:text-white cursor-pointer"
                style={{ color: "rgba(201,168,76,0.55)" }}
              >
                AVD Studio
              </span>.
            </p>

            {/* Social icons row — compact icon-only in bottom bar */}
            <div className="flex items-center gap-3 order-1 sm:order-2">
              {SOCIAL_PLATFORMS.map(({ icon: Icon, name, href, accent }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${name}`}
                  title={name}
                  className="transition-all duration-150 hover:scale-125"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = accent; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)"; }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <p className="text-xs order-3 text-center sm:text-right max-w-sm" style={{ color: "rgba(255,255,255,0.28)" }}>
              Investments subject to market risk · Read all scheme documents carefully
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}
