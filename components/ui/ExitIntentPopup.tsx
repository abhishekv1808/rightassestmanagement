"use client";

import { useEffect, useRef, useState } from "react";

interface FormState {
  name: string;
  phone: string;
}

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", phone: "" });
  const [error, setError] = useState("");
  const pageEntryTime = useRef<number>(Date.now());
  const triggered = useRef(false);

  useEffect(() => {
    // Don't show on mobile — no reliable mouseleave
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;

    // Check if already shown this session
    if (sessionStorage.getItem("ram_exit_shown") === "1") return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered.current) return;
      if (e.clientY > 0) return; // Only trigger when mouse exits via top (browser chrome)

      const elapsed = Date.now() - pageEntryTime.current;
      if (elapsed < 10000) return; // Must have been on page for at least 10s

      triggered.current = true;
      sessionStorage.setItem("ram_exit_shown", "1");
      setVisible(true);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  function handleClose() {
    setVisible(false);
    sessionStorage.setItem("ram_exit_shown", "1");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.name.trim(),
          phone: form.phone.trim(),
          source: "exit_intent",
          service_interested: "Free Consultation",
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      sessionStorage.setItem("ram_exit_shown", "1");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes ram-popup-in {
          from { opacity: 0; transform: translate(-50%, -46%) scale(0.93); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        .ram-exit-modal {
          animation: ram-popup-in 0.28s cubic-bezier(0.34,1.56,0.64,1) both;
        }
      `}</style>

      {/* Overlay */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />

      {/* Modal */}
      <div
        className="ram-exit-modal"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 9999,
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          padding: "40px",
          width: "92vw",
          maxWidth: "480px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            color: "#64748B",
            fontSize: "22px",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>

        {submitted ? (
          /* Success state */
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                backgroundColor: "#F0FDF4",
                border: "2px solid #22C55E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: "32px",
              }}
            >
              ✓
            </div>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#1B3A6B",
                marginBottom: "10px",
              }}
            >
              You&rsquo;re all set!
            </h2>
            <p style={{ color: "#64748B", fontSize: "15px", lineHeight: 1.6 }}>
              We&rsquo;ll call you within 2 hours! Our advisor will review your
              situation and give you a clear roadmap — no obligation.
            </p>
          </div>
        ) : (
          <>
            {/* Gold badge */}
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#FEF3C7",
                color: "#92400E",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "4px 12px",
                borderRadius: "20px",
                border: "1px solid #C9A84C",
                marginBottom: "18px",
              }}
            >
              WAIT — Before You Go
            </div>

            <h2
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#1B3A6B",
                lineHeight: 1.25,
                marginBottom: "12px",
              }}
            >
              Get a FREE 30-minute consultation
            </h2>

            <p
              style={{
                color: "#64748B",
                fontSize: "14px",
                lineHeight: 1.65,
                marginBottom: "20px",
              }}
            >
              Our advisors will review your financial or property situation and
              give you a clear roadmap — no obligation, no hard sell.
            </p>

            {/* Trust bullets */}
            <ul
              style={{
                listStyle: "none",
                margin: "0 0 24px 0",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {[
                "No sales pressure",
                "Response within 2 hours",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "13px",
                    color: "#1A1A1A",
                    fontWeight: 500,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      backgroundColor: "#C9A84C",
                      color: "#fff",
                      fontSize: "11px",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: "10px",
                    fontSize: "14px",
                    color: "#1A1A1A",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#C9A84C")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#E2E8F0")
                  }
                />
                <input
                  type="tel"
                  placeholder="Phone Number (10 digits) *"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: "10px",
                    fontSize: "14px",
                    color: "#1A1A1A",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#C9A84C")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#E2E8F0")
                  }
                />
              </div>

              {error && (
                <p
                  style={{
                    color: "#DC2626",
                    fontSize: "12px",
                    marginBottom: "10px",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  backgroundColor: loading ? "#D4A940" : "#C9A84C",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "15px",
                  border: "none",
                  borderRadius: "10px",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s, transform 0.15s",
                  fontFamily: "inherit",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  if (!loading)
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "#B8941F";
                }}
                onMouseLeave={(e) => {
                  if (!loading)
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "#C9A84C";
                }}
              >
                {loading ? "Booking…" : "Book My Free Consultation"}
              </button>
            </form>

            <p
              style={{
                textAlign: "center",
                fontSize: "11px",
                color: "#94A3B8",
                marginTop: "12px",
              }}
            >
              No spam. We respect your privacy.
            </p>
          </>
        )}
      </div>
    </>
  );
}
