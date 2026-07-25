import type { Metadata } from "next";
import { Suspense } from "react";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import AuthCodeHandler from "@/components/auth/AuthCodeHandler";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Right Assets Management — Financial, Real Estate & Legal Services across India",
    template: "%s | Right Assets Management",
  },
  description:
    "Right Assets Management is India's trusted multi-vertical firm offering 48+ expert services across Financial Planning, Real Estate, and Legal Advisory under one roof.",
  keywords: [
    "financial advisor India",
    "real estate services India",
    "legal advisory India",
    "mutual fund advisor India",
    "property registration India",
    "Right Assets Management",
  ],
  authors: [{ name: "Right Assets Management" }],
  creator: "Right Assets Management",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rightassetsmanagement.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rightassetsmanagement.com",
    siteName: "Right Assets Management",
    title:
      "Right Assets Management — Financial, Real Estate & Legal Services across India",
    description:
      "One destination for 48+ expert services — investments, property, and legal help under one roof.",
    // og:image is provided automatically by app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Right Assets Management — India",
    description:
      "48+ Financial, Real Estate & Legal services under one roof across India.",
    // twitter:image falls back to app/opengraph-image.tsx
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ─── Bare HTML shell ──────────────────────────────────────────────────────────
// Navbar, Footer, and WhatsApp button live in app/(marketing)/layout.tsx.
// Admin portal has its own layout at app/admin/layout.tsx.
// This keeps each section fully isolated.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";

  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <Suspense fallback={null}>
          <AuthCodeHandler />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
