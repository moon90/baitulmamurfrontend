// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F6B4F', // A dominant green from izwien.at feel
        secondary: '#0E4D3A', // A darker green
        accent: '#3490DC', // A blue for accents/links
        neutral: '#F9FAFB', // Light background
        'neutral-dark': '#4B5563', // Dark text/elements
        'izw-green-dark': '#00563F', // A dark green from willkommen.png
        'izw-gold': '#B8860B',      // A gold/yellow color from willkommen.png
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'], // Common readable sans-serif fonts
        arabic: ['Noto Naskh Arabic', 'serif'], // Generic Arabic font, can be replaced with a specific one
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInDown: 'fadeInDown 0.6s ease-out forwards',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}

