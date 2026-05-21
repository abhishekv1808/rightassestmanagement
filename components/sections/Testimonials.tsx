"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ramesh Shetty",
    role: "Business Owner",
    location: "Jayanagar, Bangalore",
    service: "Portfolio Management & Mutual Funds",
    quote:
      "Right Asset simplified my investment portfolio completely. What was scattered across eight different places is now professionally managed under one trusted advisor. Returns have improved and I finally have clarity on my financial future.",
    rating: 5,
    initial: "RS",
    color: "#1B3A6B",
  },
  {
    name: "Kavitha Reddy",
    role: "Senior IT Professional",
    location: "Whitefield, Bangalore",
    service: "Property Registration & E-Khatha",
    quote:
      "They handled my entire property registration without me running to a single government office. All documentation, stamp duty, Sub-Registrar coordination — done in under 3 weeks. Truly end-to-end service like no one else in Bangalore.",
    rating: 5,
    initial: "KR",
    color: "#0D7E7E",
  },
  {
    name: "Suresh Anand",
    role: "Retired Professional",
    location: "Malleswaram, Bangalore",
    service: "Property Dispute Advisory",
    quote:
      "The legal team helped me resolve a decade-old boundary dispute with clear, professional advice and a calm approach. No unnecessary delays, no confusing jargon. The outcome was far better than I ever expected.",
    rating: 5,
    initial: "SA",
    color: "#6B46C1",
  },
  {
    name: "Priya Nair",
    role: "Homemaker & Entrepreneur",
    location: "Indiranagar, Bangalore",
    service: "Tax Planning & ITR Filing",
    quote:
      "I used to panic every March. Right Asset took over my tax planning mid-year and saved me significantly. The filing was done before I even remembered the deadline. I wish I had found them sooner.",
    rating: 5,
    initial: "PN",
    color: "#C9A84C",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((i) => (i + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[active];

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(150deg, #0D1F3C 0%, #1B3A6B 50%, #0A2550 100%)",
      }}
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          <defs>
            <pattern id="t-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#t-grid)" />
        </svg>
      </div>

      {/* Decorative radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: "#C9A84C" }}
          >
            Client Stories
          </p>
          <h2
            className="font-heading font-bold text-white mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Trusted by 500+ Clients{" "}
            <span style={{ color: "#C9A84C" }}>Across Bangalore</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem" }}>
            Real outcomes for real people — from investments to property to legal matters.
          </p>
        </motion.div>

        {/* ── Main layout ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── Featured quote card (left 8 cols) ─────────────── */}
          <div className="lg:col-span-8">
            <div
              className="relative rounded-3xl overflow-hidden p-8 sm:p-10 lg:p-12 min-h-[340px] flex flex-col justify-between"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Giant decorative quote mark */}
              <div
                className="absolute top-6 right-8 font-heading font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: "clamp(8rem, 14vw, 12rem)",
                  color: "#C9A84C",
                  opacity: 0.08,
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Service badge + stars */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "rgba(201,168,76,0.15)",
                    color: "#C9A84C",
                    border: "1px solid rgba(201,168,76,0.3)",
                  }}
                >
                  {t.service}
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" style={{ color: "#C9A84C" }} />
                  ))}
                </div>
              </div>

              {/* Quote text — animated */}
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 flex-1 font-heading italic leading-relaxed mb-10"
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>

              {/* Author row */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`author-${active}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-4"
                >
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ring-2 ring-offset-2"
                    style={{
                      backgroundColor: t.color,
                      ringColor: t.color,
                      ringOffsetColor: "transparent",
                      boxShadow: `0 0 0 2px ${t.color}60`,
                    }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-base">{t.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
                      {t.role} · {t.location}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Accent bar at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
                style={{ backgroundColor: t.color }}
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              {/* Dots */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? "2rem" : "0.5rem",
                      height: "0.5rem",
                      backgroundColor: i === active ? "#C9A84C" : "rgba(255,255,255,0.25)",
                    }}
                  />
                ))}
              </div>

              {/* Prev / Next buttons */}
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: "#C9A84C",
                    color: "#1A1A1A",
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Side cards (right 4 cols) ─────────────────────── */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setActive(i)}
                className="flex-shrink-0 w-64 lg:w-auto text-left rounded-2xl p-5 transition-all duration-300"
                style={{
                  background:
                    i === active
                      ? "rgba(201,168,76,0.12)"
                      : "rgba(255,255,255,0.04)",
                  border:
                    i === active
                      ? "1px solid rgba(201,168,76,0.4)"
                      : "1px solid rgba(255,255,255,0.08)",
                  transform: i === active ? "translateX(0)" : undefined,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.initial}
                  </div>
                  <div className="min-w-0">
                    <p
                      className="font-semibold text-sm truncate"
                      style={{ color: i === active ? "#C9A84C" : "white" }}
                    >
                      {item.name}
                    </p>
                    <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {item.role}
                    </p>
                  </div>
                </div>
                <p
                  className="text-xs leading-relaxed line-clamp-2"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {item.quote}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* ── Aggregate stats bar ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "4.9 / 5", label: "Average Rating" },
              { value: "500+", label: "Clients Served" },
              { value: "10+", label: "Years Experience" },
              { value: "48+", label: "Services Offered" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="flex justify-center gap-0.5 mb-2">
                  {stat.label === "Average Rating" &&
                    [1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current" style={{ color: "#C9A84C" }} />
                    ))}
                </div>
                <p
                  className="font-heading font-bold text-3xl mb-1"
                  style={{ color: "#C9A84C" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
