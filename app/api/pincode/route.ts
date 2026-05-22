import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: "Invalid pincode" }, { status: 400 });
  }

  try {
    const url =
      `https://nominatim.openstreetmap.org/search` +
      `?postalcode=${code}&country=India&format=json&addressdetails=1&limit=1`;

    const res = await fetch(url, {
      headers: { "User-Agent": "RightAssetManagement/1.0 (rightasset.in)" },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = await res.json();
    const place = data?.[0];

    if (!place?.address) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const addr = place.address;
    // Use city → town → village → county as fallback chain
    const city =
      addr.city ?? addr.town ?? addr.village ?? addr.county ?? "";
    const state = addr.state ?? "";

    if (!city || !state) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ city, state });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
