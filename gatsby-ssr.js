import Layout from 'atomic-layout'
import { initLayout } from './layout.config'

export const wrapRootElement = () => {
  // Configure Atomic Layout on the server only once.
  if (!Layout.isConfigureCalled) {
    initLayout()
  }
}
