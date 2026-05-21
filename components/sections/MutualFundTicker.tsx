"use client";

import { useEffect, useRef, useState } from "react";
import type { TopFund } from "@/lib/api/mutualfunds";

const REFRESH_MS = 5 * 60 * 1000; // 5 minutes

function TickerItem({ fund }: { fund: TopFund }) {
  const isPositive = fund.changePercent !== null && fund.changePercent > 0;
  const isNegative = fund.changePercent !== null && fund.changePercent < 0;

  // Shorten fund name: take first 3 words
  const shortName = fund.schemeName
    .replace(/\b(fund|direct|growth|plan|regular|option)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 3)
    .join(" ");

  return (
    <span className="inline-flex items-center gap-3 px-5 select-none">
      <span className="text-xs font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.55)" }}>
        {fund.fundHouse.split(" ")[0].toUpperCase()}
      </span>

      <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
        {shortName}
      </span>

      <span className="text-xs font-bold tabular-nums" style={{ color: "#fff" }}>
        ₹{parseFloat(fund.latestNAV).toFixed(2)}
      </span>

      {fund.changePercent !== null && (
        <span
          className="text-xs font-semibold tabular-nums"
          style={{
            color: isPositive ? "#4ADE80" : isNegative ? "#F87171" : "rgba(255,255,255,0.5)",
          }}
        >
          {isPositive ? "▲" : isNegative ? "▼" : ""}
          {Math.abs(fund.changePercent).toFixed(2)}%
        </span>
      )}

      <span
        className="w-px h-3 flex-shrink-0"
        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
        aria-hidden="true"
      />
    </span>
  );
}

export default function MutualFundTicker() {
  const [funds, setFunds] = useState<TopFund[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function fetchFunds() {
    try {
      const res = await fetch("/api/mutual-funds", { cache: "no-store" });
      if (!res.ok) return;
      const data: TopFund[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setFunds(data);
        setLoading(false);
      }
    } catch {
      // silently ignore — ticker should never break the page
    }
  }

  useEffect(() => {
    fetchFunds();
    intervalRef.current = setInterval(fetchFunds, REFRESH_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Don't render the ticker bar at all while loading or if no data
  if (loading || funds.length === 0) return null;

  // Duplicate items to create seamless infinite scroll
  const items = [...funds, ...funds, ...funds];

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        backgroundColor: "#0D2347",
        borderBottom: "1px solid rgba(201,168,76,0.2)",
        height: "36px",
      }}
      aria-label="Live mutual fund NAV ticker"
    >
      <div className="flex items-center h-full">
        {/* Left label */}
        <div
          className="flex items-center gap-2 px-3 flex-shrink-0 h-full z-10"
          style={{
            backgroundColor: "#1B3A6B",
            borderRight: "1px solid rgba(201,168,76,0.25)",
            minWidth: "90px",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
            style={{ backgroundColor: "#4ADE80" }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{ color: "#C9A84C" }}
          >
            LIVE
          </span>
        </div>

        {/* Scrolling content */}
        <div className="flex-1 overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)" }}>
          <div className="ticker-scroll flex items-center whitespace-nowrap">
            {items.map((fund, i) => (
              <TickerItem key={`${fund.schemeCode}-${i}`} fund={fund} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
