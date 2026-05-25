"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Workflow, FileCheck } from "lucide-react";

const PILLARS = [
  {
    Icon: ShieldCheck,
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
    title: "Expert Guidance",
    body: "Our advisors bring deep domain expertise across finance, real estate documentation, and legal advisory — so every decision you make is informed, accurate, and professional.",
  },
  {
    Icon: Workflow,
    color: "#C9A84C",
    lightBg: "#FBF5E6",
    title: "End-to-End Support",
    body: "We don't just advise — we execute. From the first consultation to the final outcome, we manage paperwork, coordinate with authorities, and keep you informed at every step.",
  },
  {
    Icon: FileCheck,
    color: "#0D7E7E",
    lightBg: "#E6F4F4",
    title: "Transparent Process",
    body: "No hidden fees. No surprises. Clear pricing, clear timelines, and complete visibility into what's happening with your case or investment — always.",
  },
];


export default function WhyRightAsset() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#F9F8F5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
            style={{ color: "#C9A84C" }}
          >
            Why Us
          </p>
          <h2
            className="font-heading font-bold text-4xl sm:text-5xl mb-4"
            style={{ color: "#1B3A6B" }}
          >
            Why Choose Right Asset?
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            We built this firm to solve a real problem: great advice rarely comes with great execution.
            We changed that.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="bg-white rounded-2xl p-8"
              style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.06)" }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: p.lightBg }}
              >
                <p.Icon className="w-7 h-7" style={{ color: p.color }} />
              </div>
              <h3
                className="font-heading font-semibold text-xl mb-3"
                style={{ color: "#1A1A1A" }}
              >
                {p.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom promise */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 text-base font-medium italic"
          style={{ color: "#1B3A6B" }}
        >
          &ldquo;We don&apos;t just advise — we execute. From the first consultation to the final outcome, we stay with you.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
