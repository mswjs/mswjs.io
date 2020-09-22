import * as React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { EditOnGitHub } from './EditOnGitHub'
import { PageContributors } from './PageContributors'
import { Text } from '../../../components/Text'

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
  lastModified: string
}

export const DocsPageFooter: React.FC<Props> = ({
  contributors,
  editUrl,
  lastModified,
}) => {
  const lastModifiedDate = React.useMemo(() => {
    if (!lastModified) {
      return null
    }

    return new Date(lastModified).toLocaleDateString('en-EU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }, [lastModified])

  return (
    <Box as={StyledFooter} marginTop="4rem" paddingTop="2rem">
      <Box flex alignItems="center" justifyContent="space-between">
        <section>
          <PageContributors users={contributors} />
        </section>
        <Box flex flexDirection="column" alignItems="flex-end">
          {lastModifiedDate !== 'Invalid Date' && (
            <Text color="gray" marginBottom="0.5em">
              Updated on {lastModifiedDate}
            </Text>
          )}
          <EditOnGitHub url={editUrl} />
        </Box>
      </Box>
    </Box>
  )
}
