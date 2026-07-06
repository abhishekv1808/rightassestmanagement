"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, Building2, Scale, ArrowRight, Clock } from "lucide-react";
import { allServices } from "@/lib/services-data";
import type { Service } from "@/lib/services-data";

// ─── Vertical config ──────────────────────────────────────────────────────────

const VERTICAL_META = {
  financial: {
    label: "Financial",
    color: "#1B3A6B",
    bg: "#EEF2F8",
    Icon: TrendingUp,
  },
  "real-estate": {
    label: "Real Estate",
    color: "#0D7E7E",
    bg: "#E6F4F4",
    Icon: Building2,
  },
  legal: {
    label: "Legal",
    color: "#6B46C1",
    bg: "#F0EBF9",
    Icon: Scale,
  },
};

// ─── Recent searches (localStorage) ──────────────────────────────────────────

const STORAGE_KEY = "ram_recent_searches";
const MAX_RECENT = 5;

function getRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveRecent(query: string) {
  const prev = getRecent().filter((q) => q !== query);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([query, ...prev].slice(0, MAX_RECENT)));
}

function clearRecent() {
  localStorage.removeItem(STORAGE_KEY);
}

// ─── Search logic ─────────────────────────────────────────────────────────────

function search(query: string): Service[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allServices.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.vertical.toLowerCase().includes(q) ||
      s.slug.toLowerCase().includes(q)
  );
}

function serviceHref(s: Service): string {
  return `/${s.vertical}/${s.slug}`;
}

// ─── Highlight matched text ───────────────────────────────────────────────────

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase().trim());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200/70 text-inherit rounded-sm px-0.5">{text.slice(idx, idx + query.trim().length)}</mark>
      {text.slice(idx + query.trim().length)}
    </>
  );
}

// ─── Result item ──────────────────────────────────────────────────────────────

function ResultItem({
  service,
  query,
  active,
  onSelect,
}: {
  service: Service;
  query: string;
  active: boolean;
  onSelect: () => void;
}) {
  const meta = VERTICAL_META[service.vertical];
  const Icon = meta.Icon;
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (active) ref.current?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <button
      ref={ref}
      onClick={onSelect}
      className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
      style={{ backgroundColor: active ? "#F9F8F5" : "transparent" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#F9F8F5"; }}
      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: meta.bg }}
      >
        <Icon className="w-4 h-4" style={{ color: meta.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 leading-snug">
          <Highlight text={service.title} query={query} />
        </p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{service.tagline}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: meta.bg, color: meta.color }}
        >
          {meta.label}
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
      </div>
    </button>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Service[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [recent, setRecent] = useState<string[]>([]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setActiveIdx(-1);
      setRecent(getRecent());
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  // Live search
  useEffect(() => {
    const r = search(query);
    setResults(r);
    setActiveIdx(-1);
  }, [query]);

  const navigate = useCallback((s: Service) => {
    if (query.trim()) saveRecent(query.trim());
    onClose();
    router.push(serviceHref(s));
  }, [query, onClose, router]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      navigate(results[activeIdx]);
    }
  };

  const handleRecentClick = (q: string) => {
    setQuery(q);
    inputRef.current?.focus();
  };

  const handleClearRecent = () => {
    clearRecent();
    setRecent([]);
  };

  const showRecent = !query && recent.length > 0;
  const showEmpty = query.trim().length > 0 && results.length === 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="search-modal"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 z-[61] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 rounded-2xl overflow-hidden shadow-2xl"
            style={{ top: "80px", border: "1px solid #E5E7EB" }}
          >
            {/* Search input row */}
            <div
              className="flex items-center gap-3 px-4 py-4 bg-white"
              style={{ borderBottom: "1px solid #F3F4F6" }}
            >
              <Search className="w-5 h-5 flex-shrink-0 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Search services — mutual funds, property registration, cyber crime..."
                className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-full transition-colors hover:bg-gray-100 flex-shrink-0"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
              <kbd
                className="hidden sm:inline-flex items-center px-2 py-1 text-[10px] font-semibold rounded border flex-shrink-0"
                style={{ backgroundColor: "#F9F8F5", borderColor: "#E5E7EB", color: "#94A3B8" }}
              >
                ESC
              </kbd>
            </div>

            {/* Body */}
            <div className="bg-white max-h-[60vh] overflow-y-auto">

              {/* Recent searches */}
              {showRecent && (
                <div>
                  <div className="flex items-center justify-between px-4 pt-3 pb-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                      Recent Searches
                    </p>
                    <button
                      onClick={handleClearRecent}
                      className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  {recent.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleRecentClick(q)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <Clock className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{q}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* No query — quick suggestions */}
              {!query && !showRecent && (
                <div className="px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-2">
                    Popular Services
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Mutual Funds", "Health Insurance", "Home Loans", "Property Registration", "Cyber Crime", "Tax Planning"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:border-gray-400 hover:text-gray-700"
                        style={{ borderColor: "#E5E7EB", color: "#64748B" }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {results.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                    {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
                  </p>
                  <div className="divide-y divide-gray-50">
                    {results.map((s, i) => (
                      <ResultItem
                        key={s.slug}
                        service={s}
                        query={query}
                        active={i === activeIdx}
                        onSelect={() => navigate(s)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {showEmpty && (
                <div className="px-4 py-10 text-center">
                  <p className="text-sm font-semibold text-gray-500 mb-1">No results for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-gray-400">Try searching for &ldquo;insurance&rdquo;, &ldquo;property&rdquo;, &ldquo;loan&rdquo; or &ldquo;legal&rdquo;</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="bg-white px-4 py-2.5 flex items-center justify-between gap-4"
              style={{ borderTop: "1px solid #F3F4F6" }}
            >
              <div className="flex items-center gap-4 text-[11px] text-gray-400">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 text-[10px] rounded border" style={{ borderColor: "#E5E7EB" }}>↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 text-[10px] rounded border" style={{ borderColor: "#E5E7EB" }}>↵</kbd>
                  select
                </span>
              </div>
              <p className="text-[11px] text-gray-400">48+ services across Finance, Real Estate &amp; Legal</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
