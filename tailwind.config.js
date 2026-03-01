/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#C76B4C',   // terracotta
        secondary: '#E8C9A9', // parchment
        background: '#0D0B0A', // deep charcoal
        text: '#F5F0EB',      // warm off-white
        border: '#2A2826',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
      },
    },
  },
  plugins: [],
        }
