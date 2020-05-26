import styled, { css } from 'styled-components'
import { Button } from './Button'

export const Fragment = styled.section`
  display: flex;
  align-items: flex-start;
  border-radius: var(--border-radius);

  > *:first-child {
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }

  > *:last-child {
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }
`

export const FragmentItem = styled(Button)<{ active?: boolean }>`
  background-color: transparent;
  border: 1px solid var(--color-secondary);
  border-radius: 0;
  color: inherit;

  ${({ active }) =>
    active &&
    css`
      background-color: var(--color-secondary);
      color: #fff;

      svg {
        fill: currentColor;
      }
    `}
`
