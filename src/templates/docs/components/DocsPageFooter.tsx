import * as React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { EditOnGitHub } from './EditOnGitHub'
import { PageCollaborators } from './PageCollaborators'

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
  relativeFilePath: string
  editUrl: string
}

export const DocsPageFooter: React.FC<Props> = ({
  relativeFilePath,
  editUrl,
}) => {
  return (
    <Box as={StyledFooter} marginTop="4rem" paddingTop="2rem">
      <Box flex alignItems="center" justifyContent="space-between">
        <section>
          <PageCollaborators relativeFilePath={relativeFilePath} />
        </section>
        <section>
          <EditOnGitHub url={editUrl} />
        </section>
      </Box>
    </Box>
  )
}
