import sourceLogo from '../../src/images/source.svg'
import dataLogo from '../../src/images/data.svg'

export interface Library {
  /**
   * The value of the library select and the "/ecosystem/<slug>" docs root.
   * MSW has no slug: its documentation lives at the site root.
   */
  slug: string | null
  name: string
  description: string
  logoUrl: string
  /**
   * The documentation root (or the project page for libraries
   * without documentation on this site).
   */
  url: string
}

export const libraries: Array<Library> = [
  {
    slug: null,
    name: 'MSW',
    description: 'Intercept and mock the network.',
    logoUrl: '/logo.svg',
    url: '/docs/',
  },
  {
    slug: 'source',
    name: 'Source',
    description: 'Generate request handlers from specs.',
    logoUrl: sourceLogo,
    url: '/ecosystem/source/',
  },
  {
    slug: 'data',
    name: 'Data',
    description: 'Model test data with ORM-like capabilities.',
    logoUrl: dataLogo,
    url: '/ecosystem/data/',
  },
]

export const ECOSYSTEM_ROOT = '/ecosystem'

/**
 * The library whose documentation the given path belongs to.
 */
export function getLibraryFromPath(path: string): Library {
  const match = path.match(/^\/ecosystem\/([^/]+)(?:\/|$)/)
  const library = match
    ? libraries.find((candidate) => {
        return candidate.slug === match[1]
      })
    : undefined

  return library ?? libraries[0]
}

/**
 * Root paths of the pages with a documentation sidebar and outline.
 */
export const DOCUMENTATION_ROOTS = [
  '/docs',
  '/guides',
  '/api',
  ...libraries.flatMap((library) => {
    return library.slug && library.url.startsWith('/')
      ? [library.url.replace(/\/$/, '')]
      : []
  }),
]
