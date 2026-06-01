"use client";

import {
  useState,
  useRef,
  useTransition,
  useCallback,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Globe,
  EyeOff,
  Trash2,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Minus,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ExternalLink,
} from "lucide-react";
import {
  saveBlogPost,
  deleteBlogPost,
  type BlogPostInput,
} from "@/app/admin/actions";

// ─── Types ────────────────────────────────────────────────────────────────────

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  published: boolean;
  category: string | null;
  meta_title: string | null;
  meta_description: string | null;
  cover_image_url: string | null;
  read_time: string | null;
};

type Props = { post?: Post };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

const CATEGORIES = [
  { value: "financial", label: "Financial Services" },
  { value: "real-estate", label: "Real Estate" },
  { value: "legal", label: "Legal Services" },
  { value: "general", label: "General" },
];

// ─── Toolbar button ───────────────────────────────────────────────────────────

function ToolBtn({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: 6,
        border: "1px solid #E2E8F0",
        backgroundColor: "#FFFFFF",
        color: "#475569",
        cursor: "pointer",
        fontSize: 12,
        fontWeight: 600,
        flexShrink: 0,
        transition: "background-color 0.12s, border-color 0.12s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "#EEF2F8";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "#1B3A6B";
        (e.currentTarget as HTMLButtonElement).style.color = "#1B3A6B";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "#FFFFFF";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2E8F0";
        (e.currentTarget as HTMLButtonElement).style.color = "#475569";
      }}
    >
      {children}
    </button>
  );
}

// ─── Main editor ──────────────────────────────────────────────────────────────

export default function BlogEditor({ post }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const slugManuallyEdited = useRef(!!post?.slug);

  // ── Form state ──
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [published, setPublished] = useState(post?.published ?? false);
  const [category, setCategory] = useState(post?.category ?? "general");
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? "");
  const [metaDesc, setMetaDesc] = useState(post?.meta_description ?? "");
  const [coverUrl, setCoverUrl] = useState(post?.cover_image_url ?? "");
  const [readTime, setReadTime] = useState(post?.read_time ?? "");
  const [postId, setPostId] = useState(post?.id ?? "");

  // ── UI state ──
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [saveError, setSaveError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);

  // Auto-update read time estimate when content changes
  useEffect(() => {
    if (content && !post?.read_time) {
      setReadTime(estimateReadTime(content));
    }
  }, [content, post?.read_time]);

  // Auto-slug from title (only if not manually edited)
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManuallyEdited.current) {
      setSlug(slugify(val));
    }
  };

  // ── Markdown toolbar ──────────────────────────────────────────────────────

  const insertAtCursor = useCallback(
    (before: string, after = "", blockLevel = false) => {
      const ta = contentRef.current;
      if (!ta) return;

      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = ta.value.substring(start, end);

      let insertion: string;
      if (blockLevel) {
        // Insert at start of current line
        const lineStart = ta.value.lastIndexOf("\n", start - 1) + 1;
        const before2 = ta.value.substring(0, lineStart);
        const lineContent = ta.value.substring(lineStart);
        insertion = before2 + before + lineContent;
        setContent(insertion);
        requestAnimationFrame(() => {
          ta.focus();
          ta.selectionStart = lineStart + before.length;
          ta.selectionEnd = lineStart + before.length;
        });
        return;
      }

      const newVal =
        ta.value.substring(0, start) +
        before +
        selected +
        after +
        ta.value.substring(end);
      setContent(newVal);

      requestAnimationFrame(() => {
        ta.focus();
        if (selected) {
          ta.selectionStart = start + before.length;
          ta.selectionEnd = start + before.length + selected.length;
        } else {
          ta.selectionStart = start + before.length;
          ta.selectionEnd = start + before.length;
        }
      });
    },
    []
  );

  const handleLinkInsert = () => {
    const ta = contentRef.current;
    if (!ta) return;
    const selected =
      ta.value.substring(ta.selectionStart, ta.selectionEnd) || "link text";
    insertAtCursor(`[${selected}](`, ")");
  };

  const toolbarGroups = [
    [
      {
        icon: <Heading2 size={14} />,
        title: "Heading 2",
        action: () => insertAtCursor("## ", "", true),
      },
      {
        icon: <Heading3 size={14} />,
        title: "Heading 3",
        action: () => insertAtCursor("### ", "", true),
      },
    ],
    [
      {
        icon: <Bold size={14} />,
        title: "Bold",
        action: () => insertAtCursor("**", "**"),
      },
      {
        icon: <Italic size={14} />,
        title: "Italic",
        action: () => insertAtCursor("*", "*"),
      },
    ],
    [
      {
        icon: <List size={14} />,
        title: "Bullet list",
        action: () => insertAtCursor("- ", "", true),
      },
      {
        icon: <ListOrdered size={14} />,
        title: "Numbered list",
        action: () => insertAtCursor("1. ", "", true),
      },
    ],
    [
      {
        icon: <Quote size={14} />,
        title: "Blockquote",
        action: () => insertAtCursor("> ", "", true),
      },
      {
        icon: <Code size={14} />,
        title: "Inline code",
        action: () => insertAtCursor("`", "`"),
      },
      {
        icon: <Link size={14} />,
        title: "Link",
        action: handleLinkInsert,
      },
    ],
    [
      {
        icon: <Minus size={14} />,
        title: "Horizontal rule",
        action: () => insertAtCursor("\n---\n"),
      },
    ],
  ];

  // ── Save ──────────────────────────────────────────────────────────────────

  const doSave = (publishOverride?: boolean) => {
    const finalPublished =
      publishOverride !== undefined ? publishOverride : published;

    if (!title.trim()) {
      setSaveStatus("error");
      setSaveError("Title is required.");
      return;
    }
    if (!slug.trim()) {
      setSaveStatus("error");
      setSaveError("Slug is required.");
      return;
    }

    setSaveStatus("saving");
    setSaveError("");

    const payload: BlogPostInput = {
      id: postId || undefined,
      title,
      slug,
      content,
      excerpt,
      published: finalPublished,
      category,
      meta_title: metaTitle || title,
      meta_description: metaDesc,
      cover_image_url: coverUrl,
      read_time: readTime,
    };

    startTransition(async () => {
      const result = await saveBlogPost(payload);
      if (result.success) {
        setSaveStatus("saved");
        setPublished(finalPublished);
        if (result.id && !postId) {
          setPostId(result.id);
          // Update URL to edit page without hard navigation
          window.history.replaceState(
            {},
            "",
            `/admin/blog/${result.id}/edit`
          );
        }
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
        setSaveError(result.error ?? "Failed to save. Please try again.");
      }
    });
  };

  const handleDelete = () => {
    if (!postId) return;
    startTransition(async () => {
      await deleteBlogPost(postId);
      router.push("/admin/blog");
      router.refresh();
    });
  };

  // ── Input style helper ────────────────────────────────────────────────────
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 12px",
    border: "1.5px solid #E2E8F0",
    borderRadius: 8,
    fontSize: 13,
    color: "#1A1A1A",
    outline: "none",
    fontFamily: "inherit",
    backgroundColor: "#FFFFFF",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    fontWeight: 700,
    color: "#64748B",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: 5,
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 64px)",
        margin: "-24px",
      }}
    >
      {/* ── Top action bar ─────────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 64,
          zIndex: 20,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {/* Back */}
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: "#64748B",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: 7,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#F1F5F9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "transparent";
          }}
        >
          <ArrowLeft size={15} />
          All Posts
        </button>

        <div
          style={{
            width: 1,
            height: 24,
            backgroundColor: "#E2E8F0",
            flexShrink: 0,
          }}
        />

        {/* Title in bar */}
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#1B3A6B",
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title || "Untitled Post"}
        </span>

        {/* Save status */}
        {saveStatus === "saved" && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              color: "#059669",
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={14} />
            Saved
          </span>
        )}
        {saveStatus === "error" && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              color: "#EF4444",
              fontWeight: 600,
            }}
          >
            <AlertCircle size={14} />
            {saveError}
          </span>
        )}

        {/* Preview link */}
        {postId && slug && (
          <a
            href={`/blog/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              fontWeight: 600,
              color: "#64748B",
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: 7,
              border: "1px solid #E2E8F0",
            }}
          >
            <ExternalLink size={12} />
            Preview
          </a>
        )}

        {/* Save Draft */}
        <button
          type="button"
          onClick={() => doSave(false)}
          disabled={isPending}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 8,
            border: "1.5px solid #E2E8F0",
            backgroundColor: "#FFFFFF",
            color: "#374151",
            fontSize: 13,
            fontWeight: 600,
            cursor: isPending ? "not-allowed" : "pointer",
            opacity: isPending ? 0.6 : 1,
          }}
        >
          {isPending && saveStatus === "saving" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          Save Draft
        </button>

        {/* Publish / Unpublish */}
        <button
          type="button"
          onClick={() => doSave(!published)}
          disabled={isPending}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: published ? "#EF4444" : "#1B3A6B",
            color: "#FFFFFF",
            fontSize: 13,
            fontWeight: 700,
            cursor: isPending ? "not-allowed" : "pointer",
            opacity: isPending ? 0.7 : 1,
          }}
        >
          {published ? (
            <>
              <EyeOff size={14} />
              Unpublish
            </>
          ) : (
            <>
              <Globe size={14} />
              Publish Now
            </>
          )}
        </button>
      </div>

      {/* ── Body: editor + sidebar ─────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          backgroundColor: "#F1F5F9",
        }}
        className="blog-editor-body"
      >
        {/* Left: content area */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Title */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: "20px 24px",
              border: "1px solid #E2E8F0",
            }}
          >
            <input
              type="text"
              placeholder="Post title…"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              style={{
                width: "100%",
                fontSize: 26,
                fontWeight: 700,
                color: "#1B3A6B",
                border: "none",
                outline: "none",
                fontFamily: "inherit",
                backgroundColor: "transparent",
                lineHeight: 1.3,
              }}
            />
            {/* Slug row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 10,
                paddingTop: 10,
                borderTop: "1px solid #F1F5F9",
              }}
            >
              <span
                style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}
              >
                /blog/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  slugManuallyEdited.current = true;
                  setSlug(e.target.value.toLowerCase().replace(/\s/g, "-"));
                }}
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontFamily: "monospace",
                  color: "#475569",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  padding: 0,
                }}
                placeholder="post-slug"
              />
            </div>
          </div>

          {/* Markdown toolbar + textarea */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              border: "1px solid #E2E8F0",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            {/* Toolbar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "10px 16px",
                borderBottom: "1px solid #F1F5F9",
                flexWrap: "wrap",
              }}
            >
              {toolbarGroups.map((group, gi) => (
                <div
                  key={gi}
                  style={{ display: "flex", gap: 3, alignItems: "center" }}
                >
                  {group.map((btn, bi) => (
                    <ToolBtn key={bi} onClick={btn.action} title={btn.title}>
                      {btn.icon}
                    </ToolBtn>
                  ))}
                  {gi < toolbarGroups.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        height: 20,
                        backgroundColor: "#E2E8F0",
                        margin: "0 4px",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              ))}

              {/* Read time indicator */}
              <div style={{ marginLeft: "auto" }}>
                <span style={{ fontSize: 11, color: "#94A3B8" }}>
                  {readTime || estimateReadTime(content)} ·{" "}
                  {content.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
            </div>

            {/* Content textarea */}
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Write your article in Markdown…\n\nTips:\n  ## Section heading\n  **bold**, *italic*\n  - bullet point\n  > blockquote`}
              style={{
                flex: 1,
                width: "100%",
                minHeight: 520,
                padding: "20px 24px",
                border: "none",
                outline: "none",
                resize: "vertical",
                fontSize: 14,
                lineHeight: 1.8,
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                color: "#1A1A1A",
                backgroundColor: "transparent",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Right: settings sidebar */}
        <div
          style={{
            width: 280,
            flexShrink: 0,
            borderLeft: "1px solid #E2E8F0",
            backgroundColor: "#FFFFFF",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
          className="blog-editor-sidebar"
        >
          {/* Status */}
          <div
            style={{
              padding: "20px 20px 16px",
              borderBottom: "1px solid #F1F5F9",
            }}
          >
            <p style={labelStyle}>Status</p>
            <div
              style={{
                display: "flex",
                gap: 8,
              }}
            >
              {[
                { val: false, label: "Draft" },
                { val: true, label: "Published" },
              ].map((opt) => (
                <button
                  key={String(opt.val)}
                  type="button"
                  onClick={() => setPublished(opt.val)}
                  style={{
                    flex: 1,
                    padding: "7px",
                    borderRadius: 8,
                    border: `1.5px solid ${published === opt.val ? "#1B3A6B" : "#E2E8F0"}`,
                    backgroundColor:
                      published === opt.val ? "#EEF2F8" : "#FFFFFF",
                    color:
                      published === opt.val ? "#1B3A6B" : "#64748B",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #F1F5F9",
            }}
          >
            <label style={labelStyle}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                ...inputStyle,
                cursor: "pointer",
                appearance: "auto",
              }}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #F1F5F9",
            }}
          >
            <label style={labelStyle}>
              Excerpt{" "}
              <span style={{ color: "#CBD5E1", fontWeight: 400 }}>
                ({excerpt.length}/200)
              </span>
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value.slice(0, 200))}
              placeholder="Short summary shown in blog listing…"
              rows={3}
              style={{
                ...inputStyle,
                resize: "vertical",
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Cover image */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #F1F5F9",
            }}
          >
            <label style={labelStyle}>Cover Image URL</label>
            <input
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="https://..."
              style={inputStyle}
            />
            {coverUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverUrl}
                alt="cover preview"
                style={{
                  marginTop: 8,
                  width: "100%",
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 6,
                  border: "1px solid #E2E8F0",
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            )}
          </div>

          {/* Read time */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #F1F5F9",
            }}
          >
            <label style={labelStyle}>Read Time</label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="Auto-calculated"
              style={inputStyle}
            />
          </div>

          {/* SEO (collapsible) */}
          <div style={{ borderBottom: "1px solid #F1F5F9" }}>
            <button
              type="button"
              onClick={() => setSeoOpen((o) => !o)}
              style={{
                width: "100%",
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                color: "#64748B",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              SEO Settings
              <span
                style={{
                  fontSize: 16,
                  transform: seoOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              >
                ›
              </span>
            </button>
            {seoOpen && (
              <div style={{ padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={labelStyle}>
                    Meta Title{" "}
                    <span style={{ color: "#CBD5E1", fontWeight: 400 }}>
                      ({(metaTitle || title).length}/60)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Defaults to post title"
                    style={inputStyle}
                  />
                  {/* Character bar */}
                  <div
                    style={{
                      marginTop: 4,
                      height: 3,
                      borderRadius: 2,
                      backgroundColor: "#F1F5F9",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 2,
                        width: `${Math.min(((metaTitle || title).length / 60) * 100, 100)}%`,
                        backgroundColor:
                          (metaTitle || title).length > 60
                            ? "#EF4444"
                            : (metaTitle || title).length > 50
                            ? "#F59E0B"
                            : "#22C55E",
                        transition: "width 0.2s",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>
                    Meta Description{" "}
                    <span style={{ color: "#CBD5E1", fontWeight: 400 }}>
                      ({metaDesc.length}/160)
                    </span>
                  </label>
                  <textarea
                    value={metaDesc}
                    onChange={(e) =>
                      setMetaDesc(e.target.value.slice(0, 160))
                    }
                    rows={3}
                    placeholder="Short description for search results…"
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                  <div
                    style={{
                      marginTop: 4,
                      height: 3,
                      borderRadius: 2,
                      backgroundColor: "#F1F5F9",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 2,
                        width: `${Math.min((metaDesc.length / 160) * 100, 100)}%`,
                        backgroundColor:
                          metaDesc.length > 155
                            ? "#EF4444"
                            : metaDesc.length > 130
                            ? "#F59E0B"
                            : "#22C55E",
                        transition: "width 0.2s",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Danger zone: delete */}
          {postId && (
            <div style={{ padding: "16px 20px", marginTop: "auto" }}>
              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "1.5px solid #FCA5A5",
                    backgroundColor: "#FFF5F5",
                    color: "#EF4444",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    justifyContent: "center",
                  }}
                >
                  <Trash2 size={13} />
                  Delete Post
                </button>
              ) : (
                <div
                  style={{
                    backgroundColor: "#FFF5F5",
                    border: "1.5px solid #FCA5A5",
                    borderRadius: 8,
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: 12,
                      color: "#EF4444",
                      fontWeight: 600,
                      marginBottom: 10,
                    }}
                  >
                    Delete permanently?
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      onClick={handleDelete}
                      style={{
                        flex: 1,
                        padding: "7px",
                        borderRadius: 6,
                        border: "none",
                        backgroundColor: "#EF4444",
                        color: "#FFFFFF",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Yes, delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      style={{
                        flex: 1,
                        padding: "7px",
                        borderRadius: 6,
                        border: "1px solid #E2E8F0",
                        backgroundColor: "#FFFFFF",
                        color: "#64748B",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .blog-editor-body { flex-direction: column !important; }
          .blog-editor-sidebar {
            width: 100% !important;
            border-left: none !important;
            border-top: 1px solid #E2E8F0;
          }
        }
      `}</style>
    </div>
  );
}
