"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SliderInput } from "@/components/tools/SliderInput";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtINR(n: number): string {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const { invested, returns, maturity } = useMemo(() => {
    const n = years * 12;
    const r = rate / 100 / 12;
    const maturity = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = monthly * n;
    return { invested, returns: maturity - invested, maturity };
  }, [monthly, rate, years]);

  const investedPct = Math.round((invested / maturity) * 100);
  const returnsPct = 100 - investedPct;

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "#F9F8F5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── Inputs ───────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div
              className="bg-white rounded-2xl p-8"
              style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}
            >
              <h2 className="font-heading font-bold text-xl mb-7" style={{ color: "#1B3A6B" }}>
                Adjust Your SIP Details
              </h2>
              <div className="space-y-8">
                <SliderInput
                  label="Monthly Investment"
                  value={monthly}
                  onChange={setMonthly}
                  min={500} max={100000} step={500}
                  display={fmtINR(monthly)}
                  minLabel="₹500"
                  maxLabel="₹1 L"
                />
                <SliderInput
                  label="Expected Annual Return"
                  value={rate}
                  onChange={setRate}
                  min={1} max={30} step={0.5}
                  display={`${rate}%`}
                  minLabel="1%"
                  maxLabel="30%"
                />
                <SliderInput
                  label="Investment Duration"
                  value={years}
                  onChange={setYears}
                  min={1} max={40} step={1}
                  display={`${years} yr${years > 1 ? "s" : ""}`}
                  minLabel="1 yr"
                  maxLabel="40 yrs"
                />
              </div>

              {/* Formula note */}
              <div className="mt-8 p-4 rounded-xl" style={{ backgroundColor: "#F9F8F5", border: "1px solid #E5E7EB" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#1B3A6B" }}>Formula Used</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>
                  M = P × [(1+r)ⁿ − 1] / r × (1+r) — where P = monthly investment,
                  r = monthly rate, n = total months. Returns compounded monthly.
                </p>
              </div>
            </div>
          </div>

          {/* ── Results ──────────────────────────────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.12)" }}>
              {/* Navy header */}
              <div style={{ backgroundColor: "#1B3A6B" }} className="px-7 py-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Estimated Maturity Value
                </p>
                <p className="font-heading font-bold text-white" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
                  {fmtINR(maturity)}
                </p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  After {years} year{years > 1 ? "s" : ""} at {rate}% p.a.
                </p>
              </div>

              {/* White body */}
              <div className="bg-white px-7 py-6 space-y-5">
                {/* Breakdown bar */}
                <div>
                  <div className="flex rounded-full overflow-hidden h-3 mb-2.5">
                    <div style={{ width: `${investedPct}%`, backgroundColor: "#1B3A6B", transition: "width 0.4s ease" }} />
                    <div style={{ width: `${returnsPct}%`, backgroundColor: "#C9A84C", transition: "width 0.4s ease" }} />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="flex items-center gap-1.5" style={{ color: "#6B7280" }}>
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: "#1B3A6B" }} />
                      Invested ({investedPct}%)
                    </span>
                    <span className="flex items-center gap-1.5" style={{ color: "#6B7280" }}>
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: "#C9A84C" }} />
                      Returns ({returnsPct}%)
                    </span>
                  </div>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#EEF2F8" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Total Invested</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#1B3A6B" }}>{fmtINR(invested)}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#FBF5E6" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Est. Returns</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#C9A84C" }}>{fmtINR(returns)}</p>
                  </div>
                  <div className="col-span-2 p-4 rounded-xl" style={{ backgroundColor: "#F9F8F5", border: "1px solid #E5E7EB" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Monthly Investment</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#1A1A1A" }}>{fmtINR(monthly)} × {years * 12} months</p>
                  </div>
                </div>

                <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
                  Estimates only. Actual returns vary. Consult an advisor before investing.
                </p>

                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
                >
                  Start Your SIP — Book Free Call
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
