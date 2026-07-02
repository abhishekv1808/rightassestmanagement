"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Star,
  FileText,
  CalendarClock,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const LOGO_SRC = "/images/Right-assets-management-logo.svg";

interface AdminShellProps {
  children: ReactNode;
  user: { email: string };
  leadCount?: number;
  pendingCount?: number;
  consultationCount?: number;
}

interface NavItem {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
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
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return email.slice(0, 2).toUpperCase();
}

function getPageTitle(pathname: string): string {
  if (pathname === "/admin") return "Dashboard";
  if (pathname === "/admin/leads") return "Leads";
  if (pathname === "/admin/testimonials") return "Testimonials";
  if (pathname === "/admin/blog/new") return "New Post";
  if (pathname.startsWith("/admin/blog/") && pathname.endsWith("/edit"))
    return "Edit Post";
  if (pathname === "/admin/blog") return "Blog Posts";
  if (pathname === "/admin/consultations") return "Consultations";
  if (pathname === "/admin/settings") return "Settings";
  return "Admin";
}

export default function AdminShell({
  children,
  user,
  leadCount = 0,
  pendingCount = 0,
  consultationCount = 0,
}: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navSections: NavSection[] = [
    {
      section: "Overview",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
        { label: "Analytics", icon: BarChart3, href: "/admin" },
      ],
    },
    {
      section: "Management",
      items: [
        {
          label: "Leads",
          icon: Users,
          href: "/admin/leads",
          badge: leadCount || undefined,
        },
        {
          label: "Consultations",
          icon: CalendarClock,
          href: "/admin/consultations",
          badge: consultationCount || undefined,
        },
        {
          label: "Testimonials",
          icon: Star,
          href: "/admin/testimonials",
          badge: pendingCount || undefined,
        },
        { label: "Blog Posts", icon: FileText, href: "/admin/blog" },
      ],
    },
    {
      section: "Settings",
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
    <div className="flex h-full w-64 flex-col overflow-hidden border-r border-slate-200 bg-white">
      {/* Logo area */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
        <Image
          src={LOGO_SRC}
          alt="Right Assets Management"
          width={190}
          height={46}
          priority
          unoptimized
          className="h-8 w-auto"
        />
        <button
          onClick={() => setMobileOpen(false)}
          className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navSections.map((section) => (
          <div key={section.section} className="mb-6">
            <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
              {section.section}
            </p>
            {section.items.map((item) => {
              const isActive = pathname === item.href && !item.external;
              const Icon = item.icon;
              const linkProps = item.external
                ? { target: "_blank", rel: "noopener noreferrer" as const }
                : {};

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  {...linkProps}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "group mb-0.5 flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13.5px] transition-colors",
                    isActive
                      ? "bg-[#C9A84C] font-semibold text-[#1B3A6B] shadow-sm shadow-[#C9A84C]/30"
                      : "font-medium text-slate-600 hover:bg-slate-100 hover:text-[#1B3A6B]",
                  ].join(" ")}
                >
                  <Icon
                    size={17}
                    className={
                      isActive
                        ? "text-[#1B3A6B]"
                        : "text-slate-400 group-hover:text-[#1B3A6B]"
                    }
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="min-w-[18px] rounded-full bg-[#1B3A6B] px-1.5 text-center text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                  {item.external && (
                    <ExternalLink
                      size={11}
                      className={isActive ? "text-[#1B3A6B]/60" : "text-slate-300"}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom: user + sign out */}
      <div className="border-t border-slate-100 p-3">
        <div className="mb-2 flex items-center gap-2.5 px-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1B3A6B]">
            <span className="text-[11px] font-bold text-[#C9A84C]">
              {getInitials(user.email)}
            </span>
          </div>
          <span className="flex-1 truncate text-[12px] text-slate-500">
            {user.email}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[45] bg-black/50 lg:hidden"
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className="fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-out lg:hidden"
        style={{
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <SidebarContent />
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur sm:px-6">
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center rounded-md p-1.5 text-[#1B3A6B] hover:bg-slate-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-[17px] font-bold leading-tight text-[#1B3A6B]">
                {getPageTitle(pathname)}
              </h1>
              <p className="hidden text-[11px] text-slate-400 sm:block">
                Right Assets Management · Admin
              </p>
            </div>
          </div>

          {/* Right: user */}
          <div className="flex items-center gap-3">
            <span className="hidden text-[13px] text-slate-500 md:block">
              {user.email}
            </span>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1B3A6B] ring-2 ring-[#C9A84C]/30">
              <span className="text-[12px] font-bold text-[#C9A84C]">
                {getInitials(user.email)}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)] flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
