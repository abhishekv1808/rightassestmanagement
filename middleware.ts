import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// The only email address that is allowed to access the admin portal.
// Set ADMIN_EMAIL in your .env.local to override.
const ADMIN_EMAIL =
  (process.env.ADMIN_EMAIL ?? "admin@rightassetsmanagement.com").toLowerCase();

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  // A user is only an admin if their exact email matches ADMIN_EMAIL.
  // Google-authenticated client users must NEVER pass this check.
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;

  // Not admin (includes: no user, wrong email) and not already on the
  // login page → send to login.
  if (!isAdmin && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Admin user visiting the login page → no need, send to dashboard.
  if (isAdmin && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return supabaseResponse;
}

export const config = { matcher: ["/admin/:path*"] };
