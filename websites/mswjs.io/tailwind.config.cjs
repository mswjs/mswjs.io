/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@mswjs/shared/tailwind.config')],
  content: [`../shared/**/*.{astro,ts,tsx}`, `./src/**/*.{astro,ts,tsx}`],
  theme: {
    extend: {
      colors: {
        primary: '#FF6A33',
      },
    },
  },
}
