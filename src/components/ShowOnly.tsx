import styled from 'styled-components'
import { query, Box } from 'atomic-layout'
import { BoxProps } from '@atomic-layout/core'
import { ResponsiveQueryParams } from 'atomic-layout/lib/types/hooks/useResponsiveQuery'

type Props = BoxProps & ResponsiveQueryParams

export const ShowOnly = styled(Box)<Props>`
  @media ${query} {
    display: inherit;
  }

  display: none;
`
