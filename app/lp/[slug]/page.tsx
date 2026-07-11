import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone,
  CheckCircle2,
  Star,
  Quote,
  ChevronDown,
  ShieldCheck,
  X,
  ArrowRight,
} from "lucide-react";
import {
  ALL_LANDING_PAGES,
  getLandingPageBySlug,
} from "@/lib/landing-pages-data";
import LPLeadForm from "@/components/lp/LPLeadForm";

// ─── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return ALL_LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lp = getLandingPageBySlug(slug);
  if (!lp) return {};
  return {
    title: lp.metaTitle,
    robots: { index: false, follow: false },
  };
}

// ─── Constants ─────────────────────────────────────────────────────────────────
const PHONE_DISPLAY = "+91 97428 26804";
const PHONE_HREF = "tel:+919742826804";
const WA_NUMBER = "919742826804";

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function LPPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lp = getLandingPageBySlug(slug);
  if (!lp) notFound();

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lp.whatsappMessage)}`;

  return (
    <>
      {/* ── CSS ───────────────────────────────────────────────────────── */}
      <style>{`
        details[open] summary .lp-chevron { transform: rotate(180deg); }
        .lp-chevron { transition: transform 0.2s ease; }
        .lp-summary::-webkit-details-marker { display: none; }
        .lp-summary { list-style: none; }
        .lp-card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.10) !important; }
        .lp-card-hover { transition: transform 0.2s, box-shadow 0.2s; }
        @keyframes lp-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .lp-marquee-track { animation: lp-marquee 28s linear infinite; }
        @keyframes lp-pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        .lp-pulse { animation: lp-pulse-dot 1.6s ease-in-out infinite; }
        details[open] .lp-faq-body { animation: lp-fadein 0.18s ease both; }
        @keyframes lp-fadein {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════
          1. STICKY HEADER
      ═══════════════════════════════════════════════════════════════ */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #EEF0F3",
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
          padding: "13px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "baseline",
            gap: 4,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 800, color: "#1B3A6B" }}>
            Right Assets
          </span>
          <span style={{ fontSize: 13, color: "#C9A84C", fontWeight: 600 }}>
            Management
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Online indicator */}
          <div
            className="hidden sm:flex"
            style={{ alignItems: "center", gap: 6 }}
          >
            <span
              className="lp-pulse"
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#22C55E",
              }}
            />
            <span style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}>
              Advisor online now
            </span>
          </div>

          <a
            href={PHONE_HREF}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 18px",
              borderRadius: 10,
              backgroundColor: "#1B3A6B",
              color: "#FFFFFF",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <Phone style={{ width: 14, height: 14 }} />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Call Free</span>
          </a>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          2. HERO + STICKY FORM
      ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #1B3A6B 0%, #0D2347 60%, #071428 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.1)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 350,
            height: 350,
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.07)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "clamp(40px, 6vw, 72px) 20px",
            position: "relative",
          }}
          className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start"
        >
          {/* Left: hero */}
          <div className="lg:col-span-7" style={{ marginBottom: 40 }}>
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 999,
                backgroundColor: "rgba(201,168,76,0.15)",
                border: "1px solid rgba(201,168,76,0.35)",
                marginBottom: 20,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: "#C9A84C" }}>
                {lp.eyebrow}
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(26px, 4.5vw, 46px)",
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.15,
                marginBottom: 16,
              }}
            >
              {lp.headline}
            </h1>

            <p
              style={{
                fontSize: "clamp(15px, 2vw, 18px)",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.65,
                marginBottom: 36,
                maxWidth: 560,
              }}
            >
              {lp.subheadline}
            </p>

            {/* Stats 2×2 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12,
                maxWidth: 460,
                marginBottom: 32,
              }}
            >
              {lp.stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: "14px 18px",
                  }}
                >
                  <p
                    className="font-heading"
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: "#C9A84C",
                      marginBottom: 2,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Inline trust badges (mobile) */}
            <div
              className="flex lg:hidden"
              style={{ gap: 20, flexWrap: "wrap" }}
            >
              {[
                "Consultation",
                "No Commitment",
                "Call in 2 Hours",
              ].map((b) => (
                <div
                  key={b}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <CheckCircle2
                    style={{ width: 14, height: 14, color: "#C9A84C" }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.75)",
                      fontWeight: 500,
                    }}
                  >
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form (sticky on desktop) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky" style={{ top: 84 }}>
              <LPLeadForm
                serviceLabel={lp.serviceLabel}
                lpSlug={lp.slug}
                ctaText={lp.ctaText}
                whatsappMessage={lp.whatsappMessage}
                accentColor={lp.accentColor}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          3. SOCIAL PROOF TICKER
      ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "#0D2347",
          borderTop: "1px solid rgba(201,168,76,0.2)",
          borderBottom: "1px solid rgba(201,168,76,0.2)",
          overflow: "hidden",
          padding: "14px 0",
        }}
      >
        <div
          style={{ display: "flex", overflow: "hidden", position: "relative" }}
        >
          <div
            className="lp-marquee-track"
            style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}
          >
            {[
              "✦  500+ Families Served across India",
              "✦  ₹500 Crore+ in Loans Facilitated",
              "✦  10+ Years of Expert Advisory",
              "✦  SEBI-Registered Advisors",
              "✦  48-Hour Loan Approvals",
              "✦  1000+ Properties Registered",
              "✦  ₹2 Crore+ Tax Saved for Clients",
              "✦  Zero Spam — Ever",
              "✦  Free First Consultation Always",
              "✦  Serving All Areas of India",
              // Duplicate for seamless loop
              "✦  500+ Families Served across India",
              "✦  ₹500 Crore+ in Loans Facilitated",
              "✦  10+ Years of Expert Advisory",
              "✦  SEBI-Registered Advisors",
              "✦  48-Hour Loan Approvals",
              "✦  1000+ Properties Registered",
              "✦  ₹2 Crore+ Tax Saved for Clients",
              "✦  Zero Spam — Ever",
              "✦  Free First Consultation Always",
              "✦  Serving All Areas of India",
            ].map((item, i) => (
              <span
                key={i}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: i % 2 === 0
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(201,168,76,0.9)",
                  padding: "0 32px",
                  flexShrink: 0,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          4. HOW IT WORKS
      ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: 72,
          paddingBottom: 72,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 14px",
                borderRadius: 999,
                backgroundColor: lp.lightBg,
                color: lp.accentColor,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Simple Process
            </span>
            <h2
              style={{
                fontSize: "clamp(22px, 2.8vw, 32px)",
                fontWeight: 700,
                color: "#1B3A6B",
                marginBottom: 10,
              }}
            >
              How It Works — 3 Simple Steps
            </h2>
            <p style={{ fontSize: 15, color: "#64748B", maxWidth: 480, margin: "0 auto" }}>
              From your first call to the final outcome — here is exactly what to expect.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: 0, position: "relative" }}
          >
            {/* Connecting line (desktop) */}
            <div
              className="hidden md:block"
              style={{
                position: "absolute",
                top: 32,
                left: "calc(33.33% - 0px)",
                right: "calc(33.33% - 0px)",
                height: 2,
                backgroundColor: lp.lightBg,
                zIndex: 0,
              }}
            />

            {lp.processSteps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "0 24px 40px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Step circle */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: lp.accentColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    boxShadow: `0 4px 16px ${lp.accentColor}40`,
                    border: "4px solid #FFFFFF",
                    outline: `2px solid ${lp.lightBg}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#FFFFFF",
                    }}
                  >
                    {i + 1}
                  </span>
                </div>

                {/* Duration badge */}
                <span
                  style={{
                    display: "inline-block",
                    padding: "3px 12px",
                    borderRadius: 999,
                    backgroundColor: lp.lightBg,
                    color: lp.accentColor,
                    fontSize: 11,
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  {step.duration}
                </span>

                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#1A1A1A",
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#64748B",
                    lineHeight: 1.6,
                    maxWidth: 260,
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {/* CTA below steps */}
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <a
              href={PHONE_HREF}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                borderRadius: 12,
                backgroundColor: lp.accentColor,
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <Phone style={{ width: 16, height: 16 }} />
              Start Step 1 — Call Us Free
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          5. TRUST POINTS
      ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "#F9F8F5",
          paddingTop: 72,
          paddingBottom: 72,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <h2
            style={{
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 700,
              color: "#1B3A6B",
              marginBottom: 40,
              textAlign: "center",
            }}
          >
            Why India residents choose Right Assets Management
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lp.trustPoints.map((point, i) => (
              <div
                key={i}
                className="lp-card-hover"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #EEF0F3",
                  borderTop: `3px solid ${lp.accentColor}`,
                  borderRadius: 16,
                  padding: "28px 24px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: lp.lightBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <CheckCircle2
                    style={{ width: 22, height: 22, color: lp.accentColor }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#1A1A1A",
                    marginBottom: 8,
                  }}
                >
                  {point.heading}
                </h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.65 }}>
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          6. BENEFITS GRID
      ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: 72,
          paddingBottom: 72,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "clamp(22px, 2.8vw, 30px)",
                fontWeight: 700,
                color: "#1B3A6B",
                marginBottom: 10,
              }}
            >
              What You Get With Right Assets
            </h2>
            <p style={{ fontSize: 15, color: "#64748B" }}>
              Everything included — no hidden charges, no confusing packages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {lp.benefits.map((benefit, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: "20px",
                  backgroundColor: "#F9F8F5",
                  borderRadius: 14,
                  border: "1px solid #EEF0F3",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: lp.lightBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <CheckCircle2
                    style={{ width: 18, height: 18, color: lp.accentColor }}
                  />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1A1A1A",
                      marginBottom: 4,
                    }}
                  >
                    {benefit.heading}
                  </h3>
                  <p
                    style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}
                  >
                    {benefit.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          7. PARTNER LOGOS STRIP
      ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "#F9F8F5",
          borderTop: "1px solid #EEF0F3",
          borderBottom: "1px solid #EEF0F3",
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            {lp.partnerLabel}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {lp.partnerNames.map((name) => (
              <span
                key={name}
                style={{
                  display: "inline-block",
                  padding: "7px 16px",
                  borderRadius: 8,
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#475569",
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          8. THREE TESTIMONIALS
      ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: 72,
          paddingBottom: 72,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "clamp(22px, 2.8vw, 30px)",
                fontWeight: 700,
                color: "#1B3A6B",
                marginBottom: 10,
              }}
            >
              What Our Clients across India Say
            </h2>
            <p style={{ fontSize: 15, color: "#64748B" }}>
              Real stories from real people — not stock photos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lp.testimonials.map((t, i) => (
              <div
                key={i}
                className="lp-card-hover"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #EEF0F3",
                  borderLeft: `4px solid ${lp.accentColor}`,
                  borderRadius: 16,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      style={{
                        width: 14,
                        height: 14,
                        color: "#F59E0B",
                        fill: "#F59E0B",
                      }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontSize: 14,
                    color: "#374151",
                    lineHeight: 1.7,
                    flex: 1,
                    marginBottom: 20,
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: lp.accentColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#FFFFFF",
                      }}
                    >
                      {t.name[0]}
                    </span>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#1A1A1A",
                        marginBottom: 1,
                      }}
                    >
                      {t.name}
                    </p>
                    <p style={{ fontSize: 12, color: "#64748B" }}>
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          9. COMPARISON TABLE
      ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "#F9F8F5",
          paddingTop: 72,
          paddingBottom: 72,
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "clamp(22px, 2.8vw, 30px)",
                fontWeight: 700,
                color: "#1B3A6B",
                marginBottom: 10,
              }}
            >
              Going It Alone vs Using Right Assets
            </h2>
            <p style={{ fontSize: 15, color: "#64748B" }}>
              See exactly where the difference shows up.
            </p>
          </div>

          <div style={{ overflowX: "auto", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "16px 20px",
                      backgroundColor: "#EEF2F8",
                      textAlign: "left",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#64748B",
                      width: "30%",
                    }}
                  >
                    What you face
                  </th>
                  <th
                    style={{
                      padding: "16px 20px",
                      backgroundColor: "#F1F5F9",
                      textAlign: "left",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#94A3B8",
                      width: "35%",
                    }}
                  >
                    Going it alone
                  </th>
                  <th
                    style={{
                      padding: "16px 20px",
                      backgroundColor: lp.accentColor,
                      textAlign: "left",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#C9A84C",
                      width: "35%",
                    }}
                  >
                    With Right Assets
                  </th>
                </tr>
              </thead>
              <tbody>
                {lp.comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F9F8F5",
                    }}
                  >
                    <td
                      style={{
                        padding: "16px 20px",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1A1A1A",
                        borderBottom: "1px solid #EEF0F3",
                        verticalAlign: "top",
                      }}
                    >
                      {row.aspect}
                    </td>
                    <td
                      style={{
                        padding: "16px 20px",
                        fontSize: 13,
                        color: "#64748B",
                        borderBottom: "1px solid #EEF0F3",
                        verticalAlign: "top",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                        }}
                      >
                        <X
                          style={{
                            width: 15,
                            height: 15,
                            color: "#EF4444",
                            flexShrink: 0,
                            marginTop: 1,
                          }}
                        />
                        {row.alone}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "16px 20px",
                        fontSize: 13,
                        color: "#1A1A1A",
                        fontWeight: 500,
                        borderBottom: "1px solid #EEF0F3",
                        borderLeft: `3px solid ${lp.accentColor}`,
                        backgroundColor: i % 2 === 0 ? lp.lightBg : "#F0F7F7",
                        verticalAlign: "top",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                        }}
                      >
                        <CheckCircle2
                          style={{
                            width: 15,
                            height: 15,
                            color: "#16A34A",
                            flexShrink: 0,
                            marginTop: 1,
                          }}
                        />
                        {row.withUs}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          10. RISK REVERSAL / GUARANTEE
      ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          paddingTop: 60,
          paddingBottom: 60,
        }}
      >
        <div style={{ maxWidth: 740, margin: "0 auto", padding: "0 20px" }}>
          <div
            style={{
              backgroundColor: "#FBF5E6",
              border: "1.5px solid #E8D5A3",
              borderRadius: 20,
              padding: "36px 40px",
              display: "flex",
              alignItems: "flex-start",
              gap: 20,
            }}
            className="flex-col sm:flex-row"
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: "#C9A84C22",
                border: "2px solid #C9A84C44",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ShieldCheck
                style={{ width: 28, height: 28, color: "#C9A84C" }}
              />
            </div>
            <div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1B3A6B",
                  marginBottom: 10,
                }}
              >
                Our Honest Guarantee
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "#374151",
                  lineHeight: 1.75,
                  marginBottom: 16,
                }}
              >
                {lp.guarantee}
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <CheckCircle2
                  style={{ width: 16, height: 16, color: "#16A34A" }}
                />
                <span
                  style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}
                >
                  Free consultation · No obligation · No upselling
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          11. FAQS
      ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "#F9F8F5",
          paddingTop: 72,
          paddingBottom: 72,
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px" }}>
          <h2
            style={{
              fontSize: "clamp(22px, 2.8vw, 30px)",
              fontWeight: 700,
              color: "#1B3A6B",
              marginBottom: 36,
              textAlign: "center",
            }}
          >
            Frequently Asked Questions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {lp.faqs.map((faq, i) => (
              <details
                key={i}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #EEF0F3",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <summary
                  className="lp-summary"
                  style={{
                    padding: "18px 20px",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#1A1A1A",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    userSelect: "none",
                  }}
                >
                  {faq.q}
                  <ChevronDown
                    className="lp-chevron"
                    style={{
                      width: 18,
                      height: 18,
                      color: "#64748B",
                      flexShrink: 0,
                    }}
                  />
                </summary>
                <div
                  className="lp-faq-body"
                  style={{
                    padding: "14px 20px 18px",
                    fontSize: 14,
                    color: "#374151",
                    lineHeight: 1.75,
                    borderTop: "1px solid #F1F5F9",
                  }}
                >
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          12. FINAL CTA WITH URGENCY
      ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
          paddingTop: 72,
          paddingBottom: 72,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.08)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{ maxWidth: 600, margin: "0 auto", padding: "0 20px", position: "relative" }}
        >
          {/* Online pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              backgroundColor: "rgba(34,197,94,0.15)",
              border: "1px solid rgba(34,197,94,0.3)",
              marginBottom: 24,
            }}
          >
            <span
              className="lp-pulse"
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#22C55E",
              }}
            />
            <span
              style={{ fontSize: 13, fontWeight: 600, color: "#4ADE80" }}
            >
              Advisor available right now
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 800,
              color: "#FFFFFF",
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            Ready for a free consultation?
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.68)",
              marginBottom: 36,
              lineHeight: 1.6,
            }}
          >
            No paperwork, no commitment, no cost. We talk, understand your
            situation, and tell you exactly how we can help — in plain language.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <a
              href={PHONE_HREF}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 12,
                backgroundColor: "#C9A84C",
                color: "#1B3A6B",
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <Phone style={{ width: 18, height: 18 }} />
              Call Us Free Now
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 12,
                border: "1.5px solid rgba(255,255,255,0.4)",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              WhatsApp Us
              <ArrowRight style={{ width: 16, height: 16 }} />
            </a>
          </div>

          <p
            style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}
          >
            Mon–Sat · 9am–7pm IST · Response guaranteed within 2 hours
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          13. MINIMAL FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "#071428",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
          © 2025 Right Assets Management. All rights reserved.&nbsp;·&nbsp;
          <Link
            href="/privacy-policy"
            style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
          >
            Privacy Policy
          </Link>
          &nbsp;·&nbsp;
          <Link
            href="/disclaimer"
            style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
          >
            Disclaimer
          </Link>
        </p>
        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.22)",
            marginTop: 6,
          }}
        >
          *Rates, returns, and premiums are indicative and subject to market
          conditions and individual eligibility.
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          14. STICKY MOBILE BOTTOM BAR
      ═══════════════════════════════════════════════════════════════ */}
      <div
        className="lg:hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #EEF0F3",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.10)",
          display: "flex",
          gap: 10,
          padding: "10px 14px",
          paddingBottom:
            "max(10px, env(safe-area-inset-bottom, 10px))",
        }}
      >
        <a
          href={PHONE_HREF}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            padding: "13px",
            borderRadius: 12,
            backgroundColor: "#1B3A6B",
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          <Phone style={{ width: 17, height: 17 }} />
          Call Free
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            padding: "13px",
            borderRadius: 12,
            backgroundColor: "#25D366",
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          WhatsApp
        </a>
      </div>
    </>
  );
}
