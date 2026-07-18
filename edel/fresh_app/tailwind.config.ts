import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 200ms ease-out forwards",
        "slide-up": "slideUp 300ms ease-out forwards",
        "slide-down": "slideDown 300ms ease-out forwards",
        "slide-left": "slideLeft 300ms ease-out forwards",
        "slide-right": "slideRight 300ms ease-out forwards",
        "scale-in": "scaleIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "scale-out": "scaleOut 150ms ease-in forwards",
        "blur-in": "blurIn 300ms ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        "animate-in": "animateIn 300ms ease-out forwards",
        "animate-out": "animateOut 150ms ease-in forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        scaleOut: {
          from: { opacity: "1", transform: "scale(1)" },
          to: { opacity: "0", transform: "scale(0.95)" },
        },
        blurIn: {
          from: { opacity: "0", filter: "blur(10px)" },
          to: { opacity: "1", filter: "blur(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        animateIn: {
          from: { opacity: "0", transform: "translateY(10px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        animateOut: {
          from: { opacity: "1", transform: "translateY(0) scale(1)" },
          to: { opacity: "0", transform: "translateY(-10px) scale(0.98)" },
        },
      },
      backgroundImage: {
        "gradient-mesh": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(239, 201, 117, 0.12) 0%, transparent 50%), radial-gradient(ellipse 50% 30% at 0% 0%, rgba(155, 140, 255, 0.1) 0%, transparent 50%)",
        "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
} satisfies Config;