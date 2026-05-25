import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Calculator,
  PiggyBank,
  Shield,
  Home,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Financial Calculators — SIP, EMI, FD & More",
  description:
    "Use Right Asset Management's free financial calculators to plan your investments, loans, and property returns. SIP calculator, EMI calculator, FD calculator, and more.",
};

const TOOLS = [
  {
    href: "/tools/sip-calculator",
    Icon: TrendingUp,
    title: "SIP Returns Calculator",
    desc: "See how your monthly SIP grows over time with compounding. Enter your investment amount, expected return, and duration.",
    highlight: "Most Used",
    example: "₹5,000/mo → ₹11.6 L in 10 yrs",
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
  },
  {
    href: "/tools/emi-calculator",
    Icon: Calculator,
    title: "Loan EMI Calculator",
    desc: "Calculate your monthly EMI for home loans, personal loans, or vehicle loans. Compare tenures and rates instantly.",
    highlight: "Popular",
    example: "₹30 L at 8.5% = ₹26,036/mo",
    color: "#C9A84C",
    lightBg: "#FBF5E6",
  },
  {
    href: "/tools/fd-calculator",
    Icon: PiggyBank,
    title: "FD Maturity Calculator",
    desc: "Find out how much your Fixed Deposit will grow at maturity with quarterly, monthly, or annual compounding.",
    highlight: null,
    example: "₹1 L at 7.25% × 3 yrs = ₹1.24 L",
    color: "#0D7E7E",
    lightBg: "#E6F4F4",
  },
  {
    href: "/tools/insurance-premium",
    Icon: Shield,
    title: "Insurance Premium Estimator",
    desc: "Get an estimated annual premium for Term Life or Health Insurance based on your age, cover amount, and profile.",
    highlight: null,
    example: "₹1 Cr cover at age 30 ≈ ₹9,000/yr",
    color: "#6B46C1",
    lightBg: "#F0EBF9",
  },
  {
    href: "/tools/rent-yield",
    Icon: Home,
    title: "Rental Yield Calculator",
    desc: "Calculate gross and net rental yield for any property. Know if your investment is generating healthy returns.",
    highlight: null,
    example: "₹80 L property, ₹25K rent = 3.75% yield",
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
  },
];

export default function ToolsHubPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
            <defs>
              <pattern id="tools-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tools-grid)" />
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
            <span style={{ color: "#C9A84C" }}>Free Tools</span>
          </nav>

          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
              style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <Wrench className="w-3.5 h-3.5" />
              5 Free Calculators
            </div>

            <h1
              className="font-heading font-bold text-white mb-4"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 1.15 }}
            >
              Free Financial Tools
              <br />
              <span style={{ color: "#C9A84C" }}>Plan Smarter, Invest Better</span>
            </h1>

            <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              Use our free calculators to plan your SIP, estimate your EMI, evaluate an FD,
              or check rental yields — no login, no ads, just numbers.
            </p>
          </div>
        </div>
      </div>

      {/* ── Tools grid ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#C9A84C" }}>
                Free Tools
              </p>
              <div className="flex-1 h-px" style={{ backgroundColor: "#C9A84C", maxWidth: "60px" }} />
            </div>
            <h2
              className="font-heading font-bold mb-2"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#1A1A1A" }}
            >
              5 Calculators,{" "}
              <span style={{ color: "#1B3A6B" }}>Zero Guesswork</span>
            </h2>
            <p className="text-sm text-gray-500 max-w-lg">
              Every tool is free, instant, and built for Indian investors — amounts in ₹,
              returns in Indian market context.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-white transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl"
                style={{ border: "1px solid #E5E7EB" }}
              >
                {tool.highlight && (
                  <span
                    className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: tool.lightBg, color: tool.color }}
                  >
                    {tool.highlight}
                  </span>
                )}

                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: tool.lightBg }}
                >
                  <tool.Icon className="w-6 h-6" style={{ color: tool.color }} />
                </div>

                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg mb-2" style={{ color: "#1A1A1A" }}>
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {tool.desc}
                  </p>
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ backgroundColor: tool.lightBg, color: tool.color }}
                  >
                    e.g. {tool.example}
                  </div>
                </div>

                <div
                  className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5"
                  style={{ color: tool.color }}
                >
                  Use Calculator
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}

            {/* Advisory card */}
            <div
              className="flex flex-col gap-4 p-6 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <Wrench className="w-6 h-6" style={{ color: "#C9A84C" }} />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-lg mb-2 text-white">
                  Still Unsure?
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Numbers can only tell you so much. Our advisors can
                  look at your complete financial picture and give personalised guidance.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
              >
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ────────────────────────────────────────────────── */}
      <div className="py-6" style={{ backgroundColor: "#F9F8F5", borderTop: "1px solid #E5E7EB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs" style={{ color: "#9CA3AF" }}>
            All calculators are for illustrative purposes only and do not constitute financial advice ·
            Returns shown are estimates and may vary · Consult a qualified financial advisor before investing
          </p>
        </div>
      </div>
    </>
  );
}
