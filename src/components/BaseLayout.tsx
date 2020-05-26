import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import theme from '../theme'
import './layout.css'
import './custom.scss'

const GlobalStyle = createGlobalStyle`
  html {
    ${({ theme }) =>
      Object.keys(theme.colors)
        .map((colorName) => {
          return `--color-${colorName
            .replace(/([A-Z])/, '-$1')
            .toLowerCase()}: ${theme.colors[colorName]}`
        })
        .join(';')}
  }
`

export const BaseLayout: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}
