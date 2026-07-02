import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { data: leads },
    { count: totalLeads },
    { count: newLeads },
    { count: contactedLeads },
    { count: convertedLeads },
    { count: closedLeads },
    { count: pendingTestimonials },
  ] = await Promise.all([
    supabase
      .from("leads")
      .select("id, full_name, phone, service_interested, status, created_at")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "contacted"),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "converted"),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "closed"),
    supabase
      .from("testimonials")
      .select("*", { count: "exact", head: true })
      .eq("approved", false),
  ]);

  // Build last-7-days chart data
  const today = new Date();
  const last7Days: { date: string; label: string; count: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("en-IN", {
      weekday: "short",
    });
    last7Days.push({ date: dateStr, label, count: 0 });
  }

  // Fetch leads for last 7 days
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const { data: recentLeadsForChart } = await supabase
    .from("leads")
    .select("created_at")
    .gte("created_at", sevenDaysAgo.toISOString());

  if (recentLeadsForChart) {
    recentLeadsForChart.forEach((lead) => {
      const leadDate = lead.created_at.slice(0, 10);
      const dayEntry = last7Days.find((d) => d.date === leadDate);
      if (dayEntry) dayEntry.count += 1;
    });
  }

  const statusData = [
    { name: "New", value: newLeads ?? 0, color: "#3B82F6" },
    { name: "Contacted", value: contactedLeads ?? 0, color: "#F59E0B" },
    { name: "Converted", value: convertedLeads ?? 0, color: "#10B981" },
    { name: "Closed", value: closedLeads ?? 0, color: "#6B7280" },
  ];

  // ── Build last-6-months series (for the leads overview area chart) ─────────
  const MONTHS_BACK = 6;
  const firstOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthly: { key: string; label: string; count: number }[] = [];
  for (let i = MONTHS_BACK - 1; i >= 0; i--) {
    const d = new Date(firstOfThisMonth.getFullYear(), firstOfThisMonth.getMonth() - i, 1);
    monthly.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("en-IN", { month: "short" }),
      count: 0,
    });
  }

  const monthlyStart = new Date(
    firstOfThisMonth.getFullYear(),
    firstOfThisMonth.getMonth() - (MONTHS_BACK - 1),
    1
  );
  const { data: leadsForMonthly } = await supabase
    .from("leads")
    .select("created_at")
    .gte("created_at", monthlyStart.toISOString());

  leadsForMonthly?.forEach((lead) => {
    const key = lead.created_at.slice(0, 7);
    const bucket = monthly.find((m) => m.key === key);
    if (bucket) bucket.count += 1;
  });

  const thisMonthCount = monthly[monthly.length - 1]?.count ?? 0;
  const lastMonthCount = monthly[monthly.length - 2]?.count ?? 0;
  const leadsTrendPct =
    lastMonthCount > 0
      ? Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 100)
      : thisMonthCount > 0
      ? 100
      : 0;

  return (
    <DashboardClient
      totalLeads={totalLeads ?? 0}
      newLeads={newLeads ?? 0}
      contactedLeads={contactedLeads ?? 0}
      convertedLeads={convertedLeads ?? 0}
      pendingTestimonials={pendingTestimonials ?? 0}
      monthlyChartData={monthly.map(({ label, count }) => ({ label, count }))}
      leadsTrendPct={leadsTrendPct}
      statusData={statusData}
      recentLeads={leads ?? []}
    />
  );
}
