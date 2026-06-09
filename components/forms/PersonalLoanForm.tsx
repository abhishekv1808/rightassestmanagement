"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Wallet,
  IndianRupee,
  MessageCircle,
} from "lucide-react";
import { SliderInput } from "@/components/tools/SliderInput";
import { createClient } from "@/lib/supabase/client";
import { getPincodeDetails } from "@/lib/api/pincode";
import { submitPersonalLoan } from "@/app/actions/submit-personal-loan";

const ADMIN_EMAIL = (
  process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@rightasset.in"
).toLowerCase();

const WA_NUMBER = "919999999999";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtLakh(n: number): string {
  if (n >= 100000) {
    const l = n / 100000;
    return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)}L`;
  }
  return `₹${(n / 1000).toFixed(0)}K`;
}

function fmtINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

// Indicative EMI at 12% p.a. over 60 months
function estimateEMI(principal: number): number {
  const r = 0.12 / 12;
  const n = 60;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
}

const STEPS = [
  { id: 1, label: "Loan Details", Icon: Wallet },
  { id: 2, label: "Your Details", Icon: User },
  { id: 3, label: "Location", Icon: MapPin },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PersonalLoanForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Step 1 — loan details
  const [loanAmount, setLoanAmount] = useState(500000);
  const [monthlySalary, setMonthlySalary] = useState(60000);

  // Step 2 — personal details
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Step 3 — location
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "loading" | "found" | "error">("idle");

  // Field-level errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // ── Auto-prefill from logged-in profile (skip admin) ──────────────────────
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user || user.email?.toLowerCase() === ADMIN_EMAIL) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone, email")
        .eq("id", user.id)
        .single();

      const name = profile?.full_name || user.user_metadata?.full_name;
      if (name) setFullName(name);

      const rawPhone = (profile?.phone ?? "").replace(/^\+91/, "").replace(/\D/g, "").slice(0, 10);
      if (rawPhone.length === 10) setPhone(rawPhone);

      const mail = profile?.email || user.email;
      if (mail) setEmail(mail);
    });
  }, []);

  // ── Pincode auto-fill ──────────────────────────────────────────────────────
  const handlePincodeBlur = async () => {
    if (!pincode) { setPincodeStatus("idle"); return; }
    if (!/^\d{6}$/.test(pincode)) { setPincodeStatus("error"); return; }
    setPincodeStatus("loading");
    const details = await getPincodeDetails(pincode);
    if (!details) {
      setPincodeStatus("error");
    } else {
      setPincodeStatus("found");
      setCity(details.city);
      setState(details.state);
    }
  };

  // ── Per-step validation ────────────────────────────────────────────────────
  const validateStep = useCallback((): boolean => {
    const errs: Record<string, string> = {};
    if (step === 2) {
      if (fullName.trim().length < 2) errs.fullName = "Please enter your full name";
      if (!/^[6-9]\d{9}$/.test(phone)) errs.phone = "Enter a valid 10-digit mobile number";
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address";
    }
    if (step === 3) {
      if (!/^\d{6}$/.test(pincode)) errs.pincode = "Enter a valid 6-digit pincode";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }, [step, fullName, phone, email, pincode]);

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(3, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validateStep()) return;
    setStatus("loading");
    setErrorMsg("");

    const res = await submitPersonalLoan({
      fullName,
      phone,
      email: email || undefined,
      pincode,
      city: city || undefined,
      state: state || undefined,
      monthlySalary,
      loanAmount,
    });

    if (res.success) {
      // Fire-and-forget admin notification
      fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          email: email || null,
          service_interested: "Personal Loan",
          message: `Loan: ${fmtINR(loanAmount)} · Salary: ${fmtINR(monthlySalary)}`,
          source: "Personal Loan Page",
          city: city || null,
          state: state || null,
        }),
      }).catch(() => {});
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(res.error ?? "Something went wrong. Please try again.");
    }
  };

  const eligibility = Math.min(monthlySalary * 20, 4000000);
  const emi = estimateEMI(loanAmount);

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px 11px 42px",
    borderRadius: 10,
    border: "1.5px solid #E2E8F0",
    fontSize: 14,
    color: "#1A1A1A",
    outline: "none",
    fontFamily: "inherit",
    backgroundColor: "#FAFAFA",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  // ── Success state ────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 20,
          padding: "44px 32px",
          textAlign: "center",
          boxShadow: "0 8px 40px rgba(27,58,107,0.12)",
        }}
      >
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: "50%",
            backgroundColor: "#EEF7F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <CheckCircle2 style={{ width: 34, height: 34, color: "#16a34a" }} />
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#1B3A6B", marginBottom: 10 }}>
          Application Received!
        </h3>
        <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 8 }}>
          Thank you, <strong style={{ color: "#1B3A6B" }}>{fullName.split(" ")[0]}</strong>. Our loan
          advisor will call you within <strong style={{ color: "#1B3A6B" }}>2 hours</strong> with the
          best personal loan offers for your profile.
        </p>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: 4,
            backgroundColor: "#F9F8F5",
            border: "1px solid #EEF0F3",
            borderRadius: 12,
            padding: "14px 24px",
            margin: "16px 0 24px",
          }}
        >
          <span style={{ fontSize: 12, color: "#94A3B8" }}>Loan amount requested</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#1B3A6B" }}>{fmtINR(loanAmount)}</span>
        </div>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi, I just applied for a personal loan of ${fmtINR(loanAmount)}. My name is ${fullName}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            padding: "13px",
            borderRadius: 12,
            backgroundColor: "#25D366",
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          <MessageCircle style={{ width: 18, height: 18 }} />
          Get Faster Response on WhatsApp
        </a>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(27,58,107,0.12)",
      }}
    >
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)", padding: "22px 28px 20px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 4 }}>
          Personal Loan Application
        </p>
        <h2 style={{ fontSize: 19, fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
          Check Your Eligibility in 60 Seconds
        </h2>

        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 18 }}>
          {STEPS.map((s, i) => {
            const active = step === s.id;
            const done = step > s.id;
            return (
              <div key={s.id} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "0 0 auto" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flexShrink: 0 }}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: done || active ? "#C9A84C" : "rgba(255,255,255,0.12)",
                      border: active ? "2px solid #FFFFFF" : "2px solid transparent",
                      transition: "all 0.2s",
                    }}
                  >
                    {done ? (
                      <CheckCircle2 style={{ width: 16, height: 16, color: "#1B3A6B" }} />
                    ) : (
                      <s.Icon style={{ width: 15, height: 15, color: active ? "#1B3A6B" : "rgba(255,255,255,0.5)" }} />
                    )}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600, color: done || active ? "#C9A84C" : "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: 2, margin: "0 6px", marginBottom: 16, backgroundColor: step > s.id ? "#C9A84C" : "rgba(255,255,255,0.12)", transition: "background-color 0.2s" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "26px 28px" }}>
        {/* ── Step 1: Loan Details ── */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SliderInput
              label="Required Loan Amount"
              value={loanAmount}
              onChange={setLoanAmount}
              min={50000}
              max={4000000}
              step={50000}
              display={fmtLakh(loanAmount)}
              minLabel="₹50K"
              maxLabel="₹40L"
            />
            <SliderInput
              label="Monthly Net Salary"
              value={monthlySalary}
              onChange={setMonthlySalary}
              min={15000}
              max={500000}
              step={5000}
              display={fmtLakh(monthlySalary)}
              minLabel="₹15K"
              maxLabel="₹5L"
            />

            {/* Eligibility + EMI estimate */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginTop: 2,
              }}
            >
              <div style={{ backgroundColor: "#EEF2F8", borderRadius: 12, padding: "14px 16px" }}>
                <p style={{ fontSize: 11, color: "#64748B", marginBottom: 3 }}>Est. eligibility</p>
                <p style={{ fontSize: 17, fontWeight: 800, color: "#1B3A6B" }}>{fmtINR(eligibility)}</p>
              </div>
              <div style={{ backgroundColor: "#FBF5E6", borderRadius: 12, padding: "14px 16px" }}>
                <p style={{ fontSize: 11, color: "#94732B", marginBottom: 3 }}>Indicative EMI*</p>
                <p style={{ fontSize: 17, fontWeight: 800, color: "#94732B" }}>{fmtINR(emi)}/mo</p>
              </div>
            </div>
            <p style={{ fontSize: 11, color: "#94A3B8", marginTop: -4 }}>
              *Indicative EMI at 12% p.a. over 5 years. Actual rate depends on your profile.
            </p>
          </div>
        )}

        {/* ── Step 2: Your Details ── */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Full name */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Full Name <span style={{ color: "#C9A84C" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <User style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#94A3B8", pointerEvents: "none" }} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Eg. Rajesh Kumar"
                  style={{ ...inputBase, borderColor: fieldErrors.fullName ? "#EF4444" : "#E2E8F0" }}
                />
              </div>
              {fieldErrors.fullName && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{fieldErrors.fullName}</p>}
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Mobile Number <span style={{ color: "#C9A84C" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <Phone style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#94A3B8", pointerEvents: "none" }} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  style={{ ...inputBase, borderColor: fieldErrors.phone ? "#EF4444" : "#E2E8F0" }}
                />
              </div>
              {fieldErrors.phone && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{fieldErrors.phone}</p>}
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Email Address <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 400 }}>(optional)</span>
              </label>
              <div style={{ position: "relative" }}>
                <Mail style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#94A3B8", pointerEvents: "none" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{ ...inputBase, borderColor: fieldErrors.email ? "#EF4444" : "#E2E8F0" }}
                />
              </div>
              {fieldErrors.email && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{fieldErrors.email}</p>}
            </div>
          </div>
        )}

        {/* ── Step 3: Location ── */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Pincode */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Pincode <span style={{ color: "#C9A84C" }}>*</span>
                <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 400 }}> (auto-fills city &amp; state)</span>
              </label>
              <div style={{ position: "relative" }}>
                <MapPin style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#94A3B8", pointerEvents: "none" }} />
                <input
                  type="text"
                  inputMode="numeric"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  onBlur={handlePincodeBlur}
                  placeholder="6-digit pincode"
                  maxLength={6}
                  style={{
                    ...inputBase,
                    paddingRight: 40,
                    borderColor: fieldErrors.pincode || pincodeStatus === "error" ? "#EF4444" : pincodeStatus === "found" ? "#16a34a" : "#E2E8F0",
                  }}
                />
                {pincodeStatus === "loading" && <Loader2 className="animate-spin" style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#1B3A6B" }} />}
                {pincodeStatus === "found" && <CheckCircle2 style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#16a34a" }} />}
              </div>
              {fieldErrors.pincode && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{fieldErrors.pincode}</p>}
            </div>

            {/* City + State */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  style={{ ...inputBase, paddingLeft: 14 }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  style={{ ...inputBase, paddingLeft: 14 }}
                />
              </div>
            </div>

            {/* Summary card */}
            <div style={{ backgroundColor: "#F9F8F5", border: "1px solid #EEF0F3", borderRadius: 12, padding: "16px 18px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
                Application Summary
              </p>
              {[
                { label: "Loan Amount", value: fmtINR(loanAmount) },
                { label: "Monthly Salary", value: fmtINR(monthlySalary) },
                { label: "Name", value: fullName || "—" },
                { label: "Mobile", value: phone ? `+91 ${phone}` : "—" },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 13 }}>
                  <span style={{ color: "#64748B" }}>{row.label}</span>
                  <span style={{ color: "#1A1A1A", fontWeight: 600 }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error banner */}
        {status === "error" && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "11px 14px", marginTop: 16 }}>
            <AlertCircle style={{ width: 16, height: 16, color: "#EF4444", flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 13, color: "#DC2626", margin: 0 }}>{errorMsg}</p>
          </div>
        )}

        {/* Navigation buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          {step > 1 && (
            <button
              type="button"
              onClick={back}
              disabled={status === "loading"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "13px 20px",
                borderRadius: 12,
                border: "1.5px solid #E2E8F0",
                backgroundColor: "#FFFFFF",
                color: "#374151",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <ArrowLeft style={{ width: 16, height: 16 }} />
              Back
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "13px",
                borderRadius: 12,
                border: "none",
                backgroundColor: "#C9A84C",
                color: "#1B3A6B",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Continue
              <ArrowRight style={{ width: 17, height: 17 }} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "loading"}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "13px",
                borderRadius: 12,
                border: "none",
                backgroundColor: status === "loading" ? "#B89A45" : "#C9A84C",
                color: "#1B3A6B",
                fontSize: 15,
                fontWeight: 700,
                cursor: status === "loading" ? "not-allowed" : "pointer",
              }}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="animate-spin" style={{ width: 17, height: 17 }} />
                  Submitting…
                </>
              ) : (
                <>
                  <IndianRupee style={{ width: 17, height: 17 }} />
                  Get Loan Offers
                </>
              )}
            </button>
          )}
        </div>

        <p style={{ fontSize: 11, textAlign: "center", color: "#94A3B8", marginTop: 12, lineHeight: 1.5 }}>
          By submitting, you agree to our{" "}
          <a href="/privacy-policy" style={{ color: "#1B3A6B", textDecoration: "underline" }}>Privacy Policy</a>.
          Checking offers does not affect your credit score.
        </p>
      </div>
    </div>
  );
}
