import React, { useMemo } from 'react'
import { Link as RouterLink } from 'gatsby'
import { Box } from 'atomic-layout'
import styled from 'styled-components'
import { FiExternalLink as ExternalLinkIcon } from 'react-icons/fi'

const StyledLink = styled.a`
  display: inline-block;
  white-space: nowrap;
`

export const Link: React.FC<{ href: string }> = ({
  href,
  children,
  ...restProps
}) => {
  const isExternal = useMemo(() => /https?:\/\//.test(href), [href])

  if (isExternal) {
    return (
      <StyledLink {...restProps} href={href} target="_blank">
        <span>{children}</span>
        <Box
          as={ExternalLinkIcon}
          inline
          marginLeft="0.25ch"
          marginBottom={-2}
        />
      </StyledLink>
    )
  }

  return (
    <RouterLink to={href} {...restProps}>
      {children}
    </RouterLink>
  )
}
