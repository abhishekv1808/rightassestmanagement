"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Building2, Scale, ArrowRight } from "lucide-react";

const FEATURED = [
  {
    vertical: "Financial",
    verticalColor: "#1B3A6B",
    verticalBg: "#EEF2F8",
    Icon: TrendingUp,
    title: "Mutual Funds",
    tagline: "Grow wealth systematically with expert-guided investing starting from ₹500/month.",
    href: "/financial/mutual-funds",
  },
  {
    vertical: "Financial",
    verticalColor: "#1B3A6B",
    verticalBg: "#EEF2F8",
    Icon: TrendingUp,
    title: "Tax Planning & ITR Filing",
    tagline: "Minimise tax liability legally and file accurate returns before every deadline.",
    href: "/financial/tax-planning",
  },
  {
    vertical: "Real Estate",
    verticalColor: "#0D7E7E",
    verticalBg: "#E6F4F4",
    Icon: Building2,
    title: "Khata Certificate Application",
    tagline: "Get your Khata Certificate — fast, correct, and without queues.",
    href: "/real-estate/khata-certificate",
  },
  {
    vertical: "Real Estate",
    verticalColor: "#0D7E7E",
    verticalBg: "#E6F4F4",
    Icon: Building2,
    title: "Property Registration",
    tagline: "End-to-end assistance at the Sub-Registrar's office — documents, stamp duty, all of it.",
    href: "/real-estate/property-registration",
  },
  {
    vertical: "Legal",
    verticalColor: "#6B46C1",
    verticalBg: "#F0EBF9",
    Icon: Scale,
    title: "Property Disputes",
    tagline: "Expert civil legal advisory for boundary, title, and encroachment disputes.",
    href: "/legal/property-disputes",
  },
  {
    vertical: "Legal",
    verticalColor: "#6B46C1",
    verticalBg: "#F0EBF9",
    Icon: Scale,
    title: "Family Case Support",
    tagline: "Sensitive legal guidance for divorce, maintenance, custody, and family matters.",
    href: "/legal/family-cases",
  },
];


export default function FeaturedServices() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#C9A84C" }}
            >
              Popular Services
            </p>
            <h2
              className="font-heading font-bold text-4xl sm:text-5xl"
              style={{ color: "#1B3A6B" }}
            >
              Featured Services
            </h2>
          </div>
          <Link
            href="/financial"
            className="inline-flex items-center gap-1.5 text-sm font-semibold shrink-0 transition-opacity hover:opacity-75"
            style={{ color: "#1B3A6B" }}
          >
            View All 48 Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED.map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={s.href}
                className="group flex flex-col h-full rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{
                  boxShadow: "0 1px 16px rgba(0,0,0,0.06)",
                  borderLeft: `4px solid ${s.verticalColor}`,
                }}
              >
                <div className="flex flex-col flex-1 p-7">
                  {/* Vertical badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: s.verticalBg }}
                    >
                      <s.Icon className="w-4 h-4" style={{ color: s.verticalColor }} />
                    </div>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: s.verticalColor }}
                    >
                      {s.vertical}
                    </span>
                  </div>

                  <h3
                    className="font-heading font-semibold text-lg mb-2.5"
                    style={{ color: "#1A1A1A" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">
                    {s.tagline}
                  </p>

                  <div
                    className="flex items-center gap-1.5 text-sm font-semibold mt-auto"
                    style={{ color: s.verticalColor }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
