import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import RentYieldCalculator from "@/components/tools/RentYieldCalculator";

export const metadata: Metadata = {
  title: "Rental Yield Calculator — Is Your Property Earning Enough? | Right Assets Management",
  description:
    "Calculate gross and net rental yield for any property in Bangalore. Know if your investment is generating healthy returns with our free rental yield calculator.",
};

export default function RentYieldPage() {
  return (
    <>
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
            <defs>
              <pattern id="rent-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rent-grid)" />
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
            <span style={{ color: "#C9A84C" }}>Rental Yield Calculator</span>
          </nav>

          <h1
            className="font-heading font-bold text-white mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.2 }}
          >
            Rental Yield Calculator
          </h1>
          <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
            Calculate the gross and net rental yield on any property. Know whether
            your property investment is generating healthy returns.
          </p>
        </div>
      </div>

      <RentYieldCalculator />

      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: "#1B3A6B" }}>
            Understanding Rental Yield in Bangalore
          </h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              <strong>Gross rental yield</strong> is simply your annual rent divided by the property value,
              expressed as a percentage. <strong>Net yield</strong> accounts for annual expenses — maintenance,
              property tax, insurance, agent fees, and vacancy periods.
            </p>
            <p>
              Bangalore&apos;s average rental yield ranges from <strong>2.5% to 4%</strong> depending on the
              locality. Premium areas like Whitefield, Koramangala, and HSR Layout tend to offer better yields
              (3.5–5%) due to strong corporate rental demand.
            </p>
            <p>
              Remember: rental yield is only part of the ROI story. <strong>Capital appreciation</strong> (price
              growth) often contributes more to total returns in Bangalore&apos;s appreciating real estate market.
              Our advisors can help you evaluate the full picture.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
            >
              Find High-Yield Properties — Free Call
            </Link>
            <Link
              href="/real-estate/buy-sell"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-gray-50"
              style={{ border: "1px solid #E5E7EB", color: "#1B3A6B" }}
            >
              Property Services →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
