"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus, Clock, ArrowRight, RefreshCw } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, YAxis } from "recharts";
import type { IndexData, StockData } from "@/lib/api/stocks";
import { isMarketOpen } from "@/lib/api/stocks";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number | null, dec = 2): string {
  if (n === null) return "—";
  return n.toLocaleString("en-IN", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function fmtTime(d: Date) {
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
}

// ─── Index card ───────────────────────────────────────────────────────────────

function IndexCard({ d }: { d: IndexData }) {
  const pos = d.changePercent !== null && d.changePercent > 0;
  const neg = d.changePercent !== null && d.changePercent < 0;
  const sparkColor = pos ? "#4ADE80" : neg ? "#F87171" : "#94A3B8";

  // Use real history from API; fall back to empty (no chart) if unavailable
  const spark = (d.history && d.history.length >= 2)
    ? d.history.map((v) => ({ v }))
    : [];

  return (
    <div
      className="relative p-5 rounded-2xl flex flex-col gap-3 transition-all duration-200 hover:scale-[1.01] overflow-hidden"
      style={{
        backgroundColor: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderLeft: `3px solid ${pos ? "#4ADE80" : neg ? "#F87171" : "#94A3B8"}`,
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "#C9A84C" }}>
          {d.displayName}
        </p>
        <span
          className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{
            backgroundColor: pos ? "rgba(74,222,128,0.15)" : neg ? "rgba(248,113,113,0.15)" : "rgba(148,163,184,0.12)",
            color: pos ? "#4ADE80" : neg ? "#F87171" : "#94A3B8",
          }}
        >
          {pos ? "▲" : neg ? "▼" : <Minus className="w-2.5 h-2.5" />}
          {d.changePercent !== null ? `${Math.abs(d.changePercent).toFixed(2)}%` : "—"}
        </span>
      </div>

      {/* Price */}
      <p className="font-heading font-bold tabular-nums leading-none" style={{ color: "#fff", fontSize: "1.5rem" }}>
        {fmt(d.price)}
      </p>

      {/* Abs change */}
      <p className="text-xs tabular-nums font-medium" style={{ color: pos ? "#4ADE80" : neg ? "#F87171" : "#94A3B8" }}>
        {d.change !== null ? `${pos ? "+" : ""}${fmt(d.change)} today` : "—"}
      </p>

      {/* H / L */}
      {(d.high || d.low) && (
        <div className="flex items-center gap-3 text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
          {d.high && <span>H: <span className="tabular-nums text-white/50">{fmt(d.high)}</span></span>}
          {d.low  && <span>L: <span className="tabular-nums text-white/50">{fmt(d.low)}</span></span>}
        </div>
      )}

      {/* Sparkline */}
      {spark.length > 0 && (
        <div className="h-9 -mx-1 mt-auto">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={spark} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`ig-${d.symbol.replace("^", "")}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sparkColor} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={sparkColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* Domain scoped to actual data range so variation is visible */}
              <YAxis domain={["dataMin", "dataMax"]} hide />
              <Area
                type="monotone"
                dataKey="v"
                stroke={sparkColor}
                strokeWidth={1.5}
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
      className="p-5 rounded-2xl animate-pulse"
      style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="h-2.5 w-20 rounded mb-4" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
      <div className="h-7 w-32 rounded mb-3" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
      <div className="h-2 w-16 rounded mb-4" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
      <div className="h-9 rounded" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
    </div>
  );
}

// ─── Stocks panel ─────────────────────────────────────────────────────────────

function StockRow({ s }: { s: StockData }) {
  const pos = s.changePercent !== null && s.changePercent > 0;
  const neg = s.changePercent !== null && s.changePercent < 0;
  return (
    <div
      className="flex items-center justify-between py-3 px-4 gap-3"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white leading-none">{s.shortName}</p>
        <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
          {s.symbol.replace(".NS", "")} · NSE
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold tabular-nums text-white">₹{fmt(s.price)}</p>
        <span
          className="text-[11px] font-semibold tabular-nums"
          style={{ color: pos ? "#4ADE80" : neg ? "#F87171" : "#94A3B8" }}
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
    <div className="flex items-center justify-between py-3 px-4 gap-3"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="h-3 w-24 rounded animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
      <div className="h-3 w-16 rounded animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MarketOverviewCard() {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [open, setOpen] = useState(isMarketOpen);

  const load = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    try {
      const [idxRes, stkRes] = await Promise.all([
        fetch("/api/stocks/indices", { cache: "no-store" }),
        fetch("/api/stocks/top", { cache: "no-store" }),
      ]);
      const [idxData, stkData] = await Promise.all([
        idxRes.ok ? idxRes.json() : [],
        stkRes.ok ? stkRes.json() : [],
      ]);
      if (Array.isArray(idxData) && idxData.length > 0) setIndices(idxData);
      if (Array.isArray(stkData) && stkData.length > 0) setStocks(stkData);
      setLastUpdated(new Date());
    } catch {
      // silent
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
    // Re-evaluate market state every tick so LIVE/CLOSED badge stays accurate
    const id = setInterval(() => {
      setOpen(isMarketOpen());
      load();
    }, 60 * 1000); // every 1 minute
    return () => clearInterval(id);
  }, [load]);

  const marketState = !loading && indices[0] ? indices[0].marketState : null;

  return (
    <div
      className="rounded-3xl overflow-hidden w-full"
      style={{
        background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 65%, #071428 100%)",
        border: "1px solid rgba(201,168,76,0.2)",
      }}
    >
      {/* ── Header ────────────────────────────────────────────────── */}
      <div
        className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.25)" }}
          >
            <TrendingUp className="w-5 h-5" style={{ color: "#C9A84C" }} />
          </div>
          <div>
            <div className="flex items-center gap-2.5 mb-0.5">
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${open ? "animate-pulse" : ""}`}
                style={{ backgroundColor: open ? "#4ADE80" : "#64748B" }}
              />
              <p className="text-[11px] font-bold uppercase tracking-[0.15em]"
                style={{ color: open ? "#4ADE80" : "rgba(255,255,255,0.4)" }}>
                {open ? "Market Open" : "Market Closed"}
              </p>
              {marketState && (
                <span className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}>
                  {marketState === "REGULAR" ? "Real-time" : "End of day"}
                </span>
              )}
            </div>
            <p className="font-heading font-bold text-white text-lg">Indian Markets Overview</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {lastUpdated && (
            <p className="text-[11px] hidden sm:block" style={{ color: "rgba(255,255,255,0.3)" }}>
              Updated {fmtTime(lastUpdated)}
            </p>
          )}
          <button
            onClick={() => load(true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C" }}
          >
            <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>NSE · BSE</span>
        </div>
      </div>

      {/* ── Main grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">

        {/* Left: 4 index cards */}
        <div className="lg:col-span-2 p-5 grid grid-cols-2 gap-3">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <IndexSkeleton key={i} />)
            : indices.map((d) => <IndexCard key={d.symbol} d={d} />)
          }
        </div>

        {/* Right: stocks + market info */}
        <div
          className="flex flex-col"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Stocks header */}
          <div className="px-4 py-3.5 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "#C9A84C" }}>
              Top NSE Stocks
            </p>
            <Link
              href="/financial/equity-commodity"
              className="text-[10px] font-semibold flex items-center gap-1 transition-opacity hover:opacity-70"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              View all <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          </div>

          {/* Stock rows */}
          <div className="flex-1">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <StockSkeleton key={i} />)
              : stocks.map((s) => <StockRow key={s.symbol} s={s} />)
            }
          </div>

          {/* Market timing info */}
          <div
            className="px-4 py-4 space-y-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "#C9A84C" }} />
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span className="text-white/60 font-medium">NSE/BSE Hours:</span> Mon–Fri, 9:15 AM – 3:30 PM IST
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "#C9A84C" }} />
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span className="text-white/60 font-medium">Pre-open:</span> 9:00–9:15 AM IST
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "#94A3B8" }} />
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                Data via Yahoo Finance · For reference only
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer strip ──────────────────────────────────────────── */}
      <div
        className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(0,0,0,0.2)" }}
      >
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
          <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
            Investments are subject to market risk. Read all scheme documents carefully before investing.
          </p>
        </div>
        <Link
          href="/financial/equity-commodity"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold flex-shrink-0 transition-all hover:opacity-90"
          style={{ backgroundColor: "#C9A84C", color: "#1B3A6B" }}
        >
          Explore Equity Services <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
