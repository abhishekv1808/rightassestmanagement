"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Shield,
  TrendingUp,
  Users,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  BarChart3,
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
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <>
      <style>{`
        @keyframes login-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .login-card { animation: login-fadein 0.4s ease both; }

        @keyframes float-ring {
          0%, 100% { transform: scale(1); opacity: 0.06; }
          50%       { transform: scale(1.04); opacity: 0.10; }
        }
        .login-ring { animation: float-ring 8s ease-in-out infinite; }
        .login-ring-2 { animation: float-ring 11s ease-in-out infinite reverse; }

        .login-input:focus {
          border-color: #1B3A6B !important;
          background-color: #FFFFFF !important;
          box-shadow: 0 0 0 3px rgba(27,58,107,0.08) !important;
        }
        .login-btn:hover:not(:disabled) {
          background-color: #152E57 !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(27,58,107,0.35) !important;
        }
        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          .login-left  { display: none !important; }
          .login-right { flex: 1 !important; }
        }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "inherit" }}>

        {/* ═══════════════════════════════════════════════════════════
            LEFT PANEL — Brand identity
        ═══════════════════════════════════════════════════════════ */}
        <div
          className="login-left"
          style={{
            flex: "0 0 46%",
            background: "linear-gradient(160deg, #0A1628 0%, #0F1A2E 50%, #071020 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 56px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative rings */}
          <div
            className="login-ring"
            style={{
              position: "absolute",
              top: -120,
              right: -120,
              width: 500,
              height: 500,
              borderRadius: "50%",
              border: "1px solid rgba(201,168,76,0.15)",
              pointerEvents: "none",
            }}
          />
          <div
            className="login-ring-2"
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 360,
              height: 360,
              borderRadius: "50%",
              border: "1px solid rgba(201,168,76,0.1)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -100,
              left: -80,
              width: 420,
              height: 420,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.04)",
              pointerEvents: "none",
            }}
          />
          {/* Dot grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              pointerEvents: "none",
            }}
          />

          {/* ── Top: Logo & Brand ── */}
          <div style={{ position: "relative" }}>
            {/* Logo mark */}
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: "#C9A84C",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
                boxShadow: "0 8px 28px rgba(201,168,76,0.35)",
              }}
            >
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#0A1628",
                  fontFamily: "Georgia, serif",
                  lineHeight: 1,
                }}
              >
                R
              </span>
            </div>

            <h1
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#FFFFFF",
                margin: "0 0 6px",
                letterSpacing: "-0.3px",
              }}
            >
              Right Asset Management
            </h1>

            {/* Admin badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                borderRadius: 999,
                backgroundColor: "rgba(201,168,76,0.15)",
                border: "1px solid rgba(201,168,76,0.3)",
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#C9A84C",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#C9A84C",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Admin Portal
              </span>
            </div>

            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.65,
                maxWidth: 340,
                margin: "0 0 32px",
              }}
            >
              Your command centre for leads, blog posts,
              testimonials, and site analytics.
            </p>

            {/* Gold divider */}
            <div
              style={{
                width: 48,
                height: 3,
                backgroundColor: "#C9A84C",
                borderRadius: 2,
                marginBottom: 32,
                opacity: 0.7,
              }}
            />

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                gap: 0,
                marginBottom: 44,
              }}
            >
              {[
                { value: "500+", label: "Clients Served" },
                { value: "48", label: "Services Live" },
                { value: "10+", label: "Years of Trust" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    flex: 1,
                    padding: "14px 0",
                    borderRight:
                      i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    paddingLeft: i > 0 ? 20 : 0,
                    paddingRight: i < 2 ? 20 : 0,
                  }}
                >
                  <p
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#C9A84C",
                      margin: "0 0 2px",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Feature list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[
                {
                  Icon: Users,
                  title: "Lead Management",
                  desc: "View, filter, and export all inbound enquiries in real time",
                },
                {
                  Icon: BarChart3,
                  title: "Blog & Content Editor",
                  desc: "Write, schedule, and publish SEO articles without code",
                },
                {
                  Icon: Shield,
                  title: "Secure & Role-Protected",
                  desc: "Supabase Auth with encrypted sessions and server-side guards",
                },
                {
                  Icon: TrendingUp,
                  title: "Live Analytics",
                  desc: "Track lead sources, conversion rates, and service demand",
                },
              ].map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: "rgba(201,168,76,0.1)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} color="#C9A84C" />
                  </div>
                  <div>
                    <p
                      style={{
                        margin: "0 0 2px",
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        color: "rgba(255,255,255,0.38)",
                        lineHeight: 1.5,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom: Copyright ── */}
          <p
            style={{
              position: "relative",
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              margin: 0,
            }}
          >
            © 2025 Right Asset Management · All rights reserved
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            RIGHT PANEL — Login form
        ═══════════════════════════════════════════════════════════ */}
        <div
          className="login-right"
          style={{
            flex: 1,
            backgroundColor: "#F4F6FA",
            backgroundImage:
              "radial-gradient(circle at 70% 30%, rgba(27,58,107,0.04) 0%, transparent 60%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 24px",
          }}
        >
          {/* Card */}
          <div
            className="login-card"
            style={{
              width: "100%",
              maxWidth: 420,
            }}
          >
            {/* Card header */}
            <div style={{ marginBottom: 32, textAlign: "center" }}>
              {/* Mobile-only logo */}
              <div
                style={{
                  display: "none",
                  width: 48,
                  height: 48,
                  backgroundColor: "#C9A84C",
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
                className="login-mobile-logo"
              >
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#0A1628",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  R
                </span>
              </div>

              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#1B3A6B",
                  margin: "0 0 6px",
                  letterSpacing: "-0.4px",
                }}
              >
                Welcome back
              </h2>
              <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>
                Sign in to your admin account to continue
              </p>
            </div>

            {/* Form card */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                padding: "36px 36px 28px",
                boxShadow:
                  "0 0 0 1px rgba(27,58,107,0.06), 0 8px 24px rgba(27,58,107,0.08), 0 2px 4px rgba(0,0,0,0.04)",
              }}
            >
              <form onSubmit={handleSignIn}>
                {/* Email */}
                <div style={{ marginBottom: 18 }}>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#374151",
                      marginBottom: 7,
                      letterSpacing: "0.03em",
                      textTransform: "uppercase",
                    }}
                  >
                    Email Address
                  </label>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: 13,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Mail size={16} color="#94A3B8" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@rightasset.in"
                      required
                      autoComplete="email"
                      className="login-input"
                      style={{
                        width: "100%",
                        padding: "12px 14px 12px 42px",
                        fontSize: 14,
                        border: "1.5px solid #E2E8F0",
                        borderRadius: 10,
                        outline: "none",
                        color: "#1A1A1A",
                        backgroundColor: "#F8FAFC",
                        transition: "border-color 0.15s, box-shadow 0.15s",
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: 8 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 7,
                    }}
                  >
                    <label
                      htmlFor="password"
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#374151",
                        letterSpacing: "0.03em",
                        textTransform: "uppercase",
                      }}
                    >
                      Password
                    </label>
                  </div>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: 13,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Lock size={16} color="#94A3B8" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                      className="login-input"
                      style={{
                        width: "100%",
                        padding: "12px 44px 12px 42px",
                        fontSize: 14,
                        border: "1.5px solid #E2E8F0",
                        borderRadius: 10,
                        outline: "none",
                        color: "#1A1A1A",
                        backgroundColor: "#F8FAFC",
                        transition: "border-color 0.15s, box-shadow 0.15s",
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      style={{
                        position: "absolute",
                        right: 13,
                        top: "50%",
                        transform: "translateY(-50%)",
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
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Error message */}
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
                      marginTop: 16,
                      marginBottom: 4,
                    }}
                  >
                    <AlertCircle
                      size={15}
                      color="#DC2626"
                      style={{ flexShrink: 0, marginTop: 1 }}
                    />
                    <p
                      style={{ fontSize: 13, color: "#DC2626", margin: 0, lineHeight: 1.5 }}
                    >
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="login-btn"
                  style={{
                    width: "100%",
                    marginTop: 24,
                    padding: "13px",
                    backgroundColor: "#1B3A6B",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: 15,
                    border: "none",
                    borderRadius: 10,
                    cursor: loading ? "not-allowed" : "pointer",
                    transition:
                      "background-color 0.15s, transform 0.12s, box-shadow 0.15s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: loading ? 0.75 : 1,
                    boxShadow: "0 4px 14px rgba(27,58,107,0.25)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    "Sign In →"
                  )}
                </button>
              </form>
            </div>

            {/* Security note */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                marginTop: 20,
              }}
            >
              <Shield size={13} color="#94A3B8" />
              <span style={{ fontSize: 12, color: "#94A3B8" }}>
                Secured by Supabase Auth · 256-bit encrypted sessions
              </span>
            </div>
          </div>

          {/* Bottom footer */}
          <p
            style={{
              position: "absolute",
              bottom: 20,
              fontSize: 11,
              color: "#CBD5E1",
            }}
          >
            Right Asset Management · Admin Portal
          </p>
        </div>
      </div>
    </>
  );
}
