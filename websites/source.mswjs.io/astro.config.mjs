import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://source.mswjs.io',
  integrations: [
    sitemap(),
    mdx(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
