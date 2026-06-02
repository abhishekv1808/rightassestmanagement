import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Scale,
  Shield,
  Users,
  Briefcase,
  CreditCard,
  Landmark,
  Wifi,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";
import { getServiceBySlug } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Legal Services in Bangalore — Property, Family & Consumer Case Advisory",
  description:
    "Expert legal advisory in Bangalore for property disputes, family cases, cyber crime, consumer disputes, labour cases, and more. Right Assets Management.",
};

// ─── Cards config ─────────────────────────────────────────────────────────────

const CARDS = [
  { slug: "property-disputes",  Icon: Scale,      color: "#6B46C1", lightBg: "#F0EBF9",  badge: "Most Common",  highlight: "Civil Property Cases" },
  { slug: "family-cases",       Icon: Users,      color: "#0D7E7E", lightBg: "#E6F4F4",  badge: null,           highlight: "Divorce & Maintenance" },
  { slug: "criminal-advisory",  Icon: Shield,     color: "#1B3A6B", lightBg: "#EEF2F8",  badge: null,           highlight: "Know Your Rights" },
  { slug: "consumer-cases",     Icon: ShoppingBag, color: "#C9A84C", lightBg: "#FBF5E6", badge: null,           highlight: "Consumer Forum" },
  { slug: "labour-cases",       Icon: Briefcase,  color: "#6B46C1", lightBg: "#F0EBF9",  badge: null,           highlight: "Workplace Rights" },
  { slug: "cyber-crime",        Icon: Wifi,       color: "#0D7E7E", lightBg: "#E6F4F4",  badge: "Growing Need", highlight: "Online Fraud & Hacking" },
  { slug: "insurance-claims",   Icon: CreditCard, color: "#1B3A6B", lightBg: "#EEF2F8",  badge: null,           highlight: "Claim Dispute Advisory" },
  { slug: "banking-cases",      Icon: Landmark,   color: "#C9A84C", lightBg: "#FBF5E6",  badge: null,           highlight: "Banking & Finance Law" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LegalHubPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What legal services does Right Assets Management offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer legal advisory across 8 areas: property disputes, criminal case advisory, family law (divorce, maintenance), labour cases, insurance claim disputes, banking and financial cases, cyber crime, and consumer disputes."
        }
      },
      {
        "@type": "Question",
        "name": "How do I file a cyber crime complaint in Bangalore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can file a cyber crime complaint at cybercrime.gov.in or call the national helpline 1930. Right Assets Management's legal advisors can guide you through the entire complaint process and documentation."
        }
      },
      {
        "@type": "Question",
        "name": "Does Right Assets Management provide court representation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide legal advisory and connect you with experienced attorneys in Bangalore for court representation. Our role is to guide, prepare your case, and connect you with the right legal professionals."
        }
      },
      {
        "@type": "Question",
        "name": "How much does legal advisory cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a free initial consultation to understand your case. Fee structures depend on the complexity and type of legal matter — your advisor will provide transparent pricing before you engage."
        }
      },
      {
        "@type": "Question",
        "name": "Can Right Assets Management help resolve property disputes without going to court?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we first explore alternative dispute resolution (ADR) options like mediation and arbitration which are faster and less expensive than court proceedings. Court action is recommended only when necessary."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
            <defs>
              <pattern id="legal-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#legal-grid)" />
          </svg>
          <div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav
            className="flex items-center gap-1.5 text-sm mb-6"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#C9A84C" }}>Legal Services</span>
          </nav>

          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
              style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <Scale className="w-3.5 h-3.5" />
              8 Legal Services
            </div>

            <h1
              className="font-heading font-bold text-white mb-4"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 1.15 }}
            >
              Legal Services
              <br />
              <span style={{ color: "#C9A84C" }}>Clear Guidance When It Matters Most</span>
            </h1>

            <p className="text-lg mb-8 max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              Whether you&apos;re facing a property dispute, a family matter, or a cyber crime —
              our legal advisory connects you with the right expertise and guides you
              through every step of the process.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
              >
                Book a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.25)", color: "white" }}
              >
                Explore All Services
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Notice banner ─────────────────────────────────────────────── */}
      <div
        className="py-3.5"
        style={{ backgroundColor: "#EEF2F8", borderBottom: "1px solid rgba(27,58,107,0.12)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs" style={{ color: "#1B3A6B" }}>
            <span className="font-semibold">Important:</span> Right Assets Management provides legal
            advisory and connects clients with qualified lawyers. We are not a law firm and do not
            provide legal representation directly.
          </p>
        </div>
      </div>

      {/* ── Services grid ─────────────────────────────────────────────── */}
      <section id="services" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: "#C9A84C" }}
              >
                Legal Services
              </p>
              <div className="flex-1 h-px" style={{ backgroundColor: "#C9A84C", maxWidth: "60px" }} />
            </div>
            <h2
              className="font-heading font-bold mb-2"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#1A1A1A" }}
            >
              Expert Advisory Across{" "}
              <span style={{ color: "#1B3A6B" }}>8 Case Types</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-lg">
              From property disputes and family law to cyber crime and consumer forums —
              we guide you through every legal challenge with clarity and care.
            </p>
          </div>

          {/* 4-col card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
            {CARDS.map((card) => {
              const svc = getServiceBySlug(card.slug);
              if (!svc) return null;
              return (
                <Link
                  key={card.slug}
                  href={`/legal/${card.slug}`}
                  className="group relative flex flex-col gap-2.5 p-4 md:p-5 rounded-2xl bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                  style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-heading font-bold text-base leading-snug"
                        style={{ color: "#1A1A1A" }}
                      >
                        {svc.title}
                      </p>
                      <p
                        className="text-xs font-semibold mt-1"
                        style={{ color: card.color }}
                      >
                        {card.highlight}
                      </p>
                    </div>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: card.lightBg }}
                    >
                      <card.Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed flex-1">
                    {svc.tagline}
                  </p>

                  <div
                    className="flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
                    style={{ color: card.color }}
                  >
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>

          <p className="mt-8 text-center text-xs text-gray-400">
            All consultations are strictly confidential ·
            Right Assets Management connects you with qualified lawyers suited to your specific case ·
            Not a law firm
          </p>
        </div>
      </section>

      {/* ── Process strip ─────────────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: "#F9F8F5" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
            style={{ color: "#C9A84C" }}
          >
            How It Works
          </p>
          <h2
            className="font-heading font-bold text-3xl mb-12"
            style={{ color: "#1B3A6B" }}
          >
            How We Help With Legal Matters
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Free Consultation", desc: "Tell us about your legal situation — no details are too complex." },
              { step: "02", title: "Case Assessment", desc: "We assess the case type, urgency, and the right legal approach." },
              { step: "03", title: "Lawyer Matching", desc: "We connect you with an experienced lawyer for your specific case." },
              { step: "04", title: "Ongoing Support", desc: "We stay involved to ensure you understand every development." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 font-heading font-bold text-sm"
                  style={{ backgroundColor: "#EEF2F8", color: "#1B3A6B" }}
                >
                  {item.step}
                </div>
                <h3 className="font-heading font-semibold text-base mb-2" style={{ color: "#1A1A1A" }}>
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">
            Facing a Legal Challenge?
          </h2>
          <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>
            Talk to us first — for free. We&apos;ll help you understand your options
            and connect you with the right legal expertise.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "white" }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
