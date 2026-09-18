const plugin = require('tailwindcss/plugin')

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
      fontFamily: {
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      textColor: {
        white: 'rgb(var(--site-foreground) / <alpha-value>)',
      },
      fill: {
        white: 'rgb(var(--site-foreground) / <alpha-value>)',
      },
      backgroundColor: {
        white: 'rgb(var(--site-foreground) / <alpha-value>)',
      },
      colors: {
        primary: 'rgb(var(--site-accent) / <alpha-value>)',
        // Existing neutral utilities share the theme's surface/contrast scale.
        neutral: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => {
            return [shade, `rgb(var(--site-neutral-${shade}) / <alpha-value>)`]
          }),
        ),
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        /**
         * Fade the top of an element's borders into the background so a
         * divider doesn't poke into the whitespace above it. Fade length
         * is controlled by "--border-fade" (defaults to the heading gap).
         */
        '.border-fade-t': {
          'border-image':
            'linear-gradient(to bottom, transparent, rgb(var(--site-neutral-800)) var(--border-fade, 6rem)) 1',
        },
      })
    }),
  ],
}
