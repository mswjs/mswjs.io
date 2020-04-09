import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { Link } from 'gatsby'

const StyledList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;

  li {
    color: var(--color-gray-light);
  }

  li:not(:last-child) {
    &:after {
      content: '›';
      margin: 0 0.5rem;
    }
  }

  a {
    color: var(--color-gray);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .current-page {
    color: var(--color-secondary);
  }
`

interface BreadcrumbsProps {
  items: Array<{
    title: string
    url: string
  }>
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  if (items.length < 2) {
    return null
  }

  return (
    <Box as={StyledList} flex alignItems="center" marginBottom={16}>
      {items.map((item, index) => (
        <li key={index}>
          {index === items.length - 1 ? (
            <span className="current-page">{item.title}</span>
          ) : (
            <Link to={item.url}>{item.title}</Link>
          )}
        </li>
      ))}
    </Box>
  )
}
