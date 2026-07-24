import * as fs from 'node:fs'
import * as path from 'node:path'
import matter from 'gray-matter'
import type { DefaultTheme } from 'vitepress'

export interface DocsFrontmatter {
  title: string
  displayTitle?: string
  order?: number
  children?: string
  standalone?: boolean
}

export interface SidebarPage {
  kind: 'page'
  title: string
  url: string
  standalone?: boolean
}

export interface SidebarPageWithChildren {
  kind: 'page-with-children'
  title: string
  url: string
  standalone?: boolean
  children: Array<SidebarItem>
}

export interface SidebarGroup {
  kind: 'group'
  title: string
  children: Array<SidebarItem>
}

export type SidebarItem = SidebarGroup | SidebarPage | SidebarPageWithChildren

interface DocsFile {
  relativePath: string
  frontmatter: DocsFrontmatter
}

/**
 * Matches the two glob shapes used by the docs
 * navigation tree: "*.md" (root-level pages only)
 * and "<dir>/**\/*.md" (every page under a directory).
 */
function matchesPattern(relativePath: string, pattern: string): boolean {
  if (pattern === '*.md') {
    return !relativePath.includes('/')
  }

  const nestedPatternMatch = pattern.match(/^(.+?)\/\*\*\/\*\.md$/)

  if (nestedPatternMatch) {
    return relativePath.startsWith(`${nestedPatternMatch[1]}/`)
  }

  return false
}

function toUrl(relativePath: string): string {
  const cleanPath = relativePath.replace(/(index)?\.md$/, '')
  return `/docs/${cleanPath}`
}

function sortByOrder(
  left: SidebarPage | SidebarPageWithChildren,
  right: SidebarPage | SidebarPageWithChildren,
  orders: Map<string, number | undefined>,
) {
  const leftOrder = orders.get(left.url)
  const rightOrder = orders.get(right.url)

  if (typeof leftOrder === 'undefined') {
    return typeof rightOrder === 'undefined' ? 0 : 1
  }

  if (typeof rightOrder === 'undefined') {
    return -1
  }

  return leftOrder - rightOrder
}

function collectDocsFiles(docsDirectory: string): Array<DocsFile> {
  const files: Array<DocsFile> = []

  const visit = (directory: string) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const entryPath = path.join(directory, entry.name)

      if (entry.isDirectory()) {
        visit(entryPath)
        continue
      }

      if (!/\.md$/.test(entry.name)) {
        continue
      }

      const relativePath = path.relative(docsDirectory, entryPath)

      // Shared partials are embedded via "@include" and
      // never appear in the navigation tree.
      if (relativePath.startsWith('shared/')) {
        continue
      }

      const { data } = matter(fs.readFileSync(entryPath, 'utf8'))
      files.push({
        relativePath,
        frontmatter: data as DocsFrontmatter,
      })
    }
  }

  visit(docsDirectory)

  return files
}

function createNavTreeBuilder(files: Array<DocsFile>) {
  // Sort the pages ending with "index.md" to be first
  // in the list of pages. This way, we can analyze them as
  // potentially pages with children and remove any matching
  // children from the pages afterward.
  const pages = [...files].sort((left, right) => {
    const leftIsIndex = left.relativePath.endsWith('index.md')
    const rightIsIndex = right.relativePath.endsWith('index.md')

    if (leftIsIndex && !rightIsIndex) {
      return -1
    }

    if (rightIsIndex && !leftIsIndex) {
      return 1
    }

    return 0
  })

  const orders = new Map<string, number | undefined>()

  const builder = {
    get(
      pattern: string,
      options?: { exclude?: Array<string> },
    ): Array<SidebarPage | SidebarPageWithChildren> {
      const result: Array<SidebarPage | SidebarPageWithChildren> = []

      for (const page of [...pages]) {
        const { relativePath, frontmatter } = page

        if (!matchesPattern(relativePath, pattern)) {
          continue
        }

        if (options?.exclude?.includes(relativePath)) {
          continue
        }

        if (!pages.includes(page)) {
          // The page has been claimed as a child of another
          // page while iterating over this snapshot.
          continue
        }

        const url = toUrl(relativePath)
        orders.set(url, frontmatter.order)

        // Treat nested pages ending with "index.md" as
        // potential pages with children.
        if (/.+\/index\.md$/.test(relativePath) && !frontmatter.standalone) {
          const childrenPattern = `${path.dirname(relativePath)}/**/*.md`
          const maybeChildren = builder.get(childrenPattern, {
            exclude: [relativePath],
          })

          if (maybeChildren.length > 0) {
            result.push({
              kind: 'page-with-children',
              title: frontmatter.title,
              url,
              standalone: frontmatter.standalone,
              children: maybeChildren,
            })
          } else {
            result.push({
              kind: 'page',
              title: frontmatter.title,
              url,
              standalone: frontmatter.standalone,
            })
          }

          continue
        }

        // Allow individual pages to specify their children
        // in the frontmatter. Example: "Migrations".
        if (frontmatter.children) {
          result.push({
            kind: 'page-with-children',
            title: frontmatter.title,
            url,
            standalone: frontmatter.standalone,
            children: builder.get(
              frontmatter.children.replace(/\.mdx$/, '.md'),
              {
                exclude: [relativePath],
              },
            ),
          })
          continue
        }

        result.push({
          kind: 'page',
          title: frontmatter.title,
          url,
          standalone: frontmatter.standalone,
        })
      }

      // Remove the matched pages from the shared list so
      // they are not added as standalone pages again. This
      // only works because "index.md" files are sorted first.
      for (const item of result) {
        const index = pages.findIndex((page) => {
          return toUrl(page.relativePath) === item.url
        })

        if (index !== -1) {
          pages.splice(index, 1)
        }
      }

      result.sort((left, right) => {
        return sortByOrder(left, right, orders)
      })

      return result
    },
  }

  return builder
}

function toDefaultThemeItem(item: SidebarItem): DefaultTheme.SidebarItem {
  if (item.kind === 'group') {
    return {
      text: item.title,
      items: item.children.map(toDefaultThemeItem),
    }
  }

  if (item.kind === 'page-with-children') {
    return {
      text: item.title,
      link: item.url,
      collapsed: true,
      items: item.children.map(toDefaultThemeItem),
    }
  }

  return {
    text: item.title,
    link: item.url,
  }
}

export function buildDocsSidebar(
  docsDirectory: string,
  groups: Array<[title: string, pattern: string]>,
): Array<DefaultTheme.SidebarItem> {
  const files = collectDocsFiles(docsDirectory)
  const builder = createNavTreeBuilder(files)

  const rootPages = builder.get('*.md')
  const tree: Array<SidebarItem> = groups.map(
    ([title, pattern]): SidebarGroup => {
      return {
        kind: 'group',
        title,
        children: builder.get(pattern),
      }
    },
  )

  return [
    // Root-level pages live in a single untitled section so
    // that pages with children (e.g. "Migrations") stay inline
    // with their siblings instead of forming their own section.
    {
      items: rootPages.map(toDefaultThemeItem),
    },
    ...tree.map(toDefaultThemeItem),
  ]
}
