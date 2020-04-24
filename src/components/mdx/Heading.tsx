import React from 'react'
import { IoIosLink } from 'react-icons/io'
import { Box } from 'atomic-layout'
import styled, { css } from 'styled-components'

const HeadingLink = styled.a`
  color: var(--color-black) !important;
  text-decoration: none;

  .icon {
    display: none;
  }

  &:focus {
    outline: 0;
    box-shadow: none;
  }

  &:hover {
    margin-bottom: -1px;
    border-bottom: 1px dotted ${({ theme }) => theme.colors.grayLight};

    .icon {
      display: block;
    }
  }
`

export const Heading: React.FC<React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & { level: number }> = ({ level, children, ...restProps }) => {
  const Component = `h${level}`

  const content = restProps.id ? (
    <Box
      as={HeadingLink}
      href={`#${restProps.id}`}
      inline
      flex
      alignItems="center"
    >
      <span>{children}</span>
      <Box as={IoIosLink} className="icon" size="0.75em" marginLeft={6} />
    </Box>
  ) : (
    children
  )

  return <Component {...restProps}>{content}</Component>
}

Heading.defaultProps = {
  level: 1,
}
