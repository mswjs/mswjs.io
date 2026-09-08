import { execFileSync } from 'node:child_process'

export const repositoryUrl = 'https://github.com/mswjs/msw'

export async function resolveLatestRelease(fetchRelease = fetch) {
  const headers = { Accept: 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  const response = await fetchRelease(
    'https://api.github.com/repos/mswjs/msw/releases/latest',
    { headers, signal: AbortSignal.timeout(30_000) },
  )
  if (!response.ok) {
    throw new Error(
      `Cannot resolve latest MSW release: HTTP ${response.status}`,
    )
  }
  const release = await response.json()
  if (
    typeof release.tag_name !== 'string' ||
    !release.tag_name ||
    release.draft ||
    release.prerelease
  ) {
    throw new Error('GitHub did not return a published stable MSW release')
  }
  execFileSync('git', ['check-ref-format', `refs/tags/${release.tag_name}`])
  return { tag: release.tag_name, publishedAt: release.published_at }
}

const moduleNames = new Map([
  ['core', 'API'],
  ['browser', 'Browser'],
  ['node', 'Node.js'],
  ['native', 'React Native'],
  ['core/experimental', 'Experimental'],
])

export function nameModules(project, publicModules = new Map()) {
  for (const module of project.children ?? []) {
    // Explicit @module names take precedence over the source-directory defaults.
    module.name =
      moduleNames.get(module.name.replace(/^src\//, '')) ??
      publicModules.get(module.name) ??
      module.name
  }
}

export function organizeSidebar(
  items,
  priorities = {},
  deprecatedLinks = new Set(),
) {
  function normalizeLink(item, parentPath = '') {
    const itemPath = parentPath ? `${parentPath}/${item.text}` : item.text
    const link = item.link
      ?.replace(/\.md(?=#|$)/, '')
      .replace('/reference.pending/', '/reference/')
    const children = item.items?.map((child) => normalizeLink(child, itemPath))
    const priority = priorities[itemPath] ?? []
    children?.sort((left, right) => {
      const leftIndex = priority.indexOf(left.text)
      const rightIndex = priority.indexOf(right.text)
      return (
        (leftIndex < 0 ? priority.length : leftIndex) -
        (rightIndex < 0 ? priority.length : rightIndex)
      )
    })
    return {
      ...item,
      link,
      deprecated: deprecatedLinks.has(link) || undefined,
      items: children,
    }
  }
  const sections = items.map((item) => {
    return { ...normalizeLink(item), link: undefined, collapsed: undefined }
  })
  const order = ['API', 'Browser', 'Node.js', 'Experimental']
  sections.sort((left, right) => {
    const leftIndex = order.indexOf(left.text)
    const rightIndex = order.indexOf(right.text)
    return (
      (leftIndex < 0 ? order.length : leftIndex) -
      (rightIndex < 0 ? order.length : rightIndex)
    )
  })
  return sections
}
