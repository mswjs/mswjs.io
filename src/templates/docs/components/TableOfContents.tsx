import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { IoIosList as ListIcon } from 'react-icons/io'
import theme from '../../../theme'

const Container = styled.div`
  padding: 4rem 0 0;
  position: sticky;
  top: 0;
`

const StyledList = styled.ol`
  margin: 1rem 0 0;
  list-style: none;
  line-height: 1.4;
  font-size: 0.9rem;

  a {
    color: var(--color-gray);
    text-decoration: none;

    &:hover {
      color: var(--color-secondary);
    }
  }
`

const StyledListItem = styled.li`
  padding: 0.32rem 0;
`

interface TableOfContentsProps {
  items: Array<{
    url: string
    title: string
  }>
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  return (
    <aside>
      <Container>
        <Box as="h4" flex alignItems="center">
          <Box as={ListIcon} fill={theme.colors.grayLight} marginRight={6} />
          Contents
        </Box>
        <StyledList>
          {items.map((item, index) => (
            <StyledListItem key={index}>
              <a href={item.url}>{item.title}</a>
            </StyledListItem>
          ))}
        </StyledList>
      </Container>
    </aside>
  )
}
