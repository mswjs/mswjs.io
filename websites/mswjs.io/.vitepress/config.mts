import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type HeadConfig } from 'vitepress'
import { buildDocsSidebar } from '../../shared/sidebar'
import {
  wordHighlightTransformer,
  wordHighlightMetaPlugin,
} from '../../shared/codeHighlight'
import { buildRssFeed } from './rss'
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from './consts'

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || ''
const ALGOLIA_SEARCH_API_KEY = process.env.PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
const ALGOLIA_INDEX_NAME = process.env.PUBLIC_ALGOLIA_INDEX_NAME || ''
const GOOGLE_FONTS_STYLESHEET_URL =
  'https://fonts.googleapis.com/css2?family=Geist:ital,wght@0,400..800;1,400..800&family=Geist+Mono:ital,wght@0,400..700;1,400..700&display=swap&subset=latin'

export default defineConfig({
  title: SITE_TITLE,
  titleTemplate: `:title - ${SITE_TITLE}`,
  description: SITE_DESCRIPTION,
  lang: 'en',
  srcDir: 'src/content',
  srcExclude: ['docs/shared/**'],
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  appearance: 'force-dark',
  sitemap: {
    hostname: SITE_URL,
  },

  head: [
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    ],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: '',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: GOOGLE_FONTS_STYLESHEET_URL,
      },
    ],
    // Favicon.
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: 'any', href: '/icon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/icon-apple.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
  ],

  markdown: {
    theme: 'github-dark',
    lineNumbers: true,
    codeTransformers: [wordHighlightTransformer()],
    config(md) {
      wordHighlightMetaPlugin(md)
    },
  },

  vite: {
    esbuild: {
      jsx: 'automatic',
      jsxImportSource: 'react',
    },
    optimizeDeps: {
      include: ['react', 'react-dom/client'],
    },
    ssr: {
      noExternal: ['@mswjs/shared'],
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: false,

    nav: [
      { text: 'Docs', link: '/docs/', activeMatch: '^/docs' },
      { text: 'Ecosystem', link: '/ecosystem', activeMatch: '^/ecosystem' },
      { text: 'Blog', link: '/blog/', activeMatch: '^/blog' },
      { component: 'SponsorLink' },
    ],

    sidebar: {
      '/docs/': buildDocsSidebar(
        path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          '../src/content/docs',
        ),
        [
          ['Mocking HTTP', 'http/**/*.md'],
        ['Mocking SSE', 'sse/**/*.md'],
        ['Mocking GraphQL', 'graphql/**/*.md'],
        ['Mocking WebSocket', 'websocket/**/*.md'],
        ['Integrations', 'integrations/**/*.md'],
        ['API', 'api/**/*.md'],
        ['CLI', 'cli/**/*.md'],
          ['Best practices', 'best-practices/**/*.md'],
          ['Recipes', 'recipes/**/*.md'],
        ],
      ),
    },

    outline: {
      level: 'deep',
      label: 'Contents',
    },
    sidebarMenuLabel: 'Docs',

    search: ALGOLIA_APP_ID
      ? {
          provider: 'algolia',
          options: {
            appId: ALGOLIA_APP_ID,
            apiKey: ALGOLIA_SEARCH_API_KEY,
            indexName: ALGOLIA_INDEX_NAME,
          },
        }
      : {
          provider: 'local',
        },

    editLink: {
      pattern({ filePath }) {
        const sourcePath = filePath.replace(/\.md$/, '.mdx')

        return `https://github.com/mswjs/mswjs.io/edit/main/websites/mswjs.io/src/content/${sourcePath}`
      },
      text: 'Edit this page on GitHub',
    },

    lastUpdated: {
      text: 'Last updated on',
    },

    docsLinks: {
      gitHubUrl: 'https://github.com/mswjs/msw',
      blogUrl: '/blog',
    },
    ads: Boolean(process.env.ADS),
  },

  transformHead(context) {
    const { pageData } = context
    const frontmatter = pageData.frontmatter

    const pagePath = pageData.relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    const pageUrl = `${SITE_URL}/${pagePath}`

    const title = frontmatter.displayTitle || frontmatter.title || SITE_TITLE
    const description = frontmatter.description || SITE_DESCRIPTION
    const image = `${SITE_URL}/og-image.jpg`

    const head: Array<HeadConfig> = [
      ['link', { rel: 'canonical', href: pageUrl }],
      ['meta', { name: 'title', content: title }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:url', content: pageUrl }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:image', content: image }],
      ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { property: 'twitter:url', content: pageUrl }],
      ['meta', { property: 'twitter:title', content: title }],
      ['meta', { property: 'twitter:description', content: description }],
      ['meta', { property: 'twitter:image', content: image }],
    ]

    if (frontmatter.keywords?.length) {
      head.push([
        'meta',
        { name: 'keywords', content: frontmatter.keywords.join(', ') },
      ])
    }

    if (frontmatter.author?.name) {
      head.push(['meta', { name: 'author', content: frontmatter.author.name }])
    }

    return head
  },

  async buildEnd(config) {
    await buildRssFeed(config)
  },
})
