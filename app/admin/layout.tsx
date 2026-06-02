import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = { title: "Admin — Right Assets Management" };

const ADMIN_EMAIL =
  (process.env.ADMIN_EMAIL ?? "admin@rightasset.in").toLowerCase();

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only the designated admin email gets the admin shell.
  // Any other session (including Google client logins) is treated as
  // unauthenticated here — the login page renders without a sidebar.
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;

  if (!isAdmin) {
    return <>{children}</>;
  }

  const [{ count: leadCount }, { count: pendingCount }] = await Promise.all([
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("testimonials")
      .select("*", { count: "exact", head: true })
      .eq("approved", false),
  ]);

  return (
    <AdminShell
      user={{ email: user.email ?? "" }}
      leadCount={leadCount ?? 0}
      pendingCount={pendingCount ?? 0}
    >
      {children}
    </AdminShell>
  );
}
