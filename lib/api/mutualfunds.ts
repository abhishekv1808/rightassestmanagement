// ─── Types ────────────────────────────────────────────────────────────────────

export type NAVData = {
  date: string;  // "DD-MM-YYYY"
  nav: string;   // stringified float from API
};

export type FundMeta = {
  scheme_code: number;
  scheme_name: string;
  scheme_type: string;
  scheme_category: string;
  scheme_nav_name: string;
  fund_house: string;
};

export type Fund = {
  meta: FundMeta;
  data: NAVData[];  // chronological, newest first
  status: string;
};

export type TopFund = {
  schemeCode: number;
  schemeName: string;
  fundHouse: string;
  category: string;
  latestNAV: string;
  latestDate: string;
  previousNAV: string | null;
  change: number | null;       // absolute change
  changePercent: number | null; // percentage change
};

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE_URL = "https://api.mfapi.in/mf";

// Scheme codes for the 5 featured funds
export const FEATURED_SCHEME_CODES = [
  119598, // SBI Large Cap Fund - Direct Growth
  120503, // Axis ELSS Tax Saver Fund - Direct Growth
  118989, // HDFC Mid Cap Fund - Direct Growth
  120716, // UTI Nifty 50 Index Fund - Direct Growth
  119062, // HDFC Hybrid Equity Fund - Direct Growth
] as const;

// Next.js fetch cache: revalidate every 4 hours (NAV updates once per day after market close)
const FETCH_OPTIONS: RequestInit = {
  next: { revalidate: 14400 },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseNAV(nav: string): number | null {
  const parsed = parseFloat(nav);
  return isNaN(parsed) ? null : parsed;
}

function calcChange(
  latest: string,
  previous: string
): { change: number; changePercent: number } | null {
  const curr = parseNAV(latest);
  const prev = parseNAV(previous);
  if (curr === null || prev === null || prev === 0) return null;
  const change = parseFloat((curr - prev).toFixed(4));
  const changePercent = parseFloat((((curr - prev) / prev) * 100).toFixed(2));
  return { change, changePercent };
}

// ─── Core fetch ───────────────────────────────────────────────────────────────

async function fetchFund(schemeCode: number | string): Promise<Fund | null> {
  try {
    const res = await fetch(`${BASE_URL}/${schemeCode}`, FETCH_OPTIONS);
    if (!res.ok) return null;
    const json: Fund = await res.json();
    if (!json?.meta?.scheme_code || !Array.isArray(json?.data)) return null;
    return json;
  } catch {
    return null;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch top 5 popular fund schemes with latest NAV and day-over-day change.
 * Returns null entries for any scheme that fails to fetch.
 */
export async function getTopFunds(): Promise<TopFund[]> {
  const results = await Promise.allSettled(
    FEATURED_SCHEME_CODES.map((code) => fetchFund(code))
  );

  const funds: TopFund[] = [];

  for (const result of results) {
    if (result.status === "rejected" || result.value === null) continue;

    const fund = result.value;
    const latest = fund.data[0] ?? null;
    const previous = fund.data[1] ?? null;

    if (!latest) continue;

    const delta =
      previous ? calcChange(latest.nav, previous.nav) : null;

    funds.push({
      schemeCode: fund.meta.scheme_code,
      schemeName: fund.meta.scheme_name,
      fundHouse: fund.meta.fund_house,
      category: fund.meta.scheme_category,
      latestNAV: latest.nav,
      latestDate: latest.date,
      previousNAV: previous?.nav ?? null,
      change: delta?.change ?? null,
      changePercent: delta?.changePercent ?? null,
    });
  }

  return funds;
}

/**
 * Fetch the latest NAV entry for a specific scheme.
 * Returns null if the scheme code is invalid or the request fails.
 */
export async function getFundNAV(schemeCode: string): Promise<NAVData | null> {
  const fund = await fetchFund(schemeCode);
  if (!fund) return null;
  return fund.data[0] ?? null;
}

/**
 * Fetch the last 30 days of NAV history for a scheme.
 * Returns null if the scheme code is invalid or the request fails.
 * Data is returned newest-first (as supplied by the API).
 */
export async function getFundHistory(
  schemeCode: string
): Promise<NAVData[] | null> {
  const fund = await fetchFund(schemeCode);
  if (!fund) return null;
  return fund.data.slice(0, 30);
}

/**
 * Fetch full fund details (meta + all history) for a scheme.
 * Useful for individual fund detail pages.
 */
export async function getFundDetails(schemeCode: string): Promise<Fund | null> {
  return fetchFund(schemeCode);
}
