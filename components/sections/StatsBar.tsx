"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const STATS = [
  { value: 48, suffix: "+", label: "Expert Services" },
  { value: 500, suffix: "+", label: "Clients Served" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Bangalore Coverage" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section style={{ backgroundColor: "#1B3A6B" }} className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-6">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <p
                className="font-heading font-bold text-white mb-1.5"
                style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1 }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <div
                className="w-8 h-[2px] mx-auto mb-2.5 rounded-full"
                style={{ backgroundColor: "#C9A84C" }}
              />
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
