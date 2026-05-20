import Link from "next/link";
import { Calculator, ArrowRight, TrendingUp, Home, PiggyBank, Building2 } from "lucide-react";

const TOOLS = [
  {
    Icon: TrendingUp,
    label: "SIP Returns Calculator",
    desc: "See how ₹500/month grows over 10, 20, or 30 years with compounding.",
    href: "/tools/sip-calculator",
  },
  {
    Icon: Home,
    label: "EMI Calculator",
    desc: "Calculate your exact monthly instalment for home or personal loans.",
    href: "/tools/emi-calculator",
  },
  {
    Icon: PiggyBank,
    label: "FD Maturity Calculator",
    desc: "Know exactly what your fixed deposit will be worth at maturity.",
    href: "/tools/fd-calculator",
  },
  {
    Icon: Building2,
    label: "Rental Yield Calculator",
    desc: "Calculate the annual return on your rental property investment.",
    href: "/tools/rent-yield",
  },
];

export default function ToolsTeaser() {
  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0D2347 0%, #1B3A6B 100%)" }}
    >
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          <defs>
            <pattern id="tools-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#C9A84C" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tools-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#C9A84C" }}
            >
              Free Tools
            </p>
            <h2 className="font-heading font-bold text-white text-4xl sm:text-5xl">
              Financial Calculators
            </h2>
            <p className="mt-3 text-base max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
              Make smarter money decisions with our free, instant calculators — no sign-up needed.
            </p>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shrink-0 transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "#C9A84C", color: "#1B3A6B" }}
          >
            <Calculator className="w-4 h-4" />
            Try All Calculators
          </Link>
        </div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1.5"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(201,168,76,0.15)" }}
              >
                <t.Icon className="w-5 h-5" style={{ color: "#C9A84C" }} />
              </div>
              <div>
                <h3 className="font-body font-semibold text-white text-[15px] mb-1.5">
                  {t.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {t.desc}
                </p>
              </div>
              <div
                className="flex items-center gap-1 text-xs font-semibold mt-auto"
                style={{ color: "#C9A84C" }}
              >
                Try Now
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
