import styled from 'styled-components'
import { Box } from 'atomic-layout'

export const InteractiveArea = styled(Box)`
  border: 1px dashed var(--color-gray-light);
  border-radius: var(--border-radius);

  pre:last-of-type {
    margin-bottom: 0;
  }
`

InteractiveArea.defaultProps = {
  as: 'article',
  padding: 32,
}
