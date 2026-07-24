import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type HeadConfig } from 'vitepress'
import { buildDocsSidebar } from '../../shared/sidebar'
import {
  wordHighlightTransformer,
  wordHighlightMetaPlugin,
} from '../../shared/codeHighlight'

const SITE_URL = 'https://source.mswjs.io'
const SITE_TITLE = 'Source'
const SITE_DESCRIPTION =
  'Generate request handlers from HAR files, OpenAPI documents, and other sources.'

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || ''
const ALGOLIA_SEARCH_API_KEY = process.env.PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
const ALGOLIA_INDEX_NAME = process.env.PUBLIC_ALGOLIA_INDEX_NAME || ''

export default defineConfig({
  title: SITE_TITLE,
  titleTemplate: `:title - ${SITE_TITLE}`,
  description: SITE_DESCRIPTION,
  lang: 'en',
  srcDir: 'src/content',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  appearance: 'force-dark',
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
      { text: 'Blog', link: 'https://mswjs.io/blog', target: '_blank' },
      { component: 'SponsorLink' },
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
