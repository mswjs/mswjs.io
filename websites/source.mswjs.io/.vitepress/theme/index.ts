import type { Theme } from 'vitepress'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import Layout from './Layout.vue'
import { preserveHmrScroll } from '@mswjs/shared/theme/hmrScroll.mjs'

// Components available to Markdown content globally.
import Action from '@mswjs/shared/theme/content/Action.vue'
import PageCard from '@mswjs/shared/theme/content/PageCard.vue'
import CollapsibleCode from '@mswjs/shared/theme/content/CollapsibleCode.vue'
import SponsorLink from '@mswjs/shared/theme/components/SponsorLink.vue'

import '@mswjs/shared/theme/styles/style.css'
import '@mswjs/shared/theme/styles/vitepress-content.css'
import '@mswjs/shared/theme/styles/ads.css'
import '@shikijs/vitepress-twoslash/style.css'
import '@mswjs/shared/theme/styles/shell.css'
import './site.css'

export default {
  Layout,
  setup() {
    if (import.meta.hot) {
      preserveHmrScroll(import.meta.hot)
    }
  },
  enhanceApp({ app }) {
    app.use(TwoslashFloatingVue)
    app.component('Action', Action)
    app.component('PageCard', PageCard)
    app.component('CollapsibleCode', CollapsibleCode)
    app.component('SponsorLink', SponsorLink)
  },
} satisfies Theme
