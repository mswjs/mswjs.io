import React from 'react'
import styled from 'styled-components'

const TableWrapper = styled.div`
  max-width: 100vw;
  overflow-x: auto;

  table {
    min-width: 800px;
  }
`

export const Table: React.FC = ({ children }) => {
  return (
    <TableWrapper>
      <table>{children}</table>
    </TableWrapper>
  )
}
