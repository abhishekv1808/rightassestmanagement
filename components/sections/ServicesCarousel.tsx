"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { allServices, type Service } from "@/lib/services-data";

// ── helpers ───────────────────────────────────────────────────────
const VERTICAL_META: Record<Service["vertical"], { label: string; color: string; light: string }> = {
  financial:    { label: "Financial",    color: "#1B3A6B", light: "#EEF2F8" },
  "real-estate":{ label: "Real Estate",  color: "#0D7E7E", light: "#E6F4F4" },
  legal:        { label: "Legal",        color: "#6B46C1", light: "#F0EBF9" },
};

function verticalPath(v: Service["vertical"]) {
  return v === "real-estate" ? "real-estate" : v;
}

// ── single card ────────────────────────────────────────────────────
function ServiceCard({ service }: { service: Service }) {
  const meta = VERTICAL_META[service.vertical];

  return (
    <Link
      href={`/${verticalPath(service.vertical)}/${service.slug}`}
      className="group flex-shrink-0 w-[270px] rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
      style={{ border: "1px solid #E5E7EB" }}
    >
      {/* ── Image / Placeholder ── */}
      <div className="relative h-[170px] overflow-hidden" style={{ backgroundColor: meta.light }}>
        <Image
          src={`/images/services/${service.slug}.jpg`}
          alt={service.title}
          fill
          sizes="270px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Gradient overlay — always rendered, image sits on top when it loads */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{
            background: `linear-gradient(145deg, ${meta.color}18 0%, ${meta.color}35 100%)`,
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: meta.color + "22", border: `1.5px solid ${meta.color}33` }}
          >
            <span className="text-2xl font-bold" style={{ color: meta.color }}>
              {service.title.charAt(0)}
            </span>
          </div>
        </div>

        {/* Vertical badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: meta.color, color: "#fff" }}
        >
          {meta.label}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1 leading-snug" style={{ color: "#1A1A1A" }}>
          {service.title}
        </h3>
        <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: "#64748B" }}>
          {service.tagline}
        </p>
        <span
          className="inline-flex items-center gap-1 text-xs font-bold"
          style={{ color: "#C9A84C" }}
        >
          Learn More
          <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

// ── marquee row ────────────────────────────────────────────────────
function MarqueeRow({
  services,
  direction,
}: {
  services: Service[];
  direction: "left" | "right";
}) {
  // duplicate for seamless loop
  const doubled = [...services, ...services];

  return (
    <div className="marquee-track overflow-hidden">
      <div
        className={`flex gap-5 w-max ${direction === "left" ? "marquee-left" : "marquee-right"}`}
      >
        {doubled.map((s, i) => (
          <ServiceCard key={`${s.slug}-${i}`} service={s} />
        ))}
      </div>
    </div>
  );
}

// ── section ────────────────────────────────────────────────────────
export default function ServicesCarousel() {
  const financial   = allServices.filter((s) => s.vertical === "financial");
  const realEstate  = allServices.filter((s) => s.vertical === "real-estate");
  const legal       = allServices.filter((s) => s.vertical === "legal");

  // Row 1: Financial | Row 2: Real Estate + Legal (padded to match rhythm)
  const row1 = financial;
  const row2 = [...realEstate, ...legal];

  return (
    <section className="py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: "#F9F8F5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#C9A84C" }}
            >
              Our Services
            </p>
            <h2
              className="font-heading font-bold"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#1B3A6B" }}
            >
              48+ Services.{" "}
              <span style={{ color: "#C9A84C" }}>One Trusted Partner.</span>
            </h2>
            <p className="mt-3 text-sm max-w-xl" style={{ color: "#64748B" }}>
              Financial planning, real estate transactions, and legal advisory — all under one roof, wherever you are.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            {(["financial", "real-estate", "legal"] as Service["vertical"][]).map((v) => {
              const m = VERTICAL_META[v];
              return (
                <Link
                  key={v}
                  href={`/${verticalPath(v)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all hover:opacity-80"
                  style={{ backgroundColor: m.light, color: m.color }}
                >
                  {m.label}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-5">
        <MarqueeRow services={row1} direction="left" />
        <MarqueeRow services={row2} direction="right" />
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex justify-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: "#1B3A6B", color: "#fff" }}
        >
          Book a Consultation
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
