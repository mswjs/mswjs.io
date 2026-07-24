import type { Theme } from 'vitepress'
import Layout from './Layout.vue'

// Components available to Markdown content globally.
import Warning from '@mswjs/shared/theme/content/Warning.vue'
import Info from '@mswjs/shared/theme/content/Info.vue'
import Success from '@mswjs/shared/theme/content/Success.vue'
import Action from '@mswjs/shared/theme/content/Action.vue'
import PageCard from '@mswjs/shared/theme/content/PageCard.vue'

import '@docsearch/css/dist/style.css'
import '@mswjs/shared/theme/styles/style.css'
import '@mswjs/shared/theme/styles/search.css'
import '@mswjs/shared/theme/styles/ads.css'
import './site.css'

export default {
  Layout,
  enhanceApp({ app }) {
    // Mirror the build-time "transformHtml" hook during dev
    // and client-side navigation: DocSearch derives its dark
    // color scheme from this attribute.
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', 'dark')
    }

    app.component('Warning', Warning)
    app.component('Info', Info)
    app.component('Success', Success)
    app.component('Action', Action)
    app.component('PageCard', PageCard)
  },
} satisfies Theme
