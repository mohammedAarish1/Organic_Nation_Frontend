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
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #7A2E1D, #9B7A2F)',
        'gradient-color': 'linear-gradient(to right, var(--themeColor), var(--accent-color))',
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