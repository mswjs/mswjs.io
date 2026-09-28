import type MarkdownIt from 'markdown-it'
import type { Plugin } from 'vite'

interface ExternalLinkCheckerOptions {
  request?: typeof fetch
  /** URLs to leave unvalidated, e.g. links being resolved outside this site. */
  ignore?: Array<string>
}

/** Collect links from rendered Markdown and validate them without reading bodies. */
export function createExternalLinkChecker({
  request = fetch,
  ignore = [],
}: ExternalLinkCheckerOptions = {}) {
  const links = new Map<string, Set<string>>()
  const ignored = new Set(ignore.map((value) => normalizeUrl(value)))
  let validation: Promise<void> | undefined

  function normalizeUrl(value: string): string {
    const url = new URL(value, 'https://mswjs.io')
    url.hash = ''
    return url.href
  }

  function recordLink(value: string, source: string): void {
    if (!/^(https?:)?\/\//i.test(value)) {
      return
    }

    const href = normalizeUrl(value)
    if (ignored.has(href)) {
      return
    }
    const sources = links.get(href) ?? new Set<string>()
    sources.add(source)
    links.set(href, sources)
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
      throw createValidationError(`External link validation failed (${failures.length}/${links.size} URLs):\n${failures.sort().join('\n')}`)
    }
  }

  /**
   * Vite rebuilds a build error's stack from its message, and VitePress then
   * prints both "message" and "stack", so the failure list would show twice.
   * The call site is meaningless for a failing link, so expose no stack at all.
   */
  function createValidationError(message: string): Error {
    const error = new Error(message)
    Object.defineProperty(error, 'stack', {
      get: () => '',
      set: () => {},
    })
    return error
  }

  // VitePress runs two Vite builds (client and SSR) that share this plugin,
  // so "buildEnd" fires twice. Validate in the client build only; the
  // Markdown renderer is shared as well, so every link is recorded by then.
  let isServerBuild = false

  const plugin: Plugin = {
    name: 'msw:external-link-checker',
    apply: 'build',
    configResolved(config) {
      isServerBuild = Boolean(config.build.ssr)
    },
    async buildEnd(error) {
      if (error || isServerBuild) {
        return
      }
      validation ??= validate()
      await validation
    },
  }

  return { markdown, plugin }
}
