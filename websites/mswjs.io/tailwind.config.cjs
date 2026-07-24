/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@mswjs/shared/tailwind.config.cjs')],
  content: [
    './.vitepress/theme/**/*.{vue,ts,tsx}',
    '../shared/theme/**/*.{vue,ts,tsx}',
    './src/content/**/*.md',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6A33',
      },
    },
  },
}
