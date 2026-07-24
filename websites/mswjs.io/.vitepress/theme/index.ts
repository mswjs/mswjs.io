import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

// Components available to Markdown content globally.
import Action from '@mswjs/shared/theme/content/Action.vue'
import PageCard from '@mswjs/shared/theme/content/PageCard.vue'
import SponsorLink from '@mswjs/shared/theme/components/SponsorLink.vue'
import EggheadCourseBanner from './content/EggheadCourseBanner.vue'
import DiscordIcon from '@mswjs/shared/theme/components/icons/discord.vue'

import '@mswjs/shared/theme/styles/style.css'
import '@mswjs/shared/theme/styles/vp-overrides.css'
import '@mswjs/shared/theme/styles/ads.css'
import './site.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Action', Action)
    app.component('PageCard', PageCard)
    app.component('SponsorLink', SponsorLink)
    app.component('EggheadCourseBanner', EggheadCourseBanner)
    app.component('DiscordIcon', DiscordIcon)
  },
} satisfies Theme
