/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        pattern: "url('/img/pattern.webp')",
      },
    },
  },
  plugins: [],
}