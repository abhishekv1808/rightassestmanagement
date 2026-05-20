import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        navy: {
          DEFAULT: "#1B3A6B",
          50: "#E8EEF7",
          100: "#C5D3EA",
          200: "#9DB4D9",
          300: "#7595C8",
          400: "#4D76B7",
          500: "#1B3A6B",
          600: "#163060",
          700: "#112554",
          800: "#0C1A49",
          900: "#070F3D",
        },
        gold: {
          DEFAULT: "#C9A84C",
          50: "#FBF5E6",
          100: "#F4E6BE",
          200: "#EDD696",
          300: "#E6C76E",
          400: "#DFB846",
          500: "#C9A84C",
          600: "#A88A3C",
          700: "#876C2C",
          800: "#664E1C",
          900: "#45300C",
        },
        teal: {
          DEFAULT: "#0D7E7E",
          50: "#E6F4F4",
          100: "#B3DEDE",
          200: "#80C8C8",
          300: "#4DB2B2",
          400: "#1A9C9C",
          500: "#0D7E7E",
          600: "#0A6666",
          700: "#074E4E",
          800: "#043636",
          900: "#011E1E",
        },
        purple: {
          DEFAULT: "#6B46C1",
          50: "#F0EBF9",
          100: "#D4C4F0",
          200: "#B89DE7",
          300: "#9C76DE",
          400: "#804FD5",
          500: "#6B46C1",
          600: "#5838A1",
          700: "#452A81",
          800: "#321C61",
          900: "#1F0E41",
        },
        // Semantic aliases
        background: "#F9F8F5",
        foreground: "#1A1A1A",
        muted: "#64748B",
        brand: {
          navy: "#1B3A6B",
          gold: "#C9A84C",
          teal: "#0D7E7E",
          purple: "#6B46C1",
          offwhite: "#F9F8F5",
          dark: "#1A1A1A",
          muted: "#64748B",
        },
      },
      fontFamily: {
        heading: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
