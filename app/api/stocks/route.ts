import { NextRequest, NextResponse } from "next/server";
import type { StockData } from "@/lib/api/stocks";
import { isMarketOpen } from "@/lib/api/stocks";

// Force dynamic so we can set Cache-Control headers per-request
export const dynamic = "force-dynamic";

const YAHOO_BASE = "https://query1.finance.yahoo.com/v8/finance/chart";

const FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  "Origin": "https://finance.yahoo.com",
  "Referer": "https://finance.yahoo.com",
};

function cacheHeaders(): HeadersInit {
  const ttl = isMarketOpen() ? 60 : 3600;
  return {
    "Cache-Control": `s-maxage=${ttl}, stale-while-revalidate=${Math.floor(ttl / 2)}`,
  };
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const symbol = req.nextUrl.searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json({ error: "Missing symbol" }, { status: 400 });
  }

  try {
    const url = `${YAHOO_BASE}/${encodeURIComponent(symbol)}?interval=1d&range=5d`;
    const res = await fetch(url, { headers: FETCH_HEADERS, cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json(buildFallback(symbol), {
        status: 200,
        headers: cacheHeaders(),
      });
    }

    const json = await res.json();
    const result = json?.chart?.result?.[0];

    if (!result) {
      return NextResponse.json(buildFallback(symbol), {
        status: 200,
        headers: cacheHeaders(),
      });
    }

    const meta = result.meta;
    const price: number | null = meta.regularMarketPrice ?? meta.previousClose ?? null;
    const prevClose: number | null = meta.chartPreviousClose ?? meta.previousClose ?? null;
    const change = price !== null && prevClose !== null ? +(price - prevClose).toFixed(2) : null;
    const changePercent =
      change !== null && prevClose !== null && prevClose !== 0
        ? +((change / prevClose) * 100).toFixed(2)
        : null;

    const data: StockData = {
      symbol,
      shortName: meta.shortName ?? meta.symbol ?? symbol,
      price,
      change,
      changePercent,
      high: meta.regularMarketDayHigh ?? null,
      low: meta.regularMarketDayLow ?? null,
      volume: meta.regularMarketVolume ?? null,
      currency: meta.currency ?? "INR",
      marketState: meta.marketState ?? "CLOSED",
    };

    return NextResponse.json(data, { headers: cacheHeaders() });
  } catch {
    return NextResponse.json(buildFallback(symbol), {
      status: 200,
      headers: cacheHeaders(),
    });
  }
}

function buildFallback(symbol: string): StockData {
  return {
    symbol,
    shortName: symbol,
    price: null,
    change: null,
    changePercent: null,
    high: null,
    low: null,
    volume: null,
    currency: "INR",
    marketState: "CLOSED",
  };
}
