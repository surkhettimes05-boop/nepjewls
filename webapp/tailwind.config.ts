import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-bg': '#F8F5F1',
        'luxury-bg-secondary': '#F2ECE5',
        'luxury-dark': '#1A1A1A',
        'luxury-text': '#1B1B1B',
        'luxury-text-secondary': '#666666',
        'luxury-gold': '#B89A58',
        'luxury-border': 'rgba(0,0,0,0.08)',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'hero-desktop': '160px',
        'hero-tablet': '100px',
        'hero-mobile': '60px',
        'section-title': '72px',
        'paragraph': '22px',
        'button': '14px',
      },
      letterSpacing: {
        'nav': '0.25em',
        'btn': '0.18em',
      },
      spacing: {
        'luxury-1': '12px',
        'luxury-2': '24px',
        'luxury-3': '40px',
        'luxury-4': '80px',
        'luxury-5': '140px',
        'luxury-6': '220px',
        'luxury-7': '320px',
      },
      transitionDuration: {
        'luxury-fast': '800ms',
        'luxury-base': '1000ms',
        'luxury-slow': '1400ms',
      },
      transitionTimingFunction: {
        'luxury-ease': 'cubic-bezier(0.85, 0, 0.15, 1)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
export default config;
