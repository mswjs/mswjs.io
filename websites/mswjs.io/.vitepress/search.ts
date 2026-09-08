/** Prioritize documentation before MiniSearch selects the visible results. */
export function boostSearchDocument(documentId: string): number {
  const section = documentId.split('/')[1]?.split(/[?#]/)[0]

  switch (section) {
    case 'docs':
      return 1_000_000
    case 'guides':
      return 1_000
    case 'api':
      return 1
    default:
      return 0.001
  }
}

/** Preserve relevance within each section when displaying Algolia results. */
export function prioritizeSearchResults<Result extends { url: string }>(
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

  return [...items].sort((left, right) => {
    return priority(left.url) - priority(right.url)
  })
}
