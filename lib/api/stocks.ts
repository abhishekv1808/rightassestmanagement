// ─── Types ────────────────────────────────────────────────────────────────────

export type StockData = {
  symbol: string;
  shortName: string;
  price: number | null;
  change: number | null;
  changePercent: number | null;
  high: number | null;
  low: number | null;
  volume: number | null;
  currency: string;
  marketState: string; // "REGULAR" | "CLOSED" | "PRE" | "POST"
  history?: number[]; // last N daily closes, oldest first
};

export type IndexData = StockData & {
  displayName: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

export const INDEX_SYMBOLS = {
  NIFTY50: "^NSEI",
  SENSEX: "^BSESN",
  BANKNIFTY: "^NSEBANK",
  MIDCAP: "^NSMIDCP",
} as const;

export const INDEX_DISPLAY_NAMES: Record<string, string> = {
  "^NSEI": "NIFTY 50",
  "^BSESN": "SENSEX",
  "^NSEBANK": "BANK NIFTY",
  "^NSMIDCP": "NIFTY MIDCAP",
};

export const TOP_STOCK_SYMBOLS = [
  "RELIANCE.NS",
  "TCS.NS",
  "INFY.NS",
  "HDFCBANK.NS",
  "ICICIBANK.NS",
] as const;

export const STOCK_DISPLAY_NAMES: Record<string, string> = {
  "RELIANCE.NS": "Reliance Industries",
  "TCS.NS": "TCS",
  "INFY.NS": "Infosys",
  "HDFCBANK.NS": "HDFC Bank",
  "ICICIBANK.NS": "ICICI Bank",
};

// ─── Market hours helper ──────────────────────────────────────────────────────

export function isMarketOpen(): boolean {
  const now = new Date();
  // Convert to IST (UTC+5:30)
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = ist.getDay(); // 0=Sun, 6=Sat
  if (day === 0 || day === 6) return false;
  const h = ist.getHours();
  const m = ist.getMinutes();
  const mins = h * 60 + m;
  return mins >= 9 * 60 + 15 && mins < 15 * 60 + 30;
}

// ─── Client-side fetchers (call the Next.js proxy routes) ─────────────────────

export async function getIndexData(symbol: string): Promise<StockData | null> {
  try {
    const res = await fetch(`/api/stocks?symbol=${encodeURIComponent(symbol)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getAllIndices(): Promise<IndexData[]> {
  try {
    const res = await fetch("/api/stocks/indices", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getStockPrice(symbol: string): Promise<StockData | null> {
  return getIndexData(symbol);
}

export async function getTopStocks(): Promise<StockData[]> {
  try {
    const res = await fetch("/api/stocks/top", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
