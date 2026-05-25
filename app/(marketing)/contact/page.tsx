import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import LeadForm from "@/components/forms/LeadForm";

// ─── SEO ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Contact Us — Book a Free Consultation",
  description:
    "Get in touch with Right Asset Management in Bangalore. Book a free consultation for financial planning, real estate documentation, or legal advisory services.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONTACT_ITEMS = [
  {
    Icon: MapPin,
    label: "Our Office",
    line1: "Right Asset Management",
    line2: "Bangalore, Karnataka — 560 001",
    color: "#C9A84C",
    lightBg: "#FBF5E6",
    href: null,
  },
  {
    Icon: Phone,
    label: "Call Us",
    line1: "+91 99999 99999",
    line2: "Mon – Sat, 9 AM – 6 PM",
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
    href: "tel:+919999999999",
  },
  {
    Icon: Mail,
    label: "Email Us",
    line1: "info@rightasset.in",
    line2: "We reply within 24 hours",
    color: "#0D7E7E",
    lightBg: "#E6F4F4",
    href: "mailto:info@rightasset.in",
  },
  {
    Icon: Clock,
    label: "Office Hours",
    line1: "Monday – Saturday",
    line2: "9:00 AM – 6:00 PM IST",
    color: "#6B46C1",
    lightBg: "#F0EBF9",
    href: null,
  },
];

const QUICK_CONTACT = [
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    desc: "Fastest response — usually within minutes",
    action: "Chat Now",
    href: "https://wa.me/919999999999",
    bg: "#25D366",
    textColor: "white",
  },
  {
    Icon: Phone,
    label: "Call Directly",
    desc: "Speak to an advisor — Mon to Sat, 9 AM–6 PM",
    action: "+91 99999 99999",
    href: "tel:+919999999999",
    bg: "#1B3A6B",
    textColor: "white",
  },
  {
    Icon: Mail,
    label: "Send an Email",
    desc: "For detailed queries — we reply within 24 hours",
    action: "info@rightasset.in",
    href: "mailto:info@rightasset.in",
    bg: "#0D7E7E",
    textColor: "white",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)",
        }}
      >
        {/* Gold grid overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
            <defs>
              <pattern
                id="contact-grid"
                x="0" y="0" width="56" height="56"
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
            <rect width="100%" height="100%" fill="url(#contact-grid)" />
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
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#C9A84C" }}>Contact Us</span>
          </nav>

          <h1
            className="font-heading font-bold text-white mb-3"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 1.15 }}
          >
            Get in Touch
          </h1>
          <p
            className="text-lg max-w-xl"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Book a free consultation, ask a question, or just say hello — we&apos;re
            here to help.
          </p>
        </div>
      </div>

      {/* ── Main contact section ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: "#F9F8F5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* ── Left: contact info ──────────────────────────────────────── */}
            <div className="lg:col-span-5 space-y-6">

              {/* "Let's Talk" intro card */}
              <div
                className="rounded-2xl bg-white p-8"
                style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
                  style={{ color: "#C9A84C" }}
                >
                  We&apos;d love to hear from you
                </p>
                <h2
                  className="font-heading font-bold text-3xl mb-3"
                  style={{ color: "#1B3A6B" }}
                >
                  Let&apos;s Talk
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-7">
                  Right Asset Management offers a free 30-minute initial consultation —
                  no commitment, no sales pressure. Just straightforward guidance from
                  our experienced advisors.
                </p>

                {/* Contact detail rows */}
                <div className="space-y-5">
                  {CONTACT_ITEMS.map((item) => {
                    const content = (
                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: item.lightBg }}
                        >
                          <item.Icon
                            className="w-5 h-5"
                            style={{ color: item.color }}
                          />
                        </div>
                        <div>
                          <p
                            className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                            style={{ color: item.color }}
                          >
                            {item.label}
                          </p>
                          <p className="font-medium text-gray-800 text-sm">
                            {item.line1}
                          </p>
                          <p className="text-gray-400 text-xs mt-0.5">{item.line2}</p>
                        </div>
                      </div>
                    );

                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block hover:opacity-80 transition-opacity"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    );
                  })}
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-2.5 w-full px-5 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp — Fastest Response
                </a>
              </div>

              {/* Map embed card */}
              <div
                className="rounded-2xl bg-white overflow-hidden"
                style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}
              >
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: "#C9A84C" }} />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#1B3A6B" }}
                    >
                      Find Us in Bangalore
                    </span>
                  </div>
                </div>
                {/*
                  TODO: Replace this placeholder with the actual Google Maps embed.
                  Steps: Google Maps → search office address → Share → Embed a map → copy the <iframe> src URL
                  Then replace the div below with:
                  <iframe
                    src="PASTE_EMBED_URL_HERE"
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                */}
                <div
                  className="w-full h-[280px] flex flex-col items-center justify-center gap-3"
                  style={{ backgroundColor: "#EEF2F8" }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(27,58,107,0.1)" }}
                  >
                    <MapPin className="w-7 h-7" style={{ color: "#1B3A6B" }} />
                  </div>
                  <div className="text-center px-6">
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: "#1B3A6B" }}
                    >
                      Map will be added here
                    </p>
                    <p className="text-xs text-gray-400">
                      Office address to be confirmed with client
                    </p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/Bangalore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "#1B3A6B" }}
                  >
                    View Bangalore on Maps
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* ── Right: form ─────────────────────────────────────────────── */}
            <div className="lg:col-span-7">
              <LeadForm
                heading="Book a Free Consultation"
                subtext="Fill in your details and we'll call you back within 24 hours — guaranteed."
              />

              {/* Social proof under form */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-6">
                {[
                  "500+ clients served",
                  "Free 30-min consultation",
                  "No commitment required",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-2 text-xs text-gray-400"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "#C9A84C" }}
                    />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick contact strip ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1B3A6B" }} className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-center text-xs font-semibold uppercase tracking-[0.18em] mb-8"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Other Ways to Reach Us
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {QUICK_CONTACT.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="group flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: item.bg }}
                >
                  <item.Icon className="w-5 h-5" style={{ color: item.textColor }} />
                </div>
                <div>
                  <p className="font-semibold text-white text-base mb-1">
                    {item.label}
                  </p>
                  <p
                    className="text-xs leading-relaxed mb-3"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {item.desc}
                  </p>
                  <span
                    className="flex items-center gap-1.5 text-sm font-semibold transition-opacity group-hover:opacity-80"
                    style={{ color: "#C9A84C" }}
                  >
                    {item.action}
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
