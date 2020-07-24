import * as React from 'react'
import { Box } from 'atomic-layout'
import { Avatar } from '../../../components/Avatar'

interface Props {
  users: GitHubUser[]
}

interface GitHubUser {
  id: number
  avatarUrl: string
  url: string
}

export const PageContributors: React.FC<Props> = ({ users }) => {
  if (!users || users.length === 0) {
    return null
  }

  return (
    <Box flex alignItems="center">
      {users.map((user) => (
        <Box
          as="a"
          key={user.id}
          href={user.url}
          target="_blank"
          marginRight={4}
        >
          <Avatar src={user.avatarUrl} size={32} />
        </Box>
      ))}
    </Box>
  )
}
