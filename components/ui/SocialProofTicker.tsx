"use client";

import { useEffect, useRef, useState } from "react";

interface Notification {
  name: string;
  action: string;
  location: string;
  time: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    name: "Rahul S.",
    action: "enquired about Mutual Funds",
    location: "Mumbai",
    time: "2 mins ago",
  },
  {
    name: "Priya M.",
    action: "booked a Home Loan consultation",
    location: "Delhi",
    time: "5 mins ago",
  },
  {
    name: "Arjun K.",
    action: "asked about Property Registration",
    location: "HSR Layout",
    time: "8 mins ago",
  },
  {
    name: "Deepa R.",
    action: "enquired about Health Insurance",
    location: "Hyderabad",
    time: "11 mins ago",
  },
  {
    name: "Karthik V.",
    action: "requested Legal Advisory",
    location: "Hebbal",
    time: "14 mins ago",
  },
  {
    name: "Sneha B.",
    action: "booked a Tax Planning session",
    location: "Pune",
    time: "18 mins ago",
  },
  {
    name: "Vikram N.",
    action: "asked about Khata Certificate services",
    location: "Electronic City",
    time: "21 mins ago",
  },
  {
    name: "Meena P.",
    action: "enquired about Portfolio Management",
    location: "Banashankari",
    time: "25 mins ago",
  },
  {
    name: "Suresh T.",
    action: "booked a Property Valuation",
    location: "Marathahalli",
    time: "29 mins ago",
  },
  {
    name: "Anjali D.",
    action: "asked about NPS / Pension Planning",
    location: "Rajajinagar",
    time: "33 mins ago",
  },
  {
    name: "Rohit C.",
    action: "enquired about Vehicle Loan",
    location: "Yelahanka",
    time: "37 mins ago",
  },
  {
    name: "Lakshmi G.",
    action: "booked a Cyber Crime consultation",
    location: "BTM Layout",
    time: "41 mins ago",
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function SocialProofTicker() {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false); // controls opacity for fade
  const [current, setCurrent] = useState<Notification | null>(null);
  const [mounted, setMounted] = useState(false);
  const queueRef = useRef<Notification[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);

    // Don't show on mobile
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    queueRef.current = shuffleArray(NOTIFICATIONS);
    let idx = 0;

    function showNext() {
      // Rebuild / re-shuffle when we exhaust the queue
      if (idx >= queueRef.current.length) {
        queueRef.current = shuffleArray(NOTIFICATIONS);
        idx = 0;
      }

      const notif = queueRef.current[idx++];
      setCurrent(notif);
      setVisible(true);
      setShow(false);

      // Fade in (next tick)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShow(true));
      });

      timerRef.current = setTimeout(() => {
        // Fade out
        setShow(false);
        timerRef.current = setTimeout(() => {
          setVisible(false);
          // Wait 6s then show next
          timerRef.current = setTimeout(showNext, 6000);
        }, 500); // matches CSS transition duration
      }, 4000);
    }

    // Start after 8 seconds
    timerRef.current = setTimeout(showNext, 8000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!mounted || !visible || !current) return null;

  const initials = getInitials(current.name);

  return (
    <>
      <style>{`
        .ram-sp-card {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .ram-sp-card.show {
          opacity: 1;
          transform: translateY(0);
        }
        .ram-sp-card.hide {
          opacity: 0;
          transform: translateY(10px);
        }
        /* Hide on mobile */
        @media (max-width: 767px) {
          .ram-sp-wrapper { display: none !important; }
        }
      `}</style>

      <div
        className="ram-sp-wrapper"
        style={{
          position: "fixed",
          left: "20px",
          bottom: "90px",
          zIndex: 9980,
        }}
      >
        <div
          className={`ram-sp-card ${show ? "show" : "hide"}`}
          style={{
            width: "280px",
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            padding: "14px 16px",
            borderLeft: "3px solid #C9A84C",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            opacity: 0,
            transform: "translateY(10px)",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#1B3A6B",
              color: "#C9A84C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: 700,
              flexShrink: 0,
              letterSpacing: "0.02em",
            }}
          >
            {initials}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "6px",
                marginBottom: "3px",
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#1A1A1A",
                  whiteSpace: "nowrap",
                }}
              >
                {current.name}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#C9A84C",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {current.time}
              </span>
            </div>

            <p
              style={{
                fontSize: "12px",
                color: "#64748B",
                margin: 0,
                lineHeight: 1.45,
              }}
            >
              {current.action}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginTop: "4px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#94A3B8"
                width="11"
                height="11"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.145 14.19 14.19 0 001.984-1.575C14.258 15.408 16 12.43 16 9c0-3.866-2.79-7-6-7S4 5.134 4 9c0 3.43 1.742 6.408 3.401 7.936a14.19 14.19 0 001.984 1.575 5.741 5.741 0 00.281.145l.018.008.006.003z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                style={{
                  fontSize: "11px",
                  color: "#94A3B8",
                }}
              >
                {current.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
