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
 * Replicates the word highlighting of "rehype-pretty-code"
 * previously used by the site: "/word/", "/word/1,3", and
 * "/word/1,3#v" in the code fence meta.
 */
export function wordHighlightTransformer(): ShikiTransformer {
  return {
    name: 'msw:word-highlight',
    preprocess(code, options) {
      const meta = options.meta?.__raw

      if (!meta) {
        return
      }

      const highlights = parseMeta(meta)

      if (highlights.length === 0) {
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
