"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Shield, TrendingUp, Building2, Scale, AlertCircle } from "lucide-react";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const benefits = [
    { Icon: TrendingUp, color: "#1B3A6B", bg: "#EEF2F8", text: "Track your service enquiries in one place" },
    { Icon: Building2, color: "#0D7E7E", bg: "#E6F4F4", text: "Download free financial & property guides" },
    { Icon: Scale, color: "#6B46C1", bg: "#F0EBF9",  text: "Get personalised service recommendations" },
    { Icon: Shield, color: "#C9A84C",  bg: "#FBF5E6", text: "Secure, private — only you see your data" },
  ];

  return (
    <>
      <style>{`
        @keyframes signin-fadein {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .signin-card { animation: signin-fadein 0.4s ease both; }
        .google-btn:hover:not(:disabled) {
          background-color: #F8FAFC !important;
          border-color: #CBD5E1 !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10) !important;
          transform: translateY(-1px);
        }
        .google-btn:active:not(:disabled) { transform: translateY(0); }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, #0A1628 0%, #0F1A2E 50%, #071020 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative rings */}
        <div style={{
          position: "absolute", top: -120, right: -120,
          width: 600, height: 600, borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.08)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -100, left: -100,
          width: 500, height: 500, borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.05)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "32px 32px", pointerEvents: "none",
        }} />

        <div
          className="signin-card"
          style={{ width: "100%", maxWidth: 900, position: "relative" }}
        >
          <div
            style={{ display: "grid", gap: 40, alignItems: "center" }}
            className="lg:grid-cols-2"
          >
            {/* ── Left: Brand messaging ──────────────────────────── */}
            <div>
              {/* Logo */}
              <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  backgroundColor: "#C9A84C",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 6px 20px rgba(201,168,76,0.35)",
                }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: "#0A1628", fontFamily: "Georgia, serif" }}>R</span>
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 800, color: "#FFFFFF", margin: 0, letterSpacing: "-0.2px" }}>Right Asset</p>
                  <p style={{ fontSize: 10, fontWeight: 600, color: "#C9A84C", margin: 0, letterSpacing: "0.15em", textTransform: "uppercase" }}>Management</p>
                </div>
              </Link>

              <h1 style={{
                fontSize: "clamp(26px, 4vw, 38px)",
                fontWeight: 800, color: "#FFFFFF",
                margin: "0 0 12px", lineHeight: 1.2,
              }}>
                Your financial journey,<br />
                <span style={{ color: "#C9A84C" }}>all in one place</span>
              </h1>

              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.58)", lineHeight: 1.65, margin: "0 0 36px", maxWidth: 380 }}>
                Sign in to track your service requests, access free guides, and get personalised
                advisory — exclusively for Right Asset clients in Bangalore.
              </p>

              {/* Benefits */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {benefits.map(({ Icon, color, bg, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 9,
                      backgroundColor: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Icon size={15} color="#C9A84C" />
                    </div>
                    <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.72)", margin: 0, fontWeight: 500 }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Sign in card ────────────────────────────── */}
            <div>
              <div style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 24,
                padding: "44px 40px",
                boxShadow: "0 24px 64px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
              }}>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1B3A6B", margin: "0 0 6px", letterSpacing: "-0.3px" }}>
                  Welcome
                </h2>
                <p style={{ fontSize: 14, color: "#64748B", margin: "0 0 32px" }}>
                  Sign in or create your account in seconds
                </p>

                {/* Error */}
                {error && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    backgroundColor: "#FEF2F2", border: "1px solid #FECACA",
                    borderRadius: 10, padding: "11px 14px", marginBottom: 20,
                  }}>
                    <AlertCircle size={15} color="#DC2626" style={{ flexShrink: 0 }} />
                    <p style={{ fontSize: 13, color: "#DC2626", margin: 0 }}>{error}</p>
                  </div>
                )}

                {/* Google Sign In */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="google-btn"
                  style={{
                    width: "100%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 12,
                    padding: "14px 20px",
                    borderRadius: 12,
                    border: "1.5px solid #E2E8F0",
                    backgroundColor: "#FFFFFF",
                    color: "#1A1A1A",
                    fontSize: 15, fontWeight: 600,
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    transition: "all 0.15s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  }}
                >
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#E2E8F0" strokeWidth="3" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="#1B3A6B" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Connecting to Google…
                    </span>
                  ) : (
                    <>
                      <GoogleIcon />
                      Continue with Google
                    </>
                  )}
                </button>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
                  <div style={{ flex: 1, height: 1, backgroundColor: "#F1F5F9" }} />
                  <span style={{ fontSize: 12, color: "#94A3B8", whiteSpace: "nowrap" }}>
                    Free · No credit card needed
                  </span>
                  <div style={{ flex: 1, height: 1, backgroundColor: "#F1F5F9" }} />
                </div>

                {/* Trust badges */}
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}>
                  {[
                    { icon: "🔒", text: "256-bit encrypted" },
                    { icon: "🚫", text: "Zero spam, ever" },
                    { icon: "👤", text: "Only you see your data" },
                    { icon: "✅", text: "Cancel anytime" },
                  ].map(({ icon, text }) => (
                    <div key={text} style={{
                      display: "flex", alignItems: "center", gap: 7,
                      padding: "9px 12px", borderRadius: 9,
                      backgroundColor: "#F8FAFC", border: "1px solid #F1F5F9",
                    }}>
                      <span style={{ fontSize: 13 }}>{icon}</span>
                      <span style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>{text}</span>
                    </div>
                  ))}
                </div>

                <p style={{
                  fontSize: 11, color: "#94A3B8", textAlign: "center",
                  marginTop: 20, lineHeight: 1.6,
                }}>
                  By signing in, you agree to our{" "}
                  <Link href="/privacy-policy" style={{ color: "#1B3A6B" }}>Privacy Policy</Link>
                  {" "}and{" "}
                  <Link href="/terms-of-service" style={{ color: "#1B3A6B" }}>Terms of Service</Link>
                </p>
              </div>

              {/* Back to site */}
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <Link href="/" style={{
                  fontSize: 13, color: "rgba(255,255,255,0.45)",
                  textDecoration: "none", fontWeight: 500,
                }}>
                  ← Back to Right Asset Management
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
