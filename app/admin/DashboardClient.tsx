"use client";

import Link from "next/link";
import {
  Users, TrendingUp, CheckCircle, Star,
  ArrowRight, ArrowUpRight, Eye, FileText, PhoneCall,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Legend, Label,
} from "recharts";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";

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
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: c.dot }}
      />
      {c.label}
    </Badge>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  const p = name.trim().split(" ");
  return p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
}

function getGreeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

// ─── Stat card ────────────────────────────────────────────────────────────────

type StatCardProps = {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  accent: string;
  href: string;
};

function StatCard({ title, value, subtitle, icon: Icon, accent, href }: StatCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="relative overflow-hidden transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
        {/* Accent top strip */}
        <span
          className="absolute inset-x-0 top-0 h-1"
          style={{ backgroundColor: accent }}
        />
        <CardContent className="p-5">
          <div className="mb-4 flex items-start justify-between">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${accent}15` }}
            >
              <Icon size={20} color={accent} />
            </div>
            <ArrowUpRight
              size={16}
              className="text-slate-300 transition-colors group-hover:text-slate-500"
            />
          </div>
          <p className="mb-1 text-[32px] font-extrabold leading-none text-[#1B3A6B]">
            {value.toLocaleString()}
          </p>
          <p className="text-[13px] font-semibold text-slate-700">{title}</p>
          <p className="mt-0.5 text-[11px] text-slate-400">{subtitle}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

// ─── Quick action card ────────────────────────────────────────────────────────

function QuickAction({
  label, desc, icon: Icon, href, accent,
}: {
  label: string; desc: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  href: string; accent: string;
}) {
  return (
    <Link href={href} className="group block flex-1 min-w-[180px]">
      <Card className="transition-all duration-150 group-hover:-translate-y-0.5 group-hover:border-slate-300 group-hover:shadow-md">
        <CardContent className="flex items-center gap-3.5 p-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${accent}15` }}
          >
            <Icon size={18} color={accent} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-[#1B3A6B]">{label}</p>
            <p className="truncate text-[11px] text-slate-400">{desc}</p>
          </div>
          <ArrowRight
            size={15}
            className="shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-slate-500"
          />
        </CardContent>
      </Card>
    </Link>
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
  convertedLeads: number;
  pendingTestimonials: number;
  weeklyChartData: { date: string; label: string; count: number }[];
  statusData: { name: string; value: number; color: string }[];
  recentLeads: RecentLead[];
  userEmail?: string;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function DashboardClient({
  totalLeads,
  newLeads,
  convertedLeads,
  pendingTestimonials,
  weeklyChartData,
  statusData,
  recentLeads,
  userEmail,
}: DashboardClientProps) {
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
  const totalStatusCount = statusData.reduce((s, d) => s + d.value, 0);
  const todayStr = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  const userName = userEmail ? userEmail.split("@")[0] : null;

  const statCards: StatCardProps[] = [
    { title: "Total Leads", value: totalLeads, subtitle: "All time", icon: Users, accent: "#1B3A6B", href: "/admin/leads" },
    { title: "New Leads", value: newLeads, subtitle: "Awaiting contact", icon: TrendingUp, accent: "#3B82F6", href: "/admin/leads" },
    { title: "Converted", value: convertedLeads, subtitle: "Successful deals", icon: CheckCircle, accent: "#10B981", href: "/admin/leads" },
    { title: "Pending Reviews", value: pendingTestimonials, subtitle: "Testimonials to approve", icon: Star, accent: "#F59E0B", href: "/admin/testimonials" },
  ];

  return (
    <div className="space-y-5">

      {/* ── Welcome banner ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B3A6B] to-[#0D2347] p-6 shadow-lg shadow-[#1B3A6B]/20 sm:p-7">
        {/* Decorative glow */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.16) 0%, transparent 70%)" }}
        />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/45">
              {todayStr}
            </p>
            <h2 className="mb-1.5 text-[22px] font-extrabold text-white">
              {getGreeting()}{userName ? `, ${userName}` : ""}! 👋
            </h2>
            <p className="text-[13px] text-white/60">
              {newLeads > 0 ? (
                <>
                  <span className="font-bold text-[#93C5FD]">
                    {newLeads} new lead{newLeads !== 1 ? "s" : ""}
                  </span>{" "}
                  awaiting contact
                  {pendingTestimonials > 0
                    ? ` · ${pendingTestimonials} testimonial${pendingTestimonials !== 1 ? "s" : ""} pending`
                    : "."}
                </>
              ) : (
                "All leads are up to date. Great work!"
              )}
            </p>
          </div>
          <div className="flex shrink-0 gap-2.5">
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/20"
            >
              <Eye size={15} /> View Leads
            </Link>
            <Link
              href="/admin/leads"
              className={buttonClasses({ variant: "gold", size: "default" })}
            >
              <PhoneCall size={15} /> Call Queue
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((c) => <StatCard key={c.title} {...c} />)}
      </div>

      {/* ── Charts ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">

        {/* Bar chart — leads this week */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
            <div>
              <CardTitle>Leads This Week</CardTitle>
              <CardDescription className="mt-1">Daily submissions · last 7 days</CardDescription>
            </div>
            <Badge variant="gold" className="shrink-0">Today highlighted</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={weeklyChartData} margin={{ top: 4, right: 0, left: -26, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", fontSize: "13px", padding: "8px 14px" }}
                  cursor={{ fill: "rgba(27,58,107,0.03)" }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Leads" fill="#1B3A6B" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie chart — leads by status */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
            <div>
              <CardTitle>Leads by Status</CardTitle>
              <CardDescription className="mt-1">Pipeline breakdown</CardDescription>
            </div>
            {conversionRate > 0 && (
              <Badge variant="success" className="shrink-0">{conversionRate}% converted</Badge>
            )}
          </CardHeader>
          <CardContent>
            {totalStatusCount === 0 ? (
              <div className="flex h-[200px] flex-col items-center justify-center gap-2.5">
                <Users size={36} color="#E2E8F0" />
                <p className="text-[13px] text-slate-400">No leads yet</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={210}>
                <PieChart>
                  <Pie
                    data={statusData.map(d => ({ ...d, fill: d.color }))}
                    cx="50%" cy="42%"
                    innerRadius={58} outerRadius={84}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    <Label
                      content={(props) => {
                        const vb = props.viewBox as { cx?: number; cy?: number };
                        const cx = vb?.cx ?? 0;
                        const cy = vb?.cy ?? 0;
                        return (
                          <g>
                            <text x={cx} y={cy - 7} textAnchor="middle" dominantBaseline="middle"
                              style={{ fontSize: "22px", fontWeight: "800", fill: "#1B3A6B" }}>
                              {totalStatusCount}
                            </text>
                            <text x={cx} y={cy + 12} textAnchor="middle" dominantBaseline="middle"
                              style={{ fontSize: "10px", fill: "#94A3B8", fontWeight: "700", letterSpacing: "1px" }}>
                              TOTAL
                            </text>
                          </g>
                        );
                      }}
                    />
                  </Pie>
                  <Legend
                    iconType="circle" iconSize={8}
                    formatter={(v) => <span style={{ fontSize: "12px", color: "#64748B" }}>{v}</span>}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", fontSize: "13px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Quick Actions ────────────────────────────────────────────────── */}
      <div>
        <p className="mb-3 ml-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Quick Actions
        </p>
        <div className="flex flex-wrap gap-3">
          <QuickAction label="All Leads" desc={`${totalLeads} total · ${newLeads} new`} icon={Users} href="/admin/leads" accent="#1B3A6B" />
          <QuickAction label="Approve Testimonials" desc={`${pendingTestimonials} pending approval`} icon={Star} href="/admin/testimonials" accent="#F59E0B" />
          <QuickAction label="Write Blog Post" desc="Create new article" icon={FileText} href="/admin/blog" accent="#8B5CF6" />
        </div>
      </div>

      {/* ── Recent leads ─────────────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:px-6">
          <div>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription className="mt-1">
              Latest {Math.min(recentLeads.length, 8)} submissions
            </CardDescription>
          </div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#C9A84C] transition-colors hover:text-[#a5842f]"
          >
            View all <ArrowRight size={13} />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <Users size={40} color="#E2E8F0" className="mx-auto mb-3" />
            <p className="text-sm text-slate-400">No leads yet</p>
            <p className="mt-1 text-xs text-slate-300">
              Leads submitted through the website will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/70">
                  {["Lead", "Phone", "Service Interested", "Status", "Date"].map((h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap px-5 py-2.5 text-left text-[11px] font-bold uppercase tracking-wide text-slate-400 sm:px-6"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t border-slate-50 transition-colors hover:bg-slate-50/70"
                  >
                    {/* Name with avatar */}
                    <td className="px-5 py-3.5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1B3A6B] to-[#2D5299]">
                          <span className="text-[11px] font-bold text-[#C9A84C]">
                            {getInitials(lead.full_name)}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          {lead.full_name}
                        </span>
                      </div>
                    </td>
                    {/* Phone */}
                    <td className="px-5 py-3.5 sm:px-6">
                      <a
                        href={`tel:${lead.phone}`}
                        className="font-mono text-[13px] tracking-tight text-slate-500 hover:text-[#1B3A6B]"
                      >
                        {lead.phone}
                      </a>
                    </td>
                    {/* Service */}
                    <td className="max-w-[200px] truncate px-5 py-3.5 sm:px-6">
                      <span className="text-[13px] text-slate-500">
                        {lead.service_interested ?? <span className="text-slate-300">—</span>}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-5 py-3.5 sm:px-6">
                      <StatusBadge status={lead.status} />
                    </td>
                    {/* Date */}
                    <td className="whitespace-nowrap px-5 py-3.5 text-xs text-slate-400 sm:px-6">
                      {new Date(lead.created_at).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
