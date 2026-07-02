"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import {
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const LOGO_SRC = "/images/Right-assets-management-logo.svg";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // ── Email + password sign-in ───────────────────────────────────────────────
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  };

  // ── Google OAuth sign-in ───────────────────────────────────────────────────
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    setNotice(null);

    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
  };

  // ── Forgot password — sends a Supabase reset email ─────────────────────────
  const handleForgotPassword = async () => {
    setError(null);
    setNotice(null);

    if (!email) {
      setError("Enter your email address above first, then click reset.");
      return;
    }

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo: `${window.location.origin}/admin/login` }
    );

    if (resetError) {
      setError(resetError.message);
      return;
    }
    setNotice(`Password reset link sent to ${email}. Check your inbox.`);
  };

  return (
    <>
      <style>{`
        @keyframes login-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .login-card { animation: login-fadein 0.45s ease both; }

        .ul-input {
          width: 100%;
          padding: 11px 2px;
          font-size: 15px;
          border: none;
          border-bottom: 1.5px solid #E2E8F0;
          outline: none;
          color: #1A1A1A;
          background-color: transparent;
          transition: border-color 0.15s;
          box-sizing: border-box;
          font-family: inherit;
        }
        .ul-input::placeholder { color: #9AA4B2; }
        .ul-input:focus { border-bottom-color: #1B3A6B; }

        .primary-btn:hover:not(:disabled) {
          background-color: #0E1B33 !important;
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(18,32,59,0.32) !important;
        }
        .primary-btn:active:not(:disabled) { transform: translateY(0); }

        .google-btn:hover:not(:disabled) {
          background-color: #F8FAFC !important;
          border-color: #CBD5E1 !important;
        }
        .link-btn:hover { color: #1B3A6B !important; }

        @media (max-width: 860px) {
          .login-left  { display: none !important; }
          .login-right { flex: 1 !important; }
        }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "inherit" }}>

        {/* ═══════════════════════════════════════════════════════════
            LEFT PANEL — Brand
        ═══════════════════════════════════════════════════════════ */}
        <div
          className="login-left"
          style={{
            flex: "0 0 50%",
            background:
              "linear-gradient(150deg, #24438A 0%, #1B3A6B 45%, #10254A 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 56px",
            position: "relative",
            overflow: "hidden",
            borderTopRightRadius: 0,
          }}
        >
          {/* Decorative concentric arcs */}
          <svg
            width="620"
            height="620"
            viewBox="0 0 620 620"
            aria-hidden="true"
            style={{
              position: "absolute",
              right: -140,
              top: 40,
              opacity: 0.5,
              pointerEvents: "none",
            }}
          >
            {[260, 210, 160, 110, 60].map((r, i) => (
              <path
                key={r}
                d={`M ${310 + r} 310 A ${r} ${r} 0 0 0 ${310} ${310 - r}`}
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1"
                strokeOpacity={0.18 + i * 0.03}
              />
            ))}
          </svg>
          {/* Soft glow */}
          <div
            style={{
              position: "absolute",
              bottom: -160,
              left: -120,
              width: 420,
              height: 420,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Logo (white) */}
          <div style={{ position: "relative" }}>
            <Image
              src={LOGO_SRC}
              alt="Right Assets Management"
              width={200}
              height={48}
              priority
              unoptimized
              style={{
                height: 42,
                width: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>

          {/* Middle: greeting */}
          <div style={{ position: "relative" }}>
            <h1
              style={{
                fontSize: "clamp(38px, 4.4vw, 56px)",
                fontWeight: 800,
                color: "#FFFFFF",
                margin: "0 0 20px",
                lineHeight: 1.05,
                letterSpacing: "-1px",
              }}
            >
              Hello
              <br />
              Admin!{" "}
              <span role="img" aria-label="waving hand">
                👋
              </span>
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.7,
                maxWidth: 400,
                margin: 0,
              }}
            >
              Manage leads, blog posts, testimonials and enquiries — your entire
              Right Assets Management command centre in one secure place.
            </p>
          </div>

          {/* Bottom: copyright */}
          <p
            style={{
              position: "relative",
              fontSize: 12.5,
              color: "rgba(255,255,255,0.45)",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Right Assets Management. All rights reserved.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            RIGHT PANEL — Login form
        ═══════════════════════════════════════════════════════════ */}
        <div
          className="login-right"
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px 24px",
            position: "relative",
          }}
        >
          <div
            className="login-card"
            style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}
          >
            {/* Brand logo (natural colours) */}
            <Image
              src={LOGO_SRC}
              alt="Right Assets Management"
              width={210}
              height={50}
              priority
              unoptimized
              style={{ height: 40, width: "auto", marginBottom: 56 }}
            />

            {/* Heading */}
            <h2
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: "#111827",
                margin: "0 0 8px",
                letterSpacing: "-0.5px",
              }}
            >
              Welcome Back!
            </h2>
            <p style={{ fontSize: 13.5, color: "#64748B", margin: "0 0 34px", lineHeight: 1.5 }}>
              Sign in to the admin dashboard to manage your website.
            </p>

            <form onSubmit={handleSignIn}>
              {/* Email */}
              <div style={{ marginBottom: 26 }}>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  autoComplete="email"
                  className="ul-input"
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: 30, position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  className="ul-input"
                  style={{ paddingRight: 34 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: 2,
                    top: 10,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 2,
                    color: "#94A3B8",
                    display: "flex",
                    alignItems: "center",
                    lineHeight: 1,
                  }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {/* Notice / Error */}
              {notice && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    backgroundColor: "#F0FDF4",
                    border: "1px solid #BBF7D0",
                    borderRadius: 10,
                    padding: "11px 14px",
                    marginBottom: 18,
                  }}
                >
                  <CheckCircle2 size={15} color="#16A34A" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 13, color: "#15803D", margin: 0, lineHeight: 1.5 }}>
                    {notice}
                  </p>
                </div>
              )}
              {error && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    backgroundColor: "#FEF2F2",
                    border: "1px solid #FECACA",
                    borderRadius: 10,
                    padding: "11px 14px",
                    marginBottom: 18,
                  }}
                >
                  <AlertCircle size={15} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 13, color: "#DC2626", margin: 0, lineHeight: 1.5 }}>
                    {error}
                  </p>
                </div>
              )}

              {/* Login Now */}
              <button
                type="submit"
                disabled={loading}
                className="primary-btn"
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: "#12203B",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: 15,
                  border: "none",
                  borderRadius: 12,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background-color 0.15s, transform 0.12s, box-shadow 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  opacity: loading ? 0.75 : 1,
                  boxShadow: "0 6px 18px rgba(18,32,59,0.22)",
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Login Now"
                )}
              </button>
            </form>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="google-btn"
              style={{
                width: "100%",
                marginTop: 14,
                padding: "13px",
                backgroundColor: "#FFFFFF",
                color: "#374151",
                fontWeight: 600,
                fontSize: 14.5,
                border: "1.5px solid #E2E8F0",
                borderRadius: 12,
                cursor: googleLoading ? "not-allowed" : "pointer",
                transition: "background-color 0.15s, border-color 0.15s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                opacity: googleLoading ? 0.75 : 1,
              }}
            >
              {googleLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              Login with Google
            </button>

            {/* Forgot password */}
            <div style={{ textAlign: "center", marginTop: 26 }}>
              <span style={{ fontSize: 13, color: "#64748B" }}>Forgot password? </span>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="link-btn"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#C9A84C",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                  transition: "color 0.15s",
                }}
              >
                Click here
              </button>
            </div>
          </div>

          {/* Footer note */}
          <p
            style={{
              position: "absolute",
              bottom: 20,
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: 11.5,
              color: "#CBD5E1",
              margin: 0,
            }}
          >
            Secured by Supabase Auth · 256-bit encrypted sessions
          </p>
        </div>
      </div>
    </>
  );
}

// ─── Google multi-colour "G" ───────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}
