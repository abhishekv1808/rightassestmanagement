import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Plus,
  ExternalLink,
  Globe,
  FileText,
  Pencil,
} from "lucide-react";
import { toggleBlogPublished } from "@/app/admin/actions";

// ─── Types ─────────────────────────────────────────────────────────────────────
type PostRow = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  category: string | null;
  excerpt: string | null;
  read_time: string | null;
  created_at: string;
  updated_at: string | null;
};

// ─── Category label helper ─────────────────────────────────────────────────────
const CAT_META: Record<string, { label: string; color: string; bg: string }> = {
  financial:    { label: "Financial",    color: "#1B3A6B", bg: "#EEF2F8" },
  "real-estate":{ label: "Real Estate",  color: "#0D7E7E", bg: "#E6F4F4" },
  legal:        { label: "Legal",        color: "#6B46C1", bg: "#F0EBF9" },
  general:      { label: "General",      color: "#64748B", bg: "#F1F5F9" },
};

function catMeta(c: string | null) {
  return CAT_META[c ?? "general"] ?? CAT_META.general;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Quick-publish server action wrapper ───────────────────────────────────────
async function TogglePublish({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  "use server";
  await toggleBlogPublished(id, !published);
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function AdminBlogPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select(
      "id, title, slug, published, category, excerpt, read_time, created_at, updated_at"
    )
    .order("created_at", { ascending: false });

  const rows: PostRow[] = posts ?? [];
  const publishedCount = rows.filter((p) => p.published).length;
  const draftCount = rows.length - publishedCount;

  return (
    <div>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 4,
            }}
          >
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#1B3A6B",
                margin: 0,
              }}
            >
              Blog Posts
            </h2>
            <span
              style={{
                backgroundColor: "#F1F5F9",
                color: "#64748B",
                fontSize: 12,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 20,
              }}
            >
              {rows.length} total
            </span>
          </div>
          <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
            Create and manage blog articles — changes go live immediately.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* Stats pills */}
          <div
            style={{
              backgroundColor: "#D1FAE5",
              padding: "6px 14px",
              borderRadius: 20,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: "#059669" }}>
              {publishedCount} Published
            </span>
          </div>
          <div
            style={{
              backgroundColor: "#F3F4F6",
              padding: "6px 14px",
              borderRadius: 20,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: "#6B7280" }}>
              {draftCount} Draft
            </span>
          </div>

          {/* New Post */}
          <Link
            href="/admin/blog/new"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 18px",
              borderRadius: 10,
              backgroundColor: "#1B3A6B",
              color: "#FFFFFF",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <Plus size={15} />
            New Post
          </Link>
        </div>
      </div>

      {/* ── Error state ─────────────────────────────────────────────── */}
      {error && (
        <div
          style={{
            backgroundColor: "#FFF5F5",
            border: "1px solid #FCA5A5",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 20,
            fontSize: 13,
            color: "#EF4444",
          }}
        >
          Failed to load posts: {error.message}
        </div>
      )}

      {/* ── Empty state ─────────────────────────────────────────────── */}
      {rows.length === 0 && !error && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: "64px 24px",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "#EEF2F8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <FileText size={24} color="#1B3A6B" />
          </div>
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#1B3A6B",
              marginBottom: 8,
            }}
          >
            No posts yet
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "#64748B",
              marginBottom: 24,
              maxWidth: 380,
              margin: "0 auto 24px",
            }}
          >
            Create your first blog post. Good SEO articles drive organic leads
            from Google — especially for Bangalore-specific queries.
          </p>
          <Link
            href="/admin/blog/new"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "11px 22px",
              borderRadius: 10,
              backgroundColor: "#1B3A6B",
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <Plus size={15} />
            Write Your First Post
          </Link>
        </div>
      )}

      {/* ── Posts table ─────────────────────────────────────────────── */}
      {rows.length > 0 && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
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
                    "Title",
                    "Category",
                    "Status",
                    "Read Time",
                    "Last Updated",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "13px 16px",
                        fontSize: 11,
                        fontWeight: 700,
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
                {rows.map((post, i) => {
                  const cat = catMeta(post.category);
                  const isLast = i === rows.length - 1;
                  return (
                    <tr key={post.id}>
                      {/* Title + slug */}
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: isLast ? "none" : "1px solid #F8FAFC",
                          maxWidth: 360,
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontWeight: 600,
                            color: "#1A1A1A",
                            fontSize: 13.5,
                            lineHeight: 1.4,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {post.title}
                        </p>
                        <p
                          style={{
                            margin: "3px 0 0",
                            fontSize: 11,
                            color: "#94A3B8",
                            fontFamily: "monospace",
                          }}
                        >
                          /blog/{post.slug}
                        </p>
                      </td>

                      {/* Category */}
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: isLast ? "none" : "1px solid #F8FAFC",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "3px 10px",
                            borderRadius: 20,
                            fontSize: 11,
                            fontWeight: 600,
                            backgroundColor: cat.bg,
                            color: cat.color,
                          }}
                        >
                          {cat.label}
                        </span>
                      </td>

                      {/* Status */}
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: isLast ? "none" : "1px solid #F8FAFC",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <form
                          action={async () => {
                            "use server";
                            await toggleBlogPublished(post.id, !post.published);
                          }}
                        >
                          <button
                            type="submit"
                            title={
                              post.published
                                ? "Click to unpublish"
                                : "Click to publish"
                            }
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              padding: "4px 10px",
                              borderRadius: 20,
                              fontSize: 11,
                              fontWeight: 700,
                              border: "none",
                              cursor: "pointer",
                              backgroundColor: post.published
                                ? "#D1FAE5"
                                : "#F3F4F6",
                              color: post.published ? "#059669" : "#6B7280",
                            }}
                          >
                            {post.published ? (
                              <>
                                <Globe size={10} />
                                Live
                              </>
                            ) : (
                              <>
                                <FileText size={10} />
                                Draft
                              </>
                            )}
                          </button>
                        </form>
                      </td>

                      {/* Read time */}
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: isLast ? "none" : "1px solid #F8FAFC",
                          color: "#64748B",
                          fontSize: 13,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {post.read_time ?? "—"}
                      </td>

                      {/* Date */}
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: isLast ? "none" : "1px solid #F8FAFC",
                          color: "#94A3B8",
                          fontSize: 12,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {fmtDate(post.updated_at ?? post.created_at)}
                      </td>

                      {/* Actions */}
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: isLast ? "none" : "1px solid #F8FAFC",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <div
                          style={{ display: "flex", gap: 8, alignItems: "center" }}
                        >
                          <Link
                            href={`/admin/blog/${post.id}/edit`}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              fontSize: 12,
                              fontWeight: 600,
                              color: "#1B3A6B",
                              textDecoration: "none",
                              padding: "5px 10px",
                              borderRadius: 7,
                              border: "1px solid #E2E8F0",
                            }}
                          >
                            <Pencil size={11} />
                            Edit
                          </Link>
                          {post.published && (
                            <a
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#64748B",
                                textDecoration: "none",
                                padding: "5px 10px",
                                borderRadius: 7,
                                border: "1px solid #E2E8F0",
                              }}
                            >
                              <ExternalLink size={11} />
                              View
                            </a>
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
    </div>
  );
}
