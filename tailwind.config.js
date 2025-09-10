/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },

      boxShadow: {
        right: '4px 0 8px -2px rgba(0, 0, 0, 0.1)', // X-offset = 4px, only to the right
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',     // IE & Edge
          'scrollbar-width': 'none',        // Firefox
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',                  // Chrome, Safari, Opera
        },
      });
    },
  ],
}