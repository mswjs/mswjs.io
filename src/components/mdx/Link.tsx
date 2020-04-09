import React, { useMemo } from 'react'
import { Link as RouterLink } from 'gatsby'
import { FiExternalLink as ExternalLinkIcon } from 'react-icons/fi'
import { Box } from 'atomic-layout'

export const Link: React.FC<{ href: string }> = ({
  href,
  children,
  ...restProps
}) => {
  const isExternal = useMemo(() => /https?:\/\//.test(href), [href])

  if (isExternal) {
    return (
      <Box
        as="a"
        href={href}
        target="_blank"
        {...restProps}
        inline
        flex
        alignItems="center"
      >
        <span>{children}</span>
        <Box as={ExternalLinkIcon} marginLeft={4} />
      </Box>
    )
  }

  return (
    <RouterLink to={href} {...restProps}>
      {children}
    </RouterLink>
  )
}
