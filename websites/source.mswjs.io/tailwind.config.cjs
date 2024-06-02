/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@mswjs/shared/tailwind.config.cjs')],
  content: [
    `../shared/components/**/*.{astro,ts,tsx}`,
    `./src/**/*.{astro,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
      },
    },
  },
}
