import React, { useState, useEffect } from 'react'
import { Box } from 'atomic-layout'
import styled from 'styled-components'

const Container = styled.article`
  border: 1px solid var(--color-gray);
  border-radius: 5px;
`

interface GitHubRepoProps {
  url: string
}

export const GitHubRepo: React.FC<GitHubRepoProps> = ({ url }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const match = url.match(/:\/\/github\.com\/(.+?)\/(.+?)(?:\/|$)/)

    if (!match) {
      return
    }

    console.log(url, match)
    const [, owner, repo] = match

    fetch(url, { mode: 'cors' })
      .then((res) => console.log(res))
      .then(console.log)

    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((res) => res.json())
      .then(setData)
  }, [url])

  if (!data) {
    return null
  }

  console.log(data)

  return (
    <Box as={Container} padding={20}>
      <p>{data.full_name}</p>
      <p>{data.description}</p>
    </Box>
  )
}
