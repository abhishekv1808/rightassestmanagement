"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus, RefreshCw, ArrowRight, ExternalLink } from "lucide-react";
import type { TopFund } from "@/lib/api/mutualfunds";

const REFRESH_MS = 5 * 60 * 1000;

function Skeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-16 rounded-xl animate-pulse"
          style={{ backgroundColor: "#EEF2F8" }}
        />
      ))}
    </div>
  );
}

function ChangeBadge({ change, changePercent }: { change: number | null; changePercent: number | null }) {
  if (changePercent === null || change === null) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-gray-400">
        <Minus className="w-3 h-3" /> —
      </span>
    );
  }
  const positive = changePercent > 0;
  const negative = changePercent < 0;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold tabular-nums px-2 py-0.5 rounded-full"
      style={{
        backgroundColor: positive ? "#DCFCE7" : negative ? "#FEE2E2" : "#F3F4F6",
        color: positive ? "#15803D" : negative ? "#DC2626" : "#6B7280",
      }}
    >
      {positive ? <TrendingUp className="w-3 h-3" /> : negative ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
      {positive ? "+" : ""}{changePercent.toFixed(2)}%
    </span>
  );
}

export default function MutualFundTable() {
  const [funds, setFunds] = useState<TopFund[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchFunds(isManual = false) {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch("/api/mutual-funds", { cache: "no-store" });
      if (!res.ok) return;
      const data: TopFund[] = await res.json();
      if (Array.isArray(data)) {
        setFunds(data);
        setLastUpdated(new Date());
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchFunds();
    const id = setInterval(() => fetchFunds(), REFRESH_MS);
    return () => clearInterval(id);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

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
            style={{ backgroundColor: "rgba(201,168,76,0.2)" }}
          >
            <TrendingUp className="w-4 h-4" style={{ color: "#C9A84C" }} />
          </div>
          <div>
            <p className="font-heading font-bold text-white text-sm">
              Popular Mutual Funds — Live NAV
            </p>
            <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
              Sourced from AMFI via mfapi.in
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-[11px] hidden sm:block" style={{ color: "rgba(255,255,255,0.4)" }}>
              Updated {formatTime(lastUpdated)}
            </span>
          )}
          <button
            onClick={() => fetchFunds(true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C" }}
            aria-label="Refresh NAV data"
          >
            <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white">
        {loading ? (
          <div className="p-5">
            <Skeleton />
          </div>
        ) : funds.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-400">
              Could not load NAV data. Please check back shortly.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F9F8F5", borderBottom: "1px solid #E5E7EB" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Fund
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      NAV (₹)
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      1-Day Change
                    </th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      As of
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {funds.map((fund) => (
                    <tr
                      key={fund.schemeCode}
                      className="transition-colors hover:bg-blue-50/40 group"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-sm text-gray-800 leading-snug max-w-xs">
                          {fund.schemeName}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{fund.fundHouse}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="inline-flex text-[11px] font-medium px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: "#EEF2F8", color: "#1B3A6B" }}
                        >
                          {fund.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right font-bold tabular-nums text-gray-800">
                        {parseFloat(fund.latestNAV).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {fund.change !== null && (
                            <span className="text-xs tabular-nums text-gray-500">
                              {fund.change > 0 ? "+" : ""}{fund.change.toFixed(2)}
                            </span>
                          )}
                          <ChangeBadge change={fund.change} changePercent={fund.changePercent} />
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right text-xs text-gray-400 tabular-nums">
                        {fund.latestDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden divide-y divide-gray-100">
              {funds.map((fund) => (
                <div key={fund.schemeCode} className="px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-800 leading-snug">
                        {fund.schemeName}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{fund.fundHouse}</p>
                      <span
                        className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full mt-2"
                        style={{ backgroundColor: "#EEF2F8", color: "#1B3A6B" }}
                      >
                        {fund.category}
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold tabular-nums text-gray-800">
                        ₹{parseFloat(fund.latestNAV).toFixed(2)}
                      </p>
                      <div className="mt-1">
                        <ChangeBadge change={fund.change} changePercent={fund.changePercent} />
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1">{fund.latestDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Footer row */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderTop: "1px solid #E5E7EB", backgroundColor: "#FAFAFA" }}
        >
          <p className="text-[11px] text-gray-400">
            NAV data sourced from{" "}
            <a
              href="https://www.mfapi.in"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600 inline-flex items-center gap-0.5"
            >
              mfapi.in <ExternalLink className="w-2.5 h-2.5" />
            </a>
            {" · "}Past performance is not indicative of future returns.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-75 flex-shrink-0"
            style={{ color: "#1B3A6B" }}
          >
            Talk to an advisor <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
