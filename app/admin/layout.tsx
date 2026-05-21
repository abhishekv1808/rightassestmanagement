import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = { title: "Admin — Right Asset Management" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

  // No user → must be on the login page (middleware ensures this).
  // Render children directly so the login page gets no sidebar.
  if (!user) {
    return <>{children}</>;
  }

  return (
    <AdminShell
      user={{ email: user.email }}
      leadCount={leadCount ?? 0}
      pendingCount={pendingCount ?? 0}
    >
      {children}
    </AdminShell>
  );
}
