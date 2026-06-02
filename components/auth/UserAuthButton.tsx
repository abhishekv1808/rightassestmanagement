"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, User, LogOut, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type AuthUser = {
  email: string;
  name: string | null;
  avatarUrl: string | null;
};

// Admin session must never appear as a client account in the marketing site
const ADMIN_EMAIL = (
  process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@rightasset.in"
).toLowerCase();
const isAdminEmail = (email?: string | null) =>
  (email ?? "").toLowerCase() === ADMIN_EMAIL;

export default function UserAuthButton() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      // Admin account must not appear as a client user in the navbar
      if (user && !isAdminEmail(user.email)) {
        setUser({
          email: user.email ?? "",
          name: user.user_metadata?.full_name ?? null,
          avatarUrl: user.user_metadata?.avatar_url ?? null,
        });
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && !isAdminEmail(session.user.email)) {
        setUser({
          email: session.user.email ?? "",
          name: session.user.user_metadata?.full_name ?? null,
          avatarUrl: session.user.user_metadata?.avatar_url ?? null,
        });
      } else {
        setUser(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  if (!mounted) return null;

  const initials = (user?.name || user?.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Not signed in → Sign In button
  if (!user) {
    return (
      <Link
        href="/signin"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 14px",
          borderRadius: 8,
          border: "1.5px solid rgba(255,255,255,0.25)",
          backgroundColor: "rgba(255,255,255,0.07)",
          color: "rgba(255,255,255,0.85)",
          fontSize: 13,
          fontWeight: 600,
          textDecoration: "none",
          transition: "background-color 0.15s, border-color 0.15s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.backgroundColor = "rgba(255,255,255,0.14)";
          el.style.borderColor = "rgba(255,255,255,0.45)";
          el.style.color = "#FFFFFF";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.backgroundColor = "rgba(255,255,255,0.07)";
          el.style.borderColor = "rgba(255,255,255,0.25)";
          el.style.color = "rgba(255,255,255,0.85)";
        }}
      >
        <LogIn size={14} />
        Sign In
      </Link>
    );
  }

  // Signed in → avatar + dropdown
  return (
    <div ref={dropRef} style={{ position: "relative" }}>
      <button
        onClick={() => setDropdownOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "5px 10px 5px 5px",
          borderRadius: 9,
          backgroundColor: dropdownOpen
            ? "rgba(255,255,255,0.14)"
            : "rgba(255,255,255,0.08)",
          border: "1.5px solid rgba(255,255,255,0.18)",
          color: "rgba(255,255,255,0.9)",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 600,
          transition: "background-color 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "rgba(255,255,255,0.14)";
        }}
        onMouseLeave={(e) => {
          if (!dropdownOpen)
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "rgba(255,255,255,0.08)";
        }}
      >
        {/* Avatar */}
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatarUrl}
            alt={user.name ?? "User"}
            style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              backgroundColor: "#C9A84C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 800, color: "#1B3A6B" }}>
              {initials}
            </span>
          </div>
        )}
        <span className="hidden sm:inline">
          {user.name?.split(" ")[0] || "Account"}
        </span>
        <ChevronDown
          size={13}
          style={{
            transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.18s",
          }}
        />
      </button>

      {/* Dropdown */}
      {dropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: 200,
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.06)",
            overflow: "hidden",
            zIndex: 200,
          }}
        >
          {/* User info header */}
          <div
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid #F1F5F9",
              backgroundColor: "#F8FAFC",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1B3A6B", margin: "0 0 2px" }}>
              {user.name || "My Account"}
            </p>
            <p
              style={{
                fontSize: 11,
                color: "#94A3B8",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user.email}
            </p>
          </div>

          {/* Menu items */}
          <div style={{ padding: "6px" }}>
            <Link
              href="/profile"
              onClick={() => setDropdownOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 8,
                textDecoration: "none",
                color: "#374151",
                fontSize: 13,
                fontWeight: 500,
                transition: "background-color 0.12s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F1F5F9";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              }}
            >
              <User size={14} color="#64748B" />
              My Profile
            </Link>

            <div style={{ height: 1, backgroundColor: "#F1F5F9", margin: "4px 0" }} />

            <button
              onClick={handleSignOut}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "9px 12px",
                borderRadius: 8,
                border: "none",
                backgroundColor: "transparent",
                color: "#EF4444",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                textAlign: "left",
                transition: "background-color 0.12s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FFF5F5";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              }}
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
