import React from 'react'
import styled, { css } from 'styled-components'
import { CloseControl, MinimizeControl, MaximizeControl } from './Window'
import { Composition, Box } from 'atomic-layout'
import { BoxProps } from '@atomic-layout/core'
import { IoIosMenu, IoIosRefresh } from 'react-icons/io'

interface BrowserProps {
  address?: string
  useLightTheme?: boolean
  showControls?: boolean
  showAddressBar?: boolean
}

const BrowserContainer = styled(Box)`
  box-shadow: 0 1.4px 2.3px rgba(0, 0, 0, 0.024),
    0 4px 6.3px rgba(0, 0, 0, 0.035), 0 9.6px 15.1px rgba(0, 0, 0, 0.046),
    0 32px 50px rgba(0, 0, 0, 0.07);

  border-radius: 6px;
  overflow: hidden;
`

const BrowserHeader = styled.header<{ useLightTheme?: boolean }>`
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;

  ${({ useLightTheme }) =>
    useLightTheme
      ? css`
          background-image: line-gradient(#e5e5e5, #cdcdcd);
          border-bottom: 1px solid #e4e4e4;
          box-shadow: inset 0 1px 0 #e4e4e4;
        `
      : css`
          background-image: linear-gradient(#424242, #363636);
          box-shadow: inset 0px 1px 0px #5f5f5f;
        `}

  font-size: 85%;
`

const AddressBar = styled.div`
  background-image: linear-gradient(#707070, #6b6b6b);
  box-shadow: inset 0px 1px 0px #808180;
  border-radius: 4px;
  color: #fff;
  user-select: none;
`

export const BrowserContent = styled.div`
  background-color: #fff;
  height: 100%;
`

export const BrowserDevTools = styled.section`
  background-color: #363636;
`

export const Browser: React.FC<BrowserProps & BoxProps> = ({
  children,
  address,
  useLightTheme,
  showControls,
  showAddressBar,
  ...boxProps
}) => {
  return (
    <BrowserContainer {...boxProps}>
      <Composition
        as={BrowserHeader}
        useLightTheme={useLightTheme}
        templateCols="auto 1fr auto"
        alignItems="center"
        gap={24}
        minHeight={24}
        paddingHorizontal={16}
        paddingVertical={8}
      >
        {showControls && (
          <Composition inline templateCols="repeat(3, auto)" gap={6}>
            <CloseControl />
            <MinimizeControl />
            <MaximizeControl />
          </Composition>
        )}
        {showAddressBar && (
          <Composition
            as={AddressBar}
            templateCols="auto 1fr auto"
            gap={4}
            alignItems="center"
            justifyItems="center"
            paddingHorizontal={6}
          >
            <IoIosMenu fill="currentColor" />
            <span>{address}</span>
            <IoIosRefresh fill="currentColor" />
          </Composition>
        )}
      </Composition>
      <BrowserContent>{children}</BrowserContent>
    </BrowserContainer>
  )
}

Browser.defaultProps = {
  address: 'localhost:3000',
  showControls: true,
  showAddressBar: true,
}
