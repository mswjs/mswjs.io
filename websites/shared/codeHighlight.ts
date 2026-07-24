import type MarkdownIt from 'markdown-it'
import type { ShikiTransformer } from 'shiki'

interface WordHighlight {
  word: string
  /**
   * 1-based indices of the word occurrences to highlight.
   * Empty list means all the occurrences.
   */
  occurrences: Array<number>
  /**
   * Highlight color variant ("v" | "g" | "b").
   */
  id?: string
}

const WORD_HIGHLIGHT_REGEXP = /\/((?:\\.|[^/\\])+)\/([\d,]+)?(?:#(\S+))?/g

/**
 * Word-highlight specs extracted from fence meta, keyed by the
 * fence code content. The specs must be stripped from the meta
 * before VitePress parses it (its line-range parser grabs the
 * first digit run it finds, e.g. the "1,2" in "/http/1,2"),
 * so this store carries them over to the Shiki transformer.
 */
const wordHighlightsByCode = new Map<string, Array<WordHighlight>>()

function parseMeta(meta: string): Array<WordHighlight> {
  const highlights: Array<WordHighlight> = []

  for (const match of meta.matchAll(WORD_HIGHLIGHT_REGEXP)) {
    const [, rawWord, rawOccurrences, id] = match

    highlights.push({
      word: rawWord.replace(/\\(.)/g, '$1'),
      occurrences: rawOccurrences
        ? rawOccurrences
            .split(',')
            .filter(Boolean)
            .map((index) => {
              return Number.parseInt(index, 10)
            })
        : [],
      id,
    })
  }

  return highlights
}

/**
 * A markdown-it plugin that removes the "/word/1,3#v" specs
 * (the rehype-pretty-code syntax this site uses) from the code
 * fence meta before VitePress parses it for line ranges.
 */
export function wordHighlightMetaPlugin(md: MarkdownIt): void {
  const fence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const [tokens, index] = args
    const token = tokens[index]
    const highlights = parseMeta(token.info)

    if (highlights.length > 0) {
      token.info = token.info
        .replace(WORD_HIGHLIGHT_REGEXP, '')
        .replace(/\s+/g, ' ')
        .trim()
      wordHighlightsByCode.set(token.content.trim(), highlights)
    }

    return fence(...args)
  }
}

/**
 * Replicates the word highlighting of "rehype-pretty-code"
 * previously used by the site: "/word/", "/word/1,3", and
 * "/word/1,3#v" in the code fence meta.
 */
export function wordHighlightTransformer(): ShikiTransformer {
  return {
    name: 'msw:word-highlight',
    preprocess(code, options) {
      const highlights = wordHighlightsByCode.get(code.trim())

      if (!highlights || highlights.length === 0) {
        return
      }

      options.decorations ||= []

      for (const highlight of highlights) {
        let occurrence = 0
        let startIndex = code.indexOf(highlight.word)

        while (startIndex !== -1) {
          occurrence += 1

          if (
            highlight.occurrences.length === 0 ||
            highlight.occurrences.includes(occurrence)
          ) {
            options.decorations.push({
              start: startIndex,
              end: startIndex + highlight.word.length,
              properties: {
                class: 'highlighted-word',
                ...(highlight.id ? { 'data-chars-id': highlight.id } : {}),
              },
            })
          }

          startIndex = code.indexOf(
            highlight.word,
            startIndex + highlight.word.length,
          )
        }
      }
    },
  }
}
