import React from 'react'

import { BaseLayout } from './BaseLayout'
import Header from './header'
import { Footer } from './Footer'
import { Banner } from './Banner'

const Layout: React.FC = ({ children }) => {
  return (
    <BaseLayout>
      <Banner />
      <Header />
      <main>{children}</main>
      <Footer />
    </BaseLayout>
  )
}

export default Layout
