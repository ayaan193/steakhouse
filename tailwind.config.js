/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0B0B0B",
        smoke: "#1A1A1A",
        mahogany: "#3B1F1F",
        ember: "#C2410C",
        flame: "#B91C1C",
        gold: "#F59E0B",
      },
    },
  },
  plugins: [],
  theme: {
  extend: {
    fontFamily: {
      cinzel: ['Cinzel', 'serif'],
    },
  },
},
  
};