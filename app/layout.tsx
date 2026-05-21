import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Right Asset Management — Financial, Real Estate & Legal Services in Bangalore",
    template: "%s | Right Asset Management",
  },
  description:
    "Right Asset Management is Bangalore's trusted multi-vertical firm offering 48+ expert services across Financial Planning, Real Estate, and Legal Advisory under one roof.",
  keywords: [
    "financial advisor Bangalore",
    "real estate services Bangalore",
    "legal advisory Bangalore",
    "mutual fund advisor Bangalore",
    "property registration Bangalore",
    "Right Asset Management",
  ],
  authors: [{ name: "Right Asset Management" }],
  creator: "Right Asset Management",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rightasset.in"
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rightasset.in",
    siteName: "Right Asset Management",
    title:
      "Right Asset Management — Financial, Real Estate & Legal Services in Bangalore",
    description:
      "One destination for 48+ expert services — investments, property, and legal help under one roof.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Right Asset Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Right Asset Management — Bangalore",
    description:
      "48+ Financial, Real Estate & Legal services under one roof in Bangalore.",
    images: ["/og-image.png"],
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
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
