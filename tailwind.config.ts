import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'ibm-arabic': ['"IBM Plex Sans Arabic"', 'sans-serif'],
        'cairo': ['Cairo', 'sans-serif'],
      },
      keyframes: {
        "collapsible-down": {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
        },
        "collapsible-up": {
          from: { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 0.3s ease-in-out",
        "collapsible-up": "collapsible-up 0.3s ease-in-out",
      },
      colors: {
        gold: "#606060", // Updated from #D4AF37 to #606060
        darkBlue: "#000000",
        deepBlue: "#000000",
        warmBeige: "#F7E4C8",
        offWhite: "#F5F5F5",
        newsGreen: "#234F27",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'geometric-pattern': "url('/patterns/geometric.svg')",
        'vertical-lines': "url('/patterns/vertical-lines.svg')",
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(96, 96, 96, 0.39)', // Updated shadow color to match new gold color
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      addUtilities({
        '.rtl': {
          'direction': 'rtl',
        },
      });
    },
  ],
} satisfies Config;