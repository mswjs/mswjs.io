import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type HeadConfig } from 'vitepress'
import anchor from 'markdown-it-anchor'
import { buildDocsSidebar } from '../../shared/sidebar'
import { wordHighlightTransformer } from '../../shared/codeHighlight'
import { buildRssFeed } from './rss'
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from './consts'

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || ''
const ALGOLIA_SEARCH_API_KEY = process.env.PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
const ALGOLIA_INDEX_NAME = process.env.PUBLIC_ALGOLIA_INDEX_NAME || ''

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
  sitemap: {
    hostname: SITE_URL,
  },

  head: [
    // Font preloads.
    [
      'link',
      {
        rel: 'preload',
        href: '/fonts/inter/inter-variable.woff2',
        as: 'font',
        type: 'font/woff',
      },
    ],
    [
      'link',
      {
        rel: 'preload',
        href: '/fonts/monolisa/0-normal.woff2',
        as: 'font',
        type: 'font/woff',
      },
    ],
    [
      'link',
      {
        rel: 'preload',
        href: '/fonts/monolisa/1-italic.woff2',
        as: 'font',
        type: 'font/woff',
      },
    ],
    ['link', { rel: 'stylesheet', href: '/fonts/inter/inter.css' }],
    ['link', { rel: 'stylesheet', href: '/fonts/monolisa/monolisa.css' }],
    // Favicon.
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: 'any', href: '/icon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/icon-apple.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    // DocSearch (Algolia).
    ...(ALGOLIA_APP_ID
      ? ([
          [
            'link',
            {
              rel: 'preconnect',
              href: `https://${ALGOLIA_APP_ID}-dsn.algolia.net`,
              crossorigin: '',
            },
          ],
        ] as Array<HeadConfig>)
      : []),
  ],

  markdown: {
    theme: 'github-dark',
    headers: {
      level: [2, 3, 4],
    },
    anchor: {
      permalink: anchor.permalink.headerLink(),
    },
    codeTransformers: [wordHighlightTransformer()],
  },

  vite: {
    esbuild: {
      jsx: 'automatic',
      jsxImportSource: 'react',
    },
    optimizeDeps: {
      include: ['react', 'react-dom/client', '@docsearch/react'],
    },
    ssr: {
      noExternal: ['@docsearch/react', '@docsearch/css', '@mswjs/shared'],
    },
  },

  themeConfig: {
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'Ecosystem', href: '/ecosystem' },
      { label: 'Blog', href: '/blog' },
    ],
    brandingUrl: '/branding',
    sidebar: buildDocsSidebar(
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
    docsLinks: {
      gitHubUrl: 'https://github.com/mswjs/msw',
      blogUrl: '/blog',
    },
    editLink: {
      pattern:
        'https://github.com/mswjs/mswjs.io/edit/main/websites/mswjs.io/src/content/:path',
    },
    algolia: {
      appId: ALGOLIA_APP_ID,
      apiKey: ALGOLIA_SEARCH_API_KEY,
      indexName: ALGOLIA_INDEX_NAME,
    },
    ads: Boolean(process.env.ADS),
  },

  // The site is dark-only. The "data-theme" attribute drives
  // the DocSearch (Algolia) dark color scheme.
  transformHtml(code) {
    return code.replace('<html lang="en"', '<html lang="en" data-theme="dark"')
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
