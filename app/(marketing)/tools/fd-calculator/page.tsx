import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FDCalculator from "@/components/tools/FDCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/fd-calculator" },
  title: "FD Maturity Calculator — Fixed Deposit Returns | Right Assets Management",
  description:
    "Calculate your Fixed Deposit maturity amount with quarterly, monthly, or annual compounding. Free FD calculator by Right Assets Management, Bangalore.",
};

export default function FDCalculatorPage() {
  return (
    <>
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
            <defs>
              <pattern id="fd-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fd-grid)" />
          </svg>
          <div
            className="absolute -top-32 -right-32 w-[440px] h-[440px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
          <nav
            className="flex items-center gap-1.5 text-sm mb-6 flex-wrap"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#C9A84C" }}>FD Calculator</span>
          </nav>

          <h1
            className="font-heading font-bold text-white mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.2 }}
          >
            FD Maturity Calculator
          </h1>
          <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
            Find out exactly how much your Fixed Deposit will grow by maturity — with
            quarterly, monthly, half-yearly, or annual compounding.
          </p>
        </div>
      </div>

      <FDCalculator />

      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: "#1B3A6B" }}>
            Fixed Deposits — Safe, Predictable Returns
          </h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              Fixed Deposits (FDs) are one of India&apos;s most popular savings instruments — offering
              guaranteed returns regardless of market conditions. The interest rate is locked at
              the time of deposit and does not change during the tenure.
            </p>
            <p>
              <strong>Compounding frequency matters:</strong> monthly compounding will always give a
              slightly higher effective yield than quarterly or annual compounding, even at the same
              nominal rate. Most bank FDs compound quarterly.
            </p>
            <p>
              <strong>Tax note:</strong> FD interest is taxable as per your income slab. TDS (10%) is
              deducted if interest exceeds ₹40,000/year (₹50,000 for senior citizens). Tax-saver FDs
              (5-year lock-in) qualify for 80C deduction up to ₹1.5 lakhs.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
            >
              Compare Best FD Rates — Free Advice
            </Link>
            <Link
              href="/financial/fixed-deposits"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-gray-50"
              style={{ border: "1px solid #E5E7EB", color: "#1B3A6B" }}
            >
              FD Advisory Services →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
