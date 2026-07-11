"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, PhoneCall, Phone } from "lucide-react";

// WhatsApp SVG inline (lucide-react doesn't include it)
function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function StickyMobileCTA() {
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    // Hide when footer is visible
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  const isHome     = pathname === "/";
  const isServices = pathname.startsWith("/financial") || pathname.startsWith("/real-estate") || pathname.startsWith("/legal");
  const isContact  = pathname === "/contact";

  return (
    <>
      <style>{`
        .ram-bottombar {
          display: none;
        }
        @media (max-width: 1023px) {
          .ram-bottombar {
            display: flex;
          }
        }
        .ram-tab-label {
          font-size: 10px;
          font-weight: 600;
          line-height: 1;
          margin-top: 3px;
          letter-spacing: 0.01em;
        }
        .ram-tab-active-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          margin: 2px auto 0;
        }
      `}</style>

      <div
        className="ram-bottombar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9990,
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E2E8F0",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.10)",
          height: "64px",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          alignItems: "stretch",
          transform: hidden ? "translateY(110%)" : "translateY(0)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          willChange: "transform",
        }}
      >
        {/* ── Tab 1: Home ── */}
        <Link
          href="/"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            color: isHome ? "#1B3A6B" : "#94A3B8",
            transition: "color 0.2s",
            paddingTop: "8px",
            paddingBottom: "6px",
          }}
          aria-label="Home"
        >
          <Home size={20} strokeWidth={isHome ? 2.5 : 1.8} />
          <span className="ram-tab-label">Home</span>
          {isHome && (
            <span className="ram-tab-active-dot" style={{ backgroundColor: "#1B3A6B" }} />
          )}
        </Link>

        {/* ── Tab 2: Services ── */}
        <Link
          href="/financial"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            color: isServices ? "#1B3A6B" : "#94A3B8",
            transition: "color 0.2s",
            paddingTop: "8px",
            paddingBottom: "6px",
          }}
          aria-label="Services"
        >
          <LayoutGrid size={20} strokeWidth={isServices ? 2.5 : 1.8} />
          <span className="ram-tab-label">Services</span>
          {isServices && (
            <span className="ram-tab-active-dot" style={{ backgroundColor: "#1B3A6B" }} />
          )}
        </Link>

        {/* ── Tab 3: Book (center, raised) ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: "6px",
            position: "relative",
          }}
        >
          <Link
            href="/contact"
            aria-label="Book Consultation"
            style={{
              position: "absolute",
              top: "-18px",
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #C9A84C 0%, #E8CC6E 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(201,168,76,0.55), 0 0 0 3px #FFFFFF",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onTouchStart={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(0.94)";
            }}
            onTouchEnd={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
            }}
          >
            <PhoneCall size={22} color="#1A1A1A" strokeWidth={2} />
          </Link>
          <span
            className="ram-tab-label"
            style={{ color: isContact ? "#C9A84C" : "#94A3B8", marginTop: "34px" }}
          >
            Book Call
          </span>
          {isContact && (
            <span className="ram-tab-active-dot" style={{ backgroundColor: "#C9A84C" }} />
          )}
        </div>

        {/* ── Tab 4: WhatsApp ── */}
        <a
          href="https://wa.me/919742826804"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            color: "#94A3B8",
            transition: "color 0.2s",
            paddingTop: "8px",
            paddingBottom: "6px",
          }}
          aria-label="WhatsApp"
          onTouchStart={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#25D366")}
          onTouchEnd={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8")}
        >
          <WhatsAppIcon size={20} />
          <span className="ram-tab-label">WhatsApp</span>
        </a>

        {/* ── Tab 5: Call ── */}
        <a
          href="tel:+919742826804"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            color: "#94A3B8",
            transition: "color 0.2s",
            paddingTop: "8px",
            paddingBottom: "6px",
          }}
          aria-label="Call Now"
          onTouchStart={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#1B3A6B")}
          onTouchEnd={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8")}
        >
          <Phone size={20} strokeWidth={1.8} />
          <span className="ram-tab-label">Call Now</span>
        </a>
      </div>
    </>
  );
}
