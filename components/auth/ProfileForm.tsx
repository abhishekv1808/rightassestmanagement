"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Save, Loader2, CheckCircle2, AlertCircle,
  LogOut, User, Phone, MapPin, Briefcase,
} from "lucide-react";
import { saveProfile, signOut } from "@/app/actions/profile";
import { createClient } from "@/lib/supabase/client";

const LOCATIONS = [
  "Bangalore", "Mumbai", "Delhi NCR", "Hyderabad",
  "Chennai", "Pune", "Kolkata", "Ahmedabad",
  "Kochi", "Jaipur", "Chandigarh", "Lucknow",
  "Middle East (UAE / GCC)", "Singapore", "United Kingdom",
  "United States", "Australia", "Other",
];

const SERVICE_CATEGORIES = [
  { id: "financial", label: "Financial Services", desc: "Investments, insurance, loans" },
  { id: "real-estate", label: "Real Estate", desc: "Buy, sell, register property" },
  { id: "legal", label: "Legal Services", desc: "Property disputes, family cases" },
  { id: "tax", label: "Tax Planning & ITR", desc: "Tax saving, ITR filing" },
  { id: "home-loan", label: "Home Loan", desc: "Loan advisory & comparison" },
  { id: "mutual-funds", label: "Mutual Funds", desc: "Wealth management" },
];

type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  area: string | null;
  service_interests: string[] | null;
  created_at: string;
};

export default function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const [fullName, setFullName] = useState(profile.full_name ?? "");
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [area, setArea] = useState(profile.area ?? "");
  const [interests, setInterests] = useState<string[]>(
    profile.service_interests ?? []
  );
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const toggleInterest = (id: string) =>
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleSave = () => {
    setStatus("idle");
    startTransition(async () => {
      const res = await saveProfile({ full_name: fullName, phone, area, service_interests: interests });
      if (res.success) {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3500);
      } else {
        setStatus("error");
        setErrMsg(res.error ?? "Save failed");
      }
    });
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  // Initials from name or email
  const initials = (profile.full_name || profile.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const memberSince = new Date(profile.created_at).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const inputCls: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    border: "1.5px solid #E2E8F0",
    borderRadius: 10,
    fontSize: 14,
    color: "#1A1A1A",
    outline: "none",
    fontFamily: "inherit",
    backgroundColor: "#FAFAFA",
    boxSizing: "border-box",
    transition: "border-color 0.15s, box-shadow 0.15s",
  };

  const labelCls: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    color: "#374151",
    marginBottom: 6,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 20px 80px" }}>

      {/* ── Profile Header ──────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
          borderRadius: 20,
          padding: "36px 36px 28px",
          display: "flex",
          alignItems: "flex-end",
          gap: 24,
          marginBottom: 28,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative ring */}
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 260, height: 260, borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.12)", pointerEvents: "none",
        }} />

        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar_url}
              alt={profile.full_name ?? "Avatar"}
              style={{
                width: 80, height: 80, borderRadius: "50%",
                border: "3px solid rgba(201,168,76,0.5)",
                objectFit: "cover",
              }}
            />
          ) : (
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              backgroundColor: "#C9A84C",
              border: "3px solid rgba(201,168,76,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: "#1B3A6B" }}>
                {initials}
              </span>
            </div>
          )}
          {/* Online dot */}
          <div style={{
            position: "absolute", bottom: 4, right: 4,
            width: 14, height: 14, borderRadius: "50%",
            backgroundColor: "#22C55E",
            border: "2px solid #0D2347",
          }} />
        </div>

        {/* Name + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF", margin: "0 0 4px" }}>
            {profile.full_name || "Your Profile"}
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: "0 0 12px" }}>
            {profile.email}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "4px 12px", borderRadius: 999,
              backgroundColor: "rgba(201,168,76,0.15)",
              border: "1px solid rgba(201,168,76,0.3)",
              fontSize: 11, fontWeight: 600, color: "#C9A84C",
            }}>
              Member since {memberSince}
            </span>
            {area && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "4px 12px", borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.08)",
                fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.65)",
              }}>
                <MapPin size={11} />
                {area}
              </span>
            )}
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 16px", borderRadius: 9,
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.65)",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {isSigningOut
            ? <Loader2 size={14} className="animate-spin" />
            : <LogOut size={14} />}
          Sign Out
        </button>
      </div>

      {/* ── Sections ────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Personal Info */}
        <div style={{
          backgroundColor: "#FFFFFF", borderRadius: 16,
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}>
          <div style={{
            padding: "18px 24px 14px",
            borderBottom: "1px solid #F1F5F9",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              backgroundColor: "#EEF2F8",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <User size={16} color="#1B3A6B" />
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#1B3A6B", margin: 0 }}>
                Personal Information
              </p>
              <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>
                Your name and contact details
              </p>
            </div>
          </div>
          <div style={{ padding: "24px", display: "grid", gap: 18 }}
            className="sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label style={labelCls}>Full Name</label>
              <div style={{ position: "relative" }}>
                <User size={15} color="#94A3B8" style={{
                  position: "absolute", left: 13, top: "50%",
                  transform: "translateY(-50%)", pointerEvents: "none",
                }} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Rajesh Kumar"
                  style={{ ...inputCls, paddingLeft: 40 }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1B3A6B";
                    e.target.style.boxShadow = "0 0 0 3px rgba(27,58,107,0.07)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#E2E8F0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label style={labelCls}>Phone Number</label>
              <div style={{ position: "relative" }}>
                <Phone size={15} color="#94A3B8" style={{
                  position: "absolute", left: 13, top: "50%",
                  transform: "translateY(-50%)", pointerEvents: "none",
                }} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  maxLength={10}
                  style={{ ...inputCls, paddingLeft: 40 }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1B3A6B";
                    e.target.style.boxShadow = "0 0 0 3px rgba(27,58,107,0.07)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#E2E8F0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Email (read-only) */}
            <div>
              <label style={labelCls}>Email Address
                <span style={{ color: "#94A3B8", fontWeight: 400, textTransform: "none", marginLeft: 6 }}>
                  (from Google account)
                </span>
              </label>
              <input
                type="email"
                value={profile.email ?? ""}
                disabled
                style={{ ...inputCls, color: "#94A3B8", cursor: "not-allowed" }}
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div style={{
          backgroundColor: "#FFFFFF", borderRadius: 16,
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}>
          <div style={{
            padding: "18px 24px 14px",
            borderBottom: "1px solid #F1F5F9",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              backgroundColor: "#E6F4F4",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <MapPin size={16} color="#0D7E7E" />
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#1B3A6B", margin: 0 }}>
                Location
              </p>
              <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>
                Your city / region
              </p>
            </div>
          </div>
          <div style={{ padding: "24px" }}>
            <div style={{ maxWidth: 320 }}>
              <label style={labelCls}>Area / Locality</label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                style={{ ...inputCls, cursor: "pointer", appearance: "auto" }}
              >
                <option value="">Select your area…</option>
                {LOCATIONS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Service Interests */}
        <div style={{
          backgroundColor: "#FFFFFF", borderRadius: 16,
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}>
          <div style={{
            padding: "18px 24px 14px",
            borderBottom: "1px solid #F1F5F9",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              backgroundColor: "#F0EBF9",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Briefcase size={16} color="#6B46C1" />
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#1B3A6B", margin: 0 }}>
                Services I&apos;m Interested In
              </p>
              <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>
                Helps us send you relevant updates
              </p>
            </div>
          </div>
          <div style={{ padding: "24px" }}>
            <div style={{ display: "grid", gap: 10 }}
              className="sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_CATEGORIES.map((svc) => {
                const checked = interests.includes(svc.id);
                return (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => toggleInterest(svc.id)}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 12,
                      padding: "14px 16px", borderRadius: 12, textAlign: "left",
                      border: `1.5px solid ${checked ? "#1B3A6B" : "#E2E8F0"}`,
                      backgroundColor: checked ? "#EEF2F8" : "#FAFAFA",
                      cursor: "pointer",
                      transition: "border-color 0.15s, background-color 0.15s",
                    }}
                  >
                    <div style={{
                      width: 18, height: 18, borderRadius: 5,
                      border: `2px solid ${checked ? "#1B3A6B" : "#CBD5E1"}`,
                      backgroundColor: checked ? "#1B3A6B" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: 1,
                    }}>
                      {checked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8"
                            strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: checked ? "#1B3A6B" : "#374151", margin: 0 }}>
                        {svc.label}
                      </p>
                      <p style={{ fontSize: 11, color: "#94A3B8", margin: "2px 0 0" }}>
                        {svc.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Save row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          justifyContent: "flex-end", flexWrap: "wrap",
        }}>
          {status === "success" && (
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#059669", fontWeight: 600 }}>
              <CheckCircle2 size={15} />
              Profile saved successfully
            </span>
          )}
          {status === "error" && (
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#EF4444", fontWeight: 600 }}>
              <AlertCircle size={15} />
              {errMsg}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={isPending}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px 28px", borderRadius: 12,
              backgroundColor: isPending ? "#94A3B8" : "#1B3A6B",
              color: "#FFFFFF", fontSize: 14, fontWeight: 700,
              border: "none", cursor: isPending ? "not-allowed" : "pointer",
              boxShadow: "0 4px 14px rgba(27,58,107,0.25)",
              transition: "background-color 0.15s",
            }}
          >
            {isPending
              ? <><Loader2 size={16} className="animate-spin" />Saving…</>
              : <><Save size={16} />Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}
