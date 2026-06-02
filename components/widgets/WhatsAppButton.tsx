"use client";

import { useState, useRef, useEffect } from "react";

const WA_NUMBER = "919999999999";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

const quickReplies = [
  {
    label: "📊 Financial Planning Query",
    message: "Hi, I need help with Financial Planning",
  },
  {
    label: "🏠 Real Estate / Property Help",
    message: "Hi, I need help with Real Estate / Property",
  },
  {
    label: "⚖️ Legal Advisory",
    message: "Hi, I need help with Legal Advisory",
  },
];

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes ram-wa-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          50%       { box-shadow: 0 0 0 8px rgba(37,211,102,0); }
        }
        @keyframes ram-wa-card-in {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ram-wa-card {
          animation: ram-wa-card-in 0.22s ease both;
        }
        .ram-wa-online-dot {
          animation: ram-wa-pulse 2s ease-in-out infinite;
        }
        .ram-wa-quick-btn:hover {
          background-color: #F0FDF4 !important;
          border-color: #25D366 !important;
          color: #15803D !important;
        }
      `}</style>

      <div
        className="hidden lg:flex"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "24px",
          zIndex: 9999,
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "12px",
        }}
      >
        {/* Chat card */}
        {open && (
          <div
            ref={cardRef}
            className="ram-wa-card"
            style={{
              width: "300px",
              backgroundColor: "#ECE5DD", // WhatsApp chat background
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
            }}
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: "#25D366",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#1B3A6B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="#C9A84C"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>

              {/* Name + status */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Right Assets Management
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "11px",
                    marginTop: "1px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: "#A7F3D0",
                    }}
                  />
                  Online · Typically replies in 5 minutes
                </div>
              </div>

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "20px",
                  lineHeight: 1,
                  padding: "2px 4px",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                ×
              </button>
            </div>

            {/* Chat body */}
            <div
              style={{
                backgroundColor: "#F7F3EE",
                padding: "16px",
              }}
            >
              {/* Greeting bubble */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "0 12px 12px 12px",
                  padding: "10px 14px",
                  fontSize: "13px",
                  color: "#1A1A1A",
                  lineHeight: 1.5,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                  marginBottom: "14px",
                  maxWidth: "85%",
                }}
              >
                Hello! 👋 How can we help you today?
              </div>

              {/* Quick replies */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {quickReplies.map((qr) => (
                  <a
                    key={qr.label}
                    href={`${WA_BASE}?text=${encodeURIComponent(qr.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ram-wa-quick-btn"
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "9px 14px",
                      border: "1.5px solid #25D366",
                      borderRadius: "8px",
                      backgroundColor: "#FFFFFF",
                      color: "#1A1A1A",
                      fontSize: "12.5px",
                      fontWeight: 500,
                      textDecoration: "none",
                      cursor: "pointer",
                      transition:
                        "background-color 0.15s, border-color 0.15s, color 0.15s",
                      textAlign: "center",
                      boxSizing: "border-box",
                    }}
                  >
                    {qr.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderTop: "1px solid #E2E8F0",
                padding: "10px 16px",
                textAlign: "center",
              }}
            >
              <a
                href={WA_BASE}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#25D366",
                  fontSize: "12px",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Open WhatsApp
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  width="13"
                  height="13"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        )}

        {/* Floating trigger button */}
        <div style={{ position: "relative", display: "inline-flex" }}>
          {/* Tooltip */}
          {!open && (
            <div
              className="ram-wa-tooltip"
              style={{
                position: "absolute",
                right: "68px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#1A1A1A",
                color: "#FFFFFF",
                fontSize: "11.5px",
                padding: "6px 10px",
                borderRadius: "7px",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                opacity: 0,
                transition: "opacity 0.2s",
              }}
            >
              Chat with us — typically replies in 5 minutes
              <span
                style={{
                  position: "absolute",
                  right: "-5px",
                  top: "50%",
                  transform: "translateY(-50%) rotate(45deg)",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#1A1A1A",
                }}
              />
            </div>
          )}

          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
            aria-expanded={open}
            className="ram-wa-btn"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "#25D366",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(37,211,102,0.45)",
              transition: "transform 0.2s, box-shadow 0.2s",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1.1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 6px 20px rgba(37,211,102,0.55)";
              // Show tooltip
              const tooltip = (e.currentTarget as HTMLButtonElement)
                .parentElement?.querySelector<HTMLElement>(
                  ".ram-wa-tooltip"
                );
              if (tooltip) tooltip.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 16px rgba(37,211,102,0.45)";
              const tooltip = (e.currentTarget as HTMLButtonElement)
                .parentElement?.querySelector<HTMLElement>(
                  ".ram-wa-tooltip"
                );
              if (tooltip) tooltip.style.opacity = "0";
            }}
          >
            {open ? (
              // X icon when open
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="22"
                height="22"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // WhatsApp icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="#FFFFFF"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            )}

            {/* Pulsing online indicator dot */}
            {!open && (
              <span
                className="ram-wa-online-dot"
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  width: "11px",
                  height: "11px",
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                  border: "2px solid #FFFFFF",
                }}
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
