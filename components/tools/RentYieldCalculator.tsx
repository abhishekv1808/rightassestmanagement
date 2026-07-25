"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SliderInput } from "@/components/tools/SliderInput";

function fmtINR(n: number): string {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export default function RentYieldCalculator() {
  const [propertyValue, setPropertyValue] = useState(8000000);
  const [monthlyRent, setMonthlyRent] = useState(25000);
  const [annualExpenses, setAnnualExpenses] = useState(30000);

  const {
    grossYield,
    netYield,
    annualRent,
    annualIncome,
    paybackYears,
  } = useMemo(() => {
    const annualRent = monthlyRent * 12;
    const annualIncome = annualRent - annualExpenses;
    const grossYield = (annualRent / propertyValue) * 100;
    const netYield = (annualIncome / propertyValue) * 100;
    const paybackYears = netYield > 0 ? 100 / netYield : 0;
    return { grossYield, netYield, annualRent, annualIncome, paybackYears };
  }, [propertyValue, monthlyRent, annualExpenses]);

  const yieldRating =
    netYield >= 5 ? { label: "Excellent", color: "#059669" } :
    netYield >= 3.5 ? { label: "Good", color: "#1B3A6B" } :
    netYield >= 2.5 ? { label: "Average", color: "#C9A84C" } :
    { label: "Below Average", color: "#DC2626" };

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "#F9F8F5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── Inputs ───────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.08)", border: "1px solid #EEF0F3" }}
            >
              {/* Navy gradient header */}
              <div
                className="px-8 py-5"
                style={{
                  borderBottom: "1px solid #EEF0F3",
                  background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-1" style={{ color: "#C9A84C" }}>
                      Rental Yield
                    </p>
                    <h2 className="font-heading font-bold text-xl text-white">Property Details</h2>
                  </div>
                  <div
                    className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)" }}
                  >
                    Drag sliders to update
                  </div>
                </div>
              </div>

              {/* Body — sliders */}
              <div className="p-7 space-y-4">
                <SliderInput
                  label="Property Value"
                  value={propertyValue}
                  onChange={setPropertyValue}
                  min={1000000} max={100000000} step={500000}
                  display={fmtINR(propertyValue)}
                  minLabel="₹10 L"
                  maxLabel="₹10 Cr"
                />
                <SliderInput
                  label="Monthly Rent"
                  value={monthlyRent}
                  onChange={setMonthlyRent}
                  min={3000} max={500000} step={1000}
                  display={fmtINR(monthlyRent)}
                  minLabel="₹3,000"
                  maxLabel="₹5 L"
                />
                <SliderInput
                  label="Annual Expenses"
                  value={annualExpenses}
                  onChange={setAnnualExpenses}
                  min={0} max={500000} step={5000}
                  display={fmtINR(annualExpenses)}
                  minLabel="₹0"
                  maxLabel="₹5 L"
                  hint="Maintenance, property tax, insurance, vacancy losses, etc."
                />
              </div>

              {/* Rental Yield Benchmarks box — navy accent bar style */}
              <div className="mx-7 mb-7 p-4 rounded-xl flex gap-3" style={{ backgroundColor: "#EEF2F8", border: "1px solid #D6E0F0" }}>
                <div className="w-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#1B3A6B" }} />
                <div className="flex-1">
                  <p className="text-xs font-semibold mb-3" style={{ color: "#1B3A6B" }}>Rental Yield Benchmarks</p>
                  <div className="space-y-2">
                    {[
                      { label: "Excellent", range: "≥ 5%", color: "#059669" },
                      { label: "Good", range: "3.5% – 5%", color: "#1B3A6B" },
                      { label: "Average", range: "2.5% – 3.5%", color: "#C9A84C" },
                      { label: "Below Average", range: "< 2.5%", color: "#DC2626" },
                    ].map((b) => (
                      <div key={b.label} className="flex items-center justify-between text-xs">
                        <span style={{ color: b.color }} className="font-semibold">{b.label}</span>
                        <span style={{ color: "#6B7280" }}>{b.range} net yield</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs mt-3" style={{ color: "#9CA3AF" }}>
                    Typical residential average: 2.5% – 3.5%. Premium localities can reach 4–5%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Results ──────────────────────────────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.12)" }}>
              <div style={{ backgroundColor: "#1B3A6B" }} className="px-7 py-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Net Rental Yield
                </p>
                <div className="flex items-end gap-3">
                  <p className="font-heading font-bold text-white" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
                    {netYield.toFixed(2)}%
                  </p>
                  <span
                    className="mb-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase"
                    style={{ backgroundColor: yieldRating.color, color: "white" }}
                  >
                    {yieldRating.label}
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Gross yield: {grossYield.toFixed(2)}% · Payback: ~{paybackYears > 0 ? Math.round(paybackYears) : "—"} yrs
                </p>
              </div>

              <div className="bg-white px-7 py-6 space-y-5">
                {/* Yield bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2" style={{ color: "#6B7280" }}>
                    <span>0%</span>
                    <span>Net Yield</span>
                    <span>6%+</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#F3F4F6" }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((netYield / 6) * 100, 100)}%`,
                        backgroundColor: yieldRating.color,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#EEF2F8" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Annual Rent</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#1B3A6B" }}>{fmtINR(annualRent)}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#FBF5E6" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Net Annual Income</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#C9A84C" }}>{fmtINR(annualIncome)}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#F9F8F5", border: "1px solid #E5E7EB" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Gross Yield</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#1A1A1A" }}>{grossYield.toFixed(2)}%</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#F9F8F5", border: "1px solid #E5E7EB" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Annual Expenses</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#1A1A1A" }}>{fmtINR(annualExpenses)}</p>
                  </div>
                </div>

                <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
                  Does not account for capital appreciation or tax implications. Consult an advisor for full ROI.
                </p>

                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
                >
                  Find High-Yield Properties — Free Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/919742826804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: "#25D366", color: "white" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
