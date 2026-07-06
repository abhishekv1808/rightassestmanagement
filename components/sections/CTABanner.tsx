"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "420px" }}
    >
      {/* ── Background image ───────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/cta-banner.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── Dark gradient overlay (navy-tinted) ────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(14,30,56,0.92) 0%, rgba(14,30,56,0.78) 45%, rgba(14,30,56,0.50) 100%)",
        }}
      />

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 flex flex-col justify-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em]"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(201,168,76,0.3)",
              color: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "#C9A84C",
                boxShadow: "0 0 6px rgba(201,168,76,0.6)",
              }}
            />
            Begin Your Financial Journey
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold text-white max-w-2xl mb-5"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          Start Building A{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #C9A84C 0%, #E8CC6E 50%, #C9A84C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Stronger Financial
          </span>{" "}
          Future Today With Clear Guidance.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm sm:text-base leading-relaxed max-w-lg mb-9"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Our expert advisors help you navigate investments, property decisions,
          and legal matters with personalised strategies tailored to your goals.
          Take the first step — it&apos;s completely free.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #B8953F)",
              color: "#1A1A1A",
              boxShadow:
                "0 0 24px rgba(201,168,76,0.3), 0 4px 14px rgba(0,0,0,0.2)",
            }}
          >
            Start Your Journey
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* ── Bottom accent line ──────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 50%, transparent 100%)",
        }}
      />
    </section>
  );
}
