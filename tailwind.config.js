/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        polri: {
          dark: '#0A111E',
          navy: '#101F33',
          card: '#16273E',
          blue: '#1E3A8A',
          lightBlue: '#3B82F6',
          gold: '#D4AF37',
          goldHover: '#B59226',
          yellow: '#EAB308',
          accent: '#00F2FE',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.35)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.35)',
      }
    },
  },
  plugins: [],
};
