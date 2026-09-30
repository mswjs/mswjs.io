const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    container: false,
  },
  content: ['./.vitepress/theme/**/*.{vue,ts,tsx}', './src/content/**/*.md'],
  theme: {
    fontFamily: {
      sans: ['Geist', 'system-ui', '-apple-system', ...defaultTheme.fontFamily.sans],
      mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
    },
    extend: {
      transitionDuration: {
        long: '5000ms',
      },
      keyframes: {
        pingDelay: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '25%,100%': { transform: 'scale(2)', opacity: 0 },
        },
      },
      animation: {
        ping: 'pingDelay 4s linear infinite',
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
  variants: {
    animation: ['motion-safe', 'motion-reduce'],
  },
  plugins: [
    require('@tailwindcss/container-queries'),
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
