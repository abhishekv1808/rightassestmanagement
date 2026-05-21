import { NextResponse } from "next/server";
import { TOP_STOCK_SYMBOLS, STOCK_DISPLAY_NAMES, isMarketOpen } from "@/lib/api/stocks";
import type { StockData } from "@/lib/api/stocks";

export const dynamic = "force-dynamic";

const YAHOO_BASE = "https://query1.finance.yahoo.com/v8/finance/chart";

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  "Origin": "https://finance.yahoo.com",
  "Referer": "https://finance.yahoo.com",
};

function cacheHeaders(): HeadersInit {
  const ttl = isMarketOpen() ? 60 : 3600;
  return { "Cache-Control": `s-maxage=${ttl}, stale-while-revalidate=${Math.floor(ttl / 2)}` };
}

async function fetchStock(symbol: string): Promise<StockData | null> {
  try {
    const url = `${YAHOO_BASE}/${encodeURIComponent(symbol)}?interval=1d&range=5d`;
    const res = await fetch(url, { headers: HEADERS, cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    const result = json?.chart?.result?.[0];
    if (!result) return null;

    const meta = result.meta;
    const price: number | null = meta.regularMarketPrice ?? meta.previousClose ?? null;
    const prevClose: number | null = meta.chartPreviousClose ?? meta.previousClose ?? null;
    const change = price !== null && prevClose !== null ? +(price - prevClose).toFixed(2) : null;
    const changePercent =
      change !== null && prevClose !== null && prevClose !== 0
        ? +((change / prevClose) * 100).toFixed(2)
        : null;

    return {
      symbol,
      shortName: STOCK_DISPLAY_NAMES[symbol] ?? meta.shortName ?? symbol,
      price,
      change,
      changePercent,
      high: meta.regularMarketDayHigh ?? null,
      low: meta.regularMarketDayLow ?? null,
      volume: meta.regularMarketVolume ?? null,
      currency: meta.currency ?? "INR",
      marketState: meta.marketState ?? "CLOSED",
    };
  } catch {
    return null;
  }
}

export async function GET(): Promise<NextResponse> {
  const results = await Promise.allSettled(
    [...TOP_STOCK_SYMBOLS].map(fetchStock)
  );

  const stocks: StockData[] = results
    .map((r, i) => {
      if (r.status === "fulfilled" && r.value) return r.value;
      const sym = TOP_STOCK_SYMBOLS[i];
      return {
        symbol: sym,
        shortName: STOCK_DISPLAY_NAMES[sym] ?? sym,
        price: null,
        change: null,
        changePercent: null,
        high: null,
        low: null,
        volume: null,
        currency: "INR",
        marketState: "CLOSED",
      } satisfies StockData;
    });

  return NextResponse.json(stocks, { headers: cacheHeaders() });
}
