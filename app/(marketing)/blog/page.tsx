"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Building2,
  Scale,
  Clock,
  User,
  Search,
} from "lucide-react";
import { allBlogPosts, CATEGORY_META, type BlogPost } from "@/lib/blog-data";
import NewsletterSignup from "@/components/ui/NewsletterSignup";

// ─── Filter config ────────────────────────────────────────────────────────────

const FILTERS: { key: BlogPost["category"] | "all"; label: string; Icon: React.ElementType }[] = [
  { key: "all", label: "All Articles", Icon: BookOpen },
  { key: "financial", label: "Financial", Icon: TrendingUp },
  { key: "real-estate", label: "Real Estate", Icon: Building2 },
  { key: "legal", label: "Legal", Icon: Scale },
];

// ─── Article card ─────────────────────────────────────────────────────────────

function ArticleCard({ post }: { post: BlogPost }) {
  const cat = CATEGORY_META[post.category];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl"
      style={{ border: "1px solid #E5E7EB" }}
    >
      {/* Colour banner */}
      <div
        className="relative h-48 flex items-end p-6"
        style={{
          background: `linear-gradient(135deg, ${cat.color} 0%, ${cat.color}DD 100%)`,
        }}
      >
        {/* Grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.06 }}
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={`blog-grid-${post.slug}`}
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#blog-grid-${post.slug})`} />
        </svg>

        <div className="relative z-10">
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
            }}
          >
            {cat.label}
          </span>
          <h2 className="font-heading font-bold text-white text-lg leading-snug line-clamp-2">
            {post.title}
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {post.author.name.replace("Right Assets Management", "RAM Team")}
            </span>
          </div>
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* CTA */}
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

// ─── Coming Soon card ─────────────────────────────────────────────────────────

function ComingSoonCard({ post }: { post: BlogPost }) {
  const cat = CATEGORY_META[post.category];

  return (
    <div
      className="flex flex-col bg-white rounded-2xl overflow-hidden opacity-60"
      style={{ border: "1px solid #E5E7EB" }}
    >
      <div
        className="h-48 flex items-end p-6 relative"
        style={{
          background: `linear-gradient(135deg, ${cat.color}80 0%, ${cat.color}50 100%)`,
        }}
      >
        <div className="relative z-10">
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
            }}
          >
            Coming Soon
          </span>
          <h2 className="font-heading font-bold text-white text-lg leading-snug line-clamp-2">
            {post.title}
          </h2>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<
    BlogPost["category"] | "all"
  >("all");

  const publishedPosts = allBlogPosts.filter((p) => p.published);
  const upcomingPosts = allBlogPosts.filter((p) => !p.published);

  const filteredPublished =
    activeFilter === "all"
      ? publishedPosts
      : publishedPosts.filter((p) => p.category === activeFilter);

  const filteredUpcoming =
    activeFilter === "all"
      ? upcomingPosts
      : upcomingPosts.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.04 }}
          >
            <defs>
              <pattern
                id="blog-hero-grid"
                x="0"
                y="0"
                width="56"
                height="56"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 56 0 L 0 0 0 56"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#blog-hero-grid)"
            />
          </svg>
          <div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav
            className="flex items-center gap-1.5 text-sm mb-6"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#C9A84C" }}>Blog</span>
          </nav>

          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
              style={{
                backgroundColor: "rgba(201,168,76,0.15)",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Insights & Guides
            </div>

            <h1
              className="font-heading font-bold text-white mb-4"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                lineHeight: 1.15,
              }}
            >
              Blog & Insights
              <br />
              <span style={{ color: "#C9A84C" }}>
                From Our Experts
              </span>
            </h1>

            <p
              className="text-lg max-w-2xl"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Expert guides on financial planning, real estate documentation,
              and legal advisory — written for Bangalore professionals in plain,
              actionable language.
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter + Articles ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? "#1B3A6B" : "#F1F5F9",
                    color: isActive ? "white" : "#64748B",
                    border: isActive
                      ? "1px solid #1B3A6B"
                      : "1px solid transparent",
                  }}
                >
                  <f.Icon className="w-4 h-4" />
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Published articles */}
          {filteredPublished.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: "#C9A84C" }}
                >
                  Latest Articles
                </p>
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: "#C9A84C", maxWidth: "60px" }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {filteredPublished.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}

          {/* Upcoming articles */}
          {filteredUpcoming.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: "#94A3B8" }}
                >
                  Coming Soon
                </p>
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: "#E2E8F0", maxWidth: "60px" }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUpcoming.map((post) => (
                  <ComingSoonCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}

          {/* Empty state */}
          {filteredPublished.length === 0 &&
            filteredUpcoming.length === 0 && (
              <div className="text-center py-20">
                <Search
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: "#CBD5E1" }}
                />
                <p className="text-gray-400 text-lg">
                  No articles found for this category yet.
                </p>
              </div>
            )}
        </div>
      </section>

      {/* ── Newsletter Signup ─────────────────────────────────────────── */}
      <NewsletterSignup />

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{
          background:
            "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">
            Have Questions? Talk to an Expert.
          </h2>
          <p
            className="text-base mb-8"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Our articles give you the knowledge — our advisors give you the
            plan. Book a free consultation with our experienced team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
          >
            Book Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
