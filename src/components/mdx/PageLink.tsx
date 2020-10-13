import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'
import { IoMdArrowRoundForward as Icon } from 'react-icons/io'
import { Link as RouterLink } from 'gatsby'
import { Box } from 'atomic-layout'

const linkStyle = css`
  margin: 2rem 0;
  padding: 1rem;

  background-color: var(--color-secondary);
  color: #fff !important;
  font-size: 95%;
  line-height: 1.25;

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
    box-shadow: 0 0 0 4px
      ${({ theme }) => theme.utils.alpha(theme.colors.secondary, 0.4)};
  }
`

const StyledGatsbyLink = styled(RouterLink)`
  ${linkStyle}
`

const StyledExternalLink = styled.a`
  ${linkStyle}
`

const UrlPreview = styled.span`
  margin-top: 6px;

  color: rgba(255, 255, 255, 0.75);
  font-size: 80%;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`

interface MdxModule {
  default: any
  _frontmatter: {
    title: string
  }
}

interface PageLinksProps {
  title?: string
  description?: string
  page?: MdxModule
  url: string
}

export const PageLink: React.FC<PageLinksProps> = ({
  title,
  description,
  page,
  url,
}) => {
  const isExternal = /https?:\/\//.test(url)
  const Link = isExternal ? StyledExternalLink : StyledGatsbyLink
  const hrefProp = isExternal ? { href: url } : { to: url }
  return (
    <Box as={Link} {...hrefProp} flex alignItems="flex-start">
      <Box as={Icon} size={16} marginTop={1} marginRight={8} />
      <Box className="title" flex flexDirection="column">
        <span>{title || page._frontmatter.title}</span>
        <UrlPreview>{description || url}</UrlPreview>
      </Box>
    </Box>
  )
}
