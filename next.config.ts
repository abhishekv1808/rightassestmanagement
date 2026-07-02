import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  images: {
    // Allow the brand logo (SVG) to be served through next/image.
    // Safe here because we only serve our own trusted assets from /public.
    // "inline" so the logo DISPLAYS in <img> (attachment forces a download →
    // shows as a broken image); the CSP still blocks any script in the SVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
