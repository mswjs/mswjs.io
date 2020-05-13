import React from 'react'
import { Link } from 'gatsby'
import { Box } from 'atomic-layout'

import { Grid } from '../components/Grid'
import { Text } from '../components/Text'
import { Button } from '../components/Button'

export const StartUsing = () => {
  return (
    <Grid paddingVertical={64} paddingVerticalLg={148}>
      <Box
        flex
        flexDirection="column"
        alignItems="center"
        maxWidth="100%"
        widthLg={600}
        marginHorizontal="auto"
      >
        <h2>Start today</h2>
        <Text align="center">
          Mock Service Worker can be used in any browser environment, be it your
          application, a unit test, or an end-to-end scenario. Bring your API
          mocking to the next level today.
        </Text>
        <Box marginTop={32}>
          <Button
            variant="primary"
            hero
            as={Link}
            to="/docs/getting-started/install"
          >
            Take the tutorial
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}
