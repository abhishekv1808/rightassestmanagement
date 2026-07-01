import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Insights & Guides on Finance, Property & Legal",
  description:
    "Practical, jargon-free guides on financial planning, real estate, and legal matters in Bangalore — written by the Right Assets Management team.",
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
