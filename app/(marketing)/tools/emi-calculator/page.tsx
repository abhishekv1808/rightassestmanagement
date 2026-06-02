import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import EMICalculator from "@/components/tools/EMICalculator";

export const metadata: Metadata = {
  title: "Loan EMI Calculator — Home, Personal & Vehicle Loans | Right Assets Management",
  description:
    "Calculate your monthly EMI for any loan — home loan, personal loan, or vehicle loan. Free EMI calculator with total interest breakdown by Right Assets Management.",
};

export default function EMICalculatorPage() {
  return (
    <>
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
            <defs>
              <pattern id="emi-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#emi-grid)" />
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
            <span style={{ color: "#C9A84C" }}>EMI Calculator</span>
          </nav>

          <h1
            className="font-heading font-bold text-white mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.2 }}
          >
            Loan EMI Calculator
          </h1>
          <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
            Calculate your monthly EMI for home loans, personal loans, or vehicle loans.
            See the total interest you&apos;ll pay and compare tenures instantly.
          </p>
        </div>
      </div>

      <EMICalculator />

      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: "#1B3A6B" }}>
            Understanding Your EMI
          </h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              <strong>EMI (Equated Monthly Instalment)</strong> is the fixed monthly payment you make to
              repay a loan. Each payment covers both the principal (the loan amount) and the interest
              charged by the lender.
            </p>
            <p>
              In the early months, most of your EMI goes towards interest. As you repay, the interest
              portion decreases and the principal repayment increases — this is called the
              <strong> reducing balance method</strong>, which all major Indian banks use.
            </p>
            <p>
              Our advisors compare rates from 60+ lenders to get you the lowest possible EMI.
              Even a 0.5% difference in rate on a ₹50 lakh loan over 20 years saves you ₹3–4 lakhs.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
            >
              Get Best Loan Rates — Free Consultation
            </Link>
            <Link
              href="/financial/home-loan"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-gray-50"
              style={{ border: "1px solid #E5E7EB", color: "#1B3A6B" }}
            >
              Home Loan Services →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
