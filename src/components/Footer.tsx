import React from 'react'
import styled from 'styled-components'
import { Composition, Box } from 'atomic-layout'
import { Link } from 'gatsby'

import { ReactComponent as Logo } from '../images/logo-mask.svg'

import { Grid } from './Grid'
import { HeadingDiminished } from './HeadingDiminished'

const StyledFooter = styled.footer`
  background-color: var(--color-black);
  color: var(--color-gray-light);
  font-size: 0.95rem;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ul {
    margin: 0;
    list-style: none;
  }

  h4 {
    margin-bottom: 1rem;
    color: var(--color-gray-light);
  }

  [class$='__alt-stroke'] {
    stroke: var(--color-black);
  }

  [class$='__alt'] {
    fill: var(--color-black);
  }
`

export const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <Composition
        as={Grid}
        templateCols="1fr 1fr"
        templateColsMd="4fr 1fr 1fr"
        gap={64}
        paddingVertical={64}
      >
        <Box
          order={1}
          orderMd={0}
          col="1 / span 2"
          colMd="1"
          flex
          alignItems="flex-start"
        >
          <Box
            as={Logo}
            width={32}
            marginTop={-4}
            flexShrink="0"
            marginRight={10}
          />
          <p>Mock Service Worker is released under the MIT license.</p>
        </Box>
        <section>
          <HeadingDiminished>Documentation</HeadingDiminished>
          <ul>
            <li>
              <Link to="/docs/api">API</Link>
            </li>
            <li>
              <Link to="/docs/getting-started">Getting started</Link>
            </li>
            <li>
              <Link to="/docs/recipes">Recipes</Link>
            </li>
          </ul>
        </section>
        <section>
          <HeadingDiminished>Community</HeadingDiminished>
          <ul>
            <li>
              <a href="https://github.com/mswjs/msw">GitHub</a>
            </li>
          </ul>
        </section>
      </Composition>
    </StyledFooter>
  )
}
