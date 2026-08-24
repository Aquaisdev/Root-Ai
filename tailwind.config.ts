import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0F0B08",
          soft: "#1A130E",
          raised: "#231A13",
        },
        sandstone: {
          DEFAULT: "#F3E9DA",
          dim: "#C9BBA4",
          muted: "#A89A87",
        },
        gold: {
          DEFAULT: "#D4A24C",
          bright: "#F0C374",
          deep: "#9C7530",
        },
        terracotta: {
          DEFAULT: "#B5502F",
          deep: "#7E3A22",
        },
        circuit: {
          DEFAULT: "#4FD1C5",
          bright: "#8CF0E4",
          dim: "#2C7A72",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(212,162,76,0.18), transparent 60%)",
        "circuit-glow":
          "radial-gradient(circle at 50% 50%, rgba(79,209,197,0.15), transparent 65%)",
      },
      boxShadow: {
        glow: "0 0 24px rgba(212,162,76,0.35)",
        "glow-circuit": "0 0 24px rgba(79,209,197,0.35)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
