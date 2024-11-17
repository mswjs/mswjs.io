import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import svgr from 'vite-plugin-svgr'
import { remarkLastModifiedPlugin } from '@mswjs/shared/plugins/remarkLastModifiedPlugin.ts'
import { remarkGitHubEditUrlPlugin } from '@mswjs/shared/plugins/remarkGItHubEditUrlPlugin'

import { repository } from './package.json'

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
  vite: {
    plugins: [
      svgr({
        include: '**/*.svg?react',
        svgrOptions: {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          svgoConfig: {
            plugins: [
              'preset-default',
              'removeTitle',
              'removeDesc',
              'removeDoctype',
              'cleanupIds',
              'removeDimensions',
            ],
          },
        },
      }),
    ],
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      remarkLastModifiedPlugin,
      [
        remarkGitHubEditUrlPlugin,
        {
          repositoryUrl: repository.url,
        },
      ],
    ],
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
