"use client";

import { useEffect, useState, useCallback } from "react";
import { TrendingUp, TrendingDown, Minus, RefreshCw, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { StockData } from "@/lib/api/stocks";
import { isMarketOpen } from "@/lib/api/stocks";

function fmt(n: number | null): string {
  if (n === null) return "—";
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtVol(n: number | null): string {
  if (n === null) return "—";
  if (n >= 10_000_000) return `${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000) return `${(n / 100_000).toFixed(2)} L`;
  return n.toLocaleString("en-IN");
}

function ChangePill({ change, pct }: { change: number | null; pct: number | null }) {
  const pos = pct !== null && pct > 0;
  const neg = pct !== null && pct < 0;
  const Icon = pos ? TrendingUp : neg ? TrendingDown : Minus;

  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full tabular-nums"
      style={{
        backgroundColor: pos ? "#DCFCE7" : neg ? "#FEE2E2" : "#F3F4F6",
        color: pos ? "#15803D" : neg ? "#DC2626" : "#6B7280",
      }}
    >
      <Icon className="w-3 h-3" />
      {pct !== null ? `${pos ? "+" : ""}${pct.toFixed(2)}%` : "—"}
    </span>
  );
}

function SkeletonRow() {
  return (
    <tr>
      {[1, 2, 3, 4].map((i) => (
        <td key={i} className="px-4 py-3.5">
          <div className="h-3.5 rounded animate-pulse" style={{ backgroundColor: "#EEF2F8", width: i === 1 ? "80%" : "60%" }} />
        </td>
      ))}
    </tr>
  );
}

export default function TopStocksWidget() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [open] = useState(isMarketOpen);

  const load = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    try {
      const res = await fetch("/api/stocks/top", { cache: "no-store" });
      if (!res.ok) return;
      const data: StockData[] = await res.json();
      if (Array.isArray(data)) {
        setStocks(data);
        setLoading(false);
      }
    } catch {
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(() => load(), open ? 3 * 60 * 1000 : 15 * 60 * 1000);
    return () => clearInterval(id);
  }, [load, open]);

  return (
    <section
      className="rounded-2xl overflow-hidden"
      style={{ border: "1.5px solid #E5E7EB" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ backgroundColor: "#1B3A6B" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "rgba(201,168,76,0.18)" }}
          >
            <TrendingUp className="w-4 h-4" style={{ color: "#C9A84C" }} />
          </div>
          <div>
            <p className="font-heading font-bold text-white text-sm">Top NSE Stocks</p>
            <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>
              RELIANCE · TCS · INFY · HDFCBANK · ICICIBANK
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${open ? "animate-pulse" : ""}`}
              style={{ backgroundColor: open ? "#4ADE80" : "#94A3B8" }}
            />
            <span className="text-[10px] font-semibold" style={{ color: open ? "#4ADE80" : "rgba(255,255,255,0.35)" }}>
              {open ? "LIVE" : "CLOSED"}
            </span>
          </div>
          <button
            onClick={() => load(true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C" }}
          >
            <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#F9F8F5", borderBottom: "1px solid #E5E7EB" }}>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price (₹)</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Change (₹)</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Change %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              : stocks.map((s) => {
                  const pos = s.changePercent !== null && s.changePercent > 0;
                  const neg = s.changePercent !== null && s.changePercent < 0;
                  return (
                    <tr key={s.symbol} className="hover:bg-blue-50/40 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-semibold text-sm text-gray-800">{s.shortName}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{s.symbol.replace(".NS", "")} · NSE</p>
                      </td>
                      <td className="px-4 py-3.5 text-right font-bold tabular-nums text-gray-800">
                        {fmt(s.price)}
                      </td>
                      <td
                        className="px-4 py-3.5 text-right text-sm font-semibold tabular-nums"
                        style={{ color: pos ? "#15803D" : neg ? "#DC2626" : "#6B7280" }}
                      >
                        {s.change !== null ? `${pos ? "+" : ""}${fmt(s.change)}` : "—"}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <ChangePill change={s.change} pct={s.changePercent} />
                      </td>
                    </tr>
                  );
                })
            }
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden divide-y divide-gray-100 bg-white">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-4 py-3.5 flex items-center justify-between gap-3">
                <div className="h-3.5 w-32 rounded animate-pulse" style={{ backgroundColor: "#EEF2F8" }} />
                <div className="h-3.5 w-20 rounded animate-pulse" style={{ backgroundColor: "#EEF2F8" }} />
              </div>
            ))
          : stocks.map((s) => {
              const pos = s.changePercent !== null && s.changePercent > 0;
              const neg = s.changePercent !== null && s.changePercent < 0;
              return (
                <div key={s.symbol} className="px-4 py-3.5 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{s.shortName}</p>
                    <p className="text-xs text-gray-400">{s.symbol.replace(".NS", "")} · NSE</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold tabular-nums text-sm text-gray-800">₹{fmt(s.price)}</p>
                    <span
                      className="text-xs font-semibold tabular-nums"
                      style={{ color: pos ? "#15803D" : neg ? "#DC2626" : "#6B7280" }}
                    >
                      {s.changePercent !== null ? `${pos ? "+" : ""}${s.changePercent.toFixed(2)}%` : "—"}
                    </span>
                  </div>
                </div>
              );
            })
        }
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderTop: "1px solid #E5E7EB", backgroundColor: "#FAFAFA" }}
      >
        <p className="text-[11px] text-gray-400 flex items-center gap-1">
          Data via Yahoo Finance
          <ExternalLink className="w-2.5 h-2.5" />
          · For reference only. Not investment advice.
        </p>
        <Link
          href="/contact"
          className="text-xs font-semibold flex-shrink-0 transition-opacity hover:opacity-75"
          style={{ color: "#1B3A6B" }}
        >
          Talk to an advisor →
        </Link>
      </div>
    </section>
  );
}
