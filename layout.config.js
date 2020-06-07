export const initLayout = () => {
  const Layout = require('atomic-layout').default
  const { defaultOptions } = require('@atomic-layout/core')

  console.log('Configuring Atomic Layout...')

  Layout.configure({
    breakpoints: {
      ...defaultOptions.breakpoints,
      xl: {
        ...defaultOptions.breakpoints.xl,
        maxWidth: '1399px',
      },
      xxl: {
        minWidth: '1400px',
      },
    },
  })
}
