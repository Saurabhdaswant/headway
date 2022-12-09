/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pinkSherbet': '#F38BA0 ',
        'mediumPurple': '#998bf3 ',
        'tealDeer': '#8bf3bc ',
        'khaki': '#f3de8b ',
        'babyBlue': '#8bd4f3 ',
        'spiroDisco': '#0fc9f2 ',
      },
      strokeWidth: {
        '3': '3px',
      }
    },
  },
  safelist: [{
    pattern: /(bg|text|border)-(pinkSherbet|mediumPurple|tealDeer|khaki|babyBlue|spiroDisco)/
  }
  ],
  plugins: [],

}