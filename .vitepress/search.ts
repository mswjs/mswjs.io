/** Preserve relevance within each section when displaying Algolia results. */
export function prioritizeSearchResults<Result extends { url: string; hierarchy?: Record<string, string | null> }>(
  items: Array<Result>,
): Array<Result> {
  // Keep this function self-contained: VitePress serializes it for the client.
  function priority(url: string): number {
    const section = new URL(url, 'https://mswjs.io').pathname.split('/')[1]

    switch (section) {
      case 'docs':
        return 0
      case 'guides':
        return 1
      case 'api':
        return 2
      default:
        return 3
    }
  }

  return items.filter((item) => {
    const headings = Object.values(item.hierarchy ?? {}).filter(Boolean)
    const title = headings.at(-1) ?? ''
    return !/^next\s+steps?$/i.test(title) && !/#next-steps?(?:$|[?&])/i.test(item.url)
  }).sort((left, right) => {
    return priority(left.url) - priority(right.url)
  })
}

/** Page overviews first, then their headings, then deeper reference material. */
export function rankLocalSearchResults<Result extends { id: string; title: string; score: number }>(
  results: Array<Result>,
  query: string,
): Array<Result> {
  const terms = query.toLowerCase().trim().split(/\s+/)

  function rank(result: Result) {
    const [pathname, anchor] = result.id.split('#')
    const segments = pathname.split('/').filter(Boolean)
    const section = ['docs', 'guides', 'api'].indexOf(segments[0])
    const topicIndex = segments.findIndex((segment) => terms.includes(segment.toLowerCase()))
    const depth = topicIndex >= 0 ? segments.length - topicIndex - 1 : segments.length - 1
    const page = anchor === 'main-content' || !anchor
    const matchesTopic = topicIndex >= 0 || terms.some((term) => result.title.toLowerCase().includes(term))
    const overview = page && depth <= 1 && matchesTopic

    return {
      section: section < 0 ? 3 : section,
      tier: overview ? 0 : !page && depth === 0 && matchesTopic ? 1 : page ? 2 : 3,
      depth,
      pathname,
    }
  }

  return results
    .filter((result) => !/^next\s+steps?$/i.test(result.title.trim()))
    .sort((left, right) => {
      const leftRank = rank(left)
      const rightRank = rank(right)
      const priority = leftRank.section - rightRank.section || leftRank.tier - rightRank.tier
      if (priority !== 0) {
        return priority
      }
      if (leftRank.tier === 0) {
        return leftRank.depth - rightRank.depth || leftRank.pathname.localeCompare(rightRank.pathname)
      }
      return right.score - left.score
    })
}
