import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  CheckCircle2,
  FileText,
  ChevronDown,
  Clock,
  Percent,
  ShieldCheck,
  Banknote,
} from "lucide-react";
import { getServiceBySlug, allServices } from "@/lib/services-data";
import PersonalLoanForm from "@/components/forms/PersonalLoanForm";
import ServiceSchema from "@/components/seo/ServiceSchema";
import ServiceStickyBar from "@/components/service/ServiceStickyBar";

const svc = getServiceBySlug("personal-loan")!;

export const metadata: Metadata = {
  alternates: { canonical: "/financial/personal-loan" },
  title: "Personal Loan in Bangalore — Lowest Rates, Quick Approval | Right Assets Management",
  description:
    "Apply for a personal loan in Bangalore with Right Assets Management. Compare offers from 15+ banks & NBFCs, get the lowest interest rate, and 24–48 hour approval. Check eligibility free.",
};

const LENDERS = [
  "HDFC Bank",
  "ICICI Bank",
  "SBI",
  "Axis Bank",
  "Bajaj Finserv",
  "Kotak Mahindra",
  "Fullerton India",
  "IndusInd Bank",
];

const HIGHLIGHTS = [
  { Icon: Percent, title: "From 10.5% p.a.", sub: "Lowest available rates" },
  { Icon: Clock, title: "24–48 Hours", sub: "Quick disbursal" },
  { Icon: Banknote, title: "Up to ₹40 Lakh", sub: "Based on eligibility" },
  { Icon: ShieldCheck, title: "15+ Lenders", sub: "Compared for you" },
];

export default function PersonalLoanPage() {
  const related = svc.relatedServices
    .map((slug) => allServices.find((s) => s.slug === slug))
    .filter(Boolean);

  return (
    <>
      <ServiceSchema service={svc} />

      {/* ── Hero with multistep form ──────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
            <defs>
              <pattern id="pl-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pl-grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-7 flex-wrap" style={{ color: "rgba(255,255,255,0.5)" }} aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/financial" className="hover:text-white transition-colors">Financial Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#C9A84C" }}>Personal Loans</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left — pitch */}
            <div className="lg:col-span-6">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
                style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}
              >
                Personal Loan · Bangalore
              </div>

              <h1 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(1.85rem, 4vw, 2.85rem)", lineHeight: 1.15 }}>
                Get a Personal Loan at the{" "}
                <span style={{ color: "#C9A84C" }}>Lowest Rate</span> in Bangalore
              </h1>
              <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.6 }}>
                We compare offers from 15+ banks and NBFCs to get you the best interest rate
                for your profile — with approval in as little as 24 hours. 100% free, no obligation.
              </p>

              {/* Highlights grid */}
              <div className="grid grid-cols-2 gap-3 mb-8" style={{ maxWidth: 460 }}>
                {HIGHLIGHTS.map(({ Icon, title, sub }) => (
                  <div
                    key={title}
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(201,168,76,0.15)" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#C9A84C" }} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm leading-tight">{title}</p>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust line */}
              <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: "#C9A84C" }} />
                <span className="text-sm">Checking your offers does not affect your credit score</span>
              </div>
            </div>

            {/* Right — the multistep form */}
            <div className="lg:col-span-6">
              <PersonalLoanForm />
            </div>
          </div>
        </div>
      </div>

      {/* ── Lenders strip ─────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #EEF0F3" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-center mb-5" style={{ color: "#94A3B8" }}>
            We Compare Offers From India&apos;s Leading Lenders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {LENDERS.map((name) => (
              <span
                key={name}
                className="inline-block px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: "#F9F8F5", border: "1px solid #E2E8F0", color: "#475569" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#F9F8F5" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

          {/* What is it */}
          <div>
            <h2 className="font-heading font-bold text-2xl mb-4" style={{ color: "#1B3A6B" }}>
              What is a Personal Loan?
            </h2>
            <p className="text-gray-600 leading-relaxed text-[15px]">{svc.description}</p>
          </div>

          {/* Who is it for */}
          <div>
            <h2 className="font-heading font-bold text-2xl mb-5" style={{ color: "#1B3A6B" }}>
              Who Is This For?
            </h2>
            <ul className="space-y-3">
              {svc.whoIsItFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#C9A84C" }} />
                  <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div>
            <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: "#1B3A6B" }}>
              How We Help — Step by Step
            </h2>
            <div className="space-y-5">
              {svc.process.map((stp) => (
                <div key={stp.step} className="flex gap-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-heading font-bold text-sm"
                    style={{ backgroundColor: "#EEF2F8", color: "#1B3A6B" }}
                  >
                    {String(stp.step).padStart(2, "0")}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <p className="font-semibold text-sm mb-1" style={{ color: "#1A1A1A" }}>{stp.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{stp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="rounded-2xl p-7" style={{ backgroundColor: "#EEF2F8" }}>
            <h2 className="font-heading font-bold text-xl mb-5" style={{ color: "#1B3A6B" }}>
              Why Choose Right Assets for Your Personal Loan?
            </h2>
            <ul className="space-y-3">
              {svc.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#1B3A6B" }} />
                  <span className="text-sm text-gray-700 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents */}
          {svc.documentsRequired && (
            <div>
              <h2 className="font-heading font-bold text-2xl mb-5" style={{ color: "#1B3A6B" }}>
                Documents Required
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {svc.documentsRequired.map((doc, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-white" style={{ border: "1px solid #E5E7EB" }}>
                    <FileText className="w-4 h-4 flex-shrink-0" style={{ color: "#C9A84C" }} />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          <div>
            <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: "#1B3A6B" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {svc.faqs.map((faq, i) => (
                <details key={i} className="group rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid #E5E7EB" }}>
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none">
                    <span className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>{faq.question}</span>
                    <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" style={{ color: "#1B3A6B" }} />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed" style={{ borderTop: "1px solid #F3F4F6" }}>
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related services ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "#C9A84C" }}>
              You May Also Need
            </p>
            <h2 className="font-heading font-bold text-2xl mb-8" style={{ color: "#1B3A6B" }}>
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((rel) => {
                if (!rel) return null;
                const verticalPath =
                  rel.vertical === "financial" ? "financial" : rel.vertical === "real-estate" ? "real-estate" : "legal";
                return (
                  <Link
                    key={rel.slug}
                    href={`/${verticalPath}/${rel.slug}`}
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    style={{ border: "1px solid #E5E7EB" }}
                  >
                    <div className="w-2 h-10 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: "#1B3A6B" }} />
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1" style={{ color: "#1A1A1A" }}>{rel.title}</p>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{rel.tagline}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <ServiceStickyBar serviceName="Personal Loan" />
    </>
  );
}
