import type { Theme } from 'vitepress'
import Layout from './Layout.vue'

// Components available to Markdown content globally.
import Action from '@mswjs/shared/theme/content/Action.vue'
import PageCard from '@mswjs/shared/theme/content/PageCard.vue'
import EggheadCourseBanner from './content/EggheadCourseBanner.vue'
import DiscordIcon from '@mswjs/shared/theme/components/icons/discord.vue'

import '@mswjs/shared/theme/styles/style.css'
import '@mswjs/shared/theme/styles/vitepress-content.css'
import '@mswjs/shared/theme/styles/ads.css'
import './site.css'

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('Action', Action)
    app.component('PageCard', PageCard)
    app.component('EggheadCourseBanner', EggheadCourseBanner)
    app.component('DiscordIcon', DiscordIcon)
  },
} satisfies Theme
