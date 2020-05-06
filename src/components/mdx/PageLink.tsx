import React from 'react'
import styled from 'styled-components'
import { IoMdArrowRoundForward as Icon } from 'react-icons/io'
import { Link } from 'gatsby'
import { Box } from 'atomic-layout'

const Container = styled(Link)`
  margin: 2rem 0;
  padding: 1rem;

  background-color: var(--color-secondary);
  color: #fff !important;

  border-radius: var(--border-radius);
  text-decoration: none;
  transition: border-color 0.2s ease;

  .title {
    transition: transform 0.2s ease;
  }

  :hover {
    border-color: var(--color-secondary);

    .title {
      transform: translateX(8px);
    }
  }

  :focus {
    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.utils.alpha(theme.colors.secondary, 0.4)};
  }
`

const UrlPreview = styled.span`
  color: rgba(255, 255, 255, 0.75);
  font-size: 80%;
`

interface MdxModule {
  default: any
  _frontmatter: {
    title: string
  }
}

interface PageLinksProps {
  title?: string
  page: MdxModule
  url: string
}

export const PageLink: React.FC<PageLinksProps> = ({ title, page, url }) => {
  return (
    <Box
      as={Container}
      to={url}
      flex
      alignItems="center"
      justifyContent="space-between"
    >
      <Box className="title" flex alignItems="center">
        <Box as={Icon} size={16} marginRight={8} />
        <span>{title || page._frontmatter.title}</span>
      </Box>
      <UrlPreview>{url}</UrlPreview>
    </Box>
  )
}
