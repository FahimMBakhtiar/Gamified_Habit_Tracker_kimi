/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        quattro: ['Quattrocento Sans', 'sans-serif'],
      },
      colors: {
        enchanted: {
          purple: '#3D2A4E',
          dark: '#2A1F15',
          deep: '#1A1520',
        },
        moss: {
          DEFAULT: '#7A8B69',
          dark: '#5A6B49',
          light: '#9AAB89',
        },
        amber: {
          gold: '#D97706',
          dark: '#B35900',
          glow: '#F59E0B',
        },
        parchment: {
          DEFAULT: '#F0E6D2',
          dark: '#D4C4A8',
          light: '#FAF3E8',
        },
        wood: {
          DEFAULT: '#3A2A20',
          dark: '#2A1F15',
          light: '#5D4037',
        },
        ink: {
          DEFAULT: '#1A1520',
          light: '#5D4037',
        },
        emerald: {
          glow: '#10B981',
          dark: '#059669',
        },
        ruby: {
          DEFAULT: '#EF4444',
          dark: '#B91C1C',
        },
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        '3d': '0 8px 0px #2A1F15',
        '3d-pressed': '0 4px 0px #2A1F15',
        'soft': '0 4px 12px rgba(26, 21, 32, 0.3)',
        'glow': '0 0 20px rgba(217, 119, 6, 0.4)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.4)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(217, 119, 6, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(217, 119, 6, 0.6), 0 0 40px rgba(217, 119, 6, 0.3)" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          from: { transform: "translateY(-100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "particle-rise": {
          from: { transform: "translateY(0) scale(1)", opacity: "1" },
          to: { transform: "translateY(-120px) scale(0)", opacity: "0" },
        },
        "water-bob": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "campfire-pulse": {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "shake": "shake 0.4s ease-in-out",
        "slide-up": "slide-up 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "slide-down": "slide-down 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "bounce-in": "bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "spin-slow": "spin-slow 8s linear infinite",
        "particle-rise": "particle-rise 1s ease-out forwards",
        "water-bob": "water-bob 2s ease-in-out infinite",
        "campfire-pulse": "campfire-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
