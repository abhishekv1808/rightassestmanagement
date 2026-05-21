"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Shield,
  Lock,
  Activity,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left panel */}
      <div
        style={{
          flex: "0 0 45%",
          backgroundColor: "#0F1A2E",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "60px 56px",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "#C9A84C",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#0F1A2E",
                fontFamily: "Georgia, serif",
              }}
            >
              R
            </span>
          </div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "700",
              color: "#FFFFFF",
              margin: "0 0 6px 0",
              letterSpacing: "-0.3px",
            }}
          >
            Right Asset Management
          </h1>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#C9A84C",
              margin: 0,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Admin Portal
          </p>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.55)",
            marginBottom: "48px",
            lineHeight: "1.6",
            maxWidth: "340px",
          }}
        >
          Secure access for authorized administrators only.
        </p>

        {/* Feature bullets */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {[
            {
              Icon: Shield,
              title: "Secure Authentication",
              desc: "Protected by Supabase Auth with encrypted sessions",
            },
            {
              Icon: Lock,
              title: "Role-Based Access",
              desc: "Admin-only routes protected by server-side middleware",
            },
            {
              Icon: Activity,
              title: "Real-Time Dashboard",
              desc: "Live leads, testimonials, and site analytics in one place",
            },
          ].map(({ Icon, title, desc }) => (
            <div
              key={title}
              style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(201,168,76,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "1px",
                }}
              >
                <Icon size={17} color="#C9A84C" />
              </div>
              <div>
                <p
                  style={{
                    margin: "0 0 2px 0",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: "1.5",
                  }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#F9F8F5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            padding: "44px 40px",
            boxShadow:
              "0 4px 6px rgba(0,0,0,0.05), 0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              fontSize: "26px",
              fontWeight: "700",
              color: "#1B3A6B",
              margin: "0 0 8px 0",
              letterSpacing: "-0.3px",
            }}
          >
            Welcome Back
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#64748B",
              margin: "0 0 32px 0",
            }}
          >
            Sign in to your admin account
          </p>

          <form onSubmit={handleSignIn}>
            {/* Email field */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "7px",
                }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rightasset.in"
                required
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  fontSize: "14px",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "10px",
                  outline: "none",
                  color: "#1A1A1A",
                  backgroundColor: "#FAFAFA",
                  transition: "border-color 0.15s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1B3A6B";
                  e.target.style.backgroundColor = "#FFFFFF";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E2E8F0";
                  e.target.style.backgroundColor = "#FAFAFA";
                }}
              />
            </div>

            {/* Password field */}
            <div style={{ marginBottom: "24px" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "7px",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%",
                    padding: "11px 44px 11px 14px",
                    fontSize: "14px",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: "10px",
                    outline: "none",
                    color: "#1A1A1A",
                    backgroundColor: "#FAFAFA",
                    transition: "border-color 0.15s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1B3A6B";
                    e.target.style.backgroundColor = "#FFFFFF";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#E2E8F0";
                    e.target.style.backgroundColor = "#FAFAFA";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "13px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "2px",
                    color: "#94A3B8",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: "10px",
                  padding: "11px 14px",
                  marginBottom: "20px",
                }}
              >
                <AlertCircle size={16} color="#DC2626" />
                <p
                  style={{
                    fontSize: "13px",
                    color: "#DC2626",
                    margin: 0,
                  }}
                >
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                backgroundColor: loading ? "#D4A827" : "#C9A84C",
                color: "#0F1A2E",
                fontWeight: "700",
                fontSize: "15px",
                border: "none",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background-color 0.15s, transform 0.1s",
                letterSpacing: "0.2px",
              }}
              onMouseEnter={(e) => {
                if (!loading)
                  (e.target as HTMLButtonElement).style.backgroundColor =
                    "#B8972E";
              }}
              onMouseLeave={(e) => {
                if (!loading)
                  (e.target as HTMLButtonElement).style.backgroundColor =
                    "#C9A84C";
              }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
