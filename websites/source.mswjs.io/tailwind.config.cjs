/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@mswjs/shared/tailwind.config.cjs')],
  content: [`../shared/**/*.{astro,ts,tsx}`, `./src/**/*.{astro,ts,tsx}`],
  theme: {
    extend: {
      colors: {
        primary: '#84cc16',
      },
    },
  },
}
