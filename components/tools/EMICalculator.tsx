"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

function fmtINR(n: number): string {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  display,
  minLabel,
  maxLabel,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  display: string;
  minLabel: string;
  maxLabel: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium" style={{ color: "#374151" }}>{label}</label>
        <div
          className="px-3 py-1.5 rounded-lg font-heading font-bold text-sm"
          style={{ backgroundColor: "#EEF2F8", color: "#1B3A6B" }}
        >
          {display}
        </div>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: "#C9A84C" }}
      />
      <div className="flex justify-between text-xs mt-1.5" style={{ color: "#9CA3AF" }}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const { emi, totalPayable, totalInterest } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = tenure * 12;
    const emi = r === 0 ? loanAmount / n : (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayable = emi * n;
    return { emi, totalPayable, totalInterest: totalPayable - loanAmount };
  }, [loanAmount, rate, tenure]);

  const principalPct = Math.round((loanAmount / (emi * tenure * 12)) * 100);
  const interestPct = 100 - principalPct;

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "#F9F8F5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── Inputs ───────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}>
              <h2 className="font-heading font-bold text-xl mb-7" style={{ color: "#1B3A6B" }}>
                Enter Loan Details
              </h2>
              <div className="space-y-8">
                <SliderInput
                  label="Loan Amount"
                  value={loanAmount}
                  onChange={setLoanAmount}
                  min={100000} max={50000000} step={100000}
                  display={fmtINR(loanAmount)}
                  minLabel="₹1 L"
                  maxLabel="₹5 Cr"
                />
                <SliderInput
                  label="Annual Interest Rate"
                  value={rate}
                  onChange={setRate}
                  min={5} max={25} step={0.1}
                  display={`${rate.toFixed(1)}%`}
                  minLabel="5%"
                  maxLabel="25%"
                />
                <SliderInput
                  label="Loan Tenure"
                  value={tenure}
                  onChange={setTenure}
                  min={1} max={30} step={1}
                  display={`${tenure} yr${tenure > 1 ? "s" : ""}`}
                  minLabel="1 yr"
                  maxLabel="30 yrs"
                />
              </div>

              <div className="mt-8 p-4 rounded-xl" style={{ backgroundColor: "#F9F8F5", border: "1px solid #E5E7EB" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#1B3A6B" }}>Formula Used</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>
                  EMI = P × r × (1+r)ⁿ / [(1+r)ⁿ − 1] — where P = principal, r = monthly rate,
                  n = tenure in months. Calculated on reducing balance method.
                </p>
              </div>
            </div>
          </div>

          {/* ── Results ──────────────────────────────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.12)" }}>
              <div style={{ backgroundColor: "#1B3A6B" }} className="px-7 py-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Monthly EMI
                </p>
                <p className="font-heading font-bold text-white" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
                  {fmtINR(emi)}
                </p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  For {tenure} years at {rate.toFixed(1)}% p.a.
                </p>
              </div>

              <div className="bg-white px-7 py-6 space-y-5">
                {/* Breakdown bar */}
                <div>
                  <div className="flex rounded-full overflow-hidden h-3 mb-2.5">
                    <div style={{ width: `${principalPct}%`, backgroundColor: "#1B3A6B", transition: "width 0.4s ease" }} />
                    <div style={{ width: `${interestPct}%`, backgroundColor: "#C9A84C", transition: "width 0.4s ease" }} />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="flex items-center gap-1.5" style={{ color: "#6B7280" }}>
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: "#1B3A6B" }} />
                      Principal ({principalPct}%)
                    </span>
                    <span className="flex items-center gap-1.5" style={{ color: "#6B7280" }}>
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: "#C9A84C" }} />
                      Interest ({interestPct}%)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#EEF2F8" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Principal Amount</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#1B3A6B" }}>{fmtINR(loanAmount)}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#FBF5E6" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Total Interest</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#C9A84C" }}>{fmtINR(totalInterest)}</p>
                  </div>
                  <div className="col-span-2 p-4 rounded-xl" style={{ backgroundColor: "#F9F8F5", border: "1px solid #E5E7EB" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Total Amount Payable</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#1A1A1A" }}>{fmtINR(totalPayable)}</p>
                  </div>
                </div>

                <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
                  Actual EMI may vary by lender. Get the best rates from our advisors.
                </p>

                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
                >
                  Get Best Loan Rates — Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/919999999999"
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
