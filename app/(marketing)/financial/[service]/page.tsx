import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  FileText,
  ChevronDown,
} from "lucide-react";
import {
  getServiceBySlug,
  getServicesByVertical,
  allServices,
} from "@/lib/services-data";
import LeadForm from "@/components/forms/LeadForm";
import MutualFundTable from "@/components/sections/MutualFundTable";
import TopStocksWidget from "@/components/widgets/TopStocksWidget";
import ServiceSchema from "@/components/seo/ServiceSchema";
import ServiceStickyBar from "@/components/service/ServiceStickyBar";

// ─── Static params (build all 21 pages at build time) ─────────────────────────

export async function generateStaticParams() {
  return getServicesByVertical("financial")
    // personal-loan has its own dedicated page with a multistep form
    .filter((s) => s.slug !== "personal-loan")
    .map((s) => ({ service: s.slug }));
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const svc = getServiceBySlug(service);
  if (!svc) return { title: "Service Not Found" };
  return {
    title: { absolute: svc.metaTitle },
    description: svc.metaDescription,
    alternates: { canonical: `/financial/${svc.slug}` },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function FinancialServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const svc = getServiceBySlug(service);

  if (!svc || svc.vertical !== "financial") notFound();

  const related = svc.relatedServices
    .map((slug) => allServices.find((s) => s.slug === slug))
    .filter(Boolean);

  return (
    <>
      <ServiceSchema service={svc} />
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
            <defs>
              <pattern id="svc-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#svc-grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
          <nav
            className="flex items-center gap-1.5 text-sm mb-4 sm:mb-6 flex-wrap"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/financial" className="hover:text-white transition-colors">Financial Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#C9A84C" }}>{svc.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
                style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}
              >
                Financial Services
              </div>

              <h1
                className="font-heading font-bold text-white mb-4"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.2 }}
              >
                {svc.title}
              </h1>
              <p
                className="text-base sm:text-lg mb-6 sm:mb-8"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {svc.tagline}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
                >
                  Book a Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/919742826804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.25)", color: "white" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Quick-contact card */}
            <div className="lg:col-span-5">
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <p className="text-white font-semibold mb-1">30-min Consultation</p>
                <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Talk to an experienced advisor about {svc.title.toLowerCase()}.
                </p>
                <a
                  href="https://wa.me/919742826804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
                <p className="text-center text-xs mt-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Usually responds within minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Top stocks widget (equity-commodity only) ────────────────── */}
      {service === "equity-commodity" && (
        <section className="py-10 lg:py-14" style={{ backgroundColor: "#F9F8F5" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-1.5" style={{ color: "#C9A84C" }}>
                Live Market Data
              </p>
              <h2 className="font-heading font-bold text-2xl" style={{ color: "#1B3A6B" }}>
                Top NSE Stocks — Today&apos;s Prices
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                For reference only. Prices are indicative. Not investment advice.
              </p>
            </div>
            <TopStocksWidget />
          </div>
        </section>
      )}

      {/* ── Live NAV table (mutual funds only) ───────────────────────── */}
      {service === "mutual-funds" && (
        <section className="py-10 lg:py-14" style={{ backgroundColor: "#F9F8F5" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-5">
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] mb-1.5"
                style={{ color: "#C9A84C" }}
              >
                Market Data
              </p>
              <h2 className="font-heading font-bold text-2xl" style={{ color: "#1B3A6B" }}>
                Popular Funds — Today&apos;s NAV
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Indicative NAVs. Investments are subject to market risk — read all scheme documents carefully.
              </p>
            </div>
            <MutualFundTable />
          </div>
        </section>
      )}

      {/* ── Main content ──────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-24" style={{ backgroundColor: "#F9F8F5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
            {/* ── Left: content ────────────────────────────────────────── */}
            <div className="lg:col-span-7 space-y-8 sm:space-y-12">

              {/* What is this service */}
              {svc.description && (
                <div>
                  <h2
                    className="font-heading font-bold text-2xl mb-4"
                    style={{ color: "#1B3A6B" }}
                  >
                    What is {svc.title}?
                  </h2>
                  <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                    <p>{svc.description}</p>
                  </div>
                </div>
              )}

              {/* Who is this for */}
              {svc.whoIsItFor.length > 0 && (
                <div>
                  <h2
                    className="font-heading font-bold text-2xl mb-5"
                    style={{ color: "#1B3A6B" }}
                  >
                    Who Is This For?
                  </h2>
                  <ul className="space-y-3">
                    {svc.whoIsItFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: "#C9A84C" }}
                        />
                        <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Process */}
              {svc.process.length > 0 && (
                <div>
                  <h2
                    className="font-heading font-bold text-2xl mb-6"
                    style={{ color: "#1B3A6B" }}
                  >
                    How We Help — Step by Step
                  </h2>
                  <div className="space-y-5">
                    {svc.process.map((step) => (
                      <div key={step.step} className="flex gap-4">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-heading font-bold text-sm"
                          style={{ backgroundColor: "#EEF2F8", color: "#1B3A6B" }}
                        >
                          {String(step.step).padStart(2, "0")}
                        </div>
                        <div className="flex-1 pt-1.5">
                          <p
                            className="font-semibold text-sm mb-1"
                            style={{ color: "#1A1A1A" }}
                          >
                            {step.title}
                          </p>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {svc.benefits.length > 0 && (
                <div
                  className="rounded-2xl p-7"
                  style={{ backgroundColor: "#EEF2F8" }}
                >
                  <h2
                    className="font-heading font-bold text-xl mb-5"
                    style={{ color: "#1B3A6B" }}
                  >
                    Why Choose Right Assets for {svc.title}?
                  </h2>
                  <ul className="space-y-3">
                    {svc.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: "#1B3A6B" }}
                        />
                        <span className="text-sm text-gray-700 leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Documents required */}
              {svc.documentsRequired && svc.documentsRequired.length > 0 && (
                <div>
                  <h2
                    className="font-heading font-bold text-2xl mb-5"
                    style={{ color: "#1B3A6B" }}
                  >
                    Documents Required
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {svc.documentsRequired.map((doc, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-white"
                        style={{ border: "1px solid #E5E7EB" }}
                      >
                        <FileText
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: "#C9A84C" }}
                        />
                        <span className="text-sm text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {svc.faqs.length > 0 && (
                <div>
                  <h2
                    className="font-heading font-bold text-2xl mb-6"
                    style={{ color: "#1B3A6B" }}
                  >
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {svc.faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group rounded-2xl bg-white overflow-hidden"
                        style={{ border: "1px solid #E5E7EB" }}
                      >
                        <summary
                          className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none"
                        >
                          <span
                            className="font-semibold text-sm"
                            style={{ color: "#1A1A1A" }}
                          >
                            {faq.question}
                          </span>
                          <ChevronDown
                            className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                            style={{ color: "#1B3A6B" }}
                          />
                        </summary>
                        <div
                          className="px-5 pb-5 text-sm text-gray-500 leading-relaxed"
                          style={{ borderTop: "1px solid #F3F4F6" }}
                        >
                          <p className="pt-4">{faq.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Right: Lead form ─────────────────────────────────────── */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <LeadForm
                heading="Book a Consultation"
                subtext={`Talk to our advisors about ${svc.title} — no commitment, no sales pressure.`}
                defaultService={svc.title}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Related services ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#C9A84C" }}
            >
              You May Also Need
            </p>
            <h2
              className="font-heading font-bold text-2xl mb-8"
              style={{ color: "#1B3A6B" }}
            >
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((rel) => {
                if (!rel) return null;
                const verticalPath =
                  rel.vertical === "financial"
                    ? "financial"
                    : rel.vertical === "real-estate"
                    ? "real-estate"
                    : "legal";
                return (
                  <Link
                    key={rel.slug}
                    href={`/${verticalPath}/${rel.slug}`}
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    style={{ border: "1px solid #E5E7EB" }}
                  >
                    <div
                      className="w-2 h-10 rounded-full flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#1B3A6B" }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1" style={{ color: "#1A1A1A" }}>
                        {rel.title}
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                        {rel.tagline}
                      </p>
                    </div>
                    <ArrowRight
                      className="w-4 h-4 flex-shrink-0 mt-1 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5"
                      style={{ color: "#1B3A6B" }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <ServiceStickyBar serviceName={svc.title} />
    </>
  );
}
