import React from 'react'

import { BaseLayout } from './BaseLayout'
import Header from './header'
import { Footer } from './Footer'

const Layout: React.FC = ({ children }) => {
  return (
    <BaseLayout>
      <Header />
      <main>{children}</main>
      <Footer />
    </BaseLayout>
  )
}

export default Layout
