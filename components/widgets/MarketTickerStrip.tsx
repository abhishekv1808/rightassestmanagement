"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { IndexData } from "@/lib/api/stocks";
import { isMarketOpen, INDEX_DISPLAY_NAMES } from "@/lib/api/stocks";

const MARKET_OPEN_REFRESH_MS = 3 * 60 * 1000;  // 3 min during hours
const MARKET_CLOSED_REFRESH_MS = 15 * 60 * 1000; // 15 min when closed

function fmt(n: number | null, decimals = 2): string {
  if (n === null) return "—";
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function IndexItem({ d }: { d: IndexData }) {
  const pos = d.changePercent !== null && d.changePercent > 0;
  const neg = d.changePercent !== null && d.changePercent < 0;

  return (
    <span className="inline-flex items-center gap-2.5 px-5 select-none whitespace-nowrap">
      {/* Index name */}
      <span className="text-[11px] font-bold tracking-wider" style={{ color: "#C9A84C" }}>
        {d.displayName ?? INDEX_DISPLAY_NAMES[d.symbol] ?? d.symbol}
      </span>

      {/* Price */}
      <span className="text-[12px] font-semibold tabular-nums text-white">
        {fmt(d.price, d.price && d.price > 10000 ? 2 : 2)}
      </span>

      {/* Change */}
      <span
        className="text-[11px] font-semibold tabular-nums"
        style={{ color: pos ? "#4ADE80" : neg ? "#F87171" : "rgba(255,255,255,0.45)" }}
      >
        {pos ? "▲" : neg ? "▼" : ""}
        {d.change !== null ? fmt(Math.abs(d.change)) : "—"}
        {" "}
        ({d.changePercent !== null ? `${pos ? "+" : neg ? "-" : ""}${Math.abs(d.changePercent).toFixed(2)}%` : "—"})
      </span>

      {/* Divider */}
      <span
        className="w-px h-3 flex-shrink-0"
        style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        aria-hidden
      />
    </span>
  );
}

export default function MarketTickerStrip() {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetch_ = useCallback(async () => {
    try {
      const res = await fetch("/api/stocks/indices", { cache: "no-store" });
      if (!res.ok) return;
      const data: IndexData[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setIndices(data);
        setReady(true);
      }
    } catch {
      // never crash the page
    }
  }, []);

  useEffect(() => {
    const isOpen = isMarketOpen();
    setOpen(isOpen);
    fetch_();

    function schedule() {
      const delay = isMarketOpen() ? MARKET_OPEN_REFRESH_MS : MARKET_CLOSED_REFRESH_MS;
      timerRef.current = setTimeout(() => {
        setOpen(isMarketOpen());
        fetch_();
        schedule();
      }, delay);
    }
    schedule();

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [fetch_]);

  if (!ready || indices.length === 0) return null;

  // Triple-duplicate for seamless loop
  const items = [...indices, ...indices, ...indices];

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        backgroundColor: "#0D1F3C",
        borderBottom: "1px solid rgba(201,168,76,0.18)",
        height: "34px",
      }}
      aria-label="Indian stock market indices ticker"
    >
      <div className="flex items-center h-full">
        {/* Left badge */}
        <div
          className="flex items-center gap-2 px-3 h-full flex-shrink-0"
          style={{
            backgroundColor: "#1B3A6B",
            borderRight: "1px solid rgba(201,168,76,0.22)",
            minWidth: "96px",
          }}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${open ? "animate-pulse" : ""}`}
            style={{ backgroundColor: open ? "#4ADE80" : "#94A3B8" }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{ color: open ? "#C9A84C" : "rgba(255,255,255,0.4)" }}
          >
            {open ? "LIVE" : "CLOSED"}
          </span>
        </div>

        {/* Scrolling strip */}
        <div
          className="flex-1 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 50px, black calc(100% - 50px), transparent)",
          }}
        >
          <div className="market-ticker-scroll flex items-center">
            {items.map((d, i) => (
              <IndexItem key={`${d.symbol}-${i}`} d={d} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
