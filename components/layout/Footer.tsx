import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Building2,
  Scale,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const FINANCIAL_LINKS = [
  { label: "Equity & Commodity", href: "/financial/equity-commodity" },
  { label: "Mutual Funds & SIP", href: "/financial/mutual-funds" },
  { label: "Health Insurance", href: "/financial/health-insurance" },
  { label: "Life Insurance", href: "/financial/life-insurance" },
  { label: "Home Loans", href: "/financial/home-loan" },
  { label: "Personal Loans", href: "/financial/personal-loan" },
  { label: "Portfolio Management", href: "/financial/portfolio-management" },
  { label: "Tax Planning & ITR Filing", href: "/financial/tax-planning" },
  { label: "Fixed Deposits", href: "/financial/fixed-deposits" },
  { label: "National Pension Scheme", href: "/financial/nps" },
];

const REAL_ESTATE_LINKS = [
  { label: "Buy & Sell Properties", href: "/real-estate/buy-sell" },
  { label: "Property Registration", href: "/real-estate/property-registration" },
  { label: "E-Khatha Application", href: "/real-estate/e-khatha" },
  { label: "Encumbrance Certificate", href: "/real-estate/encumbrance" },
  { label: "Sale Deed & Agreement", href: "/real-estate/sale-deed" },
  { label: "Rent Agreement", href: "/real-estate/rent-agreement" },
  { label: "Property Valuation", href: "/real-estate/property-valuation" },
  { label: "Land Conversion", href: "/real-estate/land-conversion" },
];

const LEGAL_LINKS = [
  { label: "Property Disputes", href: "/legal/property-disputes" },
  { label: "Family Case Support", href: "/legal/family-cases" },
  { label: "Consumer Disputes", href: "/legal/consumer-cases" },
  { label: "Cyber Crime Cases", href: "/legal/cyber-crime" },
  { label: "Insurance Claim Cases", href: "/legal/insurance-claims" },
  { label: "Banking Cases", href: "/legal/banking-cases" },
];

const TOOLS_LINKS = [
  { label: "SIP Returns Calculator", href: "/tools/sip-calculator" },
  { label: "EMI Calculator", href: "/tools/emi-calculator" },
  { label: "FD Maturity Calculator", href: "/tools/fd-calculator" },
  { label: "Insurance Premium Estimator", href: "/tools/insurance-premium" },
  { label: "Rental Yield Calculator", href: "/tools/rent-yield" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#1B3A6B" }}>
      {/* ── Main footer body ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* ── Brand column ─────────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 mb-5 w-fit group">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#C9A84C" }}
              >
                <span className="font-heading font-bold text-white text-sm">R</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-white text-base tracking-wide">
                  Right Asset
                </span>
                <span
                  className="font-body text-[10px] tracking-[0.2em] uppercase font-medium"
                  style={{ color: "#C9A84C" }}
                >
                  Management
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.65)" }}>
              Bangalore&apos;s trusted multi-vertical firm offering 48+ expert services across
              Financial Planning, Real Estate, and Legal Advisory — all under one roof.
            </p>

            {/* Contact block */}
            <div className="space-y-3 mb-6">
              <a
                href="tel:+919999999999"
                className="flex items-center gap-3 text-sm group"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#C9A84C" }} />
                <span className="group-hover:text-white transition-colors">+91 99999 99999</span>
              </a>
              <a
                href="mailto:info@rightasset.in"
                className="flex items-center gap-3 text-sm group"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#C9A84C" }} />
                <span className="group-hover:text-white transition-colors">info@rightasset.in</span>
              </a>
              <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#C9A84C" }} />
                <span>Bangalore, Karnataka, India</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#25D366", color: "white" }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>

          {/* ── Financial Services ───────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4" style={{ color: "#C9A84C" }} />
              <h3
                className="font-body font-semibold text-xs uppercase tracking-[0.15em]"
                style={{ color: "#C9A84C" }}
              >
                Financial Services
              </h3>
            </div>
            <ul className="space-y-2">
              {FINANCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:underline"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      textDecorationColor: "#C9A84C",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/financial"
                  className="inline-flex items-center gap-1 text-sm font-medium transition-colors mt-1"
                  style={{ color: "#C9A84C" }}
                >
                  View all 20 services
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Real Estate ──────────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-4 h-4" style={{ color: "#0D7E7E" }} />
              <h3
                className="font-body font-semibold text-xs uppercase tracking-[0.15em]"
                style={{ color: "#0D7E7E" }}
              >
                Real Estate
              </h3>
            </div>
            <ul className="space-y-2">
              {REAL_ESTATE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:underline"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      textDecorationColor: "#0D7E7E",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/real-estate"
                  className="inline-flex items-center gap-1 text-sm font-medium transition-colors mt-1"
                  style={{ color: "#0D7E7E" }}
                >
                  View all 17 services
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>

            {/* Legal — same column, below real estate */}
            <div className="flex items-center gap-2 mb-4 mt-8">
              <Scale className="w-4 h-4" style={{ color: "#6B46C1" }} />
              <h3
                className="font-body font-semibold text-xs uppercase tracking-[0.15em]"
                style={{ color: "#6B46C1" }}
              >
                Legal Services
              </h3>
            </div>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:underline"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      textDecorationColor: "#6B46C1",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/legal"
                  className="inline-flex items-center gap-1 text-sm font-medium transition-colors mt-1"
                  style={{ color: "#6B46C1" }}
                >
                  View all 8 services
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Quick Links ──────────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <h3
              className="font-body font-semibold text-xs uppercase tracking-[0.15em] mb-4"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2 mb-8">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
                { label: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:underline"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      textDecorationColor: "#C9A84C",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3
              className="font-body font-semibold text-xs uppercase tracking-[0.15em] mb-4"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Free Calculators
            </h3>
            <ul className="space-y-2">
              {TOOLS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:underline"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      textDecorationColor: "#C9A84C",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }} />
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            © {year} Right Asset Management. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Service", href: "/terms-of-service" },
              { label: "Disclaimer", href: "/disclaimer" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-xs mt-3 text-center sm:text-left" style={{ color: "rgba(255,255,255,0.3)" }}>
          SEBI-registered advisors. Investments are subject to market risks. Please read all scheme-related documents carefully.
        </p>
      </div>
    </footer>
  );
}
