import type MarkdownIt from 'markdown-it'
import type { Plugin } from 'vite'

/** Collect links from rendered Markdown and validate them without reading bodies. */
export function createExternalLinkChecker(request: typeof fetch = fetch) {
  const links = new Map<string, Set<string>>()
  let validation: Promise<void> | undefined

  function recordLink(value: string, source: string): void {
    if (!/^(https?:)?\/\//i.test(value)) {
      return
    }

    const url = new URL(value, 'https://mswjs.io')
    url.hash = ''
    const sources = links.get(url.href) ?? new Set<string>()
    sources.add(source)
    links.set(url.href, sources)
  }

  function markdown(md: MarkdownIt): void {
    md.core.ruler.push('msw:external-links', (state) => {
      const environment: { relativePath?: unknown } = state.env
      const source = typeof environment.relativePath === 'string'
        ? environment.relativePath
        : 'Markdown content'

      for (const token of state.tokens.flatMap((token) => token.children ?? [token])) {
        if (token.type === 'link_open') {
          const href = token.attrGet('href')
          if (href) {
            recordLink(href, source)
          }
        }

        if (token.type === 'html_block' || token.type === 'html_inline') {
          for (const match of token.content.matchAll(/\b(?:href|url)\s*=\s*["']([^"']+)["']/g)) {
            recordLink(match[1], source)
          }
        }
      }
    })
  }

  async function validate(): Promise<void> {
    const pending = Array.from(links.entries())
    const failures: Array<string> = []

    async function checkNext(): Promise<void> {
      const entry = pending.shift()
      if (!entry) {
        return
      }

      const [url, sources] = entry
      let failure: string | undefined

      try {
        const response = await request(url, {
          method: 'HEAD',
          redirect: 'follow',
          signal: AbortSignal.timeout(15_000),
        })
        if (response.status !== 200) {
          failure = `HTTP ${response.status}`
        }
      } catch (error) {
        failure = error instanceof Error ? error.message : String(error)
      }

      if (failure) {
        failures.push(`${url} — ${failure}\n  in ${Array.from(sources).join(', ')}`)
      }
      await checkNext()
    }

    await Promise.all(Array.from({ length: 8 }, () => checkNext()))

    if (failures.length > 0) {
      throw new Error(`External link validation failed (${failures.length}/${links.size} URLs):\n${failures.sort().join('\n')}`)
    }
  }

  const plugin: Plugin = {
    name: 'msw:external-link-checker',
    apply: 'build',
    async buildEnd(error) {
      if (error) {
        return
      }
      validation ??= validate()
      await validation
    },
  }

  return { markdown, plugin }
}
