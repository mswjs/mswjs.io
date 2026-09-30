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
