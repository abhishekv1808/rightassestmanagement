"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Phone,
  Search,
  TrendingUp,
  Building2,
  Scale,
} from "lucide-react";
import SearchModal from "@/components/layout/SearchModal";
import UserAuthButton from "@/components/auth/UserAuthButton";

// ─── Types ──────────────────────────────────────────────────────────────────

type NavLink = { label: string; href: string };
type NavGroup = { category: string; links: NavLink[] };
type NavVertical = {
  label: string;
  shortLabel: string;
  href: string;
  color: string;
  lightBg: string;
  Icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  description: string;
  groups: NavGroup[];
};

// ─── Menu data ───────────────────────────────────────────────────────────────

const VERTICALS: NavVertical[] = [
  {
    label: "Financial Services",
    shortLabel: "Financial",
    href: "/financial",
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
    Icon: TrendingUp,
    description: "23 services — investments, insurance, loans & more",
    groups: [
      {
        category: "Investments",
        links: [
          { label: "Equity & Commodity Market", href: "/financial/equity-commodity" },
          { label: "Mutual Funds", href: "/financial/mutual-funds" },
          { label: "Portfolio Management", href: "/financial/portfolio-management" },
          { label: "Government & Corporate Bonds", href: "/financial/bonds" },
          { label: "Alternate Investment Funds (AIF)", href: "/financial/aif" },
          { label: "Gold Investment (SGB, ETF)", href: "/financial/gold-investment" },
          { label: "Fixed Deposits", href: "/financial/fixed-deposits" },
        ],
      },
      {
        category: "Insurance & Loans",
        links: [
          { label: "Health Insurance", href: "/financial/health-insurance" },
          { label: "Life Insurance", href: "/financial/life-insurance" },
          { label: "Vehicle Insurance", href: "/financial/vehicle-insurance" },
          { label: "Travel & Marine Insurance", href: "/financial/travel-marine-insurance" },
          { label: "Home Loans", href: "/financial/home-loan" },
          { label: "Personal Loans", href: "/financial/personal-loan" },
          { label: "Vehicle Loans", href: "/financial/vehicle-loan" },
        ],
      },
      {
        category: "Schemes & Advisory",
        links: [
          { label: "National Pension Scheme", href: "/financial/nps" },
          { label: "Public Provident Fund (PPF)", href: "/financial/ppf" },
          { label: "Sukanya Samriddhi Yojana", href: "/financial/sukanya-samriddhi" },
          { label: "Atal Pension Yojana", href: "/financial/atal-pension" },
          { label: "Tax Planning & ITR Filing", href: "/financial/tax-planning" },
          { label: "Credit Score Improvement", href: "/financial/credit-score" },
          { label: "Credit Cards", href: "/financial/credit-card" },
          { label: "Comprehensive Financial Planning", href: "/financial/financial-planning" },
        ],
      },
    ],
  },
  {
    label: "Realty",
    shortLabel: "Realty",
    href: "/real-estate",
    color: "#0D7E7E",
    lightBg: "#E6F4F4",
    Icon: Building2,
    description: "17 services — buy, sell, documents & legal",
    groups: [
      {
        category: "Buying & Selling",
        links: [
          { label: "Buy & Sell Properties", href: "/real-estate/buy-sell" },
          { label: "Sale Deed & Agreement to Sell", href: "/real-estate/sale-deed" },
          { label: "Property Valuation", href: "/real-estate/property-valuation" },
          { label: "Property Registration", href: "/real-estate/property-registration" },
          { label: "Loan Against Property", href: "/real-estate/home-loan-property" },
          { label: "Joint Development Agreement", href: "/real-estate/joint-development" },
        ],
      },
      {
        category: "Documents & Records",
        links: [
          { label: "Khata Certificate Application", href: "/real-estate/khata-certificate" },
          { label: "Encumbrance Certificate (EC)", href: "/real-estate/encumbrance" },
          { label: "RTC / Pahani Records", href: "/real-estate/rtc-pahani" },
          { label: "Property Mutation", href: "/real-estate/mutation" },
          { label: "Vamshavruksha", href: "/real-estate/vamshavruksha" },
          { label: "Property Tax Services", href: "/real-estate/property-tax" },
        ],
      },
      {
        category: "Legal & Agreements",
        links: [
          { label: "Rent Agreement", href: "/real-estate/rent-agreement" },
          { label: "NOC for Property", href: "/real-estate/noc" },
          { label: "Power of Attorney", href: "/real-estate/power-of-attorney" },
          { label: "Land Conversion", href: "/real-estate/land-conversion" },
          { label: "Building Plan Approval", href: "/real-estate/building-plan" },
        ],
      },
    ],
  },
  {
    label: "Legal Services",
    shortLabel: "Legal",
    href: "/legal",
    color: "#6B46C1",
    lightBg: "#F0EBF9",
    Icon: Scale,
    description: "11 services — deeds, property, civil, family & financial",
    groups: [
      {
        category: "Property & Criminal",
        links: [
          { label: "Property Disputes (Civil)", href: "/legal/property-disputes" },
          { label: "Criminal Case Advisory", href: "/legal/criminal-advisory" },
          { label: "Cyber Crime Cases", href: "/legal/cyber-crime" },
          { label: "Consumer Dispute Cases", href: "/legal/consumer-cases" },
        ],
      },
      {
        category: "Personal & Financial",
        links: [
          { label: "Family Case Support", href: "/legal/family-cases" },
          { label: "Labour Case Help", href: "/legal/labour-cases" },
          { label: "Insurance Claim Cases", href: "/legal/insurance-claims" },
          { label: "Banking & Financial Cases", href: "/legal/banking-cases" },
        ],
      },
      {
        category: "Property Deeds & Estate",
        links: [
          { label: "Partition Deed", href: "/legal/partition-deed" },
          { label: "Will Drafting & Registration", href: "/legal/will" },
          { label: "Release Deed", href: "/legal/release-deed" },
        ],
      },
    ],
  },
];

// Secondary links shown on desktop (Success Stories kept in mobile only)
const DESKTOP_SECONDARY: NavLink[] = [
  { label: "Tools", href: "/tools" },
  { label: "Free Guides", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// All secondary links for mobile drawer
const ALL_SECONDARY: NavLink[] = [
  { label: "Tools", href: "/tools" },
  { label: "Free Guides", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Contact", href: "/contact" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
        setSearchOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 180);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Fixed Navbar Bar ─────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300${scrolled ? " shadow-lg" : ""}`}
        style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E7EAF0" }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-5">

            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center group"
              aria-label="Right Assets Management — Home"
            >
              <Image
                src="/images/Right-assets-management-logo.svg"
                alt="Right Assets Management"
                width={220}
                height={53}
                priority
                className="h-9 lg:h-11 w-auto transition-transform group-hover:scale-[1.03]"
              />
            </Link>

            {/* ── Desktop Navigation ──────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {VERTICALS.map((v) => (
                <div
                  key={v.label}
                  onMouseEnter={() => openMenu(v.label)}
                  onMouseLeave={scheduleClose}
                  className="relative"
                >
                  <button
                    className="relative flex items-center gap-1 px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap group/navbtn"
                    style={{
                      color:
                        isActive(v.href) || activeMenu === v.label
                          ? "#1B3A6B"
                          : "#475569",
                    }}
                  >
                    {v.shortLabel}
                    <ChevronDown
                      className="w-3.5 h-3.5 transition-transform duration-200"
                      style={{
                        transform: activeMenu === v.label ? "rotate(180deg)" : "rotate(0deg)",
                        opacity: 0.7,
                      }}
                    />
                    {/* Active underline */}
                    {isActive(v.href) && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                        style={{ backgroundColor: "#C9A84C" }}
                      />
                    )}
                  </button>
                </div>
              ))}

              {/* Divider */}
              <div className="w-px h-4 mx-2 flex-shrink-0" style={{ backgroundColor: "#E2E8F0" }} />

              {DESKTOP_SECONDARY.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
                  style={{
                    color: isActive(link.href) ? "#1B3A6B" : "#475569",
                  }}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{ backgroundColor: "#C9A84C" }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* ── Desktop Right Actions ────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">

              {/* Visible search bar */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-full text-sm transition-all duration-200"
                style={{
                  backgroundColor: "#F1F5F9",
                  border: "1px solid #E2E8F0",
                  color: "#64748B",
                  minWidth: "192px",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "#E9EEF5";
                  el.style.borderColor = "#CBD5E1";
                  el.style.color = "#334155";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "#F1F5F9";
                  el.style.borderColor = "#E2E8F0";
                  el.style.color = "#64748B";
                }}
                aria-label="Search services (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="flex-1 text-left text-[13px]">Search services…</span>
                <kbd
                  className="text-[10px] font-mono leading-none px-1.5 py-0.5 rounded flex-shrink-0"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    color: "#94A3B8",
                  }}
                >
                  ⌘K
                </kbd>
              </button>

              {/* Divider */}
              <div className="w-px h-5 flex-shrink-0" style={{ backgroundColor: "#E2E8F0" }} />

              <a
                href="tel:+919742826804"
                className="flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap"
                style={{ color: "#475569" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1B3A6B"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#475569"; }}
              >
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span>+91 97428 26804</span>
              </a>

              <Link
                href="/book-consultation"
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
                style={{ backgroundColor: "#C9A84C", color: "#1B3A6B" }}
              >
                Consult
              </Link>

              <UserAuthButton />
            </div>

            {/* ── Mobile Hamburger ────────────────────────────────────────── */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-md transition-colors flex-shrink-0"
              style={{ color: "#1B3A6B" }}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen
                ? <X className="w-6 h-6" />
                : <Menu className="w-6 h-6" />
              }
            </button>
          </div>
        </div>


        {/* ── Desktop Mega Menu Panel ─────────────────────────────────────── */}
        <AnimatePresence>
          {activeMenu && (() => {
            const v = VERTICALS.find((x) => x.label === activeMenu);
            if (!v) return null;
            return (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                onMouseEnter={() => openMenu(v.label)}
                onMouseLeave={scheduleClose}
                className="absolute left-0 right-0 bg-white shadow-2xl border-t-[3px]"
                style={{ borderTopColor: v.color }}
              >
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
                  {/* Panel header */}
                  <div className="flex items-center justify-between mb-6 pb-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: v.lightBg }}
                      >
                        <v.Icon className="w-5 h-5" style={{ color: v.color }} />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-base" style={{ color: v.color }}>
                          {v.label}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{v.description}</p>
                      </div>
                    </div>
                    <Link
                      href={v.href}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                      style={{ backgroundColor: v.lightBg, color: v.color }}
                    >
                      View All Services
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Service columns */}
                  <div
                    className="grid gap-8"
                    style={{ gridTemplateColumns: `repeat(${v.groups.length}, 1fr)` }}
                  >
                    {v.groups.map((group) => (
                      <div key={group.category}>
                        <p
                          className="font-body font-semibold text-[11px] uppercase tracking-[0.15em] mb-3 pl-2.5"
                          style={{
                            color: v.color,
                            borderLeft: `2.5px solid ${v.color}`,
                          }}
                        >
                          {group.category}
                        </p>
                        <ul className="space-y-0.5">
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="group/link flex items-center justify-between gap-2 text-sm text-gray-600 rounded-lg px-2.5 py-1.5 transition-all duration-150 hover:text-gray-900"
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLElement).style.backgroundColor = v.lightBg;
                                  (e.currentTarget as HTMLElement).style.color = v.color;
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLElement).style.backgroundColor = "";
                                  (e.currentTarget as HTMLElement).style.color = "";
                                }}
                              >
                                <span>{link.label}</span>
                                <ChevronRight
                                  className="w-3 h-3 flex-shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity"
                                  style={{ color: v.color }}
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </nav>

      {/* ── Mobile Drawer ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 lg:hidden flex flex-col overflow-hidden"
            >
              {/* Drawer header — search bar + close */}
              <div
                className="flex items-center gap-2 px-3.5 py-3 flex-shrink-0"
                style={{ backgroundColor: "#1B3A6B" }}
              >
                <button
                  onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                  className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-left transition-colors"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                  aria-label="Search services"
                >
                  <Search className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">Search 48+ services…</span>
                </button>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg transition-colors flex-shrink-0"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer body */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-0.5">
                <Link
                  href="/"
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  Home
                </Link>

                {VERTICALS.map((v) => (
                  <div key={v.label}>
                    <button
                      onClick={() =>
                        setMobileAccordion(mobileAccordion === v.label ? null : v.label)
                      }
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <v.Icon className="w-4 h-4" style={{ color: v.color }} />
                        <span>{v.shortLabel}</span>
                      </div>
                      <ChevronDown
                        className="w-4 h-4 transition-transform duration-200"
                        style={{
                          color: v.color,
                          transform: mobileAccordion === v.label ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileAccordion === v.label && (
                        <motion.div
                          key="accordion"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pl-3 pt-1 pb-2">
                            <Link
                              href={v.href}
                              className="flex items-center gap-1.5 mx-1 px-3 py-2 rounded-lg text-sm font-semibold mb-2"
                              style={{ backgroundColor: v.lightBg, color: v.color }}
                            >
                              View All {v.shortLabel} Services
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                            {v.groups.map((group) => (
                              <div key={group.category} className="mb-3">
                                <p
                                  className="px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]"
                                  style={{ color: v.color }}
                                >
                                  {group.category}
                                </p>
                                {group.links.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                  >
                                    {link.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="border-t border-gray-100 pt-1 mt-1">
                  {ALL_SECONDARY.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Drawer CTA */}
              <div className="flex-shrink-0 p-4 border-t border-gray-100 space-y-3">
                <a
                  href="tel:+919742826804"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium border-2 transition-colors"
                  style={{ borderColor: "#1B3A6B", color: "#1B3A6B" }}
                >
                  <Phone className="w-4 h-4" />
                  Call +91 97428 26804
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95"
                  style={{ backgroundColor: "#C9A84C", color: "#1B3A6B" }}
                >
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer so page content clears the fixed navbar */}
      <div className="h-16 lg:h-20" aria-hidden="true" />

      {/* Search modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
