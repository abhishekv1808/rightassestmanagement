import { NextResponse } from "next/server";
import { getTopFunds } from "@/lib/api/mutualfunds";

export const revalidate = 14400; // 4 hours — NAV updates once per day

export async function GET() {
  try {
    const funds = await getTopFunds();
    return NextResponse.json(funds);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch mutual fund data" },
      { status: 500 }
    );
  }
}
