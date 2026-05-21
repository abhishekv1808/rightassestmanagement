import Link from "next/link";
import { allBlogPosts, CATEGORY_META } from "@/lib/blog-data";
import { ExternalLink, Info } from "lucide-react";

export default function AdminBlogPage() {
  const posts = allBlogPosts;
  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.filter((p) => !p.published).length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "4px",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
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
                  fontSize: "12px",
                  fontWeight: "700",
                  padding: "3px 10px",
                  borderRadius: "20px",
                }}
              >
                {posts.length} total
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
              Content managed in code — updates require a redeploy
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                backgroundColor: "#D1FAE5",
                padding: "6px 14px",
                borderRadius: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#059669",
                }}
              >
                {publishedCount} Published
              </span>
            </div>
            <div
              style={{
                backgroundColor: "#F3F4F6",
                padding: "6px 14px",
                borderRadius: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#6B7280",
                }}
              >
                {draftCount} Draft
              </span>
            </div>
          </div>
        </div>

        {/* Callout */}
        <div
          style={{
            backgroundColor: "#EFF6FF",
            border: "1px solid #BFDBFE",
            borderRadius: "12px",
            padding: "14px 18px",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Info size={16} color="#3B82F6" style={{ marginTop: "1px", flexShrink: 0 }} />
          <p style={{ fontSize: "13px", color: "#1E40AF", margin: 0, lineHeight: "1.5" }}>
            Blog content is managed in{" "}
            <code
              style={{
                backgroundColor: "#DBEAFE",
                padding: "1px 6px",
                borderRadius: "4px",
                fontFamily: "monospace",
                fontSize: "12px",
              }}
            >
              lib/blog-data.ts
            </code>
            . To publish or edit posts, update the file and redeploy to Vercel.
          </p>
        </div>
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
                  "Title",
                  "Category",
                  "Status",
                  "Read Time",
                  "Published Date",
                  "View",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "13px 16px",
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
              {posts.map((post) => {
                const cat = CATEGORY_META[post.category];
                return (
                  <tr
                    key={post.slug}
                    style={{ transition: "background-color 0.1s" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                        "#F8FAFC";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                        "transparent";
                    }}
                  >
                    {/* Title */}
                    <td
                      style={{
                        padding: "14px 16px",
                        borderBottom: "1px solid #F8FAFC",
                        maxWidth: "340px",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "600",
                          color: "#1A1A1A",
                          fontSize: "13.5px",
                          lineHeight: "1.4",
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
                          margin: "3px 0 0 0",
                          fontSize: "11px",
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
                        borderBottom: "1px solid #F8FAFC",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: "600",
                          backgroundColor: cat.lightBg,
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
                        borderBottom: "1px solid #F8FAFC",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {post.published ? (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "4px 10px",
                            borderRadius: "20px",
                            fontSize: "11px",
                            fontWeight: "700",
                            backgroundColor: "#D1FAE5",
                            color: "#059669",
                          }}
                        >
                          Live
                        </span>
                      ) : (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "4px 10px",
                            borderRadius: "20px",
                            fontSize: "11px",
                            fontWeight: "700",
                            backgroundColor: "#F3F4F6",
                            color: "#6B7280",
                          }}
                        >
                          Draft
                        </span>
                      )}
                    </td>

                    {/* Read time */}
                    <td
                      style={{
                        padding: "14px 16px",
                        borderBottom: "1px solid #F8FAFC",
                        color: "#64748B",
                        fontSize: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {post.readTime}
                    </td>

                    {/* Published date */}
                    <td
                      style={{
                        padding: "14px 16px",
                        borderBottom: "1px solid #F8FAFC",
                        color: "#94A3B8",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* View link */}
                    <td
                      style={{
                        padding: "14px 16px",
                        borderBottom: "1px solid #F8FAFC",
                      }}
                    >
                      {post.published ? (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#1B3A6B",
                            textDecoration: "none",
                            padding: "5px 10px",
                            borderRadius: "7px",
                            border: "1px solid #E2E8F0",
                            transition: "border-color 0.15s, background-color 0.15s",
                            whiteSpace: "nowrap",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.borderColor =
                              "#1B3A6B";
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                              "#EEF2F8";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.borderColor =
                              "#E2E8F0";
                            (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                              "transparent";
                          }}
                        >
                          <ExternalLink size={12} />
                          View Article
                        </Link>
                      ) : (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#CBD5E1",
                            fontStyle: "italic",
                          }}
                        >
                          Not published
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
