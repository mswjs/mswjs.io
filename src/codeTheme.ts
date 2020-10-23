import { PrismTheme } from 'prism-react-renderer'
import CodeTheme from 'prism-react-renderer/themes/nightOwl'

export const theme: PrismTheme = Object.assign({}, CodeTheme as any, {
  plain: {
    color: '#d6deeb',
    backgroundColor: 'var(--color-black)',
  },
})
