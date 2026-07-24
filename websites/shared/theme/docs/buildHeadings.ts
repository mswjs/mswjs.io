export interface DocsHeading {
  level: number
  title: string
  link: string
  children?: Array<DocsHeading>
}

interface HeaderLike {
  level: number
  title: string
  link: string
  children?: Array<HeaderLike>
}

function flatten(headers: Array<HeaderLike>): Array<HeaderLike> {
  const result: Array<HeaderLike> = []

  for (const header of headers) {
    result.push(header)

    if (header.children?.length) {
      result.push(...flatten(header.children))
    }
  }

  return result
}

export function buildHeadings(
  headers: Array<HeaderLike>,
  options?: { maxDepth?: number },
): Array<DocsHeading> {
  const result: Array<DocsHeading> = []

  for (const header of flatten(headers)) {
    if (options?.maxDepth && header.level > options.maxDepth) {
      continue
    }

    const heading: DocsHeading = {
      level: header.level,
      title: header.title,
      link: header.link,
    }

    const lastHeading = result[result.length - 1]

    if (lastHeading && heading.level > lastHeading.level) {
      lastHeading.children = (lastHeading.children || []).concat(heading)
      continue
    }

    result.push(heading)
  }

  return result
}
