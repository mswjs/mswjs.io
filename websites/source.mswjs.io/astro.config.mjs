import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import { remarkLastModifiedPlugin } from '@mswjs/shared/plugins/remarkLastModifiedPlugin'

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
  site: 'https://source.mswjs.io',
  integrations: [
    sitemap(),
    mdx(),
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
