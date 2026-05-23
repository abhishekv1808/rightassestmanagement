"use client";

import Link from "next/link";
import {
  Users, TrendingUp, CheckCircle, Star,
  ArrowRight, Eye, FileText, PhoneCall,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Legend, Label,
} from "recharts";

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_CFG: Record<string, { bg: string; color: string; dot: string; label: string }> = {
  new:       { bg: "#EFF6FF", color: "#1D4ED8", dot: "#3B82F6", label: "New" },
  contacted: { bg: "#FFFBEB", color: "#B45309", dot: "#F59E0B", label: "Contacted" },
  converted: { bg: "#ECFDF5", color: "#065F46", dot: "#10B981", label: "Converted" },
  closed:    { bg: "#F9FAFB", color: "#374151", dot: "#9CA3AF", label: "Closed" },
};

function StatusBadge({ status }: { status: string }) {
  const c = STATUS_CFG[status] ?? STATUS_CFG.new;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "4px 10px", borderRadius: "20px",
      fontSize: "11px", fontWeight: "600",
      backgroundColor: c.bg, color: c.color,
    }}>
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: c.dot, flexShrink: 0 }} />
      {c.label}
    </span>
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
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          padding: "22px 22px 20px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 14px rgba(0,0,0,0.04)",
          borderTop: `3px solid ${accent}`,
          transition: "box-shadow 0.2s, transform 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06), 0 4px 14px rgba(0,0,0,0.04)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "12px",
            backgroundColor: `${accent}18`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={20} color={accent} />
          </div>
          <ArrowRight size={14} color="#CBD5E1" />
        </div>
        <p style={{ fontSize: "34px", fontWeight: "800", color: "#1B3A6B", margin: "0 0 5px 0", lineHeight: 1 }}>
          {value.toLocaleString()}
        </p>
        <p style={{ fontSize: "13px", fontWeight: "600", color: "#374151", margin: "0 0 3px 0" }}>{title}</p>
        <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{subtitle}</p>
      </div>
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
    <Link
      href={href}
      style={{
        display: "flex", alignItems: "center", gap: "14px",
        padding: "16px 18px", borderRadius: "14px",
        backgroundColor: "#FFFFFF", textDecoration: "none",
        border: "1px solid #E2E8F0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        flex: 1, minWidth: "180px",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = accent;
        el.style.boxShadow = `0 4px 16px ${accent}22`;
        el.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "#E2E8F0";
        el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)";
        el.style.transform = "translateY(0)";
      }}
    >
      <div style={{
        width: "38px", height: "38px", borderRadius: "10px",
        backgroundColor: `${accent}15`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={18} color={accent} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: "13px", fontWeight: "700", color: "#1B3A6B", margin: "0 0 2px 0" }}>{label}</p>
        <p style={{ fontSize: "11px", color: "#94A3B8", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{desc}</p>
      </div>
      <ArrowRight size={14} color="#CBD5E1" style={{ flexShrink: 0 }} />
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
    <div>

      {/* ── Welcome banner ──────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
        borderRadius: "18px",
        padding: "24px 28px",
        marginBottom: "20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "16px", flexWrap: "wrap",
        boxShadow: "0 4px 24px rgba(27,58,107,0.2)",
      }}>
        <div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", margin: "0 0 6px 0", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase" }}>
            {todayStr}
          </p>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#FFFFFF", margin: "0 0 6px 0" }}>
            {getGreeting()}{userName ? `, ${userName}` : ""}! 👋
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: 0 }}>
            {newLeads > 0
              ? <><span style={{ color: "#93C5FD", fontWeight: "700" }}>{newLeads} new lead{newLeads !== 1 ? "s" : ""}</span> awaiting contact{pendingTestimonials > 0 ? ` · ${pendingTestimonials} testimonial${pendingTestimonials !== 1 ? "s" : ""} pending` : "."}</>
              : "All leads are up to date. Great work!"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <Link href="/admin/leads" style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "10px 18px", borderRadius: "10px",
            backgroundColor: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#FFFFFF", fontSize: "13px", fontWeight: "600", textDecoration: "none",
          }}>
            <Eye size={14} /> View Leads
          </Link>
          <Link href="/admin/leads" style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "10px 18px", borderRadius: "10px",
            backgroundColor: "#C9A84C",
            color: "#1B3A6B", fontSize: "13px", fontWeight: "700", textDecoration: "none",
          }}>
            <PhoneCall size={14} /> Call Queue
          </Link>
        </div>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "20px" }} className="dash-stats">
        {statCards.map((c) => <StatCard key={c.title} {...c} />)}
      </div>

      {/* ── Charts ──────────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px", marginBottom: "20px" }} className="dash-charts">

        {/* Bar chart — leads this week */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)" }} className="dash-bar">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px", gap: "12px" }}>
            <div>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1B3A6B", margin: "0 0 3px 0" }}>Leads This Week</h3>
              <p style={{ fontSize: "12px", color: "#94A3B8", margin: 0 }}>Daily submissions · last 7 days</p>
            </div>
            <span style={{ fontSize: "11px", fontWeight: "700", backgroundColor: "rgba(201,168,76,0.12)", color: "#B8913A", padding: "4px 11px", borderRadius: "20px", flexShrink: 0 }}>
              Today highlighted
            </span>
          </div>
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
        </div>

        {/* Pie chart — leads by status */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)" }} className="dash-pie">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px", gap: "12px" }}>
            <div>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1B3A6B", margin: "0 0 3px 0" }}>Leads by Status</h3>
              <p style={{ fontSize: "12px", color: "#94A3B8", margin: 0 }}>Pipeline breakdown</p>
            </div>
            {conversionRate > 0 && (
              <span style={{ fontSize: "11px", fontWeight: "700", backgroundColor: "#ECFDF5", color: "#065F46", padding: "4px 11px", borderRadius: "20px", flexShrink: 0 }}>
                {conversionRate}% converted
              </span>
            )}
          </div>
          {totalStatusCount === 0 ? (
            <div style={{ height: "200px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <Users size={36} color="#E2E8F0" />
              <p style={{ color: "#94A3B8", fontSize: "13px", margin: 0 }}>No leads yet</p>
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
        </div>
      </div>

      {/* ── Quick Actions ────────────────────────────────────────────────── */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontSize: "11px", fontWeight: "700", color: "#94A3B8", letterSpacing: "1px", textTransform: "uppercase", margin: "0 0 12px 2px" }}>
          Quick Actions
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <QuickAction label="All Leads" desc={`${totalLeads} total · ${newLeads} new`} icon={Users} href="/admin/leads" accent="#1B3A6B" />
          <QuickAction label="Approve Testimonials" desc={`${pendingTestimonials} pending approval`} icon={Star} href="/admin/testimonials" accent="#F59E0B" />
          <QuickAction label="Write Blog Post" desc="Create new article" icon={FileText} href="/admin/blog" accent="#8B5CF6" />
        </div>
      </div>

      {/* ── Recent leads ─────────────────────────────────────────────────── */}
      <div style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px 16px",
          borderBottom: "1px solid #F1F5F9",
        }}>
          <div>
            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1B3A6B", margin: "0 0 3px 0" }}>Recent Leads</h3>
            <p style={{ fontSize: "12px", color: "#94A3B8", margin: 0 }}>
              Latest {Math.min(recentLeads.length, 8)} submissions
            </p>
          </div>
          <Link href="/admin/leads" style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            fontSize: "13px", color: "#C9A84C", fontWeight: "600", textDecoration: "none",
          }}>
            View all <ArrowRight size={13} />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <Users size={40} color="#E2E8F0" style={{ margin: "0 auto 12px" }} />
            <p style={{ color: "#94A3B8", fontSize: "14px", margin: "0 0 4px 0" }}>No leads yet</p>
            <p style={{ color: "#CBD5E1", fontSize: "12px", margin: 0 }}>Leads submitted through the website will appear here.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#F8FAFC" }}>
                  {["Lead", "Phone", "Service Interested", "Status", "Date"].map((h) => (
                    <th key={h} style={{
                      textAlign: "left", padding: "10px 20px",
                      fontSize: "11px", fontWeight: "700", color: "#94A3B8",
                      letterSpacing: "0.8px", textTransform: "uppercase", whiteSpace: "nowrap",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    style={{ borderTop: "1px solid #F8FAFC", transition: "background 0.1s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F8FAFC"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "transparent"; }}
                  >
                    {/* Name with avatar */}
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                        <div style={{
                          width: "34px", height: "34px", borderRadius: "50%",
                          background: "linear-gradient(135deg, #1B3A6B, #2D5299)",
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                          <span style={{ fontSize: "11px", fontWeight: "700", color: "#C9A84C" }}>
                            {getInitials(lead.full_name)}
                          </span>
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#1A1A1A" }}>
                          {lead.full_name}
                        </span>
                      </div>
                    </td>
                    {/* Phone */}
                    <td style={{ padding: "14px 20px" }}>
                      <a href={`tel:${lead.phone}`} style={{
                        fontSize: "13px", color: "#64748B", textDecoration: "none",
                        fontFamily: "monospace", letterSpacing: "0.3px",
                      }}>
                        {lead.phone}
                      </a>
                    </td>
                    {/* Service */}
                    <td style={{ padding: "14px 20px", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "13px", color: "#64748B" }}>
                        {lead.service_interested ?? <span style={{ color: "#CBD5E1" }}>—</span>}
                      </span>
                    </td>
                    {/* Status */}
                    <td style={{ padding: "14px 20px" }}>
                      <StatusBadge status={lead.status} />
                    </td>
                    {/* Date */}
                    <td style={{ padding: "14px 20px", color: "#94A3B8", fontSize: "12px", whiteSpace: "nowrap" }}>
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
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .dash-stats  { grid-template-columns: repeat(4, 1fr) !important; }
          .dash-charts { grid-template-columns: 3fr 2fr !important; }
        }
      `}</style>
    </div>
  );
}
