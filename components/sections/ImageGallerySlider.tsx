"use client";

import Image from "next/image";

const images = [
  { src: "/images/Cyber Crime & Digital Legal Issues.jpeg", label: "Cyber Crime & Digital Legal Issues" },
  { src: "/images/Financial Planning & Investments.jpeg", label: "Financial Planning & Investments" },
  { src: "/images/Insurance (Health & Life).jpeg", label: "Insurance (Health & Life)" },
  { src: "/images/Legal Services (Property, Family, Consumer, Labour).jpeg", label: "Legal Services" },
  { src: "/images/Loans (Home, Personal, Vehicle).jpeg", label: "Loans" },
  { src: "/images/Property Buying, Selling & Registration.jpeg", label: "Property Buying & Registration" },
  { src: "/images/Property Documentation & Government Records.jpeg", label: "Property Documentation" },
];

const doubled = [...images, ...images];


export default function ImageGallerySlider() {
  return (
    <section
      className="py-20 overflow-hidden"
      style={{ backgroundColor: "#F9F8F5" }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="block h-px w-10"
                style={{ backgroundColor: "#C9A84C" }}
              />
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "#C9A84C" }}
              >
                What We Cover
              </p>
            </div>
            <h2
              className="font-heading font-bold"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "#1B3A6B",
                lineHeight: 1.15,
              }}
            >
              Our Service Areas
            </h2>
          </div>
          <p
            className="text-sm max-w-xs sm:text-right"
            style={{ color: "#64748B", lineHeight: 1.7 }}
          >
            Explore our wide range of services across finance, property, and legal domains.
          </p>
        </div>

        {/* Gold divider */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: "#E5E7EB" }} />
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "#C9A84C" }}
          />
          <div className="w-16 h-px" style={{ backgroundColor: "#C9A84C" }} />
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "#C9A84C" }}
          />
          <div className="flex-1 h-px" style={{ backgroundColor: "#E5E7EB" }} />
        </div>
      </div>

      {/* Slider */}
      <div className="marquee-track overflow-hidden">
        <div className="flex gap-6 w-max marquee-left">
          {doubled.map((img, i) => (
            <div
              key={i}
              className="service-gallery-card flex-shrink-0 w-[500px] rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 2px 16px 0 rgba(27,58,107,0.07)",
                border: "1px solid #E5E7EB",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
              }}
            >
              {/* Image with overlay */}
              <div className="relative h-[360px] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  sizes="500px"
                  className="object-cover"
                  style={{ transition: "transform 0.5s ease" }}
                />

                {/* Gradient overlay — top fade for label readability */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(10,20,45,0.72) 0%, rgba(10,20,45,0.15) 45%, transparent 100%)",
                  }}
                />

                {/* Label at top */}
                <div className="absolute top-0 left-0 right-0 px-5 pt-5">
                  {/* Gold accent line */}
                  <div
                    className="gold-line mb-2 h-[2px] w-8 rounded-full"
                    style={{
                      backgroundColor: "#C9A84C",
                      transition: "width 0.35s ease",
                    }}
                  />
                  <p
                    className="text-white font-semibold text-base leading-snug"
                    style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
                  >
                    {img.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover styles */}
      <style>{`
        .service-gallery-card:hover {
          box-shadow: 0 8px 32px 0 rgba(27,58,107,0.14), 0 0 0 2px #C9A84C44;
          border-color: #C9A84C !important;
          transform: translateY(-4px);
        }
        .service-gallery-card:hover img {
          transform: scale(1.05);
        }
        .service-gallery-card:hover .gold-line {
          width: 3rem;
        }
      `}</style>
    </section>
  );
}
