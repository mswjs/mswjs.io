import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import { remarkLastModifiedPlugin } from './src/plugins/remarkLastModifiedPlugin'

import tailwind from '@astrojs/tailwind'

/** @type {import('rehype-autolink-headings').Options} */
const autoLinkHeadingsOptions = {
  behavior: 'wrap',
}

/** @type {import('rehype-external-links').Options} */
const externalLinksOptions = {
  target: '_blank',
  rel: ['noopener', 'noreferrer'],
}

// https://astro.build/config
export default defineConfig({
  site: 'https://mswjs.io',
  integrations: [
    mdx(),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkLastModifiedPlugin],
    rehypePlugins: [
      rehypeHeadingIds,
      [rehypeExternalLinks, externalLinksOptions],
      [rehypeAutolinkHeadings, autoLinkHeadingsOptions],
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
        },
      ],
    ],
  },
})
