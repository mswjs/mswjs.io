import { localSearchRanking } from './localSearchRanking'
import { splitSearchSections } from '../../shared/searchSections'
import { createExternalLinkChecker } from '../../shared/externalLinks'
import * as path from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import type { DefaultTheme } from 'vitepress'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { fileURLToPath } from 'node:url'
import { defineConfig, type HeadConfig } from 'vitepress'
import { buildDocsSidebar } from '../../shared/sidebar'
import {
  wordHighlightTransformer,
  wordHighlightMetaPlugin,
} from '../../shared/codeHighlight'
import { buildRssFeed } from './rss'
import { prioritizeSearchResults } from './search'
import cloudflareLight from './themes/cloudflare-light.json'
import cloudflareDark from './themes/cloudflare-dark.json'
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from './consts'

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || ''
const ALGOLIA_SEARCH_API_KEY = process.env.PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
const ALGOLIA_INDEX_NAME = process.env.PUBLIC_ALGOLIA_INDEX_NAME || ''
const GOOGLE_FONTS_STYLESHEET_URL =
  'https://fonts.googleapis.com/css2?family=Geist:ital,wght@0,400..800;1,400..800&display=swap&subset=latin'

const handwrittenApiSidebar = buildDocsSidebar(
  path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../src/content/api',
  ),
  [
    ['CLI', 'cli/**/*.md'],
    ['Browser', 'setup-worker/**/*.md'],
    ['Node.js', 'setup-server/**/*.md'],
    ['Experimental', 'experimental/**/*.md'],
  ],
  '/api',
  'API',
)

const generatedSidebarPath = fileURLToPath(
  new URL('../src/content/api/reference/typedoc-sidebar.json', import.meta.url),
)
const generatedApiSidebar: Array<DefaultTheme.SidebarItem> = existsSync(
  generatedSidebarPath,
)
  ? JSON.parse(readFileSync(generatedSidebarPath, 'utf8'))
  : []
const apiSidebar =
  generatedApiSidebar.length > 0
    ? [
        ...generatedApiSidebar,
        ...handwrittenApiSidebar.filter((section) => {
          return section.text === 'CLI'
        }),
      ]
    : handwrittenApiSidebar

function firstPage(items: Array<DefaultTheme.SidebarItem>): string | undefined {
  for (const item of items) {
    if (item.link) {
      return item.link
    }
    const childLink = item.items && firstPage(item.items)
    if (childLink) {
      return childLink
    }
  }
}

const apiEntryPath = firstPage(apiSidebar) ?? '/api/http'
const apiReleasePath = fileURLToPath(
  new URL('../src/content/api/reference/release.json', import.meta.url),
)
const apiRelease: unknown = existsSync(apiReleasePath)
  ? JSON.parse(readFileSync(apiReleasePath, 'utf8'))
  : undefined
const apiReleaseTag =
  generatedApiSidebar.length > 0 &&
  typeof apiRelease === 'object' &&
  apiRelease !== null &&
  'tag' in apiRelease &&
  typeof apiRelease.tag === 'string'
    ? apiRelease.tag
    : undefined

function redirectApiIndex(
  request: IncomingMessage,
  response: ServerResponse,
  next: () => void,
): void {
  const url = new URL(request.url ?? '/', 'http://localhost')

  if (url.pathname === '/api' || url.pathname === '/api/') {
    response.writeHead(302, { Location: `${apiEntryPath}${url.search}` })
    response.end()
    return
  }

  next()
}

const externalLinks = createExternalLinkChecker()

export default defineConfig({
  title: SITE_TITLE,
  titleTemplate: `:title - ${SITE_TITLE}`,
  description: SITE_DESCRIPTION,
  lang: 'en',
  srcDir: 'src/content',
  srcExclude: ['docs/shared/**', 'api/reference.pending/**'],
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: false,
  appearance: true,
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
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: 'any', href: '/icon.png' },
    ],
    ['link', { rel: 'apple-touch-icon', href: '/icon-apple.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
  ],

  markdown: {
    theme: {
      light: { ...cloudflareLight, type: 'light' },
      dark: { ...cloudflareDark, type: 'dark' },
    },
    lineNumbers: true,
    codeTransformers: [wordHighlightTransformer()],
    config(md) {
      wordHighlightMetaPlugin(md)
      externalLinks.markdown(md)
    },
  },

  vite: {
    plugins: [
      localSearchRanking(),
      externalLinks.plugin,
      {
        name: 'api-index-redirect',
        configureServer(server) {
          server.middlewares.use(redirectApiIndex)
        },
        configurePreviewServer(server) {
          server.middlewares.use(redirectApiIndex)
        },
      },
    ],
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
    apiReleaseTag,
    logo: '/logo.svg',
    siteTitle: false,

    nav: [
      { text: 'Docs', link: '/docs/', activeMatch: '^/docs' },
      { text: 'Guides', link: '/guides/', activeMatch: '^/guides' },
      { text: 'API', link: apiEntryPath, activeMatch: '^/api' },
      { text: 'Blog', link: '/blog/', activeMatch: '^/blog' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mswjs/msw' },
      { icon: 'twitter', link: 'https://twitter.com/ApiMocking' },
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
        ],
      ),
      '/guides/': buildDocsSidebar(
        path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          '../src/content/guides',
        ),
        [
          ['Integrations', 'integrations/**/*.md'],
          ['Best practices', 'best-practices/**/*.md'],
          ['Recipes', 'recipes/**/*.md'],
        ],
        '/guides',
      ),
      '/api/': apiSidebar,
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
            searchParameters: { hitsPerPage: 100 },
            transformItems: prioritizeSearchResults,
          },
        }
      : {
          provider: 'local',
          options: {
            miniSearch: {
              _splitIntoSections: splitSearchSections,
            },
          },
        },

    editLink: {
      pattern({ filePath }) {
        return `https://github.com/mswjs/mswjs.io/edit/main/websites/mswjs.io/src/content/${filePath}`
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

  transformPageData(pageData) {
    if (pageData.relativePath === 'api/index.md') {
      pageData.frontmatter.redirect = apiEntryPath
    }
  },

  transformHead(context) {
    const { pageData } = context
    const frontmatter = pageData.frontmatter

    if (frontmatter.redirect) {
      return [
        [
          'meta',
          { 'http-equiv': 'refresh', content: `0;url=${frontmatter.redirect}` },
        ],
        [
          'link',
          { rel: 'canonical', href: `${SITE_URL}${frontmatter.redirect}` },
        ],
      ]
    }

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
