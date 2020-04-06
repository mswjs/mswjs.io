import React from 'react'
import styled from 'styled-components'
import { Composition } from 'atomic-layout'
import { Link } from 'gatsby'

import { Grid } from './Grid'

const StyledFooter = styled.footer`
  background-color: #f9e4d4;
  font-size: 0.95rem;
`

export const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <Composition as={Grid} templateCols="repeat(3, 1fr)" paddingVertical={64}>
        <div>
          <p>
            Made with love by <a href="#">kettanaito</a>.
          </p>
        </div>
        <div>
          <h4>Documentation</h4>
          <ul>
            <li>
              <Link to="/docs/getting-started">
                <strong>Getting started</strong>
              </Link>
            </li>
            <li>
              <Link to="/docs/">Mocking REST API</Link>
            </li>
          </ul>
        </div>
      </Composition>
    </StyledFooter>
  )
}
