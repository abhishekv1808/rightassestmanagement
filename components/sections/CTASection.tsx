"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, CheckCircle } from "lucide-react";
import LeadForm from "@/components/forms/LeadForm";

const BENEFITS = [
  "Free 30-minute initial consultation",
  "No commitment required",
  "SEBI-registered advisors",
  "Response within 24 hours",
];

export default function CTASection() {
  return (
    <section style={{ backgroundColor: "#1B3A6B" }} className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          <defs>
            <pattern id="cta-grid" x="0" y="0" width="52" height="52" patternUnits="userSpaceOnUse">
              <path d="M 52 0 L 0 0 0 52" fill="none" stroke="#C9A84C" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-4"
              style={{ color: "#C9A84C" }}
            >
              Get Started Today
            </p>
            <h2
              className="font-heading font-bold text-white mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.18 }}
            >
              Ready to Take Control of Your Finances &amp; Property?
            </h2>
            <p
              className="text-base leading-relaxed mb-8 max-w-md"
              style={{ color: "rgba(255,255,255,0.68)" }}
            >
              Book a free consultation today. Our advisors will understand your situation and
              give you a clear roadmap — no pressure, no jargon.
            </p>

            {/* Benefits */}
            <ul className="space-y-3 mb-10">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#C9A84C" }} />
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{b}</span>
                </li>
              ))}
            </ul>

            {/* Contact options */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95 shadow-lg"
                style={{ backgroundColor: "#25D366", color: "white" }}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us Now
              </a>
              <a
                href="tel:+919999999999"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-white/10"
                style={{ border: "1.5px solid rgba(255,255,255,0.28)", color: "white" }}
              >
                <Phone className="w-5 h-5" />
                +91 99999 99999
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.58, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <LeadForm
              heading="Book a Free Consultation"
              subtext="Fill in your details — we'll call you back within 24 hours."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
