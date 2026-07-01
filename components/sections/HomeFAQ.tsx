import Link from "next/link";
import { Plus, HelpCircle, MessageCircle, Phone, Sparkles } from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What services does Right Assets Management offer?",
    answer:
      "We offer 48+ services across three areas under one roof — Financial Services (mutual funds, insurance, loans, tax planning, portfolio management), Realty Services (buying, selling, property registration, khata, encumbrance certificates, legal documentation), and Legal Services (property disputes, family cases, cyber crime, consumer cases). This means you never have to coordinate between multiple advisors.",
  },
  {
    question: "Is the first consultation really free?",
    answer:
      "Yes. Your first consultation is completely free with no obligation. Our advisors understand your situation and give you a clear roadmap before you commit to anything. For services like home loans and insurance, our advisory is free throughout — we are compensated by the lender or insurer, not by you.",
  },
  {
    question: "Which areas of Bangalore do you serve?",
    answer:
      "We serve clients across all of Bangalore — including Whitefield, Koramangala, Indiranagar, Electronic City, HSR Layout, Jayanagar, JP Nagar, Marathahalli, Sarjapur Road, Hebbal, Yelahanka, and more. For property documentation and registration, our team coordinates with the relevant Sub-Registrar Office and BBMP wards across the city.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply fill out the enquiry form on our website, call us, or message us on WhatsApp. Tell us what you need help with, and our advisor will call you back within 24 hours (usually within 2 hours during business hours) to understand your requirement and explain how we can help.",
  },
  {
    question: "Are your financial advisors qualified and registered?",
    answer:
      "Yes. Our financial advisory is provided by qualified, SEBI-registered advisors, and our insurance and loan guidance follows IRDAI and RBI regulations. For legal matters, we work with experienced advocates. Every recommendation we make is transparent and in your best interest — we never push products for commission.",
  },
  {
    question: "What are your fees and is the pricing transparent?",
    answer:
      "Our fee structure is fully transparent and explained upfront before any engagement begins. Many services — like home loan and insurance advisory — are free to you, as we are paid by the institution. For services that do carry a fee (such as legal documentation or property services), we tell you the exact cost in advance with no hidden charges.",
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function HomeFAQ() {
  // FAQPage structured data for rich results in Google
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="py-14 lg:py-24" style={{ backgroundColor: "#F9F8F5" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── Left: sticky intro + contact card ───────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
              style={{ backgroundColor: "#EEF2F8", color: "#1B3A6B" }}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              FAQs
            </div>

            <h2
              className="font-heading font-bold mb-4"
              style={{ color: "#1B3A6B", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.15 }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-md">
              Everything you need to know before getting in touch. Can&apos;t find
              your answer? Our team is one message away.
            </p>

            {/* Contact card */}
            <div
              className="relative rounded-2xl p-6 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)" }}
            >
              {/* Decorative ring */}
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
                style={{ border: "1px solid rgba(201,168,76,0.18)" }}
                aria-hidden="true"
              />
              <div className="relative">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}
                >
                  <Sparkles className="w-5 h-5" style={{ color: "#C9A84C" }} />
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-1.5">
                  Still have questions?
                </h3>
                <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Talk to an advisor for free — no commitment, no sales pressure.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ backgroundColor: "#C9A84C", color: "#1B3A6B" }}
                  >
                    <Phone className="w-4 h-4" />
                    Contact Us
                  </Link>
                  <a
                    href="https://wa.me/919742826804"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-white/10"
                    style={{ border: "1px solid rgba(255,255,255,0.25)", color: "white" }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: numbered accordion ───────────────────────────────── */}
          <div className="lg:col-span-7 space-y-3">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-white overflow-hidden transition-all duration-200 hover:shadow-md open:shadow-lg"
                style={{ border: "1px solid #E5E7EB" }}
              >
                <summary className="flex items-start gap-4 p-5 cursor-pointer list-none select-none">
                  {/* Number badge */}
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 font-heading font-bold text-sm transition-colors duration-200 group-open:bg-[#C9A84C] group-open:text-[#1B3A6B]"
                    style={{ backgroundColor: "#EEF2F8", color: "#1B3A6B" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Question */}
                  <span
                    className="flex-1 font-semibold text-[15px] pt-1 transition-colors group-open:text-[#1B3A6B]"
                    style={{ color: "#1A1A1A" }}
                  >
                    {faq.question}
                  </span>

                  {/* Plus → rotates to X when open */}
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 transition-all duration-300 group-open:rotate-[135deg]"
                    style={{ backgroundColor: "#F1F5F9" }}
                  >
                    <Plus className="w-4 h-4" style={{ color: "#1B3A6B" }} />
                  </span>
                </summary>

                {/* Answer */}
                <div className="px-5 pb-5 pl-[4.25rem]">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
