import type { MarkdownHeading } from 'astro'

export type DeepMarkdownHeading = MarkdownHeading & {
  children?: Array<DeepMarkdownHeading>
}

interface BuildHeadingsOptions {
  maxDepth?: number
}

export function buildHeadings(
  headings: Array<MarkdownHeading>,
  options?: BuildHeadingsOptions
): Array<DeepMarkdownHeading> {
  const result: Array<DeepMarkdownHeading> = []

  for (const heading of headings) {
    if (options?.maxDepth && heading.depth > options.maxDepth) {
      continue
    }

    const lastHeading = result[result.length - 1]
    const shouldNest = heading.depth > lastHeading?.depth

    if (shouldNest) {
      lastHeading.children = Array.prototype.concat(
        lastHeading.children || [],
        heading
      )
      continue
    }

    result.push(heading)
  }

  return result
}
