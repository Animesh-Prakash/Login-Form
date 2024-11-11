export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'below-500': { 'max': '500px' },
      },
    },
  },
  plugins: [],
}