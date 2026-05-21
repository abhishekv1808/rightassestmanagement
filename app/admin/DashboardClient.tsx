"use client";

import Link from "next/link";
import {
  Users,
  TrendingUp,
  CheckCircle,
  Star,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type StatusBadgeProps = {
  status: string;
};

const STATUS_STYLES: Record<
  string,
  { bg: string; color: string; label: string }
> = {
  new: { bg: "#DBEAFE", color: "#1D4ED8", label: "New" },
  contacted: { bg: "#FEF3C7", color: "#D97706", label: "Contacted" },
  converted: { bg: "#D1FAE5", color: "#059669", label: "Converted" },
  closed: { bg: "#F3F4F6", color: "#6B7280", label: "Closed" },
};

function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.new;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: "600",
        backgroundColor: style.bg,
        color: style.color,
        letterSpacing: "0.2px",
      }}
    >
      {style.label}
    </span>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  iconBg: string;
  iconColor: string;
};

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
}: StatCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            backgroundColor: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={20} color={iconColor} />
        </div>
      </div>
      <p
        style={{
          fontSize: "32px",
          fontWeight: "800",
          color: "#1B3A6B",
          margin: "0 0 4px 0",
          lineHeight: 1,
        }}
      >
        {value.toLocaleString()}
      </p>
      <p
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          margin: "0 0 3px 0",
        }}
      >
        {title}
      </p>
      <p style={{ fontSize: "12px", color: "#9CA3AF", margin: 0 }}>
        {subtitle}
      </p>
    </div>
  );
}

type RecentLead = {
  id: string;
  full_name: string;
  phone: string;
  service_interested: string | null;
  status: string;
  created_at: string;
};

type WeeklyDataPoint = {
  date: string;
  label: string;
  count: number;
};

type StatusDataPoint = {
  name: string;
  value: number;
  color: string;
};

interface DashboardClientProps {
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  pendingTestimonials: number;
  weeklyChartData: WeeklyDataPoint[];
  statusData: StatusDataPoint[];
  recentLeads: RecentLead[];
}

export default function DashboardClient({
  totalLeads,
  newLeads,
  convertedLeads,
  pendingTestimonials,
  weeklyChartData,
  statusData,
  recentLeads,
}: DashboardClientProps) {
  const statCards = [
    {
      title: "Total Leads",
      value: totalLeads,
      subtitle: "All time",
      icon: Users,
      iconBg: "rgba(27,58,107,0.1)",
      iconColor: "#1B3A6B",
    },
    {
      title: "New Leads",
      value: newLeads,
      subtitle: "Awaiting contact",
      icon: TrendingUp,
      iconBg: "rgba(59,130,246,0.1)",
      iconColor: "#3B82F6",
    },
    {
      title: "Converted",
      value: convertedLeads,
      subtitle: "Closed deals",
      icon: CheckCircle,
      iconBg: "rgba(5,150,105,0.1)",
      iconColor: "#059669",
    },
    {
      title: "Pending Reviews",
      value: pendingTestimonials,
      subtitle: "Testimonials",
      icon: Star,
      iconBg: "rgba(217,119,6,0.1)",
      iconColor: "#D97706",
    },
  ];

  return (
    <div>
      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginBottom: "20px",
        }}
        className="dashboard-stats-grid"
      >
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      {/* Charts row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
        className="dashboard-charts-grid"
      >
        {/* Bar chart */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            padding: "24px",
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
          }}
          className="dashboard-bar-chart"
        >
          <h3
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#1B3A6B",
              margin: "0 0 20px 0",
            }}
          >
            Leads This Week
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={weeklyChartData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F1F5F9"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  fontSize: "13px",
                }}
                cursor={{ fill: "rgba(27,58,107,0.04)" }}
              />
              <Bar
                dataKey="count"
                fill="#1B3A6B"
                radius={[5, 5, 0, 0]}
                name="Leads"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            padding: "24px",
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
          }}
          className="dashboard-pie-chart"
        >
          <h3
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#1B3A6B",
              margin: "0 0 20px 0",
            }}
          >
            Leads by Status
          </h3>
          {statusData.every((d) => d.value === 0) ? (
            <div
              style={{
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94A3B8",
                fontSize: "14px",
              }}
            >
              No leads yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ fontSize: "12px", color: "#64748B" }}>
                      {value}
                    </span>
                  )}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    fontSize: "13px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent leads table */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#1B3A6B",
              margin: 0,
            }}
          >
            Recent Leads
          </h3>
          <Link
            href="/admin/leads"
            style={{
              fontSize: "13px",
              color: "#C9A84C",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            View all →
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 0",
              color: "#94A3B8",
              fontSize: "14px",
            }}
          >
            No leads yet. Leads will appear here once submitted through the
            website.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13.5px",
              }}
            >
              <thead>
                <tr>
                  {["Name", "Phone", "Service", "Status", "Date"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "0 12px 12px 0",
                        fontSize: "11px",
                        fontWeight: "700",
                        color: "#94A3B8",
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #F1F5F9",
                        whiteSpace: "nowrap",
                      }}
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
                    style={{
                      transition: "background-color 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                        "#F8FAFC";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                        "transparent";
                    }}
                  >
                    <td
                      style={{
                        padding: "12px 12px 12px 0",
                        borderBottom: "1px solid #F8FAFC",
                        fontWeight: "600",
                        color: "#1A1A1A",
                      }}
                    >
                      {lead.full_name}
                    </td>
                    <td
                      style={{
                        padding: "12px 12px 12px 0",
                        borderBottom: "1px solid #F8FAFC",
                        color: "#64748B",
                        fontFamily: "monospace",
                        fontSize: "13px",
                      }}
                    >
                      {lead.phone}
                    </td>
                    <td
                      style={{
                        padding: "12px 12px 12px 0",
                        borderBottom: "1px solid #F8FAFC",
                        color: "#64748B",
                        maxWidth: "160px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lead.service_interested ?? "—"}
                    </td>
                    <td
                      style={{
                        padding: "12px 12px 12px 0",
                        borderBottom: "1px solid #F8FAFC",
                      }}
                    >
                      <StatusBadge status={lead.status} />
                    </td>
                    <td
                      style={{
                        padding: "12px 0 12px 0",
                        borderBottom: "1px solid #F8FAFC",
                        color: "#94A3B8",
                        whiteSpace: "nowrap",
                        fontSize: "12px",
                      }}
                    >
                      {new Date(lead.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
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
          .dashboard-stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
          .dashboard-charts-grid {
            grid-template-columns: 2fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
