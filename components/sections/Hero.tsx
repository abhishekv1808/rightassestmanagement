"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

const TRUST = [
  "Transparent Fee Structure",
  "500+ Clients Served",
  "Pan Bangalore Coverage",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
});

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: "78vh",
      }}
    >
      {/* ── Background image (optimized + preloaded via next/image) ─────── */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={70}
        className="object-cover"
        style={{ objectPosition: "center 35%" }}
      />

      {/* ── Dark gradient overlay (navy-tinted) ─────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(14,30,56,0.93) 0%, rgba(14,30,56,0.82) 40%, rgba(14,30,56,0.60) 100%)",
        }}
      />

      {/* ── Background decoration ───────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Gold grid */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.035 }}>
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        {/* Radial glows */}
        <div
          className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.14) 0%, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-56 -left-28 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 65%)" }}
        />
        {/* Diagonal gold accent line */}
        <div
          className="absolute bottom-0 right-0 w-px h-[60%] origin-bottom-right rotate-[30deg] translate-x-20"
          style={{ background: "linear-gradient(to top, rgba(201,168,76,0.2), transparent)" }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
        <div className="max-w-[780px]">

          {/* Eyebrow */}
          <motion.div {...fadeUp(0)}>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] sm:text-sm font-medium mb-5 sm:mb-7"
              style={{
                background: "rgba(201,168,76,0.12)",
                border: "1px solid rgba(201,168,76,0.3)",
                color: "#C9A84C",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#C9A84C", boxShadow: "0 0 7px rgba(201,168,76,0.8)" }}
              />
              Bangalore&apos;s All-in-One Advisory Firm
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.08)}
            className="font-heading font-bold text-white mb-4 sm:mb-6"
            style={{ fontSize: "clamp(1.75rem, 5.2vw, 3.9rem)", lineHeight: 1.15 }}
          >
            Your Trusted Partner for{" "}
            <span style={{ color: "#C9A84C" }}>Financial,&nbsp;Real&nbsp;Estate</span>
            {" "}&amp;{" "}
            <span style={{ color: "#C9A84C" }}>Legal&nbsp;Services</span>{" "}
            in&nbsp;Bangalore
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.17)}
            className="text-[0.95rem] sm:text-[1.125rem] leading-[1.7] sm:leading-[1.75] mb-7 sm:mb-10 max-w-[640px]"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            One destination for 48+ expert services — investments, property, and legal help under
            one roof. Transparent fees. End-to-end execution.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.25)} className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-[15px] shadow-xl transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ backgroundColor: "#C9A84C", color: "#1B3A6B" }}
            >
              Book a Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-semibold text-sm sm:text-[15px] text-white transition-all hover:bg-white/10"
              style={{ border: "1.5px solid rgba(255,255,255,0.25)" }}
            >
              Explore Services
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-2.5 sm:gap-y-3 mt-8 sm:mt-12"
          >
            {TRUST.map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#C9A84C" }} />
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.58)" }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
