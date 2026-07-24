const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    container: false,
  },
  theme: {
    fontFamily: {
      sans: [
        [
          'Inter',
          'system-ui',
          '-apple-system',
          ...defaultTheme.fontFamily.sans,
        ],
      ],
      mono: [
        ['"Mono Lisa"', ...defaultTheme.fontFamily.mono],
        {
          fontFeatureSettings: '"ss03"',
        },
      ],
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
    },
  },
  variants: {
    animation: ['motion-safe', 'motion-reduce'],
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}
