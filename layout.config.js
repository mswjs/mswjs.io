import Layout from 'atomic-layout'
import { defaultOptions } from '@atomic-layout/core'

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
