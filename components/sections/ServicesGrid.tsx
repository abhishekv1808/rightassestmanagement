import Link from "next/link";
import { TrendingUp, Building2, Scale, ArrowRight } from "lucide-react";

const VERTICALS = [
  {
    Icon: TrendingUp,
    name: "Financial Services",
    count: 20,
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
    href: "/financial",
    description:
      "Mutual funds, insurance, home loans, tax planning, NPS, PPF and portfolio management — complete financial lifecycle coverage for individuals and businesses.",
  },
  {
    Icon: Building2,
    name: "Real Estate",
    count: 17,
    color: "#0D7E7E",
    lightBg: "#E6F4F4",
    href: "/real-estate",
    description:
      "Buy, sell, register property, get Khata Certificate, encumbrance certificates, mutation, land conversion, and sale deed documentation — all handled end to end.",
  },
  {
    Icon: Scale,
    name: "Legal Services",
    count: 11,
    color: "#6B46C1",
    lightBg: "#F0EBF9",
    href: "/legal",
    description:
      "Property disputes, family cases, consumer forum, cyber crime, banking cases, labour law — expert legal advisory without the confusion.",
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-14 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-9 sm:mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
            style={{ color: "#C9A84C" }}
          >
            What We Do
          </p>
          <h2
            className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl mb-4"
            style={{ color: "#1B3A6B" }}
          >
            Three Verticals. One Firm.
          </h2>
          <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Right Assets Management brings together expertise across Finance, Real Estate, and Law
            so you never have to coordinate between multiple advisors.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {VERTICALS.map((v) => (
            <Link
              key={v.name}
              href={v.href}
              className="group relative flex flex-col rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}
            >
              {/* Top colour bar */}
              <div className="h-[4px] w-full" style={{ backgroundColor: v.color }} />

              <div className="flex flex-col flex-1 p-5 sm:p-8">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: v.lightBg }}
                >
                  <v.Icon className="w-7 h-7" style={{ color: v.color }} />
                </div>

                {/* Count badge */}
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 w-fit"
                  style={{ backgroundColor: v.lightBg, color: v.color }}
                >
                  {v.count} Services
                </span>

                <h3
                  className="font-heading font-semibold text-xl sm:text-2xl mb-3"
                  style={{ color: "#1A1A1A" }}
                >
                  {v.name}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-7">
                  {v.description}
                </p>

                <div
                  className="flex items-center gap-1.5 text-sm font-semibold mt-auto"
                  style={{ color: v.color }}
                >
                  Explore Services
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
