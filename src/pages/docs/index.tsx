import React from 'react'

import Layout from '../../components/layout'
import { Grid } from '../../components/Grid'
import { Link } from 'gatsby'

const DocsRootPage = () => (
  <Layout>
    <Grid paddingVertical={64}>
      <h1>Docs</h1>
      <p>Here will be the list of documentation pages.</p>
      <Link to="/docs/tutorials/mocking-rest-api">Mocking REST API</Link>
    </Grid>
  </Layout>
)

export default DocsRootPage
