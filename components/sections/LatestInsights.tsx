import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { allBlogPosts, CATEGORY_META, type BlogPost } from "@/lib/blog-data";

// ─── Card ─────────────────────────────────────────────────────────────────────

function InsightCard({ post }: { post: BlogPost }) {
  const cat = CATEGORY_META[post.category];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl"
      style={{ border: "1px solid #E5E7EB" }}
    >
      {/* Colour banner */}
      <div
        className="relative h-40 flex items-end p-5"
        style={{ background: `linear-gradient(135deg, ${cat.color} 0%, ${cat.color}DD 100%)` }}
      >
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.06 }} aria-hidden="true">
          <defs>
            <pattern id={`li-grid-${post.slug}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A84C" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#li-grid-${post.slug})`} />
        </svg>
        <div className="relative z-10">
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2.5"
            style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}
          >
            {cat.label}
          </span>
          <h3 className="font-heading font-bold text-white text-base leading-snug line-clamp-2">
            {post.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5"
          style={{ color: cat.color }}
        >
          Read Article
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function LatestInsights() {
  const latest = allBlogPosts
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section className="py-14 lg:py-20" style={{ backgroundColor: "#F9F8F5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-1.5" style={{ color: "#C9A84C" }}>
              Insights & Guides
            </p>
            <h2 className="font-heading font-bold text-2xl lg:text-3xl" style={{ color: "#1B3A6B" }}>
              Latest From Our Experts
            </h2>
            <p className="text-sm text-gray-500 mt-1.5 max-w-lg">
              Practical, jargon-free guides on financial planning, property, and legal matters — written for Bangalore.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98] flex-shrink-0 self-start sm:self-auto"
            style={{ backgroundColor: "#EEF2F8", color: "#1B3A6B" }}
          >
            <BookOpen className="w-4 h-4" />
            View All Articles
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((post) => (
            <InsightCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
