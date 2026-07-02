import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Tag,
  ChevronDown,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import {
  allBlogPosts,
  getBlogPostBySlug,
  CATEGORY_META,
} from "@/lib/blog-data";
import LeadForm from "@/components/forms/LeadForm";
import BlogArticleBody from "./BlogArticleBody";

// ─── SSG ──────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return allBlogPosts
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slug }));
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post || !post.published) return notFound();

  const cat = CATEGORY_META[post.category];

  // Related posts
  const relatedPosts = post.relatedSlugs
    .map((s) => allBlogPosts.find((p) => p.slug === s && p.published))
    .filter(Boolean);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Right Assets Management",
      url: "https://rightassetsmanagement.com",
    },
  };

  const faqJsonLd = post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  } : null;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

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
                id="article-grid"
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
            <rect width="100%" height="100%" fill="url(#article-grid)" />
          </svg>
          <div
            className="absolute -top-32 -right-32 w-[440px] h-[440px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-sm mb-6"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/blog"
              className="hover:text-white transition-colors"
            >
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span
              className="truncate max-w-[200px] sm:max-w-xs"
              style={{ color: "#C9A84C" }}
            >
              {post.title}
            </span>
          </nav>

          <div className="max-w-3xl">
            {/* Category badge */}
            <span
              className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
              style={{
                backgroundColor: "rgba(201,168,76,0.15)",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            >
              {cat.label}
            </span>

            <h1
              className="font-heading font-bold text-white mb-5"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                lineHeight: 1.2,
              }}
            >
              {post.title}
            </h1>

            {/* Meta row */}
            <div
              className="flex flex-wrap items-center gap-4 text-sm"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                {post.targetKeyword}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article body ─────────────────────────────────────────────── */}
      <section className="py-12 lg:py-20" style={{ backgroundColor: "#F9F8F5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Main content */}
            <article className="lg:col-span-8">
              <div
                className="bg-white rounded-2xl p-8 sm:p-10 lg:p-12"
                style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}
              >
                {/* Intro */}
                <div className="mb-10">
                  {post.intro.map((p, i) => (
                    <p
                      key={i}
                      className="text-gray-600 text-[16px] leading-[1.8] mb-4 last:mb-0"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                <div
                  className="h-px w-full mb-10"
                  style={{ backgroundColor: "#E5E7EB" }}
                />

                {/* Sections */}
                {post.sections.map((section, idx) => (
                  <div key={idx} className="mb-10 last:mb-0">
                    <h2
                      className="font-heading font-bold text-2xl sm:text-[1.65rem] mb-5"
                      style={{ color: "#1B3A6B", lineHeight: 1.3 }}
                    >
                      {section.heading}
                    </h2>

                    {section.paragraphs.map((p, j) => (
                      <p
                        key={j}
                        className="text-gray-600 text-[15px] leading-[1.85] mb-4"
                      >
                        {p}
                      </p>
                    ))}

                    {section.bullets && (
                      <ul className="space-y-2.5 my-5 pl-1">
                        {section.bullets.map((b, k) => (
                          <li
                            key={k}
                            className="flex items-start gap-3 text-sm text-gray-600"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: cat.color }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.numberedList && (
                      <ol className="space-y-3 my-5 pl-1">
                        {section.numberedList.map((item, k) => (
                          <li
                            key={k}
                            className="flex items-start gap-3 text-sm text-gray-600"
                          >
                            <span
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                              style={{
                                backgroundColor: cat.lightBg,
                                color: cat.color,
                              }}
                            >
                              {k + 1}
                            </span>
                            <div>
                              <span className="font-semibold text-gray-800">
                                {item.title}
                              </span>{" "}
                              — {item.desc}
                            </div>
                          </li>
                        ))}
                      </ol>
                    )}

                    {section.callout && (
                      <div
                        className="rounded-xl p-5 my-6"
                        style={{
                          backgroundColor: "#FBF5E6",
                          borderLeft: "4px solid #C9A84C",
                        }}
                      >
                        <p className="text-sm text-gray-700 leading-relaxed font-medium">
                          💡 {section.callout}
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {/* Divider before FAQ */}
                {post.faqs.length > 0 && (
                  <>
                    <div
                      className="h-px w-full my-10"
                      style={{ backgroundColor: "#E5E7EB" }}
                    />

                    {/* FAQ section */}
                    <div>
                      <h2
                        className="font-heading font-bold text-2xl mb-6"
                        style={{ color: "#1B3A6B" }}
                      >
                        Frequently Asked Questions
                      </h2>
                      <BlogArticleBody faqs={post.faqs} categoryColor={cat.color} />
                    </div>
                  </>
                )}

                {/* Divider before conclusion */}
                <div
                  className="h-px w-full my-10"
                  style={{ backgroundColor: "#E5E7EB" }}
                />

                {/* Conclusion */}
                <div>
                  <h2
                    className="font-heading font-bold text-2xl mb-4"
                    style={{ color: "#1B3A6B" }}
                  >
                    Conclusion
                  </h2>
                  <p className="text-gray-600 text-[15px] leading-[1.85] mb-6">
                    {post.conclusion.text}
                  </p>
                  <div
                    className="rounded-xl p-6"
                    style={{
                      backgroundColor: "#1B3A6B",
                    }}
                  >
                    <p className="text-white text-sm leading-relaxed mb-4">
                      {post.conclusion.cta}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                        style={{
                          backgroundColor: "#C9A84C",
                          color: "#1A1A1A",
                        }}
                      >
                        Book Free Consultation
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <a
                        href="https://wa.me/919742826804"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:bg-white/10"
                        style={{
                          border: "1px solid rgba(255,255,255,0.25)",
                          color: "white",
                        }}
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back to blog */}
              <div className="mt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: "#1B3A6B" }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to all articles
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* Lead form */}
              <LeadForm
                heading="Free Consultation"
                subtext="Have questions about this topic? Our experts can help."
              />

              {/* Related articles */}
              {relatedPosts.length > 0 && (
                <div
                  className="bg-white rounded-2xl p-6"
                  style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <BookOpen
                      className="w-4 h-4"
                      style={{ color: "#C9A84C" }}
                    />
                    <p
                      className="text-xs font-bold uppercase tracking-[0.15em]"
                      style={{ color: "#C9A84C" }}
                    >
                      Related Articles
                    </p>
                  </div>
                  <div className="space-y-4">
                    {relatedPosts.map((rp) => {
                      if (!rp) return null;
                      const rc = CATEGORY_META[rp.category];
                      return (
                        <Link
                          key={rp.slug}
                          href={`/blog/${rp.slug}`}
                          className="group block p-4 rounded-xl transition-all hover:shadow-md"
                          style={{
                            border: "1px solid #E5E7EB",
                          }}
                        >
                          <span
                            className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider mb-2"
                            style={{
                              backgroundColor: rc.lightBg,
                              color: rc.color,
                            }}
                          >
                            {rc.label}
                          </span>
                          <p className="font-heading font-semibold text-sm leading-snug text-gray-800 group-hover:text-[#1B3A6B] transition-colors">
                            {rp.title}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
