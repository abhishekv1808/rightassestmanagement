"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ramesh Shetty",
    role: "Business Owner, Bangalore",
    service: "Portfolio Management & Mutual Funds",
    quote:
      "Right Asset simplified my investment portfolio completely. What was scattered across eight different places is now professionally managed under one trusted advisor. Returns have improved and I finally have clarity.",
    rating: 5,
    initial: "RS",
  },
  {
    name: "Kavitha Reddy",
    role: "Senior IT Professional, Bangalore",
    service: "Property Registration & E-Khatha",
    quote:
      "They handled my entire property registration in Bangalore without me running to a single office. All documentation, stamp duty, Sub-Registrar coordination — done in under 3 weeks. Truly end-to-end.",
    rating: 5,
    initial: "KR",
  },
  {
    name: "Suresh Anand",
    role: "Retired Professional, Bangalore",
    service: "Property Dispute Advisory",
    quote:
      "The legal team helped me resolve a decade-old boundary dispute with clear, professional advice and a calm approach. No unnecessary delays. The outcome was far better than I expected.",
    rating: 5,
    initial: "SA",
  },
  {
    name: "Priya Nair",
    role: "Homemaker & Entrepreneur, Bangalore",
    service: "Tax Planning & ITR Filing",
    quote:
      "I used to panic every March. Right Asset took over my tax planning mid-year and saved me significantly. The filing was done before I even remembered the deadline.",
    rating: 5,
    initial: "PN",
  },
];

const AVATAR_COLORS = ["#1B3A6B", "#0D7E7E", "#6B46C1", "#C9A84C"];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#F9F8F5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
            style={{ color: "#C9A84C" }}
          >
            Client Stories
          </p>
          <h2
            className="font-heading font-bold text-4xl sm:text-5xl mb-4"
            style={{ color: "#1B3A6B" }}
          >
            What Our Clients Say
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            500+ clients across Bangalore trust Right Asset Management for their most important financial and legal decisions.
          </p>
        </motion.div>

        {/* Cards — horizontal scroll on mobile, 4-col grid on desktop */}
        <div className="flex gap-6 overflow-x-auto pb-4 lg:overflow-visible lg:grid lg:grid-cols-4 snap-x snap-mandatory lg:snap-none">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex-shrink-0 w-[82vw] sm:w-[55vw] lg:w-auto snap-start"
            >
              <div
                className="h-full flex flex-col bg-white rounded-2xl p-7"
                style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-current"
                      style={{ color: "#C9A84C" }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-7 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                    style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                    <p
                      className="text-xs font-medium mt-0.5"
                      style={{ color: "#C9A84C" }}
                    >
                      {t.service}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate rating */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-current" style={{ color: "#C9A84C" }} />
            ))}
          </div>
          <p className="text-sm text-gray-500">
            <strong className="text-gray-800">4.9 / 5</strong> from 500+ clients across Bangalore
          </p>
        </motion.div>
      </div>
    </section>
  );
}
