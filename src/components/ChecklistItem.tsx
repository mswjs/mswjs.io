import React from 'react'
import { Box } from 'atomic-layout'
import styled from 'styled-components'
import { IoIosCheckmark } from 'react-icons/io'
import theme from '../theme'

const StyledLi = styled.li`
  list-style: none;
`

export const CheckistItem: React.FC = ({ children }) => {
  return (
    <Box as={StyledLi} flex alignItems="start">
      <Box
        as={IoIosCheckmark}
        size={32}
        fill={theme.colors.secondary}
        marginTop="-0.25ch"
        marginRight="0.25ch"
        flexShrink="0"
      />
      <span>{children}</span>
    </Box>
  )
}
