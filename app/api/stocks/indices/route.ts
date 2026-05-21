import { NextResponse } from "next/server";
import { INDEX_SYMBOLS, INDEX_DISPLAY_NAMES, isMarketOpen } from "@/lib/api/stocks";
import type { IndexData } from "@/lib/api/stocks";

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

async function fetchIndex(symbol: string): Promise<IndexData | null> {
  try {
    const url = `${YAHOO_BASE}/${encodeURIComponent(symbol)}?interval=1d&range=10d`;
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

    // Extract real daily closes — filter out nulls, take last 7 valid points
    const rawCloses: (number | null)[] =
      result.indicators?.quote?.[0]?.close ?? [];
    const history = rawCloses
      .filter((v): v is number => v !== null && isFinite(v))
      .slice(-7);

    // Append current live price as the final point if market is open
    if (price !== null && meta.marketState === "REGULAR") {
      history.push(price);
    }

    return {
      symbol,
      displayName: INDEX_DISPLAY_NAMES[symbol] ?? symbol,
      shortName: meta.shortName ?? INDEX_DISPLAY_NAMES[symbol] ?? symbol,
      price,
      change,
      changePercent,
      high: meta.regularMarketDayHigh ?? null,
      low: meta.regularMarketDayLow ?? null,
      volume: meta.regularMarketVolume ?? null,
      currency: meta.currency ?? "INR",
      marketState: meta.marketState ?? "CLOSED",
      history,
    };
  } catch {
    return null;
  }
}

export async function GET(): Promise<NextResponse> {
  const symbols = Object.values(INDEX_SYMBOLS);

  const results = await Promise.allSettled(symbols.map(fetchIndex));

  const indices: IndexData[] = results
    .map((r, i) => {
      if (r.status === "fulfilled" && r.value) return r.value;
      // Return a null-data fallback so the UI can still render
      const sym = symbols[i];
      return {
        symbol: sym,
        displayName: INDEX_DISPLAY_NAMES[sym] ?? sym,
        shortName: INDEX_DISPLAY_NAMES[sym] ?? sym,
        price: null,
        change: null,
        changePercent: null,
        high: null,
        low: null,
        volume: null,
        currency: "INR",
        marketState: "CLOSED",
        history: [],
      } satisfies IndexData;
    });

  return NextResponse.json(indices, { headers: cacheHeaders() });
}
