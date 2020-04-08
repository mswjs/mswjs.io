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
        .map(colorName => {
          return `--color-${colorName
            .replace(/([A-Z])/, '-$1')
            .toLowerCase()}: ${theme.colors[colorName]}`
        })
        .join(';')}
  }
`

const Layout: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <div>
        <main>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default Layout
