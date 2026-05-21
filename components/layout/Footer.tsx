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
  Calculator,
} from "lucide-react";

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

// ─── Shared heading color ─────────────────────────────────────────

const HEADING_COLOR = "rgba(255,255,255,0.45)";
const LINK_COLOR    = "rgba(255,255,255,0.62)";

// ─── Footer column heading ────────────────────────────────────────

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

// ─── Footer link list ─────────────────────────────────────────────

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

// ─── "View all" link ──────────────────────────────────────────────

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

// ─── Footer ───────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#0F1A2E" }}>

      {/* Gold accent bar */}
      <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #C9A84C 0%, #e8c97a 50%, #C9A84C 100%)" }} />

      {/* ── Main body ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6">

          {/* Brand column */}
          <div className="lg:col-span-3 sm:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 w-fit group">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#C9A84C" }}
              >
                <span className="font-heading font-bold text-white text-base">R</span>
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="font-heading font-bold text-white text-base tracking-wide">
                  Right Asset
                </span>
                <span
                  className="font-body text-[10px] tracking-[0.22em] uppercase font-medium"
                  style={{ color: "#C9A84C" }}
                >
                  Management
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
              Bangalore&apos;s trusted multi-vertical firm offering expert services across
              Financial Planning, Real Estate, and Legal Advisory — all under one roof.
            </p>

            <p className="text-[11px] mb-7 font-medium tracking-wide" style={{ color: "rgba(201,168,76,0.65)" }}>
              SEBI-Registered · Pan Bangalore
            </p>

            {/* Contact details */}
            <div className="space-y-3 mb-7">
              <a
                href="tel:+919999999999"
                className="flex items-center gap-3 text-sm group/link"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.15)" }}
                >
                  <Phone className="w-3.5 h-3.5" style={{ color: "#C9A84C" }} />
                </div>
                <span className="group-hover/link:text-white transition-colors">+91 99999 99999</span>
              </a>
              <a
                href="mailto:info@rightasset.in"
                className="flex items-center gap-3 text-sm group/link"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.15)" }}
                >
                  <Mail className="w-3.5 h-3.5" style={{ color: "#C9A84C" }} />
                </div>
                <span className="group-hover/link:text-white transition-colors">info@rightasset.in</span>
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
                <span>Bangalore, Karnataka, India</span>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#25D366", color: "white" }}
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
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
              © {year} Right Asset Management. All rights reserved. Designed by{" "}
              <span
                className="transition-colors hover:text-white cursor-pointer"
                style={{ color: "rgba(201,168,76,0.55)" }}
              >
                AVD Studio
              </span>.
            </p>
            <p className="text-xs order-1 sm:order-2 text-center sm:text-right max-w-sm" style={{ color: "rgba(255,255,255,0.28)" }}>
              SEBI-registered advisors · Investments subject to market risk · Read all scheme documents carefully
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}
