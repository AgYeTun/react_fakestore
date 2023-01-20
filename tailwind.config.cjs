/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "poppins": "Poppins"
      },
      colors: {
        "primary": "#CDFCF6",
        "secondary": "#FAF7F0",
        "danger": "#BCCEF8",
        "info": "#98A8F8",
        "txt": "#0A2647"
      }
    },
  },
  plugins: [],
}
