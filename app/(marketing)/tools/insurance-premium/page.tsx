import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import InsurancePremiumEstimator from "@/components/tools/InsurancePremiumEstimator";

export const metadata: Metadata = {
  title: "Insurance Premium Estimator — Term Life & Health | Right Asset Management",
  description:
    "Estimate your annual insurance premium for Term Life or Health Insurance based on your age and coverage amount. Free estimator by Right Asset Management, Bangalore.",
};

export default function InsurancePremiumPage() {
  return (
    <>
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
            <defs>
              <pattern id="ins-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ins-grid)" />
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
            <span style={{ color: "#C9A84C" }}>Insurance Estimator</span>
          </nav>

          <h1
            className="font-heading font-bold text-white mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.2 }}
          >
            Insurance Premium Estimator
          </h1>
          <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
            Get a ballpark estimate for your Term Life or Health Insurance premium
            based on your age, cover amount, and profile.
          </p>
        </div>
      </div>

      <InsurancePremiumEstimator />

      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: "#1B3A6B" }}>
            How Much Insurance Do You Actually Need?
          </h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              A common rule of thumb: your <strong>Term Life cover</strong> should be at least
              10–15 times your annual income. For a ₹10 lakh annual income, that means ₹1–1.5 Crore
              cover — enough to replace your income for your family for years.
            </p>
            <p>
              For <strong>Health Insurance</strong>, a ₹5 lakh individual cover was adequate a decade ago,
              but medical inflation (around 15% p.a.) means ₹10–15 lakhs is now the recommended
              minimum for a family of 4 in a metro city like Bangalore.
            </p>
            <p>
              Our advisors compare plans from 30+ insurers to find the right balance of cover,
              premium, network hospitals, and claim settlement ratio for your specific needs.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
            >
              Get Personalised Insurance Advice — Free
            </Link>
            <Link
              href="/financial/health-insurance"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-gray-50"
              style={{ border: "1px solid #E5E7EB", color: "#1B3A6B" }}
            >
              Health Insurance Services →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
