import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { IoIosLink as LinkIcon } from 'react-icons/io'

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
      display: inline-block;
    }
  }
`

export const Heading: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > & { level: number }
> = ({ level, children, ...restProps }) => {
  const Component = `h${level}`

  const content = restProps.id ? (
    <Box as={HeadingLink} href={`#${restProps.id}`} inline>
      <span>{children}</span>
      <Box inline as={LinkIcon} className="icon" size="0.75em" marginLeft={6} />
    </Box>
  ) : (
    children
  )

  return <Component {...restProps}>{content}</Component>
}

Heading.defaultProps = {
  level: 1,
}
