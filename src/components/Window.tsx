import React from 'react'
import styled from 'styled-components'
import { Composition, Box } from 'atomic-layout'
import { BoxProps } from '@atomic-layout/core'

export const ControlIcon = styled.div`
  display: inline-block;
  height: 12px;
  width: 12px;
  border-radius: 50%;
`

export const CloseControl = styled(ControlIcon)`
  background-color: #ea6c60;
`

export const MinimizeControl = styled(ControlIcon)`
  background-color: #f5c351;
`

export const MaximizeControl = styled(ControlIcon)`
  background-color: #69ca57;
`

const WindowContainer = styled.div<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => bgColor || '#eee'};
  border-radius: 12px;
  padding: 16px 24px;

  > *:nth-child(2) {
    margin: 0;
    padding: 0;
  }
`

export const Window: React.FC<{ bgColor?: string } & BoxProps> = ({
  children,
  bgColor,
  ...boxProps
}) => {
  return (
    <Box as={WindowContainer} bgColor={bgColor} {...boxProps}>
      <Composition
        inline
        templateCols="repeat(3, auto)"
        gap={8}
        marginBottom={16}
      >
        <CloseControl />
        <MinimizeControl />
        <MaximizeControl />
      </Composition>
      {children}
    </Box>
  )
}
