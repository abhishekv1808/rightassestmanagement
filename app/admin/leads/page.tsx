"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { updateLeadStatus, deleteLead } from "@/app/admin/actions";
import {
  Search,
  Download,
  X,
  ChevronDown,
  Eye,
  Trash2,
  AlertCircle,
} from "lucide-react";
import * as XLSX from "xlsx";

type Lead = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  service_interested: string | null;
  message: string | null;
  source: string | null;
  status: string;
  created_at: string;
};

type StatusKey = "all" | "new" | "contacted" | "converted" | "closed";

const STATUS_STYLES: Record<
  string,
  { bg: string; color: string; label: string }
> = {
  new: { bg: "#DBEAFE", color: "#1D4ED8", label: "New" },
  contacted: { bg: "#FEF3C7", color: "#D97706", label: "Contacted" },
  converted: { bg: "#D1FAE5", color: "#059669", label: "Converted" },
  closed: { bg: "#F3F4F6", color: "#6B7280", label: "Closed" },
};

function StatusBadge({ status }: { status: string }) {
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

function SkeletonRow() {
  return (
    <tr>
      {[...Array(9)].map((_, i) => (
        <td key={i} style={{ padding: "14px 12px 14px 0" }}>
          <div
            style={{
              height: "14px",
              backgroundColor: "#F1F5F9",
              borderRadius: "6px",
              width: i === 0 ? "30px" : i === 1 ? "120px" : "80px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </td>
      ))}
    </tr>
  );
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<StatusKey>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [panelStatus, setPanelStatus] = useState<string>("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const fetchLeads = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchesFilter =
        activeFilter === "all" || l.status === activeFilter;
      const matchesSearch =
        search.trim() === "" ||
        l.full_name.toLowerCase().includes(search.toLowerCase()) ||
        l.phone.includes(search) ||
        (l.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (l.service_interested ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [leads, activeFilter, search]);

  const statusCounts = useMemo(() => {
    return {
      all: leads.length,
      new: leads.filter((l) => l.status === "new").length,
      contacted: leads.filter((l) => l.status === "contacted").length,
      converted: leads.filter((l) => l.status === "converted").length,
      closed: leads.filter((l) => l.status === "closed").length,
    };
  }, [leads]);

  const handleExport = () => {
    const exportData = filtered.map((l, i) => ({
      "#": i + 1,
      "Full Name": l.full_name,
      Phone: l.phone,
      Email: l.email ?? "",
      "Service Interested": l.service_interested ?? "",
      Message: l.message ?? "",
      Source: l.source ?? "",
      Status: l.status,
      "Created At": new Date(l.created_at).toLocaleDateString("en-IN"),
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, `leads-export-${Date.now()}.xlsx`);
  };

  const openPanel = (lead: Lead) => {
    setSelectedLead(lead);
    setPanelStatus(lead.status);
    setDeleteConfirm(false);
  };

  const closePanel = () => {
    setSelectedLead(null);
    setDeleteConfirm(false);
  };

  const handleUpdateStatus = async () => {
    if (!selectedLead) return;
    setUpdating(true);
    await updateLeadStatus(selectedLead.id, panelStatus);
    setLeads((prev) =>
      prev.map((l) =>
        l.id === selectedLead.id ? { ...l, status: panelStatus } : l
      )
    );
    setSelectedLead((prev) =>
      prev ? { ...prev, status: panelStatus } : null
    );
    setUpdating(false);
  };

  const handleDeleteLead = async () => {
    if (!selectedLead) return;
    setDeleting(true);
    await deleteLead(selectedLead.id);
    setLeads((prev) => prev.filter((l) => l.id !== selectedLead.id));
    closePanel();
    setDeleting(false);
  };

  const filterTabs: { key: StatusKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "new", label: "New" },
    { key: "contacted", label: "Contacted" },
    { key: "converted", label: "Converted" },
    { key: "closed", label: "Closed" },
  ];

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#1B3A6B",
              margin: "0 0 4px 0",
            }}
          >
            Leads
          </h2>
          <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
            {leads.length} total leads collected
          </p>
        </div>
        <button
          onClick={handleExport}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "9px 16px",
            backgroundColor: "#FFFFFF",
            border: "1.5px solid #E2E8F0",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
            color: "#374151",
            transition: "border-color 0.15s, background-color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#1B3A6B";
            (e.currentTarget as HTMLButtonElement).style.color = "#1B3A6B";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E8F0";
            (e.currentTarget as HTMLButtonElement).style.color = "#374151";
          }}
        >
          <Download size={15} />
          Export CSV
        </button>
      </div>

      {/* Status pills */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        {filterTabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            style={{
              padding: "5px 14px",
              borderRadius: "20px",
              border:
                activeFilter === key
                  ? "1.5px solid #1B3A6B"
                  : "1.5px solid #E2E8F0",
              backgroundColor: activeFilter === key ? "#1B3A6B" : "#FFFFFF",
              color: activeFilter === key ? "#FFFFFF" : "#64748B",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {label}
            <span
              style={{
                marginLeft: "5px",
                fontSize: "11px",
                opacity: 0.75,
              }}
            >
              ({statusCounts[key]})
            </span>
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div
        style={{
          position: "relative",
          marginBottom: "16px",
          maxWidth: "400px",
        }}
      >
        <Search
          size={15}
          color="#94A3B8"
          style={{
            position: "absolute",
            left: "13px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        <input
          type="text"
          placeholder="Search by name, phone, email, service…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px 10px 36px",
            backgroundColor: "#FFFFFF",
            border: "1.5px solid #E2E8F0",
            borderRadius: "10px",
            fontSize: "13.5px",
            color: "#1A1A1A",
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#1B3A6B";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#E2E8F0";
          }}
        />
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13.5px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#F8FAFC" }}>
                {[
                  "#",
                  "Full Name",
                  "Phone",
                  "Email",
                  "Service",
                  "Source",
                  "Status",
                  "Date",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "13px 14px",
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
              {loading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    style={{
                      padding: "60px 20px",
                      textAlign: "center",
                      color: "#94A3B8",
                      fontSize: "14px",
                    }}
                  >
                    {search || activeFilter !== "all"
                      ? "No leads match your search or filter."
                      : "No leads yet. They will appear here once submitted through the website."}
                  </td>
                </tr>
              ) : (
                filtered.map((lead, index) => (
                  <tr
                    key={lead.id}
                    style={{
                      cursor: "pointer",
                      transition: "background-color 0.1s",
                    }}
                    onClick={() => openPanel(lead)}
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
                        padding: "13px 14px",
                        borderBottom: "1px solid #F8FAFC",
                        color: "#94A3B8",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        padding: "13px 14px",
                        borderBottom: "1px solid #F8FAFC",
                        fontWeight: "600",
                        color: "#1A1A1A",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lead.full_name}
                    </td>
                    <td
                      style={{
                        padding: "13px 14px",
                        borderBottom: "1px solid #F8FAFC",
                        color: "#64748B",
                        fontFamily: "monospace",
                        fontSize: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lead.phone}
                    </td>
                    <td
                      style={{
                        padding: "13px 14px",
                        borderBottom: "1px solid #F8FAFC",
                        color: "#64748B",
                        maxWidth: "160px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lead.email ?? "—"}
                    </td>
                    <td
                      style={{
                        padding: "13px 14px",
                        borderBottom: "1px solid #F8FAFC",
                        color: "#64748B",
                        maxWidth: "140px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lead.service_interested ?? "—"}
                    </td>
                    <td
                      style={{
                        padding: "13px 14px",
                        borderBottom: "1px solid #F8FAFC",
                        color: "#64748B",
                      }}
                    >
                      {lead.source ?? "—"}
                    </td>
                    <td
                      style={{
                        padding: "13px 14px",
                        borderBottom: "1px solid #F8FAFC",
                      }}
                    >
                      <StatusBadge status={lead.status} />
                    </td>
                    <td
                      style={{
                        padding: "13px 14px",
                        borderBottom: "1px solid #F8FAFC",
                        color: "#94A3B8",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {new Date(lead.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td
                      style={{
                        padding: "13px 14px",
                        borderBottom: "1px solid #F8FAFC",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openPanel(lead);
                        }}
                        title="View lead"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "5px",
                          borderRadius: "6px",
                          color: "#64748B",
                          display: "inline-flex",
                          alignItems: "center",
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "#1B3A6B";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "#64748B";
                        }}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <>
          {/* Backdrop */}
          <div
            onClick={closePanel}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.45)",
              zIndex: 49,
              backdropFilter: "blur(2px)",
            }}
          />

          {/* Modal */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(640px, calc(100vw - 32px))",
              maxHeight: "calc(100vh - 48px)",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              zIndex: 50,
              overflowY: "auto",
              boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
              animation: "modalIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Modal header */}
            <div
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#FFFFFF",
                borderBottom: "1px solid #F1F5F9",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 1,
                borderRadius: "20px 20px 0 0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* Avatar */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #1B3A6B 0%, #2D5FA8 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C9A84C",
                    fontWeight: "700",
                    fontSize: "16px",
                    flexShrink: 0,
                  }}
                >
                  {selectedLead.full_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: "700",
                      color: "#1B3A6B",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {selectedLead.full_name}
                  </h3>
                  <StatusBadge status={selectedLead.status} />
                </div>
              </div>
              <button
                onClick={closePanel}
                style={{
                  background: "none",
                  border: "1.5px solid #E2E8F0",
                  cursor: "pointer",
                  padding: "6px",
                  borderRadius: "8px",
                  color: "#64748B",
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.15s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F1F5F9";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#CBD5E1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E8F0";
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: "24px" }}>

              {/* Details grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0",
                  marginBottom: "20px",
                  border: "1px solid #F1F5F9",
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >
                {[
                  { label: "Full Name", value: selectedLead.full_name, icon: "👤" },
                  { label: "Phone", value: selectedLead.phone, icon: "📞" },
                  { label: "Email", value: selectedLead.email ?? "—", icon: "✉️" },
                  { label: "Service Interested", value: selectedLead.service_interested ?? "—", icon: "🏷️" },
                  { label: "Source", value: selectedLead.source ?? "—", icon: "📍" },
                  {
                    label: "Submitted",
                    value: new Date(selectedLead.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }),
                    icon: "📅",
                  },
                ].map(({ label, value, icon }, idx) => (
                  <div
                    key={label}
                    style={{
                      padding: "14px 16px",
                      borderBottom: idx < 4 ? "1px solid #F1F5F9" : "none",
                      borderRight: idx % 2 === 0 ? "1px solid #F1F5F9" : "none",
                      backgroundColor: idx % 2 === 0 ? "#FAFBFC" : "#FFFFFF",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: "700",
                        color: "#94A3B8",
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        margin: "0 0 5px 0",
                      }}
                    >
                      {icon} {label}
                    </p>
                    <p
                      style={{
                        fontSize: "13.5px",
                        color: "#1A1A1A",
                        margin: 0,
                        fontWeight: "500",
                        wordBreak: "break-word",
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Message */}
              {selectedLead.message && (
                <div style={{ marginBottom: "20px" }}>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#94A3B8",
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                      margin: "0 0 8px 0",
                    }}
                  >
                    💬 Message
                  </p>
                  <div
                    style={{
                      backgroundColor: "#F8FAFC",
                      border: "1px solid #F1F5F9",
                      borderRadius: "10px",
                      padding: "14px 16px",
                      fontSize: "14px",
                      color: "#374151",
                      lineHeight: "1.65",
                    }}
                  >
                    {selectedLead.message}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div style={{ height: "1px", backgroundColor: "#F1F5F9", margin: "4px 0 20px" }} />

              {/* Status update + Delete in a row */}
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", flexWrap: "wrap" }}>

                {/* Status update */}
                <div
                  style={{
                    flex: 1,
                    minWidth: "200px",
                    backgroundColor: "#F8FAFC",
                    borderRadius: "12px",
                    padding: "16px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#374151",
                      margin: "0 0 10px 0",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Update Status
                  </p>
                  <div style={{ position: "relative", marginBottom: "10px" }}>
                    <select
                      value={panelStatus}
                      onChange={(e) => setPanelStatus(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "9px 32px 9px 12px",
                        border: "1.5px solid #E2E8F0",
                        borderRadius: "8px",
                        fontSize: "13.5px",
                        color: "#1A1A1A",
                        backgroundColor: "#FFFFFF",
                        appearance: "none",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="closed">Closed</option>
                    </select>
                    <ChevronDown
                      size={14}
                      color="#94A3B8"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                  <button
                    onClick={handleUpdateStatus}
                    disabled={updating || panelStatus === selectedLead.status}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor:
                        updating || panelStatus === selectedLead.status ? "#E2E8F0" : "#1B3A6B",
                      color:
                        updating || panelStatus === selectedLead.status ? "#94A3B8" : "#FFFFFF",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "13.5px",
                      fontWeight: "600",
                      cursor:
                        updating || panelStatus === selectedLead.status ? "not-allowed" : "pointer",
                      transition: "background-color 0.15s",
                    }}
                  >
                    {updating ? "Updating…" : "Update Status"}
                  </button>
                </div>

                {/* Delete section */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingTop: "36px" }}>
                  {!deleteConfirm ? (
                    <button
                      onClick={() => setDeleteConfirm(true)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "10px 18px",
                        backgroundColor: "transparent",
                        border: "1.5px solid #FCA5A5",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#EF4444",
                        cursor: "pointer",
                        transition: "background-color 0.15s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FEF2F2";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                      }}
                    >
                      <Trash2 size={14} />
                      Delete Lead
                    </button>
                  ) : (
                    <div
                      style={{
                        backgroundColor: "#FEF2F2",
                        border: "1px solid #FECACA",
                        borderRadius: "10px",
                        padding: "14px",
                        maxWidth: "220px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px" }}>
                        <AlertCircle size={15} color="#EF4444" style={{ flexShrink: 0, marginTop: "1px" }} />
                        <p style={{ fontSize: "12px", color: "#991B1B", margin: 0, fontWeight: "600", lineHeight: "1.4" }}>
                          Permanently delete this lead?
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: "7px" }}>
                        <button
                          onClick={handleDeleteLead}
                          disabled={deleting}
                          style={{
                            flex: 1,
                            padding: "8px",
                            backgroundColor: "#EF4444",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "7px",
                            fontSize: "12px",
                            fontWeight: "600",
                            cursor: deleting ? "not-allowed" : "pointer",
                          }}
                        >
                          {deleting ? "Deleting…" : "Delete"}
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(false)}
                          style={{
                            flex: 1,
                            padding: "8px",
                            backgroundColor: "#FFFFFF",
                            color: "#374151",
                            border: "1px solid #E2E8F0",
                            borderRadius: "7px",
                            fontSize: "12px",
                            fontWeight: "600",
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}
