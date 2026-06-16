import { NextRequest, NextResponse } from "next/server";

// Server-side India Post proxy.
//   GET https://api.postalpincode.in/pincode/{code}  (free, no key)
//
// Response contract is BACKWARD-COMPATIBLE with the previous OSM version:
//   { city, state }            ← existing callers (LeadForm, PersonalLoanForm)
//   { district, localities }   ← additive (locality picker / richer routing)
// `city` is set to the district so the existing "City" fields keep filling.

type IndiaPostOffice = {
  Name?: string;
  District?: string;
  State?: string;
};

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: "Invalid pincode" }, { status: 400 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${code}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      next: { revalidate: 86400 }, // cache a day; pincodes don't move
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = await res.json();
    const first = Array.isArray(data) ? data[0] : null;
    const offices: IndiaPostOffice[] | undefined = first?.PostOffice;

    if (!first || first.Status !== "Success" || !Array.isArray(offices) || offices.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const district = offices[0].District ?? "";
    const state = offices[0].State ?? "";

    if (!district || !state) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const localities = Array.from(
      new Set(offices.map((o) => o.Name).filter((n): n is string => !!n))
    );

    return NextResponse.json({
      city: district, // closest "city" for existing forms (back-compat)
      state,
      district, // additive
      localities, // additive
    });
  } catch {
    // Timeout / network / parse — caller degrades gracefully (returns null).
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  } finally {
    clearTimeout(timer);
  }
}
