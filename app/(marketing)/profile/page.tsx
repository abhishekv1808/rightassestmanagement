import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/auth/ProfileForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | Right Assets Management",
  robots: { index: false, follow: false },
};

const ADMIN_EMAIL = (
  process.env.ADMIN_EMAIL ?? "admin@rightasset.in"
).toLowerCase();

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Not logged in → send to sign in
  if (!user) redirect("/signin");

  // Admin account → belongs in the admin portal, not the client profile page
  if (user.email?.toLowerCase() === ADMIN_EMAIL) redirect("/admin");

  // Fetch profile — upsert to ensure a row always exists
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, phone, email, avatar_url, area, service_interests, created_at")
    .eq("id", user.id)
    .single();

  // If no profile row yet (edge case before trigger runs), create one now
  if (!profile) {
    await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name ?? null,
      avatar_url: user.user_metadata?.avatar_url ?? null,
    });
  }

  const resolvedProfile = profile ?? {
    id: user.id,
    full_name: user.user_metadata?.full_name ?? null,
    phone: null,
    email: user.email ?? null,
    avatar_url: user.user_metadata?.avatar_url ?? null,
    area: null,
    service_interests: [],
    created_at: new Date().toISOString(),
  };

  return <ProfileForm profile={resolvedProfile} />;
}
