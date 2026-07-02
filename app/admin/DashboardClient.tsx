"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users, TrendingUp, CheckCircle, Star,
  MoreVertical, ArrowUpRight, ArrowDownRight, Calendar,
  Search, ArrowRight,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Label,
} from "recharts";
import { Badge } from "@/components/ui/badge";

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_CFG: Record<
  string,
  { variant: "info" | "warning" | "success" | "muted"; dot: string; label: string }
> = {
  new:       { variant: "info",    dot: "#3B82F6", label: "New" },
  contacted: { variant: "warning", dot: "#F59E0B", label: "Contacted" },
  converted: { variant: "success", dot: "#10B981", label: "Converted" },
  closed:    { variant: "muted",   dot: "#9CA3AF", label: "Closed" },
};

function StatusBadge({ status }: { status: string }) {
  const c = STATUS_CFG[status] ?? STATUS_CFG.new;
  return (
    <Badge variant={c.variant}>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: c.dot }} />
      {c.label}
    </Badge>
  );
}

function getInitials(name: string) {
  const p = name.trim().split(" ");
  return p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
}

// ─── Stat card ────────────────────────────────────────────────────────────────

type StatCardProps = {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  tintBg: string;
  tintFg: string;
  href: string;
  trend: React.ReactNode;
};

function StatCard({ label, value, icon: Icon, tintBg, tintFg, href, trend }: StatCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-3.5 flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: tintBg }}
        >
          <Icon size={19} color={tintFg} />
        </div>
        <MoreVertical size={16} className="text-slate-300 group-hover:text-slate-400" />
      </div>
      <p className="text-[13px] font-medium text-slate-500">{label}</p>
      <p className="mt-1 mb-2 text-[28px] font-extrabold leading-none text-[#1B3A6B]">
        {value.toLocaleString()}
      </p>
      {trend}
    </Link>
  );
}

function TrendUp({ pct, note }: { pct: number; note: string }) {
  const positive = pct >= 0;
  return (
    <p className="flex items-center gap-1 text-[12px]">
      <span
        className="inline-flex items-center gap-0.5 font-bold"
        style={{ color: positive ? "#16a34a" : "#dc2626" }}
      >
        {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
        {Math.abs(pct)}%
      </span>
      <span className="text-slate-400">{note}</span>
    </p>
  );
}

function TrendNote({ text, color = "#94A3B8" }: { text: string; color?: string }) {
  return <p className="text-[12px] font-medium" style={{ color }}>{text}</p>;
}

// ─── Chart callout tooltip (dark pill, like the reference) ─────────────────────

type TooltipEntry = { value: number };
function CalloutTooltip({
  active, payload, label,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-[#0F1A2E] px-3 py-2 text-center shadow-xl">
      <p className="text-[10px] font-medium text-white/55">{label}</p>
      <p className="text-[15px] font-bold text-white">
        {payload[0].value.toLocaleString()}
        <span className="ml-1 text-[10px] font-normal text-white/50">leads</span>
      </p>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type RecentLead = {
  id: string;
  full_name: string;
  phone: string;
  service_interested: string | null;
  status: string;
  created_at: string;
};

interface DashboardClientProps {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  convertedLeads: number;
  pendingTestimonials: number;
  monthlyChartData: { label: string; count: number }[];
  leadsTrendPct: number;
  statusData: { name: string; value: number; color: string }[];
  recentLeads: RecentLead[];
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function DashboardClient({
  totalLeads,
  newLeads,
  convertedLeads,
  pendingTestimonials,
  monthlyChartData,
  leadsTrendPct,
  statusData,
  recentLeads,
}: DashboardClientProps) {
  const [query, setQuery] = useState("");

  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
  const totalStatusCount = statusData.reduce((s, d) => s + d.value, 0);

  const rangeLabel =
    monthlyChartData.length > 0
      ? `${monthlyChartData[0].label} – ${monthlyChartData[monthlyChartData.length - 1].label} ${new Date().getFullYear()}`
      : "Last 6 months";

  const filteredLeads = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recentLeads;
    return recentLeads.filter(
      (l) =>
        l.full_name.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        (l.service_interested ?? "").toLowerCase().includes(q)
    );
  }, [query, recentLeads]);

  const statCards: StatCardProps[] = [
    {
      label: "Total Leads", value: totalLeads, icon: Users,
      tintBg: "#FBF3DF", tintFg: "#C9A84C", href: "/admin/leads",
      trend: <TrendUp pct={leadsTrendPct} note="From last month" />,
    },
    {
      label: "New Leads", value: newLeads, icon: TrendingUp,
      tintBg: "#E7F0FF", tintFg: "#2563EB", href: "/admin/leads",
      trend: <TrendNote text="Awaiting first contact" />,
    },
    {
      label: "Converted", value: convertedLeads, icon: CheckCircle,
      tintBg: "#E7F7EE", tintFg: "#059669", href: "/admin/leads",
      trend: <TrendNote text={`${conversionRate}% conversion rate`} color="#059669" />,
    },
    {
      label: "Pending Reviews", value: pendingTestimonials, icon: Star,
      tintBg: "#F1ECFB", tintFg: "#7C3AED", href: "/admin/testimonials",
      trend: <TrendNote text="Testimonials to approve" />,
    },
  ];

  return (
    <div className="space-y-5">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[22px] font-extrabold text-[#1B3A6B]">Dashboard</h2>
          <p className="text-[13px] text-slate-400">Here&apos;s your lead &amp; enquiry overview</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-600 shadow-sm">
          <Calendar size={15} className="text-[#C9A84C]" />
          {rangeLabel}
        </div>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((c) => <StatCard key={c.label} {...c} />)}
      </div>

      {/* ── Charts row ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        {/* Leads Overview — area chart */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] lg:col-span-2 sm:p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-[15px] font-bold text-[#1B3A6B]">Leads Overview</h3>
              <p className="text-xs text-slate-400">New enquiries · last 6 months</p>
            </div>
            <MoreVertical size={16} className="text-slate-300" />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyChartData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="leadsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#EEF2F6" vertical={false} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94A3B8" }} dy={6} />
              <YAxis
                axisLine={false} tickLine={false} allowDecimals={false}
                tick={{ fontSize: 12, fill: "#94A3B8" }}
                width={40}
                tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : `${v}`)}
              />
              <Tooltip content={<CalloutTooltip />} cursor={{ stroke: "#C9A84C", strokeWidth: 1, strokeDasharray: "4 4" }} />
              <Area
                type="monotone" dataKey="count" stroke="#C9A84C" strokeWidth={3}
                fill="url(#leadsFill)"
                dot={false}
                activeDot={{ r: 5, fill: "#C9A84C", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Leads by Status — donut */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-6">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="text-[15px] font-bold text-[#1B3A6B]">Leads by Status</h3>
              <p className="text-xs text-slate-400">Pipeline breakdown</p>
            </div>
            <MoreVertical size={16} className="text-slate-300" />
          </div>

          {totalStatusCount === 0 ? (
            <div className="flex h-[200px] flex-col items-center justify-center gap-2.5">
              <Users size={34} color="#E2E8F0" />
              <p className="text-[13px] text-slate-400">No leads yet</p>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={186}>
                <PieChart>
                  <Pie
                    data={statusData} dataKey="value"
                    cx="50%" cy="50%"
                    innerRadius={60} outerRadius={86}
                    paddingAngle={3} cornerRadius={6} stroke="none"
                  >
                    {statusData.map((d) => <Cell key={d.name} fill={d.color} />)}
                    <Label
                      content={({ viewBox }) => {
                        const vb = viewBox as { cx?: number; cy?: number };
                        const cx = vb?.cx ?? 0;
                        const cy = vb?.cy ?? 0;
                        return (
                          <g>
                            <text x={cx} y={cy - 6} textAnchor="middle" style={{ fontSize: 24, fontWeight: 800, fill: "#1B3A6B" }}>
                              {totalStatusCount}
                            </text>
                            <text x={cx} y={cy + 14} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, fill: "#94A3B8" }}>
                              TOTAL
                            </text>
                          </g>
                        );
                      }}
                    />
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", fontSize: 13 }} />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                {statusData.map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-[12px] text-slate-500">{d.name}</span>
                    <span className="ml-auto text-[12px] font-bold text-slate-700">{d.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Recent leads table ──────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:px-6">
          <div>
            <h3 className="text-[15px] font-bold text-[#1B3A6B]">Recent Leads</h3>
            <p className="text-xs text-slate-400">Latest enquiries from the website</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search leads…"
                className="w-52 rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-[13px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#1B3A6B] focus:bg-white"
              />
            </div>
            <Link
              href="/admin/leads"
              className="hidden items-center gap-1.5 text-[13px] font-semibold text-[#C9A84C] transition-colors hover:text-[#a5842f] sm:inline-flex"
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <Users size={38} color="#E2E8F0" className="mx-auto mb-3" />
            <p className="text-sm text-slate-400">
              {recentLeads.length === 0 ? "No leads yet" : "No leads match your search"}
            </p>
            {recentLeads.length === 0 && (
              <p className="mt-1 text-xs text-slate-300">Website enquiries will appear here.</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#FDF6EC]">
                  {["No", "Lead", "Service Interested", "Phone", "Status", "Date"].map((h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-[#9a7d2e] first:pl-6 sm:px-6"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, i) => (
                  <tr key={lead.id} className="border-t border-slate-50 transition-colors hover:bg-slate-50/70">
                    <td className="px-5 py-3.5 pl-6 text-[13px] font-medium text-slate-400">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="px-5 py-3.5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1B3A6B] to-[#2D5299]">
                          <span className="text-[11px] font-bold text-[#C9A84C]">{getInitials(lead.full_name)}</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{lead.full_name}</span>
                      </div>
                    </td>
                    <td className="max-w-[220px] truncate px-5 py-3.5 text-[13px] text-slate-500 sm:px-6">
                      {lead.service_interested ?? <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-5 py-3.5 sm:px-6">
                      <a href={`tel:${lead.phone}`} className="font-mono text-[13px] text-slate-500 hover:text-[#1B3A6B]">
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-5 py-3.5 sm:px-6"><StatusBadge status={lead.status} /></td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-xs text-slate-400 sm:px-6">
                      {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
