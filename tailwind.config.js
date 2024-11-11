/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        "xs":"450px"
      },
      // keyframes:{
      //   'slide-in': {
      //     '0%': { transform: 'translateX(-100%)' },
      //     '100%': { transform: 'translateX(0)' }
      //   }
      // },
      // animation: {
      //   'slide-in': 'slide-in 0.5s ease-out'
      // }
    },
  },
  plugins: [],
}