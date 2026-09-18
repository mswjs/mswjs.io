import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import { preserveHmrScroll } from './hmrScroll.mjs'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import { setupTwoslashSourceLinks } from './twoslashSourceLinks'

// Components available to Markdown content globally.
import Action from './content/Action.vue'
import PageCard from './content/PageCard.vue'
import CollapsibleCode from './content/CollapsibleCode.vue'
import PromoBanner from './content/PromoBanner.vue'
import DiscordIcon from './components/icons/discord.vue'

import './styles/style.css'
import './styles/vitepress-content.css'
import './styles/ads.css'
import '@shikijs/vitepress-twoslash/style.css'
import './styles/shell.css'
import './site.css'

export default {
  Layout,
  setup() {
    if (import.meta.hot) {
      preserveHmrScroll(import.meta.hot)
    }
    setupTwoslashSourceLinks()
  },
  enhanceApp({ app }) {
    app.use(TwoslashFloatingVue)
    app.component('Action', Action)
    app.component('PageCard', PageCard)
    app.component('CollapsibleCode', CollapsibleCode)
    app.component('PromoBanner', PromoBanner)
    app.component('DiscordIcon', DiscordIcon)
  },
} satisfies Theme
