"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Star,
  FileText,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface AdminShellProps {
  children: ReactNode;
  user: { email: string };
  leadCount?: number;
  pendingCount?: number;
}

interface NavItem {
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  href: string;
  badge?: number;
  external?: boolean;
}

interface NavSection {
  section: string;
  items: NavItem[];
}

function getInitials(email: string): string {
  const parts = email.split("@")[0].split(/[._-]/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

function getPageTitle(pathname: string): string {
  if (pathname === "/admin") return "Dashboard";
  if (pathname === "/admin/leads") return "Leads";
  if (pathname === "/admin/testimonials") return "Testimonials";
  if (pathname === "/admin/blog/new") return "New Post";
  if (pathname.startsWith("/admin/blog/") && pathname.endsWith("/edit")) return "Edit Post";
  if (pathname === "/admin/blog") return "Blog Posts";
  if (pathname === "/admin/settings") return "Settings";
  return "Admin";
}

export default function AdminShell({
  children,
  user,
  leadCount = 0,
  pendingCount = 0,
}: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navSections: NavSection[] = [
    {
      section: "OVERVIEW",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
        { label: "Analytics", icon: BarChart3, href: "/admin" },
      ],
    },
    {
      section: "MANAGEMENT",
      items: [
        {
          label: "Leads",
          icon: Users,
          href: "/admin/leads",
          badge: leadCount > 0 ? leadCount : undefined,
        },
        {
          label: "Testimonials",
          icon: Star,
          href: "/admin/testimonials",
          badge: pendingCount > 0 ? pendingCount : undefined,
        },
        { label: "Blog Posts", icon: FileText, href: "/admin/blog" },
      ],
    },
    {
      section: "SETTINGS",
      items: [
        { label: "Settings", icon: Settings, href: "/admin/settings" },
        {
          label: "View Website",
          icon: ExternalLink,
          href: "/",
          external: true,
        },
      ],
    },
  ];

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  const SidebarContent = () => (
    <div
      style={{
        width: "256px",
        height: "100%",
        backgroundColor: "#0F1A2E",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Logo area */}
      <div
        style={{
          padding: "24px 20px 20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#C9A84C",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "800",
                color: "#0F1A2E",
                fontFamily: "Georgia, serif",
              }}
            >
              R
            </span>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: "700",
                color: "#FFFFFF",
                letterSpacing: "-0.2px",
              }}
            >
              Right Asset
            </p>
            <span
              style={{
                display: "inline-block",
                fontSize: "10px",
                fontWeight: "600",
                color: "#C9A84C",
                backgroundColor: "rgba(201,168,76,0.15)",
                padding: "1px 7px",
                borderRadius: "20px",
                letterSpacing: "0.5px",
                marginTop: "2px",
              }}
            >
              ADMIN
            </span>
          </div>
        </div>
      </div>

      {/* Nav sections */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "16px 12px" }}>
        {navSections.map((section) => (
          <div key={section.section} style={{ marginBottom: "24px" }}>
            <p
              style={{
                fontSize: "10px",
                fontWeight: "700",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: "0 8px",
                marginBottom: "6px",
              }}
            >
              {section.section}
            </p>
            {section.items.map((item) => {
              const isActive = pathname === item.href && !item.external;
              const Icon = item.icon;

              const linkProps = item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  {...linkProps}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 10px",
                    borderRadius: "8px",
                    marginBottom: "2px",
                    textDecoration: "none",
                    transition: "background-color 0.15s",
                    backgroundColor: isActive
                      ? "rgba(201,168,76,0.1)"
                      : "transparent",
                    borderLeft: isActive
                      ? "3px solid #C9A84C"
                      : "3px solid transparent",
                    color: isActive
                      ? "#C9A84C"
                      : "rgba(255,255,255,0.6)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                        "rgba(255,255,255,0.05)";
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.9)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                        "transparent";
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.6)";
                    }
                  }}
                >
                  <Icon
                    size={16}
                    color={isActive ? "#C9A84C" : "rgba(255,255,255,0.4)"}
                  />
                  <span
                    style={{
                      fontSize: "13.5px",
                      fontWeight: isActive ? "600" : "500",
                      flex: 1,
                    }}
                  >
                    {item.label}
                  </span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      style={{
                        backgroundColor: "#C9A84C",
                        color: "#0F1A2E",
                        fontSize: "10px",
                        fontWeight: "700",
                        padding: "1px 6px",
                        borderRadius: "20px",
                        minWidth: "18px",
                        textAlign: "center",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.external && (
                    <ExternalLink size={11} color="rgba(255,255,255,0.25)" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom: user + sign out */}
      <div
        style={{
          padding: "16px 12px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
            padding: "0 4px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#1B3A6B",
              border: "1.5px solid rgba(201,168,76,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#C9A84C" }}>
              {getInitials(user.email)}
            </span>
          </div>
          <span
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
            }}
          >
            {user.email}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
            padding: "9px 10px",
            backgroundColor: "transparent",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            color: "rgba(255,255,255,0.45)",
            fontSize: "13px",
            fontWeight: "500",
            transition: "background-color 0.15s, color 0.15s",
            textAlign: "left",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "rgba(239,68,68,0.12)";
            (e.currentTarget as HTMLButtonElement).style.color = "#FCA5A5";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.45)";
          }}
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Desktop sidebar */}
      <aside
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: "256px",
          zIndex: 40,
          display: "none",
        }}
        className="admin-sidebar-desktop"
      >
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 45,
          }}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: "256px",
          zIndex: 50,
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
        }}
      >
        <SidebarContent />
      </aside>

      {/* Main content area */}
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
        className="admin-main-area"
      >
        {/* Topbar */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            height: "64px",
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px",
                borderRadius: "6px",
                color: "#1B3A6B",
                display: "flex",
                alignItems: "center",
              }}
              className="admin-hamburger"
            >
              <Menu size={20} />
            </button>
            <h1
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#1B3A6B",
                margin: 0,
              }}
            >
              {getPageTitle(pathname)}
            </h1>
          </div>

          {/* Right: user avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontSize: "13px",
                color: "#64748B",
                display: "none",
              }}
              className="admin-email-label"
            >
              {user.email}
            </span>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#1B3A6B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#C9A84C",
                }}
              >
                {getInitials(user.email)}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          style={{
            flex: 1,
            padding: "24px",
            backgroundColor: "#F1F5F9",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {children}
        </main>
      </div>

      {/* CSS to handle responsive layout */}
      <style>{`
        @media (min-width: 1024px) {
          .admin-sidebar-desktop {
            display: block !important;
          }
          .admin-main-area {
            margin-left: 256px;
          }
          .admin-hamburger {
            display: none !important;
          }
          .admin-email-label {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
