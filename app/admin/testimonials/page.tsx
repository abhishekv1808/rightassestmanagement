"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { approveTestimonial, deleteTestimonial } from "@/app/admin/actions";
import { Star, CheckCircle, Trash2, AlertCircle } from "lucide-react";

type Testimonial = {
  id: string;
  client_name: string;
  service: string | null;
  rating: number;
  quote: string;
  approved: boolean;
  created_at: string;
};

type FilterKey = "all" | "pending" | "approved";

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          color={i <= rating ? "#C9A84C" : "#E2E8F0"}
          fill={i <= rating ? "#C9A84C" : "none"}
        />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    >
      <div
        style={{
          height: "14px",
          backgroundColor: "#F1F5F9",
          borderRadius: "6px",
          width: "60%",
          marginBottom: "10px",
        }}
      />
      <div
        style={{
          height: "14px",
          backgroundColor: "#F1F5F9",
          borderRadius: "6px",
          width: "40%",
          marginBottom: "16px",
        }}
      />
      <div
        style={{
          height: "12px",
          backgroundColor: "#F1F5F9",
          borderRadius: "6px",
          width: "100%",
          marginBottom: "8px",
        }}
      />
      <div
        style={{
          height: "12px",
          backgroundColor: "#F1F5F9",
          borderRadius: "6px",
          width: "80%",
        }}
      />
    </div>
  );
}

type TestimonialCardProps = {
  testimonial: Testimonial;
  onApprove: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

function TestimonialCard({
  testimonial,
  onApprove,
  onDelete,
}: TestimonialCardProps) {
  const [approving, setApproving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleApprove = async () => {
    setApproving(true);
    await onApprove(testimonial.id);
    setApproving(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(testimonial.id);
    setDeleting(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 12px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)";
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#1A1A1A",
              margin: "0 0 6px 0",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {testimonial.client_name}
          </p>
          {testimonial.service && (
            <span
              style={{
                display: "inline-block",
                backgroundColor: "#EEF2F8",
                color: "#1B3A6B",
                fontSize: "11px",
                fontWeight: "600",
                padding: "3px 9px",
                borderRadius: "20px",
              }}
            >
              {testimonial.service}
            </span>
          )}
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "3px 9px",
            borderRadius: "20px",
            fontSize: "10px",
            fontWeight: "700",
            letterSpacing: "0.8px",
            backgroundColor: testimonial.approved ? "#D1FAE5" : "#FEF3C7",
            color: testimonial.approved ? "#059669" : "#D97706",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {testimonial.approved ? "APPROVED" : "PENDING"}
        </span>
      </div>

      {/* Star rating */}
      <StarRating rating={testimonial.rating ?? 5} />

      {/* Quote */}
      <p
        style={{
          fontSize: "13.5px",
          color: "#4B5563",
          fontStyle: "italic",
          lineHeight: "1.65",
          margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        "{testimonial.quote}"
      </p>

      {/* Date */}
      <p
        style={{
          fontSize: "11px",
          color: "#94A3B8",
          margin: 0,
        }}
      >
        Submitted{" "}
        {new Date(testimonial.created_at).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Actions */}
      {!confirmDelete ? (
        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
          {!testimonial.approved ? (
            <button
              onClick={handleApprove}
              disabled={approving}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "9px",
                backgroundColor: approving ? "#D1FAE5" : "#059669",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: approving ? "not-allowed" : "pointer",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!approving)
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#047857";
              }}
              onMouseLeave={(e) => {
                if (!approving)
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#059669";
              }}
            >
              <CheckCircle size={14} />
              {approving ? "Approving…" : "Approve"}
            </button>
          ) : (
            <button
              disabled
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "9px",
                backgroundColor: "#D1FAE5",
                color: "#059669",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "not-allowed",
              }}
            >
              <CheckCircle size={14} />
              Approved ✓
            </button>
          )}

          <button
            onClick={() => setConfirmDelete(true)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "9px 14px",
              backgroundColor: "transparent",
              border: "1.5px solid #FCA5A5",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              color: "#EF4444",
              cursor: "pointer",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#FEF2F2";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "transparent";
            }}
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "10px",
            }}
          >
            <AlertCircle size={14} color="#EF4444" />
            <p
              style={{
                fontSize: "12px",
                color: "#991B1B",
                margin: 0,
                fontWeight: "600",
              }}
            >
              Delete this testimonial permanently?
            </p>
          </div>
          <div style={{ display: "flex", gap: "7px" }}>
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{
                flex: 1,
                padding: "8px",
                backgroundColor: "#EF4444",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "600",
                cursor: deleting ? "not-allowed" : "pointer",
              }}
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              style={{
                flex: 1,
                padding: "8px",
                backgroundColor: "#FFFFFF",
                color: "#374151",
                border: "1px solid #E2E8F0",
                borderRadius: "6px",
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
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("all");

  const fetchTestimonials = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    setTestimonials(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "pending")
      return testimonials.filter((t) => !t.approved);
    if (filter === "approved")
      return testimonials.filter((t) => t.approved);
    return testimonials;
  }, [testimonials, filter]);

  const pendingCount = testimonials.filter((t) => !t.approved).length;
  const approvedCount = testimonials.filter((t) => t.approved).length;

  const handleApprove = async (id: string) => {
    await approveTestimonial(id);
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, approved: true } : t))
    );
  };

  const handleDelete = async (id: string) => {
    await deleteTestimonial(id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const filterTabs: { key: FilterKey; label: string; count: number }[] = [
    { key: "all", label: "All", count: testimonials.length },
    { key: "pending", label: "Pending Approval", count: pendingCount },
    { key: "approved", label: "Approved", count: approvedCount },
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
            Testimonials
          </h2>
          <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
            {pendingCount > 0
              ? `${pendingCount} testimonial${pendingCount > 1 ? "s" : ""} awaiting approval`
              : "All testimonials reviewed"}
          </p>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "9px 16px",
            backgroundColor: "#FFFFFF",
            border: "1.5px solid #E2E8F0",
            borderRadius: "10px",
            cursor: "not-allowed",
            fontSize: "13px",
            fontWeight: "600",
            color: "#94A3B8",
            opacity: 0.6,
          }}
          disabled
          title="Coming soon"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {filterTabs.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              padding: "5px 14px",
              borderRadius: "20px",
              border:
                filter === key
                  ? "1.5px solid #1B3A6B"
                  : "1.5px solid #E2E8F0",
              backgroundColor: filter === key ? "#1B3A6B" : "#FFFFFF",
              color: filter === key ? "#FFFFFF" : "#64748B",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {label}
            <span style={{ marginLeft: "5px", fontSize: "11px", opacity: 0.75 }}>
              ({count})
            </span>
          </button>
        ))}
      </div>

      {/* Cards grid */}
      {loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            padding: "60px 24px",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "#F8FAFC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            <Star size={24} color="#CBD5E1" />
          </div>
          <p
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: "#374151",
              margin: "0 0 6px 0",
            }}
          >
            No testimonials{filter !== "all" ? ` in this filter` : " yet"}
          </p>
          <p style={{ fontSize: "13px", color: "#94A3B8", margin: 0 }}>
            {filter === "all"
              ? "Testimonials will appear here once clients submit them through the website."
              : "Try a different filter to see more testimonials."}
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              onApprove={handleApprove}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
