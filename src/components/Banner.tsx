import * as React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { Grid } from './Grid'

const BannerContainer = styled.div`
  background-color: var(--color-black);
  color: #fff;
  padding: 0.75rem 0;
  font-weight: 500;

  a {
    color: var(--color-primary);
    font-weight: bold;
  }
`

export function Banner(): JSX.Element {
  return (
    <BannerContainer>
      <Grid>
        <Box
          flex
          alignItems="center"
          justifyContent="center"
          flexDirectionSmDown="column"
        >
          <Box as="span" marginRight="0.5ch">
            Support Ukraine 🇺🇦
          </Box>{' '}
          <a
            href="https://bank.gov.ua/en/about/support-the-armed-forces"
            target="_blank"
          >
            Support Ukrainian Military to Win The War.
          </a>
        </Box>
      </Grid>
    </BannerContainer>
  )
}
