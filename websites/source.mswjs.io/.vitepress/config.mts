import { createExternalLinkChecker } from '../../shared/externalLinks'
import { createRequire } from 'node:module'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type HeadConfig } from 'vitepress'
import { buildDocsSidebar } from '../../shared/sidebar'
import {
  wordHighlightTransformer,
  wordHighlightMetaPlugin,
} from '../../shared/codeHighlight'
import { localSearchRanking } from '../../shared/localSearchRanking'
import { prioritizeSearchResults } from '../../shared/search'
import { splitSearchSections } from '../../shared/searchSections'
import {
  siteTwoslashTransformer,
  twoslashLineNumbersPlugin,
} from '../../shared/twoslash'
import cloudflareLight from '../../shared/themes/cloudflare-light.json'
import cloudflareDark from '../../shared/themes/cloudflare-dark.json'

const SITE_URL = 'https://source.mswjs.io'
const SITE_TITLE = 'Source'
const SITE_DESCRIPTION =
  'Generate request handlers from HAR files, OpenAPI documents, and other sources.'

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || ''
const ALGOLIA_SEARCH_API_KEY = process.env.PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
const ALGOLIA_INDEX_NAME = process.env.PUBLIC_ALGOLIA_INDEX_NAME || ''
const GOOGLE_FONTS_STYLESHEET_URL =
  'https://fonts.googleapis.com/css2?family=Geist:ital,wght@0,400..800;1,400..800&display=swap&subset=latin'

const externalLinks = createExternalLinkChecker()
const siteDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)
const require = createRequire(import.meta.url)

/**
 * Code snippets are typed against the installed "@msw/source" and "msw"
 * packages, which ship their type definitions.
 */
const typedPackages = ['@msw/source', 'msw'].map((name) => {
  const manifest = require(`${name}/package.json`) as { version: string }
  return `${name}@${manifest.version}`
})

/**
 * Ambient declarations for documentation snippets that omit their imports.
 * Snippet-level imports and declarations shadow these.
 */
const DOCS_GLOBALS = `
declare const fromTraffic: typeof import('@msw/source/traffic').fromTraffic
declare const fromOpenApi: typeof import('@msw/source/open-api').fromOpenApi
declare const http: typeof import('msw').http
declare const HttpResponse: typeof import('msw').HttpResponse
declare const setupServer: typeof import('msw/node').setupServer
declare const setupWorker: typeof import('msw/browser').setupWorker
declare const server: import('msw/node').SetupServer
declare const worker: import('msw/browser').SetupWorker
declare const handlers: Array<import('msw').RequestHandler>
`

export default defineConfig({
  title: SITE_TITLE,
  titleTemplate: `:title - ${SITE_TITLE}`,
  description: SITE_DESCRIPTION,
  lang: 'en',
  srcDir: 'src/content',
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
    ['link', { rel: 'icon', type: 'image/png', sizes: 'any', href: '/icon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/icon-apple.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
  ],

  markdown: {
    theme: {
      light: { ...cloudflareLight, type: 'light' },
      dark: { ...cloudflareDark, type: 'dark' },
    },
    lineNumbers: true,
    codeTransformers: [
      wordHighlightTransformer(),
      siteTwoslashTransformer({
        siteDirectory,
        globals: DOCS_GLOBALS,
        cacheKey: typedPackages.join(','),
      }),
    ],
    config(md) {
      wordHighlightMetaPlugin(md)
      twoslashLineNumbersPlugin(md)
      externalLinks.markdown(md)
    },
  },

  vite: {
    plugins: [localSearchRanking(), externalLinks.plugin],
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
      { text: 'Blog', link: 'https://mswjs.io/blog', target: '_blank' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mswjs/source' },
      { icon: 'twitter', link: 'https://twitter.com/ApiMocking' },
    ],

    sidebar: {
      '/docs/': buildDocsSidebar(
        path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          '../src/content/docs',
        ),
        [
          ['Integrations', 'integrations/**/*.md'],
          ['API', 'api/**/*.md'],
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
      pattern:
        'https://github.com/mswjs/mswjs.io/edit/main/websites/source.mswjs.io/src/content/:path',
      text: 'Edit this page on GitHub',
    },

    lastUpdated: {
      text: 'Last updated on',
    },

    docsLinks: {
      gitHubUrl: 'https://github.com/mswjs/source',
      blogUrl: 'https://mswjs.io/blog',
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

    return head
  },
})
