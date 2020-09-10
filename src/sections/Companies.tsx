import * as React from 'react'
import styled from 'styled-components'
import { Composition } from 'atomic-layout'
import { Grid } from '../components/Grid'
import { HeadingDiminished } from '../components/HeadingDiminished'

import { ReactComponent as GoogleLogo } from '../images/logos/google.svg'
import { ReactComponent as SpotifyLogo } from '../images/logos/spotify-text.svg'
import { ReactComponent as RedwoodLogo } from '../images/logos/redwoodjs.svg'
import { ReactComponent as LinodeLogo } from '../images/logos/linode.svg'

const Container = styled.div`
  color: var(--color-gray);

  svg {
    fill: currentColor;
  }
`

export const Companies: React.FC = () => {
  const iconSize = 48

  return (
    <Grid>
      <HeadingDiminished align="center" color="gray" marginBottom={32}>
        Trusted by engineers at
      </HeadingDiminished>
      <Composition
        as={Container}
        templateCols="repeat(2, 1fr)"
        templateColsLg="auto"
        autoFlowLg="column"
        alignItems="center"
        justifyContent="center"
        justifyItems="center"
        gap={32}
        gapLg={48}
      >
        <GoogleLogo height={iconSize} />
        <SpotifyLogo height={iconSize} />
        <RedwoodLogo width={iconSize} height={iconSize} />
        <LinodeLogo width={iconSize} />
      </Composition>
    </Grid>
  )
}
