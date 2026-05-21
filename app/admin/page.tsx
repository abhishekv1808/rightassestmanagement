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

  return (
    <DashboardClient
      totalLeads={totalLeads ?? 0}
      newLeads={newLeads ?? 0}
      convertedLeads={convertedLeads ?? 0}
      pendingTestimonials={pendingTestimonials ?? 0}
      weeklyChartData={last7Days}
      statusData={statusData}
      recentLeads={leads ?? []}
    />
  );
}
