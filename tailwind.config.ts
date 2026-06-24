import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        highlight: "hsl(var(--highlight))",
        /* 兼容旧类名，映射到新色板 */
        cinema: {
          gold: "hsl(var(--highlight))",
          amber: "hsl(40 10% 65%)",
          dark: "hsl(225 15% 5%)",
          surface: "hsl(225 14% 9%)",
          elevated: "hsl(225 12% 12%)",
        },
        studio: {
          ivory: "#fafafa",
          silver: "#a1a1aa",
          champagne: "hsl(240 6% 72%)",
          dark: "hsl(240 6% 4%)",
          surface: "hsl(240 5% 7%)",
          elevated: "hsl(240 4% 11%)",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        hero: ["var(--font-hero)", "Noto Serif SC", "Songti SC", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(186, 200, 220, 0.12)",
        card: "0 1px 0 0 rgba(248, 250, 252, 0.05) inset, 0 8px 32px -8px rgba(0, 0, 0, 0.5)",
        glass: "0 8px 32px -8px rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(248,250,252,0.1)",
        "cta-glow": "0 0 48px -8px rgba(186, 200, 220, 0.18), 0 8px 32px -4px rgba(0,0,0,0.55)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "cta-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "cta-glow": "cta-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
