import React from 'react'
import { Box } from 'atomic-layout'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Grid } from '../components/Grid'
import { Heading } from '../components/Heading'
import { Link } from '../components/mdx/Link'
import { TextLead } from '../components/TextLead'
import { Text } from '../components/Text'

import page404IconUrl from '../images/404-icon.png'

const NotFoundPage = () => (
  <Layout>
    <SEO title="Page not found" />
    <Grid paddingVertical={80} paddingVerticalMd={120}>
      <Box
        flex
        flexDirection="column"
        alignItems="center"
        width={500}
        maxWidth="100%"
        marginHorizontal="auto"
      >
        <Box
          as="img"
          src={page404IconUrl}
          alt="Empty cookie jar"
          width={298}
          marginBottom={48}
        />
        <Heading align="center" marginBottom={8}>
          Oops, not found!
        </Heading>
        <TextLead>It must be a cookie monster...</TextLead>
        <Text color="gray">
          The page you are trying to load has been moved, or doesn't exist. If
          you swear you saw a page here before,{' '}
          <Link href="https://twitter.com/ApiMocking">
            let us know on Twitter
          </Link>
          .
        </Text>
      </Box>
    </Grid>
  </Layout>
)

export default NotFoundPage
