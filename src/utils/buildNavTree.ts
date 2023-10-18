import * as path from 'path'
import { z } from 'astro:content'
import type { MDXInstance } from 'astro'
import { minimatch } from 'minimatch'
import { docsSchema } from '../content/config'

// This is relative to the project's root.
const DOCS_BASE_PATH = path.resolve('./src/content/docs')

export type DocsFrontmatter = z.infer<typeof docsSchema>

export type DocsGroup = {
  kind: 'group'
  title: string
  children: Array<DocsPageWithOrWithoutChildren>
}

export type DocsPage = {
  kind: 'page'
  publicUrl: string
  mdx: MDXInstance<DocsFrontmatter>
}

export type DocsPageWithChildren = Omit<DocsPage, 'kind'> & {
  kind: 'page-with-children'
  publicUrl: string
  children: Array<DocsPageWithOrWithoutChildren>
}

export type DocsPageWithOrWithoutChildren = DocsPageWithChildren | DocsPage

export type DocsItem = DocsGroup | DocsPageWithOrWithoutChildren

interface GetOptions {
  /**
   * List of paths or patterns of files to exclude.
   */
  exclude?: Array<string>
}

export function createNavTreeBuilder(
  pages: Array<MDXInstance<DocsFrontmatter>>
) {
  // Sort the MDX pages ending with "index.mdx" to be first
  // in the list of pages. This way, we can analyze them as
  // potentially pages with children and remove any matching
  // children from the pages afterward.
  pages.sort((left, right) => {
    const leftIsIndex = left.file.endsWith('index.mdx')
    const rightIsIndex = right.file.endsWith('index.mdx')

    if (leftIsIndex && !rightIsIndex) {
      return -1
    }

    if (rightIsIndex && !leftIsIndex) {
      return 1
    }

    return 0
  })

  return {
    get(
      pattern: string,
      options?: GetOptions
    ): Array<DocsPageWithOrWithoutChildren> {
      const result: Array<DocsPageWithOrWithoutChildren> = []

      for (const page of pages) {
        const pageRelativePath = path.relative(DOCS_BASE_PATH, page.file)

        if (!minimatch(pageRelativePath, pattern)) {
          continue
        }

        const excludePatterns = options?.exclude || []
        if (
          excludePatterns.some((pattern) =>
            minimatch(pageRelativePath, pattern)
          )
        ) {
          continue
        }

        const publicUrl = toUrl(pageRelativePath)
        const parsed = path.parse(pageRelativePath)

        // Treat nested pages ending with "index.mdx" as
        // potential pages with children.
        if (
          /.+\/index\.mdx?$/.test(pageRelativePath) &&
          !page.frontmatter.standalone
        ) {
          const childrenPattern = `${parsed.dir}/**/*.mdx`
          const maybeChildren = this.get(childrenPattern, {
            // Exclude the parent page from the lookup to
            // prevent it appearing twice.
            exclude: [pageRelativePath],
          })

          if (maybeChildren.length > 0) {
            // Remove these children from the root-level "pages"
            // so they aren't added as standalone pages. This only
            // works because the "index.mdx" files are sorted first.
            for (const child of maybeChildren) {
              pages.splice(
                pages.findIndex((page) => page.file === child.mdx.file),
                1
              )
            }

            result.push({
              kind: 'page-with-children',
              publicUrl,
              mdx: page,
              children: maybeChildren,
            })
          } else {
            // If no children were found for this parent page,
            // treat it as a regular page in the group ending
            // with "index.mdx".
            result.push({
              kind: 'page',
              publicUrl,
              mdx: page,
            })
          }

          continue
        }

        // Allow individual MDX pages to specify their children
        // in the frontmatter. Example: "Migrations".
        if (page.frontmatter.children) {
          result.push({
            kind: 'page-with-children',
            publicUrl,
            mdx: page,
            children: this.get(page.frontmatter.children, {
              exclude: [pageRelativePath],
            }),
          })
          continue
        }

        // Otherwise, a regular page.
        result.push({
          kind: 'page',
          publicUrl,
          mdx: page,
        })
      }

      result.sort(sortByOrder)

      return result
    },
  } as const
}

function sortByOrder(
  left: DocsPageWithOrWithoutChildren,
  right: DocsPageWithOrWithoutChildren
) {
  const leftOrder = left.mdx.frontmatter.order
  const rightOrder = right.mdx.frontmatter.order

  if (typeof leftOrder === 'undefined') {
    if (typeof rightOrder === 'undefined') {
      return 0
    }

    return 1
  }

  if (typeof rightOrder === 'undefined') {
    if (typeof leftOrder === 'undefined') {
      return 0
    }

    return -1
  }

  if (leftOrder > rightOrder) {
    return 1
  }

  if (rightOrder > leftOrder) {
    return -1
  }

  return 0
}

function toUrl(relativePath: string): string {
  const cleanPath = relativePath.replace(/(index)?\.mdx?$/, '')
  return `/docs/${cleanPath}`
}
