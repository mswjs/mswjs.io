import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import { preserveHmrScroll } from './hmrScroll.mjs'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import { setupTwoslashSourceLinks } from './twoslashSourceLinks'

// Components available to Markdown content globally.
import Action from '@mswjs/shared/theme/content/Action.vue'
import PageCard from '@mswjs/shared/theme/content/PageCard.vue'
import EggheadCourseBanner from './content/EggheadCourseBanner.vue'
import DiscordIcon from '@mswjs/shared/theme/components/icons/discord.vue'

import '@mswjs/shared/theme/styles/style.css'
import '@mswjs/shared/theme/styles/vitepress-content.css'
import '@mswjs/shared/theme/styles/ads.css'
import '@shikijs/vitepress-twoslash/style.css'
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
    app.component('EggheadCourseBanner', EggheadCourseBanner)
    app.component('DiscordIcon', DiscordIcon)
  },
} satisfies Theme
