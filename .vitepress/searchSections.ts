import { readFile } from 'node:fs/promises'
import matter from 'gray-matter'

/** Include page introductions, which VitePress's heading-only splitter omits. */
export async function splitSearchSections(file: string, html: string) {
  if (!html.trim()) {
    return []
  }

  const { data } = matter(await readFile(file, 'utf8'))
  const title = data.title === 'Introduction' ? data.displayTitle : data.title
  const pageTitle = typeof title === 'string' ? title : 'Overview'
  const sections: Array<{ anchor: string; titles: Array<string>; text: string }> = []
  const headings = Array.from(html.matchAll(/<h([1-6])\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g))

  function plainText(value: string): string {
    return value
      .replace(/<a\b[^>]*class="header-anchor"[^>]*>[\s\S]*?<\/a>/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim()
  }

  const introduction = html.slice(0, headings[0]?.index ?? html.length)
  sections.push({
    anchor: 'main-content',
    titles: [pageTitle],
    text: `${typeof data.displayTitle === 'string' ? data.displayTitle : ''} ${plainText(introduction)}`,
  })

  const parents: Array<string> = [pageTitle]
  let excludedLevel: number | undefined

  for (const [index, heading] of headings.entries()) {
    const level = Number(heading[1])
    const headingTitle = plainText(heading[3])
    if (excludedLevel !== undefined && level > excludedLevel) {
      continue
    }
    excludedLevel = undefined
    if (/^next\s+steps?$/i.test(headingTitle)) {
      excludedLevel = level
      continue
    }
    const text = plainText(html.slice(
      heading.index + heading[0].length,
      headings[index + 1]?.index ?? html.length,
    ))
    parents.length = Math.min(parents.length, Math.max(1, level - 1))
    sections.push({ anchor: heading[2], titles: [...parents, headingTitle], text })
    parents.push(headingTitle)
  }

  return sections
}
