"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SliderInput } from "@/components/tools/SliderInput";

function fmtINR(n: number): string {
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

// Simplified premium rates per ₹1 Lakh sum assured, per year
// Based on typical Indian market averages (LIC, HDFC Life, ICICI Pru, etc.)
const TERM_RATES: Record<string, number[]> = {
  // [minRate, maxRate] per ₹1L SA per year (non-smoker male)
  "18-25": [170, 280],
  "26-30": [210, 340],
  "31-35": [300, 480],
  "36-40": [480, 750],
  "41-45": [780, 1200],
  "46-50": [1300, 2000],
  "51-55": [2200, 3500],
  "56-65": [4000, 7000],
};

function getAgeGroup(age: number): string {
  if (age <= 25) return "18-25";
  if (age <= 30) return "26-30";
  if (age <= 35) return "31-35";
  if (age <= 40) return "36-40";
  if (age <= 45) return "41-45";
  if (age <= 50) return "46-50";
  if (age <= 55) return "51-55";
  return "56-65";
}

// Health insurance annual premium for given cover (family floater)
function getHealthPremium(age: number, cover: number, members: number): [number, number] {
  const coverLakh = cover / 100_000;
  let ratePerLakh: [number, number];
  if (age <= 30) ratePerLakh = [350, 550];
  else if (age <= 40) ratePerLakh = [550, 900];
  else if (age <= 50) ratePerLakh = [900, 1500];
  else ratePerLakh = [1500, 2800];
  const memberFactor = members === 1 ? 1 : members === 2 ? 1.6 : members <= 4 ? 2.1 : 2.5;
  return [
    Math.round(ratePerLakh[0] * coverLakh * memberFactor),
    Math.round(ratePerLakh[1] * coverLakh * memberFactor),
  ];
}

const INSURANCE_TYPES = ["Term Life", "Health Insurance"] as const;
type InsuranceType = (typeof INSURANCE_TYPES)[number];

export default function InsurancePremiumEstimator() {
  const [type, setType] = useState<InsuranceType>("Term Life");
  const [age, setAge] = useState(30);
  const [cover, setCover] = useState(10000000);
  const [smoker, setSmoker] = useState(false);
  const [members, setMembers] = useState(2);

  const { minPremium, maxPremium, monthly } = useMemo(() => {
    let min = 0;
    let max = 0;

    if (type === "Term Life") {
      const group = getAgeGroup(age);
      const [r1, r2] = TERM_RATES[group];
      const coverLakh = cover / 100_000;
      min = Math.round(r1 * coverLakh);
      max = Math.round(r2 * coverLakh);
      if (smoker) { min = Math.round(min * 1.5); max = Math.round(max * 2); }
    } else {
      [min, max] = getHealthPremium(age, cover, members);
    }

    return { minPremium: min, maxPremium: max, monthly: Math.round((min + max) / 2 / 12) };
  }, [type, age, cover, smoker, members]);

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
                      Insurance Estimator
                    </p>
                    <h2 className="font-heading font-bold text-xl text-white">Your Insurance Profile</h2>
                  </div>
                  <div
                    className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)" }}
                  >
                    Drag sliders to update
                  </div>
                </div>
              </div>

              {/* Body — inputs */}
              <div className="p-7 space-y-4">
                {/* Insurance type toggle */}
                <div>
                  <p className="text-sm font-medium mb-3" style={{ color: "#374151" }}>Insurance Type</p>
                  <div className="grid grid-cols-2 gap-3">
                    {INSURANCE_TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() => { setType(t); if (t === "Health Insurance") setCover(500000); else setCover(10000000); }}
                        className="py-3 rounded-xl text-sm font-semibold transition-all"
                        style={
                          type === t
                            ? { backgroundColor: "#1B3A6B", color: "white" }
                            : { backgroundColor: "#F9F8F5", color: "#6B7280", border: "1px solid #E5E7EB" }
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age slider */}
                <SliderInput
                  label="Your Age"
                  value={age}
                  onChange={setAge}
                  min={18}
                  max={65}
                  step={1}
                  display={`${age} yrs`}
                  minLabel="18 yrs"
                  maxLabel="65 yrs"
                />

                {/* Cover amount slider */}
                <SliderInput
                  label={type === "Term Life" ? "Sum Assured (Life Cover)" : "Cover Amount"}
                  value={cover}
                  onChange={setCover}
                  min={type === "Term Life" ? 2500000 : 300000}
                  max={type === "Term Life" ? 100000000 : 2000000}
                  step={type === "Term Life" ? 2500000 : 100000}
                  display={fmtINR(cover)}
                  minLabel={type === "Term Life" ? "₹25 L" : "₹3 L"}
                  maxLabel={type === "Term Life" ? "₹10 Cr" : "₹20 L"}
                />

                {/* Smoker toggle — only for Term Life */}
                {type === "Term Life" && (
                  <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "#F9F8F5", border: "1px solid #E5E7EB" }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#374151" }}>Smoker / Tobacco User</p>
                      <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>Smoker premiums are 50–100% higher</p>
                    </div>
                    <button
                      onClick={() => setSmoker(!smoker)}
                      className="relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
                      style={{ backgroundColor: smoker ? "#C9A84C" : "#D1D5DB" }}
                    >
                      <span
                        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200"
                        style={{ transform: smoker ? "translateX(24px)" : "translateX(0)" }}
                      />
                    </button>
                  </div>
                )}

                {/* Family members — only for Health */}
                {type === "Health Insurance" && (
                  <div>
                    <p className="text-sm font-medium mb-3" style={{ color: "#374151" }}>Number of Members (Family Floater)</p>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((n) => (
                        <button
                          key={n}
                          onClick={() => setMembers(n)}
                          className="py-2.5 rounded-xl text-sm font-semibold transition-all"
                          style={
                            members === n
                              ? { backgroundColor: "#1B3A6B", color: "white" }
                              : { backgroundColor: "#F9F8F5", color: "#6B7280", border: "1px solid #E5E7EB" }
                          }
                        >
                          {n}{n === 4 ? "+" : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Disclaimer — gold accent bar style */}
              <div className="mx-7 mb-7 p-4 rounded-xl flex gap-3" style={{ backgroundColor: "#FBF5E6", border: "1px solid #F0DFB8" }}>
                <div className="w-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#C9A84C" }} />
                <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                  These are <strong>estimates only</strong> based on average Indian market rates.
                  Actual premiums depend on your medical history, insurer, and policy terms.
                  Consult our advisors for an accurate quote.
                </p>
              </div>
            </div>
          </div>

          {/* ── Results ──────────────────────────────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.12)" }}>
              <div style={{ backgroundColor: "#1B3A6B" }} className="px-7 py-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Estimated Annual Premium
                </p>
                <p className="font-heading font-bold text-white" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}>
                  {fmtINR(minPremium)} – {fmtINR(maxPremium)}
                </p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  ≈ {fmtINR(monthly)}/month · {type} · {fmtINR(cover)} cover
                </p>
              </div>

              <div className="bg-white px-7 py-6 space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#EEF2F8" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Min. Estimate</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#1B3A6B" }}>{fmtINR(minPremium)}/yr</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#FBF5E6" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Max. Estimate</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#C9A84C" }}>{fmtINR(maxPremium)}/yr</p>
                  </div>
                  <div className="col-span-2 p-4 rounded-xl" style={{ backgroundColor: "#F9F8F5", border: "1px solid #E5E7EB" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Estimated Monthly Cost</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#1A1A1A" }}>{fmtINR(monthly)}/month</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl text-xs leading-relaxed" style={{ backgroundColor: "#FBF5E6", color: "#92714A" }}>
                  This is an indicative estimate. Actual premium will be confirmed after underwriting.
                  Tax benefits available u/s 80C (life) and 80D (health) of Income Tax Act.
                </div>

                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
                >
                  Get Exact Quote — Free Consultation
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
