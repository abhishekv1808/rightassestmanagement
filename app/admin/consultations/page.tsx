import { createClient } from "@/lib/supabase/server";
import { updateConsultationStatus } from "@/app/actions/submit-consultation";
import { Calendar, Phone, Video, MapPin, CalendarClock } from "lucide-react";

type Row = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  service: string | null;
  address: string | null;
  mode: string;
  preferred_date: string;
  preferred_time: string;
  notes: string | null;
  status: string;
  created_at: string;
};

const MODE_META: Record<string, { label: string; Icon: typeof Phone }> = {
  call: { label: "Phone", Icon: Phone },
  video: { label: "Video", Icon: Video },
  "in-person": { label: "In Person", Icon: MapPin },
};

const STATUS_META: Record<string, { label: string; bg: string; color: string }> = {
  pending: { label: "Pending", bg: "#FEF3C7", color: "#B45309" },
  confirmed: { label: "Confirmed", bg: "#D1FAE5", color: "#059669" },
  completed: { label: "Completed", bg: "#E0E7FF", color: "#4338CA" },
  cancelled: { label: "Cancelled", bg: "#F3F4F6", color: "#6B7280" },
};

function to12h(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, "0")} ${period}`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

export default async function AdminConsultationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("consultations")
    .select("*")
    .order("preferred_date", { ascending: true })
    .order("preferred_time", { ascending: true });

  const rows: Row[] = data ?? [];
  const upcoming = rows.filter((r) => r.status === "pending" || r.status === "confirmed");
  const pendingCount = rows.filter((r) => r.status === "pending").length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1B3A6B", margin: 0 }}>Consultations</h2>
          <span style={{ backgroundColor: "#F1F5F9", color: "#64748B", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>
            {rows.length} total
          </span>
          {pendingCount > 0 && (
            <span style={{ backgroundColor: "#FEF3C7", color: "#B45309", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>
              {pendingCount} pending
            </span>
          )}
        </div>
        <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
          Booked consultation slots — confirm, complete, or cancel each request.
        </p>
      </div>

      {/* Empty */}
      {rows.length === 0 && (
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "64px 24px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: "#EEF2F8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <CalendarClock size={24} color="#1B3A6B" />
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1B3A6B", marginBottom: 8 }}>No bookings yet</h3>
          <p style={{ fontSize: 14, color: "#64748B" }}>Consultation bookings from your website will appear here.</p>
        </div>
      )}

      {/* Table */}
      {rows.length > 0 && (
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
              <thead>
                <tr style={{ backgroundColor: "#F8FAFC" }}>
                  {["When", "Client", "Mode", "Service", "Status", "Actions"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "13px 16px", fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.8px", textTransform: "uppercase", borderBottom: "1px solid #F1F5F9", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const isLast = i === rows.length - 1;
                  const modeM = MODE_META[r.mode] ?? MODE_META.call;
                  const statusM = STATUS_META[r.status] ?? STATUS_META.pending;
                  const cancelled = r.status === "cancelled";
                  return (
                    <tr key={r.id} style={{ opacity: cancelled ? 0.55 : 1 }}>
                      {/* When */}
                      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : "1px solid #F8FAFC", whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Calendar size={14} color="#C9A84C" style={{ flexShrink: 0 }} />
                          <div>
                            <p style={{ margin: 0, fontWeight: 700, color: "#1A1A1A", fontSize: 13 }}>{fmtDate(r.preferred_date)}</p>
                            <p style={{ margin: 0, fontSize: 12, color: "#64748B" }}>{to12h(r.preferred_time)}</p>
                          </div>
                        </div>
                      </td>
                      {/* Client */}
                      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : "1px solid #F8FAFC" }}>
                        <p style={{ margin: 0, fontWeight: 600, color: "#1A1A1A", fontSize: 13.5 }}>{r.full_name}</p>
                        <p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748B" }}>+91 {r.phone}{r.email ? ` · ${r.email}` : ""}</p>
                        {r.address && (
                          <p style={{ margin: "3px 0 0", fontSize: 11.5, color: "#64748B", display: "flex", alignItems: "flex-start", gap: 4, maxWidth: 280 }}>
                            <MapPin size={11} style={{ flexShrink: 0, marginTop: 2, color: "#C9A84C" }} />
                            {r.address}
                          </p>
                        )}
                        {r.notes && <p style={{ margin: "3px 0 0", fontSize: 11.5, color: "#94A3B8", fontStyle: "italic" }}>“{r.notes}”</p>}
                      </td>
                      {/* Mode */}
                      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : "1px solid #F8FAFC", whiteSpace: "nowrap" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "#475569", fontWeight: 600 }}>
                          <modeM.Icon size={13} />
                          {modeM.label}
                        </span>
                      </td>
                      {/* Service */}
                      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : "1px solid #F8FAFC", color: "#64748B", fontSize: 13, whiteSpace: "nowrap" }}>
                        {r.service ?? "—"}
                      </td>
                      {/* Status */}
                      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : "1px solid #F8FAFC", whiteSpace: "nowrap" }}>
                        <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, backgroundColor: statusM.bg, color: statusM.color }}>
                          {statusM.label}
                        </span>
                      </td>
                      {/* Actions */}
                      <td style={{ padding: "14px 16px", borderBottom: isLast ? "none" : "1px solid #F8FAFC", whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          {r.status === "pending" && (
                            <form action={async () => { "use server"; await updateConsultationStatus(r.id, "confirmed"); }}>
                              <button type="submit" style={{ padding: "5px 11px", borderRadius: 7, border: "none", backgroundColor: "#1B3A6B", color: "#FFFFFF", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Confirm</button>
                            </form>
                          )}
                          {r.status === "confirmed" && (
                            <form action={async () => { "use server"; await updateConsultationStatus(r.id, "completed"); }}>
                              <button type="submit" style={{ padding: "5px 11px", borderRadius: 7, border: "none", backgroundColor: "#4338CA", color: "#FFFFFF", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Mark Done</button>
                            </form>
                          )}
                          {!cancelled && r.status !== "completed" && (
                            <form action={async () => { "use server"; await updateConsultationStatus(r.id, "cancelled"); }}>
                              <button type="submit" style={{ padding: "5px 11px", borderRadius: 7, border: "1px solid #E2E8F0", backgroundColor: "#FFFFFF", color: "#EF4444", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                            </form>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 16 }}>
          {upcoming.length} upcoming consultation{upcoming.length !== 1 ? "s" : ""} scheduled.
        </p>
      )}
    </div>
  );
}
