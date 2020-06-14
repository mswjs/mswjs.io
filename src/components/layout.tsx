import React from 'react'
import styled from 'styled-components'

import { BaseLayout } from './BaseLayout'
import Header from './header'
import { Footer } from './Footer'

const HeaderOverride = styled(Header)`
  border-bottom-color: var(--color-gray-light);
`

const Layout: React.FC = ({ children }) => {
  return (
    <BaseLayout>
      <HeaderOverride />
      <main>{children}</main>
      <Footer />
    </BaseLayout>
  )
}

export default Layout
