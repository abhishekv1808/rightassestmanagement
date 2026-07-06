"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Minus, Clock, ArrowRight, RefreshCw, BarChart2, TrendingUp } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, YAxis } from "recharts";
import type { IndexData, StockData } from "@/lib/api/stocks";
import { isMarketOpen } from "@/lib/api/stocks";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number | null, dec = 2): string {
  if (n === null) return "—";
  return n.toLocaleString("en-IN", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function fmtTime(d: Date) {
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit",
    hour12: true, timeZone: "Asia/Kolkata",
  });
}

function changeColors(pct: number | null) {
  const pos = pct !== null && pct > 0;
  const neg = pct !== null && pct < 0;
  return {
    pos, neg,
    lineColor:   pos ? "#16A34A" : neg ? "#DC2626" : "#94A3B8",
    badgeBg:     pos ? "#F0FDF4" : neg ? "#FEF2F2" : "#F1F5F9",
    badgeText:   pos ? "#15803D" : neg ? "#B91C1C" : "#64748B",
    borderColor: pos ? "#16A34A" : neg ? "#DC2626" : "#CBD5E1",
  };
}

// ─── Index card ───────────────────────────────────────────────────────────────

function IndexCard({ d }: { d: IndexData }) {
  const { pos, neg, lineColor, badgeBg, badgeText, borderColor } = changeColors(d.changePercent);

  const spark = (d.history && d.history.length >= 2)
    ? d.history.map((v) => ({ v }))
    : [];

  return (
    <div
      className="relative bg-white p-5 rounded-2xl flex flex-col gap-2.5 transition-all duration-200 hover:shadow-md overflow-hidden"
      style={{
        border: "1px solid rgba(0,0,0,0.07)",
        borderLeft: `3px solid ${borderColor}`,
        boxShadow: "0 1px 8px rgba(27,58,107,0.06)",
      }}
    >
      {/* Name + change badge */}
      <div className="flex items-start justify-between gap-2">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.14em] leading-tight"
          style={{ color: "#1B3A6B" }}
        >
          {d.displayName}
        </p>
        <span
          className="inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: badgeBg, color: badgeText }}
        >
          {pos ? "▲" : neg ? "▼" : <Minus className="w-2.5 h-2.5" />}
          {d.changePercent !== null ? `${Math.abs(d.changePercent).toFixed(2)}%` : "—"}
        </span>
      </div>

      {/* Price */}
      <p
        className="font-heading font-bold tabular-nums leading-none text-[1.25rem] sm:text-[1.6rem]"
        style={{ color: "#1A1A1A" }}
      >
        {fmt(d.price)}
      </p>

      {/* Absolute change */}
      <p className="text-xs tabular-nums font-semibold" style={{ color: badgeText }}>
        {d.change !== null ? `${pos ? "+" : ""}${fmt(d.change)} today` : "—"}
      </p>

      {/* High / Low */}
      {(d.high || d.low) && (
        <div className="flex items-center gap-4 text-[11px]" style={{ color: "#94A3B8" }}>
          {d.high && (
            <span>
              H:{" "}
              <span className="font-medium tabular-nums" style={{ color: "#64748B" }}>
                {fmt(d.high)}
              </span>
            </span>
          )}
          {d.low && (
            <span>
              L:{" "}
              <span className="font-medium tabular-nums" style={{ color: "#64748B" }}>
                {fmt(d.low)}
              </span>
            </span>
          )}
        </div>
      )}

      {/* Sparkline */}
      {spark.length > 0 && (
        <div className="h-10 -mx-1 mt-auto pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={spark} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`ig-${d.symbol.replace("^", "")}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={lineColor} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={lineColor} stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <YAxis domain={["dataMin", "dataMax"]} hide />
              <Area
                type="monotone"
                dataKey="v"
                stroke={lineColor}
                strokeWidth={1.75}
                fill={`url(#ig-${d.symbol.replace("^", "")})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function IndexSkeleton() {
  return (
    <div
      className="bg-white p-5 rounded-2xl animate-pulse"
      style={{
        border: "1px solid rgba(0,0,0,0.07)",
        borderLeft: "3px solid #E2E8F0",
        boxShadow: "0 1px 8px rgba(27,58,107,0.04)",
      }}
    >
      <div className="h-2.5 w-20 rounded bg-slate-100 mb-4" />
      <div className="h-7 w-32 rounded bg-slate-100 mb-3" />
      <div className="h-2.5 w-16 rounded bg-slate-100 mb-4" />
      <div className="h-10 rounded bg-slate-50" />
    </div>
  );
}

// ─── Stock row ────────────────────────────────────────────────────────────────

function StockRow({ s }: { s: StockData }) {
  const { pos, badgeText } = changeColors(s.changePercent);
  return (
    <div
      className="flex items-center justify-between py-3 px-4 gap-3 hover:bg-slate-50/80 transition-colors duration-150 cursor-default"
      style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-none" style={{ color: "#1A1A1A" }}>
          {s.shortName}
        </p>
        <p className="text-[11px] mt-0.5 font-medium" style={{ color: "#94A3B8" }}>
          {s.symbol.replace(".NS", "")} · NSE
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold tabular-nums" style={{ color: "#1A1A1A" }}>
          ₹{fmt(s.price)}
        </p>
        <span
          className="text-[11px] font-semibold tabular-nums"
          style={{ color: badgeText }}
        >
          {s.changePercent !== null
            ? `${pos ? "+" : ""}${s.changePercent.toFixed(2)}%`
            : "—"}
        </span>
      </div>
    </div>
  );
}

function StockSkeleton() {
  return (
    <div
      className="flex items-center justify-between py-3 px-4 gap-3"
      style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
    >
      <div>
        <div className="h-3 w-24 rounded bg-slate-100 animate-pulse mb-1.5" />
        <div className="h-2 w-14 rounded bg-slate-100 animate-pulse" />
      </div>
      <div className="text-right">
        <div className="h-3 w-16 rounded bg-slate-100 animate-pulse mb-1.5" />
        <div className="h-2 w-10 rounded bg-slate-100 animate-pulse" />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MarketOverviewCard() {
  const [indices, setIndices]       = useState<IndexData[]>([]);
  const [stocks, setStocks]         = useState<StockData[]>([]);
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [open, setOpen]             = useState(isMarketOpen);

  const load = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    try {
      const [idxRes, stkRes] = await Promise.all([
        fetch("/api/stocks/indices", { cache: "no-store" }),
        fetch("/api/stocks/top",     { cache: "no-store" }),
      ]);
      const [idxData, stkData] = await Promise.all([
        idxRes.ok ? idxRes.json() : [],
        stkRes.ok ? stkRes.json() : [],
      ]);
      if (Array.isArray(idxData) && idxData.length > 0) setIndices(idxData);
      if (Array.isArray(stkData) && stkData.length > 0) setStocks(stkData);
      setLastUpdated(new Date());
    } catch {
      // silent — stale data stays on screen
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(() => {
      setOpen(isMarketOpen());
      load();
    }, 60_000);
    return () => clearInterval(id);
  }, [load]);

  const marketState = !loading && indices[0] ? indices[0].marketState : null;

  return (
    <div
      className="w-full rounded-3xl overflow-hidden"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(27,58,107,0.1)",
        boxShadow:
          "0 4px 48px rgba(27,58,107,0.09), 0 1px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div
        className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          background:
            "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-3.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "rgba(201,168,76,0.18)",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            <BarChart2 className="w-4 h-4" style={{ color: "#C9A84C" }} />
          </div>
          <div>
            <p className="font-heading font-bold text-white text-base leading-none mb-1.5">
              Indian Markets Overview
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${open ? "animate-pulse" : ""}`}
                style={{ backgroundColor: open ? "#4ADE80" : "#64748B" }}
              />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                style={{ color: open ? "#4ADE80" : "rgba(255,255,255,0.4)" }}
              >
                {open ? "Market Open" : "Market Closed"}
              </span>
              {marketState && (
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {marketState === "REGULAR" ? "Real-time" : "End of day"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {lastUpdated && (
            <p
              className="text-[11px] hidden sm:block"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              Updated {fmtTime(lastUpdated)}
            </p>
          )}
          <button
            onClick={() => load(true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-90 disabled:opacity-40"
            style={{
              backgroundColor: "rgba(201,168,76,0.18)",
              color: "#C9A84C",
              border: "1px solid rgba(201,168,76,0.28)",
            }}
          >
            <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <div className="hidden sm:flex items-center gap-1.5">
            {["NSE", "BSE"].map((ex) => (
              <span
                key={ex}
                className="text-[10px] font-bold px-2 py-0.5 rounded"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Thin gold accent line under header */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, #C9A84C 0%, rgba(201,168,76,0.3) 60%, transparent 100%)",
        }}
      />

      {/* ── Content grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3">

        {/* Left: 2×2 index cards */}
        <div
          className="lg:col-span-2 p-5 grid grid-cols-2 gap-3"
          style={{ backgroundColor: "#F8FAFC" }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <IndexSkeleton key={i} />)
            : indices.map((d) => <IndexCard key={d.symbol} d={d} />)}
        </div>

        {/* Right: top stocks + market info */}
        <div
          className="flex flex-col bg-white"
          style={{ borderLeft: "1px solid rgba(0,0,0,0.06)" }}
        >
          {/* Stocks header */}
          <div
            className="px-4 py-3.5 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" style={{ color: "#C9A84C" }} />
              <p
                className="text-[11px] font-bold uppercase tracking-[0.14em]"
                style={{ color: "#1B3A6B" }}
              >
                Top NSE Stocks
              </p>
            </div>
            <Link
              href="/financial/equity-commodity"
              className="text-[10px] font-semibold flex items-center gap-1 transition-opacity hover:opacity-60"
              style={{ color: "#C9A84C" }}
            >
              View all <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          </div>

          {/* Stock rows */}
          <div className="flex-1 divide-y divide-black/[0.04]">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <StockSkeleton key={i} />)
              : stocks.map((s) => <StockRow key={s.symbol} s={s} />)}
          </div>

          {/* Market timing */}
          <div
            className="px-4 py-4 space-y-2.5"
            style={{
              borderTop: "1px solid rgba(0,0,0,0.06)",
              backgroundColor: "#F8FAFC",
            }}
          >
            {[
              { label: "NSE/BSE Hours", value: "Mon–Fri, 9:15 AM – 3:30 PM IST" },
              { label: "Pre-open",      value: "9:00 – 9:15 AM IST" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: "#C9A84C" }}
                />
                <p className="text-[11px]" style={{ color: "#64748B" }}>
                  <span className="font-semibold" style={{ color: "#1B3A6B" }}>{label}:</span>{" "}
                  {value}
                </p>
              </div>
            ))}
            <div className="flex items-start gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: "#CBD5E1" }}
              />
              <p className="text-[11px]" style={{ color: "#94A3B8" }}>
                Data via Yahoo Finance · For reference only
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer strip ───────────────────────────────────────────────── */}
      <div
        className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{
          borderTop: "1px solid rgba(0,0,0,0.06)",
          backgroundColor: "#F8FAFC",
        }}
      >
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#94A3B8" }} />
          <p className="text-[11px]" style={{ color: "#94A3B8" }}>
            Investments are subject to market risk. Read all scheme documents carefully before investing.
          </p>
        </div>
        <Link
          href="/financial/equity-commodity"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold flex-shrink-0 transition-all duration-200 hover:brightness-105 hover:shadow-md active:scale-[0.98]"
          style={{ backgroundColor: "#C9A84C", color: "#1B3A6B" }}
        >
          Explore Equity Services
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
