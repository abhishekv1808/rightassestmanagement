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
        <div className="px-3 py-1.5 rounded-lg font-heading font-bold text-sm" style={{ backgroundColor: "#EEF2F8", color: "#1B3A6B" }}>
          {display}
        </div>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
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

const COMPOUNDING_OPTIONS = [
  { label: "Monthly", value: 12 },
  { label: "Quarterly", value: 4 },
  { label: "Half-Yearly", value: 2 },
  { label: "Yearly", value: 1 },
];

export default function FDCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.25);
  const [years, setYears] = useState(3);
  const [compounding, setCompounding] = useState(4);

  const { maturity, interest } = useMemo(() => {
    const r = rate / 100;
    const n = compounding;
    const t = years;
    const maturity = principal * Math.pow(1 + r / n, n * t);
    return { maturity, interest: maturity - principal };
  }, [principal, rate, years, compounding]);

  const principalPct = Math.round((principal / maturity) * 100);
  const interestPct = 100 - principalPct;

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "#F9F8F5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── Inputs ───────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}>
              <h2 className="font-heading font-bold text-xl mb-7" style={{ color: "#1B3A6B" }}>
                Enter FD Details
              </h2>
              <div className="space-y-8">
                <SliderInput
                  label="Principal Amount"
                  value={principal}
                  onChange={setPrincipal}
                  min={1000} max={10000000} step={1000}
                  display={fmtINR(principal)}
                  minLabel="₹1,000"
                  maxLabel="₹1 Cr"
                />
                <SliderInput
                  label="Annual Interest Rate"
                  value={rate}
                  onChange={setRate}
                  min={3} max={15} step={0.05}
                  display={`${rate.toFixed(2)}%`}
                  minLabel="3%"
                  maxLabel="15%"
                />
                <SliderInput
                  label="Tenure"
                  value={years}
                  onChange={setYears}
                  min={1} max={10} step={1}
                  display={`${years} yr${years > 1 ? "s" : ""}`}
                  minLabel="1 yr"
                  maxLabel="10 yrs"
                />

                {/* Compounding selector */}
                <div>
                  <p className="text-sm font-medium mb-3" style={{ color: "#374151" }}>Compounding Frequency</p>
                  <div className="grid grid-cols-4 gap-2">
                    {COMPOUNDING_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setCompounding(opt.value)}
                        className="py-2.5 rounded-xl text-xs font-semibold transition-all"
                        style={
                          compounding === opt.value
                            ? { backgroundColor: "#1B3A6B", color: "white" }
                            : { backgroundColor: "#F9F8F5", color: "#6B7280", border: "1px solid #E5E7EB" }
                        }
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl" style={{ backgroundColor: "#F9F8F5", border: "1px solid #E5E7EB" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#1B3A6B" }}>Formula Used</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>
                  A = P(1 + r/n)^(nt) — where P = principal, r = annual rate, n = compounding
                  frequency per year, t = tenure in years.
                </p>
              </div>
            </div>
          </div>

          {/* ── Results ──────────────────────────────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.12)" }}>
              <div style={{ backgroundColor: "#1B3A6B" }} className="px-7 py-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Maturity Amount
                </p>
                <p className="font-heading font-bold text-white" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
                  {fmtINR(maturity)}
                </p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  After {years} year{years > 1 ? "s" : ""} at {rate.toFixed(2)}% p.a. ({COMPOUNDING_OPTIONS.find(o => o.value === compounding)?.label} compounding)
                </p>
              </div>

              <div className="bg-white px-7 py-6 space-y-5">
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
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Principal</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#1B3A6B" }}>{fmtINR(principal)}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#FBF5E6" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Interest Earned</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#C9A84C" }}>{fmtINR(interest)}</p>
                  </div>
                </div>

                <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
                  Interest earned is taxable as per your income tax slab. TDS applies above ₹40,000/year.
                </p>

                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
                >
                  Invest in the Best FD — Free Advice
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
