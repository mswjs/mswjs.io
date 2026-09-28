import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import type MarkdownIt from 'markdown-it'
import type { Plugin } from 'vite'

interface ExternalLinkCacheOptions {
  /** JSON file recording when each URL last passed validation. */
  path: string
  /** How long a passing URL is trusted before it is checked again. */
  maxAgeMs: number
}

interface ExternalLinkCheckerOptions {
  request?: typeof fetch
  /** URLs to leave unvalidated, e.g. links being resolved outside this site. */
  ignore?: Array<string>
  /** Skip URLs that passed recently. Without it, every URL is checked. */
  cache?: ExternalLinkCacheOptions
  now?: () => number
}

type PassedAt = Record<string, number>

function readPassedAt(cache: ExternalLinkCacheOptions | undefined): PassedAt {
  if (!cache || !existsSync(cache.path)) {
    return {}
  }

  try {
    const parsed: unknown = JSON.parse(readFileSync(cache.path, 'utf8'))
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return {}
    }
    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, number] => {
        return typeof entry[1] === 'number'
      }),
    )
  } catch {
    return {}
  }
}

function writePassedAt(cache: ExternalLinkCacheOptions, passedAt: PassedAt): void {
  mkdirSync(path.dirname(cache.path), { recursive: true })
  writeFileSync(cache.path, JSON.stringify(passedAt, null, 2))
}

/** Collect links from rendered Markdown and validate them without reading bodies. */
export function createExternalLinkChecker({
  request = fetch,
  ignore = [],
  cache,
  now = Date.now,
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
    const passedAt = readPassedAt(cache)
    const startedAt = now()
    const pending = Array.from(links.entries()).filter(([url]) => {
      const lastPassedAt = passedAt[url]
      return (
        !cache ||
        lastPassedAt === undefined ||
        startedAt - lastPassedAt > cache.maxAgeMs
      )
    })
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
      } else {
        passedAt[url] = startedAt
      }
      await checkNext()
    }

    await Promise.all(Array.from({ length: 8 }, () => checkNext()))

    if (cache) {
      // Failures stay uncached so the next build checks them again.
      writePassedAt(cache, passedAt)
    }

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
  // The requests start at "buildEnd" (every module is transformed) and are
  // awaited at "closeBundle", so they overlap with chunk generation instead
  // of delaying it.
  let isServerBuild = false

  const plugin: Plugin = {
    name: 'msw:external-link-checker',
    apply: 'build',
    configResolved(config) {
      isServerBuild = Boolean(config.build.ssr)
    },
    buildEnd(error) {
      if (error || isServerBuild) {
        return
      }
      validation ??= validate()
      // Awaited in "closeBundle"; without a handler until then, Node would
      // treat an early failure as an unhandled rejection.
      validation.catch(() => {})
    },
    async closeBundle() {
      if (isServerBuild) {
        return
      }
      await validation
    },
  }

  return { markdown, plugin }
}
