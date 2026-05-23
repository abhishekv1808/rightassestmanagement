import { ArrowUpRight, Users } from "lucide-react";
import { SOCIAL_PLATFORMS } from "@/components/icons/social-icons";

export default function SocialFollowBanner() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0B1830" }}
    >
      {/* Subtle gold noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.35) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">

        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.25)" }}
            >
              <Users className="w-3 h-3" style={{ color: "#C9A84C" }} />
            </div>
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "#C9A84C" }}
            >
              Join Our Community
            </span>
          </div>

          <h2
            className="font-heading font-bold text-white mb-3"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", lineHeight: 1.2 }}
          >
            Follow Us for Free{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C9A84C 0%, #E8CC6E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Daily Insights
            </span>
          </h2>

          <p
            className="text-sm sm:text-base max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Get expert financial tips, property guides & legal updates across your favourite platforms — completely free.
          </p>
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SOCIAL_PLATFORMS.map(({ icon: Icon, name, handle, desc, href, accent }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow Right Asset Management on ${name}`}
              className="group flex flex-col gap-4 p-5 rounded-2xl transition-all duration-250 hover:-translate-y-1.5"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTop: `3px solid ${accent}`,
              }}
            >
              {/* Icon + platform */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: `${accent}1A`, border: `1px solid ${accent}33` }}
                >
                  <Icon className="w-5 h-5" style={{ color: accent }} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm leading-tight">{name}</p>
                  <p className="text-[11px] truncate mt-0.5" style={{ color: accent }}>
                    {handle}
                  </p>
                </div>
              </div>

              {/* Content description */}
              <p className="text-xs leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                {desc}
              </p>

              {/* Follow CTA */}
              <div
                className="inline-flex items-center gap-1.5 text-xs font-semibold pt-1 border-t transition-colors duration-200"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                <span className="group-hover:text-white transition-colors duration-200">Follow</span>
                <ArrowUpRight
                  className="w-3 h-3 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: accent }}
                />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom nudge */}
        <p className="text-center text-xs mt-8" style={{ color: "rgba(255,255,255,0.25)" }}>
          Join thousands of Bangaloreans getting free financial, property & legal tips every week.
        </p>

      </div>

      {/* Bottom gold line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.2) 50%, transparent 100%)",
        }}
      />
    </section>
  );
}
