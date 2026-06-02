import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SIPCalculator from "@/components/tools/SIPCalculator";

export const metadata: Metadata = {
  title: "SIP Returns Calculator — Free Tool | Right Assets Management",
  description:
    "Calculate your SIP maturity value for any monthly investment, expected return, and duration. Free SIP calculator by Right Assets Management, Bangalore.",
};

export default function SIPCalculatorPage() {
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
              <pattern id="sip-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sip-grid)" />
          </svg>
          <div
            className="absolute -top-32 -right-32 w-[440px] h-[440px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <nav
            className="flex items-center gap-1.5 text-sm mb-6 flex-wrap"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#C9A84C" }}>SIP Calculator</span>
          </nav>

          <h1
            className="font-heading font-bold text-white mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.2 }}
          >
            SIP Returns Calculator
          </h1>
          <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
            See exactly how your monthly SIP investment grows over time with the power
            of compounding. Adjust any value and results update instantly.
          </p>
        </div>
      </div>

      {/* ── Interactive calculator (client component) ─────────────────── */}
      <SIPCalculator />

      {/* ── Info section ──────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: "#1B3A6B" }}>
            What is SIP and How Does It Work?
          </h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              A <strong>Systematic Investment Plan (SIP)</strong> lets you invest a fixed amount in mutual funds
              every month. Instead of timing the market, SIPs use <strong>rupee-cost averaging</strong> — you
              automatically buy more units when markets are low and fewer when they&apos;re high.
            </p>
            <p>
              The real power of SIP comes from <strong>compounding</strong>: your returns generate their own
              returns over time. A ₹5,000/month SIP at 12% annual return over 20 years doesn&apos;t just grow
              to ₹12 lakhs (the amount invested) — it grows to over ₹50 lakhs.
            </p>
            <p>
              Our advisors help you choose the right funds based on your goals, risk appetite, and time horizon —
              from equity funds for long-term growth to debt funds for stability.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
            >
              Start Your SIP — Book Free Consultation
            </Link>
            <Link
              href="/financial/mutual-funds"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-gray-50"
              style={{ border: "1px solid #E5E7EB", color: "#1B3A6B" }}
            >
              Learn About Mutual Funds →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
