"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Detects an OAuth `code` query parameter (from Supabase PKCE flow) landing on
 * the wrong page (e.g. the homepage) and redirects to `/auth/callback` so the
 * code can be properly exchanged for a session.
 *
 * Supabase's PKCE OAuth flow sometimes redirects the authorization code to the
 * Site URL configured in the Supabase dashboard rather than to the `redirectTo`
 * URL specified in the client. This component catches that scenario.
 *
 * Drop this into the root layout so it runs on every page load.
 */
export default function AuthCodeHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");

    // Only act if there is a `code` param AND we are NOT already on the
    // /auth/callback route (to avoid infinite redirect loops).
    if (code && !window.location.pathname.startsWith("/auth/callback")) {
      // Build the callback URL preserving all query params
      const callbackUrl = new URL("/auth/callback", window.location.origin);
      searchParams.forEach((value, key) => {
        callbackUrl.searchParams.set(key, value);
      });

      // Use router.replace so the broken URL doesn't stay in history
      router.replace(callbackUrl.pathname + callbackUrl.search);
    }
  }, [searchParams, router]);

  return null;
}
