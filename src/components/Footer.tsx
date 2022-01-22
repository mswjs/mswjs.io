import React from 'react'
import styled from 'styled-components'
import { Composition, Box } from 'atomic-layout'
import { Link } from 'gatsby'

import { ReactComponent as Logo } from '../images/logos/msw.svg'
import { ReactComponent as VercelLogo } from '../../media/vercel-logo.svg'

import { Grid } from './Grid'
import { HeadingDiminished } from './HeadingDiminished'

const StyledFooter = styled.footer`
  background-color: var(--color-black);
  color: var(--color-gray-light);
  font-size: 90%;

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

  .alt-stroke {
    stroke: var(--color-black);
  }

  .alt {
    fill: var(--color-black);
  }
`

const HostedLink = styled.a`
  svg {
    fill: var(--color-gray-light);
  }

  :hover svg {
    fill: #fff;
  }
`

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box as={StyledFooter} paddingVertical={64} paddingVerticalLg={100}>
      <Grid>
        <Composition
          templateCols="1fr 1fr"
          templateColsMd="32px repeat(3, 1fr)"
          gap={48}
        >
          <Box
            align="center"
            alignMd="flex-start"
            colMd="1"
            justify="center"
            justifyMd="flex-start"
          >
            <Logo height={48} fill="#fff" />
          </Box>
          <section>
            <HeadingDiminished>Documentation</HeadingDiminished>
            <ul>
              <li>
                <Link to="/docs/getting-started/install">Getting started</Link>
              </li>
              <li>
                <Link to="/examples">Examples</Link>
              </li>
              <li>
                <Link to="/docs/api">API</Link>
              </li>
              <li>
                <Link to="/docs/faq">Help</Link>
              </li>
            </ul>
          </section>
          <section>
            <HeadingDiminished>Recipes</HeadingDiminished>
            <ul>
              <li>
                <Link to="/docs/recipes/cookies">Cookies</Link>
              </li>
              <li>
                <Link to="/docs/recipes/query-parameters">
                  Query parameters
                </Link>
              </li>
              <li>
                <Link to="/docs/recipes/mocking-error-responses">
                  Mocking error responses
                </Link>
              </li>
              <li>
                <Link to="/docs/recipes/binary-response-type">
                  Binary response type
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <HeadingDiminished>Community</HeadingDiminished>
            <ul>
              <li>
                <Link to="/get-involved">
                  <strong>Get involved</strong>
                </Link>
              </li>
              <li>
                <a href="https://github.com/mswjs/msw">GitHub</a>
              </li>
              <li>
                <a href="https://github.com/mswjs/mswjs.io">
                  Edit docs on GitHub
                </a>
              </li>
              <li>
                <a href="https://kentcdodds.com/discord/">Discord</a>
              </li>
              <li>
                <a href="https://twitter.com/ApiMocking">Twitter</a>
              </li>
            </ul>
          </section>
        </Composition>
        <Box flex alignItems="center" justifyContent="center" marginTop={48}>
          <Box as="span" marginRight={4}>
            Hosted by
          </Box>
          <Box
            as={HostedLink}
            href="https://vercel.com/?utm_source=artemz"
            alt="Vercel"
            target="_blank"
            rel="noopener noreferrer"
            flex
            alignItems="center"
          >
            <VercelLogo width={75} />
          </Box>
        </Box>
        <Box as="p" flex alignItems="flex-start" justifyContentMd="center">
          Copyright © 2018-{currentYear} Artem Zakharchenko and contributors.
        </Box>
      </Grid>
    </Box>
  )
}
