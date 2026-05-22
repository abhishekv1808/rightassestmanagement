"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "ram_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if consent has not yet been recorded
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) return;

    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* Icon + text */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Lock icon */}
            <div className="flex-shrink-0 mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1B3A6B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <p className="text-sm text-[#1A1A1A] leading-relaxed">
              We use cookies to improve your experience and analyse site
              traffic. By continuing, you agree to our{" "}
              <Link
                href="/privacy-policy"
                className="text-[#1B3A6B] underline underline-offset-2 hover:text-[#C9A84C] transition-colors"
              >
                cookie policy
              </Link>
              .
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-auto">
            <button
              onClick={handleDecline}
              className="text-sm font-medium text-[#64748B] border border-gray-300 rounded-md px-4 py-2 hover:border-[#1B3A6B] hover:text-[#1B3A6B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A6B] focus-visible:ring-offset-2"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="text-sm font-semibold bg-[#C9A84C] text-[#1B3A6B] rounded-md px-5 py-2 hover:bg-[#b8943e] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
