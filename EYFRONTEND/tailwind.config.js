/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic Color System based on behavioral psychology
        primary: {
          DEFAULT: '#4f46e5', // Indigo (Active actions)
          hover: '#4338ca',
          light: '#e0e7ff',
        },
        success: {
          DEFAULT: '#10b981', // Emerald (Winning / Success)
          hover: '#059669',
          light: '#d1fae5',
        },
        danger: {
          DEFAULT: '#f43f5e', // Rose/Red (Outbid / Destructive)
          hover: '#e11d48',
          light: '#ffe4e6',
        },
        warning: {
          DEFAULT: '#f59e0b', // Amber (Upcoming / Wait)
          hover: '#d97706',
          light: '#fef3c7',
        },
        neutral: {
          DEFAULT: '#64748b', // Slate (Sold / Background)
          dark: '#0f172a',
          light: '#f8fafc',
        },
        admin: {
          DEFAULT: '#52525b', // Zinc/Graphite (Admin operations)
          dark: '#18181b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Professional clean sans
        display: ['Outfit', 'system-ui', 'sans-serif'], // For Hero/Display headers
      },
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.25em', // Used for Metadata tracking-widest
      }
    },
  },
  plugins: [],
}
