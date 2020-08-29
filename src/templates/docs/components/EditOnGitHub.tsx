import * as React from 'react'
import { Box } from 'atomic-layout'
import { DiGithubBadge as GitHubIcon } from 'react-icons/di'

interface Props {
  url: string
}

export const EditOnGitHub: React.FC<Props> = ({ url }) => {
  return (
    <Box as="a" href={url} target="_blank" rel="noopener nofollow" flex inline>
      <Box as={GitHubIcon} size={20} marginRight="0.25ch" />
      Edit this page
    </Box>
  )
}
