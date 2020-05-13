import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import Header from './header'
import theme from '../theme'
import { Footer } from './Footer'
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

  a,
  button {
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 4px ${({ theme }) =>
        theme.utils.alpha(theme.colors.secondary, 0.35)};
    }
  }
`

const Layout: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
