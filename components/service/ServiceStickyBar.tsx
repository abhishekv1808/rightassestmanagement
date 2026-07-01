"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface ServiceStickyBarProps {
  serviceName: string;
  whatsappNumber?: string;
}

export default function ServiceStickyBar({
  serviceName,
  whatsappNumber = "919742826804",
}: ServiceStickyBarProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerObserverRef = useRef<IntersectionObserver | null>(null);

  // SSR guard
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll 300px → show bar
  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  // IntersectionObserver on footer → hide mobile bar when footer is in view
  useEffect(() => {
    if (!mounted) return;
    const footer = document.querySelector("footer");
    if (!footer) return;
    footerObserverRef.current = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    footerObserverRef.current.observe(footer);
    return () => footerObserverRef.current?.disconnect();
  }, [mounted]);

  if (!mounted) return null;

  const consultHref = `/contact?service=${encodeURIComponent(serviceName)}`;
  const waText = encodeURIComponent(`Hi, I need help with ${serviceName}`);
  const waHref = `https://wa.me/${whatsappNumber}?text=${waText}`;

  const isVisible = visible;
  // Mobile bar hidden when footer is visible
  const mobileHidden = footerVisible;

  return (
    <>
      <style>{`
        /* ── Desktop sidebar card ─────────────────────────────────── */
        .ssb-desktop {
          display: none;
        }
        @media (min-width: 1024px) {
          .ssb-desktop {
            display: flex;
            flex-direction: column;
            position: fixed;
            right: 0;
            top: 50%;
            transform: translateY(-50%) translateX(0);
            z-index: 9985;
            width: 200px;
            background: #ffffff;
            border-left: 4px solid #1B3A6B;
            border-radius: 12px 0 0 12px;
            padding: 20px 16px;
            box-shadow: -4px 0 24px rgba(27, 58, 107, 0.14), -1px 0 8px rgba(0,0,0,0.06);
            gap: 10px;
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          .ssb-desktop.ssb-hidden {
            opacity: 0;
            transform: translateY(-50%) translateX(16px);
            pointer-events: none;
          }
          .ssb-desktop.ssb-shown {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
          .ssb-btn-gold {
            display: block;
            width: 100%;
            padding: 8px 10px;
            background: #C9A84C;
            color: #1A1A1A;
            font-weight: 700;
            font-size: 11px;
            text-align: center;
            border-radius: 8px;
            text-decoration: none;
            border: none;
            cursor: pointer;
            line-height: 1.3;
            transition: opacity 0.15s ease;
          }
          .ssb-btn-gold:hover { opacity: 0.88; }
          .ssb-btn-wa {
            display: block;
            width: 100%;
            padding: 7px 10px;
            background: transparent;
            color: #1a7a3c;
            font-weight: 600;
            font-size: 11px;
            text-align: center;
            border-radius: 8px;
            text-decoration: none;
            border: 1.5px solid #1a7a3c;
            cursor: pointer;
            line-height: 1.3;
            transition: background 0.15s ease, color 0.15s ease;
          }
          .ssb-btn-wa:hover {
            background: #1a7a3c;
            color: #fff;
          }
        }

        /* ── Mobile bottom bar ────────────────────────────────────── */
        .ssb-mobile {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9985;
          background: #ffffff;
          border-top: 2px solid #1B3A6B;
          height: 56px;
          padding: 0 16px;
          box-shadow: 0 -4px 16px rgba(27, 58, 107, 0.1);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        @media (min-width: 1024px) {
          .ssb-mobile {
            display: none;
          }
        }
        .ssb-mobile.ssb-hidden {
          opacity: 0;
          transform: translateY(100%);
          pointer-events: none;
        }
        .ssb-mobile.ssb-shown {
          opacity: 1;
          transform: translateY(0);
        }
        .ssb-mobile-text {
          font-size: 12px;
          font-weight: 700;
          color: #1B3A6B;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: calc(100% - 140px);
          line-height: 1.3;
        }
        .ssb-mobile-text span {
          display: block;
          font-size: 10px;
          font-weight: 400;
          color: #64748B;
        }
        .ssb-mobile-cta {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 8px 14px;
          background: #C9A84C;
          color: #1A1A1A;
          font-weight: 700;
          font-size: 12px;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.15s ease;
        }
        .ssb-mobile-cta:hover { opacity: 0.88; }
      `}</style>

      {/* ── Desktop sidebar card ──────────────────────────────────────── */}
      <aside
        className={`ssb-desktop ${isVisible ? "ssb-shown" : "ssb-hidden"}`}
        aria-label="Quick consultation sidebar"
      >
        <p style={{ fontSize: "10px", color: "#64748B", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.2 }}>
          Need help with
        </p>
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#1B3A6B", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {serviceName}
        </p>
        <hr style={{ border: "none", borderTop: "1px solid #E5E7EB", margin: "2px 0" }} />
        <Link href={consultHref} className="ssb-btn-gold">
          Free Consultation
        </Link>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="ssb-btn-wa">
          WhatsApp Now
        </a>
        <p style={{ fontSize: "10px", color: "#64748B", textAlign: "center", lineHeight: 1.4 }}>
          &#9733; Free&nbsp;30-min&nbsp;call
        </p>
      </aside>

      {/* ── Mobile bottom bar ─────────────────────────────────────────── */}
      <div
        className={`ssb-mobile ${isVisible && !mobileHidden ? "ssb-shown" : "ssb-hidden"}`}
        aria-label="Quick consultation bar"
      >
        <div className="ssb-mobile-text">
          Get help with {serviceName}
          <span>Free consult</span>
        </div>
        <Link href={consultHref} className="ssb-mobile-cta">
          Free Consult&nbsp;&#8594;
        </Link>
      </div>
    </>
  );
}
