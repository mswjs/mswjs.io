import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const ChildPageLink = styled(Link)`
  padding: 0px 4px;
  background-color: hsl(204, 45%, 98%);
  border: 1px solid hsla(0, 0%, 0%, 0.05);
  border-radius: var(--border-radius);
  text-decoration: none;

  :focus {
    border-color: var(--color-secondary);
  }
`

interface Props {
  items: any[]
}

const renderItems = (items) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.url}>
          <ChildPageLink to={item.url}>{item.displayName}</ChildPageLink>
          {item.items && renderItems(item.items)}
        </li>
      ))}
    </ul>
  )
}

export const CategoryChildPages: React.FC<Props> = ({ items }) => {
  return renderItems(items)
}
