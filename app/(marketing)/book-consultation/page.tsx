import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, CheckCircle2, Clock, ShieldCheck, Users } from "lucide-react";
import ConsultationBooking from "@/components/booking/ConsultationBooking";

export const metadata: Metadata = {
  title: "Book a Free Consultation in Bangalore | Right Assets Management",
  description:
    "Schedule a free consultation with our financial, real estate, or legal advisors in Bangalore. Pick a date and time that suits you — no commitment, no sales pressure.",
};

const POINTS = [
  { Icon: CheckCircle2, title: "100% Free", sub: "No charge for your first consultation" },
  { Icon: Clock, title: "Pick Your Slot", sub: "Choose a date & time that suits you" },
  { Icon: Users, title: "Expert Advisors", sub: "Financial, real estate & legal experts" },
  { Icon: ShieldCheck, title: "No Pressure", sub: "Honest advice, zero obligation" },
];

export default function BookConsultationPage() {
  return (
    <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 55%, #071428 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          <defs>
            <pattern id="bc-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bc-grid)" />
        </svg>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-8 flex-wrap" style={{ color: "rgba(255,255,255,0.5)" }} aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: "#C9A84C" }}>Book a Consultation</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left — pitch */}
          <div className="lg:col-span-6 lg:pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}>
              Free Consultation
            </div>
            <h1 className="font-heading font-bold text-white mb-4" style={{ fontSize: "clamp(1.85rem, 4vw, 2.85rem)", lineHeight: 1.15 }}>
              Talk to an Expert —{" "}
              <span style={{ color: "#C9A84C" }}>On Your Schedule</span>
            </h1>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.6 }}>
              Book a free, no-obligation consultation with our advisors. Choose a phone call,
              video meeting, or visit our Bangalore office — at a time that works for you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ maxWidth: 500 }}>
              {POINTS.map(({ Icon, title, sub }) => (
                <div key={title} className="flex items-start gap-3 rounded-xl px-4 py-3.5" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#C9A84C" }} />
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">{title}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — booking widget */}
          <div className="lg:col-span-6">
            <ConsultationBooking />
          </div>
        </div>
      </div>
    </div>
  );
}
