"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Phone,
  Video,
  MapPin,
  Calendar,
  Clock,
  User,
  Mail,
  Home,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { submitConsultation } from "@/app/actions/submit-consultation";
import { getPincodeDetails } from "@/lib/api/pincode";

const ADMIN_EMAIL = (
  process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@rightasset.in"
).toLowerCase();

const WA_NUMBER = "919742826804";

// ─── Config ───────────────────────────────────────────────────────────────────

const MODES = [
  { id: "call", label: "Phone Call", sub: "We call you", Icon: Phone },
  { id: "video", label: "Video Call", sub: "Google Meet", Icon: Video },
  { id: "in-person", label: "In Person", sub: "At our office", Icon: MapPin },
] as const;

type Mode = (typeof MODES)[number]["id"];

const TIME_SLOTS = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

const SERVICES = [
  "Financial Planning",
  "Mutual Funds / SIP",
  "Home Loan",
  "Personal Loan",
  "Insurance",
  "Tax Planning",
  "Real Estate / Property",
  "Property Registration",
  "Legal Advisory",
  "Other",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function to12h(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, "0")} ${period}`;
}

function ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Next 14 available days (skip Sundays)
function getAvailableDays(): Date[] {
  const days: Date[] = [];
  const cur = new Date();
  cur.setHours(0, 0, 0, 0);
  while (days.length < 14) {
    if (cur.getDay() !== 0) days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return days;
}

const STEPS = [
  { id: 1, label: "Type", Icon: Phone },
  { id: 2, label: "Date", Icon: Calendar },
  { id: 3, label: "Time", Icon: Clock },
  { id: 4, label: "Details", Icon: User },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ConsultationBooking() {
  const days = getAvailableDays();

  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [mode, setMode] = useState<Mode>("call");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Location — drives franchise routing on the lead
  const [pincode, setPincode] = useState("");
  const [locCity, setLocCity] = useState("");
  const [locState, setLocState] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "loading" | "found" | "error">("idle");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Prefill from logged-in profile (skip admin)
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
      const p = (profile?.phone ?? "").replace(/^\+91/, "").replace(/\D/g, "").slice(0, 10);
      if (p.length === 10) setPhone(p);
      const mail = profile?.email || user.email;
      if (mail) setEmail(mail);
    });
  }, []);

  // Fetch booked slots when date changes
  useEffect(() => {
    if (!date) return;
    setLoadingSlots(true);
    const supabase = createClient();
    supabase
      .rpc("get_booked_slots", { target_date: date })
      .then(({ data }) => {
        setBookedSlots((data ?? []).map((r: { slot: string }) => r.slot));
        setLoadingSlots(false);
      });
  }, [date]);

  // Disable past slots for today
  const isSlotPast = useCallback(
    (slot: string): boolean => {
      if (!date) return false;
      const today = ymd(new Date());
      if (date !== today) return false;
      const [h, m] = slot.split(":").map(Number);
      const slotTime = new Date();
      slotTime.setHours(h, m, 0, 0);
      // 1-hour booking buffer
      return slotTime.getTime() < Date.now() + 60 * 60 * 1000;
    },
    [date]
  );

  // Pincode → city/state auto-fill (India Post via /api/pincode). Never blocks
  // submission: any failure just leaves the fields editable.
  const lookupPincode = useCallback(async (pin: string) => {
    setPincodeStatus("loading");
    const details = await getPincodeDetails(pin);
    if (!details) {
      setPincodeStatus("error");
      return;
    }
    setPincodeStatus("found");
    setLocCity(details.city);
    setLocState(details.state);
  }, []);

  const onPincodeChange = (raw: string) => {
    const pin = raw.replace(/\D/g, "").slice(0, 6);
    setPincode(pin);
    if (pin.length === 6) lookupPincode(pin);
    else setPincodeStatus("idle");
  };

  const validateDetails = (): boolean => {
    const errs: Record<string, string> = {};
    if (fullName.trim().length < 2) errs.fullName = "Please enter your full name";
    if (!/^[6-9]\d{9}$/.test(phone)) errs.phone = "Enter a valid 10-digit mobile number";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    // Address is required for in-person visits so our advisor knows where to come
    if (mode === "in-person" && address.trim().length < 6)
      errs.address = "Please enter your address for the in-person visit";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (step === 2 && !date) return;
    if (step === 3 && !time) return;
    setStep((s) => Math.min(4, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async () => {
    if (!validateDetails()) return;
    setStatus("loading");
    setErrorMsg("");
    const res = await submitConsultation({
      fullName, phone, email: email || undefined, service: service || undefined,
      address: address || undefined,
      pincode: pincode || undefined, city: locCity || undefined, state: locState || undefined,
      mode, preferredDate: date, preferredTime: time, notes: notes || undefined,
    });
    if (res.success) {
      setStatus("success");
    } else if (res.slotTaken) {
      // Slot got taken — bounce back to time selection
      setStatus("idle");
      setTime("");
      setStep(3);
      setErrorMsg(res.error ?? "");
      // refresh booked slots
      const supabase = createClient();
      const { data } = await supabase.rpc("get_booked_slots", { target_date: date });
      setBookedSlots((data ?? []).map((r: { slot: string }) => r.slot));
    } else {
      setStatus("error");
      setErrorMsg(res.error ?? "Something went wrong.");
    }
  };

  const selectedDay = days.find((d) => ymd(d) === date);

  // ── Success ────────────────────────────────────────────────────────────────
  if (status === "success") {
    const modeLabel = MODES.find((m) => m.id === mode)?.label ?? "consultation";
    return (
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, padding: "44px 32px", textAlign: "center", boxShadow: "0 8px 40px rgba(27,58,107,0.12)" }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", backgroundColor: "#EEF7F0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <CheckCircle2 style={{ width: 34, height: 34, color: "#16a34a" }} />
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#1B3A6B", marginBottom: 10 }}>
          Consultation Booked!
        </h3>
        <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>
          Thank you, <strong style={{ color: "#1B3A6B" }}>{fullName.split(" ")[0]}</strong>. Your{" "}
          {modeLabel.toLowerCase()} is scheduled. Our advisor will confirm shortly.
        </p>
        <div style={{ backgroundColor: "#F9F8F5", border: "1px solid #EEF0F3", borderRadius: 12, padding: "16px 20px", marginBottom: 24, textAlign: "left", display: "inline-block" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <Calendar style={{ width: 16, height: 16, color: "#C9A84C" }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>
              {selectedDay?.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Clock style={{ width: 16, height: 16, color: "#C9A84C" }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>{to12h(time)}</span>
          </div>
        </div>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi, I just booked a ${modeLabel} consultation on ${selectedDay?.toLocaleDateString("en-IN", { day: "numeric", month: "long" })} at ${to12h(time)}. My name is ${fullName}.`)}`}
          target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "13px", borderRadius: 12, backgroundColor: "#25D366", color: "#FFFFFF", fontSize: 14, fontWeight: 700, textDecoration: "none" }}
        >
          <MessageCircle style={{ width: 18, height: 18 }} />
          Confirm on WhatsApp
        </a>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(27,58,107,0.12)" }}>
      {/* Header + step indicator */}
      <div style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)", padding: "22px 28px 20px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 4 }}>
          Book a Free Consultation
        </p>
        <h2 style={{ fontSize: 19, fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
          Pick a time that works for you
        </h2>

        <div style={{ display: "flex", alignItems: "center", marginTop: 18 }}>
          {STEPS.map((s, i) => {
            const active = step === s.id;
            const done = step > s.id;
            return (
              <div key={s.id} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "0 0 auto" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flexShrink: 0 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: done || active ? "#C9A84C" : "rgba(255,255,255,0.12)", border: active ? "2px solid #FFFFFF" : "2px solid transparent", transition: "all 0.2s" }}>
                    {done ? <CheckCircle2 style={{ width: 16, height: 16, color: "#1B3A6B" }} /> : <s.Icon style={{ width: 14, height: 14, color: active ? "#1B3A6B" : "rgba(255,255,255,0.5)" }} />}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600, color: done || active ? "#C9A84C" : "rgba(255,255,255,0.4)" }}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <div style={{ flex: 1, height: 2, margin: "0 6px", marginBottom: 16, backgroundColor: step > s.id ? "#C9A84C" : "rgba(255,255,255,0.12)", transition: "background-color 0.2s" }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "26px 28px" }}>
        {/* Step 1: Mode */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 2 }}>How would you like to meet?</p>
            {MODES.map((m) => {
              const sel = mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderRadius: 14, textAlign: "left", border: `1.5px solid ${sel ? "#1B3A6B" : "#E2E8F0"}`, backgroundColor: sel ? "#EEF2F8" : "#FAFAFA", cursor: "pointer", transition: "all 0.15s" }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: sel ? "#1B3A6B" : "#EEF2F8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                    <m.Icon style={{ width: 20, height: 20, color: sel ? "#C9A84C" : "#1B3A6B" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: sel ? "#1B3A6B" : "#1A1A1A", margin: 0 }}>{m.label}</p>
                    <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>{m.sub}</p>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${sel ? "#1B3A6B" : "#CBD5E1"}`, backgroundColor: sel ? "#1B3A6B" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {sel && <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#C9A84C" }} />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Step 2: Date */}
        {step === 2 && (
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 12 }}>Select a date (Mon–Sat)</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))", gap: 8 }}>
              {days.map((d) => {
                const key = ymd(d);
                const sel = date === key;
                const isToday = key === ymd(new Date());
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => { setDate(key); setTime(""); }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "10px 4px", borderRadius: 12, border: `1.5px solid ${sel ? "#1B3A6B" : "#E2E8F0"}`, backgroundColor: sel ? "#1B3A6B" : "#FAFAFA", cursor: "pointer", transition: "all 0.15s" }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 600, color: sel ? "rgba(255,255,255,0.6)" : "#94A3B8", textTransform: "uppercase" }}>
                      {d.toLocaleDateString("en-IN", { weekday: "short" })}
                    </span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: sel ? "#C9A84C" : "#1B3A6B", lineHeight: 1.1 }}>
                      {d.getDate()}
                    </span>
                    <span style={{ fontSize: 9, fontWeight: 600, color: sel ? "rgba(255,255,255,0.6)" : "#94A3B8" }}>
                      {isToday ? "Today" : d.toLocaleDateString("en-IN", { month: "short" })}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Time */}
        {step === 3 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", margin: 0 }}>Available time slots</p>
              {selectedDay && (
                <span style={{ fontSize: 12, color: "#94A3B8" }}>
                  {selectedDay.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                </span>
              )}
            </div>
            {errorMsg && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "10px 12px", marginBottom: 12 }}>
                <AlertCircle style={{ width: 14, height: 14, color: "#EF4444", flexShrink: 0 }} />
                <p style={{ fontSize: 12, color: "#DC2626", margin: 0 }}>{errorMsg}</p>
              </div>
            )}
            {loadingSlots ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 0", color: "#94A3B8" }}>
                <Loader2 className="animate-spin" style={{ width: 22, height: 22 }} />
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))", gap: 8 }}>
                {TIME_SLOTS.map((slot) => {
                  const taken = bookedSlots.includes(slot) || isSlotPast(slot);
                  const sel = time === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={taken}
                      onClick={() => setTime(slot)}
                      style={{
                        padding: "11px 6px",
                        borderRadius: 10,
                        border: `1.5px solid ${sel ? "#1B3A6B" : taken ? "#F1F5F9" : "#E2E8F0"}`,
                        backgroundColor: sel ? "#1B3A6B" : taken ? "#F8FAFC" : "#FAFAFA",
                        color: sel ? "#C9A84C" : taken ? "#CBD5E1" : "#1A1A1A",
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: taken ? "not-allowed" : "pointer",
                        textDecoration: taken && !isSlotPast(slot) ? "line-through" : "none",
                        transition: "all 0.15s",
                      }}
                    >
                      {to12h(slot)}
                    </button>
                  );
                })}
              </div>
            )}
            <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 12 }}>
              Greyed-out slots are already booked or have passed.
            </p>
          </div>
        )}

        {/* Step 4: Details */}
        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Summary chip */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
              {[
                { Icon: MODES.find((m) => m.id === mode)!.Icon, text: MODES.find((m) => m.id === mode)!.label },
                { Icon: Calendar, text: selectedDay?.toLocaleDateString("en-IN", { day: "numeric", month: "short" }) ?? "" },
                { Icon: Clock, text: to12h(time) },
              ].map((chip, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 999, backgroundColor: "#EEF2F8", fontSize: 12, fontWeight: 600, color: "#1B3A6B" }}>
                  <chip.Icon style={{ width: 12, height: 12 }} />
                  {chip.text}
                </span>
              ))}
            </div>

            {/* Name */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Full Name <span style={{ color: "#C9A84C" }}>*</span></label>
              <div style={{ position: "relative" }}>
                <User style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#94A3B8" }} />
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Eg. Rajesh Kumar"
                  style={{ width: "100%", padding: "11px 14px 11px 42px", borderRadius: 10, border: `1.5px solid ${fieldErrors.fullName ? "#EF4444" : "#E2E8F0"}`, fontSize: 14, outline: "none", fontFamily: "inherit", backgroundColor: "#FAFAFA", boxSizing: "border-box" }} />
              </div>
              {fieldErrors.fullName && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{fieldErrors.fullName}</p>}
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Mobile Number <span style={{ color: "#C9A84C" }}>*</span></label>
              <div style={{ position: "relative" }}>
                <Phone style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#94A3B8" }} />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile number" maxLength={10}
                  style={{ width: "100%", padding: "11px 14px 11px 42px", borderRadius: 10, border: `1.5px solid ${fieldErrors.phone ? "#EF4444" : "#E2E8F0"}`, fontSize: 14, outline: "none", fontFamily: "inherit", backgroundColor: "#FAFAFA", boxSizing: "border-box" }} />
              </div>
              {fieldErrors.phone && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{fieldErrors.phone}</p>}
            </div>

            {/* Email + Service row */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 400 }}>(optional)</span></label>
              <div style={{ position: "relative" }}>
                <Mail style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#94A3B8" }} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                  style={{ width: "100%", padding: "11px 14px 11px 42px", borderRadius: 10, border: `1.5px solid ${fieldErrors.email ? "#EF4444" : "#E2E8F0"}`, fontSize: 14, outline: "none", fontFamily: "inherit", backgroundColor: "#FAFAFA", boxSizing: "border-box" }} />
              </div>
              {fieldErrors.email && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{fieldErrors.email}</p>}
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>What do you need help with? <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 400 }}>(optional)</span></label>
              <select value={service} onChange={(e) => setService(e.target.value)}
                style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", fontFamily: "inherit", backgroundColor: "#FAFAFA", boxSizing: "border-box", cursor: "pointer", color: service ? "#1A1A1A" : "#94A3B8" }}>
                <option value="">Select a service…</option>
                {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Pincode — auto-fills location & connects to the nearest branch */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Your Pincode
              </label>
              <div style={{ position: "relative" }}>
                <MapPin style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#94A3B8" }} />
                <input
                  type="text"
                  inputMode="numeric"
                  value={pincode}
                  onChange={(e) => onPincodeChange(e.target.value)}
                  placeholder="e.g. 560034"
                  maxLength={6}
                  style={{ width: "100%", padding: "11px 40px 11px 42px", borderRadius: 10, border: `1.5px solid ${pincodeStatus === "error" ? "#EF4444" : pincodeStatus === "found" ? "#16a34a" : "#E2E8F0"}`, fontSize: 14, outline: "none", fontFamily: "inherit", backgroundColor: "#FAFAFA", boxSizing: "border-box" }}
                />
                {pincodeStatus === "loading" && <Loader2 className="animate-spin" style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#1B3A6B" }} />}
                {pincodeStatus === "found" && <CheckCircle2 style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#16a34a" }} />}
                {pincodeStatus === "error" && <AlertCircle style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#F59E0B" }} />}
              </div>

              {/* Helper → confirmation → gentle error (never blocks) */}
              {pincodeStatus === "found" && (locCity || locState) ? (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, padding: "6px 11px", borderRadius: 999, backgroundColor: "#EEF7F0", border: "1px solid #BBF7D0" }}>
                  <MapPin style={{ width: 13, height: 13, color: "#16a34a", flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#15803D" }}>
                    {[locCity, locState].filter(Boolean).join(", ")}
                  </span>
                </div>
              ) : pincodeStatus === "error" ? (
                <p style={{ fontSize: 11, color: "#D97706", marginTop: 6 }}>
                  Couldn&apos;t find that pincode — no problem, you can still continue.
                </p>
              ) : (
                <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 6 }}>
                  Helps us connect you with your nearest branch.
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Address{" "}
                {mode === "in-person" ? (
                  <span style={{ color: "#C9A84C" }}>*</span>
                ) : (
                  <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 400 }}>(optional)</span>
                )}
              </label>
              <div style={{ position: "relative" }}>
                <Home style={{ position: "absolute", left: 14, top: 13, width: 16, height: 16, color: "#94A3B8" }} />
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  placeholder={mode === "in-person" ? "Where should our advisor meet you? Flat / street / area, Bangalore" : "Your address (helps us serve you better)"}
                  style={{ width: "100%", padding: "11px 14px 11px 42px", borderRadius: 10, border: `1.5px solid ${fieldErrors.address ? "#EF4444" : "#E2E8F0"}`, fontSize: 14, outline: "none", fontFamily: "inherit", backgroundColor: "#FAFAFA", boxSizing: "border-box", resize: "vertical", lineHeight: 1.5 }}
                />
              </div>
              {fieldErrors.address && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{fieldErrors.address}</p>}
              {mode === "in-person" && !fieldErrors.address && (
                <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>
                  Required for in-person visits so our advisor knows where to come.
                </p>
              )}
            </div>

            {status === "error" && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "11px 14px" }}>
                <AlertCircle style={{ width: 16, height: 16, color: "#EF4444", flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 13, color: "#DC2626", margin: 0 }}>{errorMsg}</p>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          {step > 1 && (
            <button type="button" onClick={back} disabled={status === "loading"}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "13px 20px", borderRadius: 12, border: "1.5px solid #E2E8F0", backgroundColor: "#FFFFFF", color: "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>
              <ArrowLeft style={{ width: 16, height: 16 }} />
              Back
            </button>
          )}
          {step < 4 ? (
            <button type="button" onClick={next}
              disabled={(step === 2 && !date) || (step === 3 && !time)}
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px", borderRadius: 12, border: "none", backgroundColor: (step === 2 && !date) || (step === 3 && !time) ? "#D6C896" : "#C9A84C", color: "#1B3A6B", fontSize: 15, fontWeight: 700, cursor: (step === 2 && !date) || (step === 3 && !time) ? "not-allowed" : "pointer" }}>
              Continue
              <ArrowRight style={{ width: 17, height: 17 }} />
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} disabled={status === "loading"}
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px", borderRadius: 12, border: "none", backgroundColor: status === "loading" ? "#B89A45" : "#C9A84C", color: "#1B3A6B", fontSize: 15, fontWeight: 700, cursor: status === "loading" ? "not-allowed" : "pointer" }}>
              {status === "loading" ? <><Loader2 className="animate-spin" style={{ width: 17, height: 17 }} />Booking…</> : <><CheckCircle2 style={{ width: 17, height: 17 }} />Confirm Booking</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
