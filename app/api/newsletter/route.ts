import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase server client ───────────────────────────────────────────────────
// Use service role key so the insert bypasses RLS for the newsletter table.

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment variables are not configured.");
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

// ─── Email regex ──────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: { email?: string };

  try {
    body = (await req.json()) as { email?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from("newsletter_subscribers").insert({
      email,
      subscribed_at: new Date().toISOString(),
      source: "blog",
    });

    if (error) {
      // Postgres unique-constraint violation code = 23505
      // Treat duplicate subscription as a quiet success
      if (error.code === "23505") {
        return NextResponse.json({ success: true, duplicate: true });
      }

      console.error("[newsletter] Supabase insert error:", error);
      return NextResponse.json(
        { error: "Could not save subscription. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[newsletter] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
