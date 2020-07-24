import * as React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { EditOnGitHub } from './EditOnGitHub'
import { PageContributors } from './PageContributors'

const StyledFooter = styled.footer`
  border-top: 1px solid var(--color-gray-dim);
  font-size: 90%;

  a {
    color: var(--color-black);
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`

interface Props {
  contributors: any[]
  editUrl: string
}

export const DocsPageFooter: React.FC<Props> = ({ contributors, editUrl }) => {
  return (
    <Box as={StyledFooter} marginTop="4rem" paddingTop="2rem">
      <Box flex alignItems="center" justifyContent="space-between">
        <section>
          <PageContributors users={contributors} />
        </section>
        <section>
          <EditOnGitHub url={editUrl} />
        </section>
      </Box>
    </Box>
  )
}
