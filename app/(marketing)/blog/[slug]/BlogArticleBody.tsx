"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { BlogFAQ } from "@/lib/blog-data";

export default function BlogArticleBody({
  faqs,
  categoryColor,
}: {
  faqs: BlogFAQ[];
  categoryColor: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl overflow-hidden transition-all duration-200"
            style={{
              border: isOpen
                ? `1px solid ${categoryColor}40`
                : "1px solid #E5E7EB",
              backgroundColor: isOpen ? `${categoryColor}08` : "white",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
            >
              <span
                className="font-semibold text-sm"
                style={{ color: isOpen ? categoryColor : "#1A1A1A" }}
              >
                {faq.question}
              </span>
              <ChevronDown
                className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                style={{
                  color: isOpen ? categoryColor : "#94A3B8",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isOpen ? "500px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="px-5 pb-5">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
