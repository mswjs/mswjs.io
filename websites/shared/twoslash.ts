import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import type { Element, ElementContent, Root } from 'hast'
import type MarkdownIt from 'markdown-it'
import type { ShikiTransformer } from 'shiki'
import type { TwoslashRenderer } from '@shikijs/twoslash'
import {
  defaultHoverInfoProcessor,
  rendererFloatingVue,
  transformerTwoslash,
} from '@shikijs/vitepress-twoslash'
import {
  createTwoslasher,
  type NodeHover,
  type TwoslashExecuteOptions,
  type TwoslashInstance,
  type TwoslashReturn,
} from 'twoslash'

/**
 * Inline type information for the code snippets of a documentation site,
 * resolved against the packages installed in the site's own "node_modules"
 * (the packages ship their type definitions).
 *
 * The MSW website types its snippets against a release checkout of MSW
 * instead and links the hovers to the source on GitHub; see its own
 * ".vitepress/twoslash.ts".
 */
export interface SiteTwoslashOptions {
  /**
   * The website root: the packages are resolved from its "node_modules"
   * and the results are cached under its ".vitepress/cache".
   */
  siteDirectory: string
  /**
   * Ambient declarations for the snippets that omit their imports.
   * Snippet-level imports and declarations shadow these.
   */
  globals?: string
  /**
   * Invalidates the cached results, e.g. the versions of the typed packages.
   */
  cacheKey: string
  /**
   * Report compiler diagnostics instead of hiding them.
   * Used by report scripts, never by the site.
   */
  reportErrors?: boolean
}

/**
 * Bump when the cached twoslash results change shape.
 */
const CACHE_VERSION = 1
const GLOBALS_FILENAME = 'docs-globals.d.ts'
const JSDOC_LINK_REGEXP = /\{@link\s+(\S+)(?:\s+([^}]*))?\}/g

/**
 * Whether the hover describes an unresolved symbol (an import
 * of an uninstalled package, an untyped parameter): hovering
 * such identifiers would only reveal "any".
 */
export function isUnresolvedHover(node: NodeHover): boolean {
  const content = defaultHoverInfoProcessor(node.text)

  return (
    content === 'any' ||
    content.includes('/*unresolved*/') ||
    /^import [\w$]+$/.test(content) ||
    /[:=]\s*any$/.test(content)
  )
}

/**
 * Make JSDoc tags render like an IDE does: "@example" text is code
 * when written without fences, and "{@link url text}" is a link.
 */
export function normalizeHoverTags(node: NodeHover): void {
  if (!node.tags) {
    return
  }

  node.tags = node.tags.map(([name, text]) => {
    if (!text) {
      return [name, text]
    }

    if (name === 'example' && !text.trimStart().startsWith('```')) {
      return [name, `\`\`\`ts\n${text.trim()}\n\`\`\``]
    }

    return [
      name,
      text.replace(JSDOC_LINK_REGEXP, (_, url: string, label?: string) => {
        return `[${label?.trim() || url}](${url})`
      }),
    ]
  })
}

export function hasClass(element: Element, className: string): boolean {
  const { class: classValue } = element.properties

  if (typeof classValue === 'string') {
    return classValue.split(/\s+/).includes(className)
  }

  if (Array.isArray(classValue)) {
    return classValue.some((value) => {
      return value === className
    })
  }

  return false
}

function getTextContent(node: ElementContent | Root): string {
  if (node.type === 'text') {
    return node.value
  }

  if ('children' in node) {
    return node.children.map(getTextContent).join('')
  }

  return ''
}

/**
 * The floating-vue renderer wraps highlighted markdown code in a "<code>"
 * element, which the docs styles render as an inline code pill. Examples
 * are always blocks: replace the wrapper with the highlighted "<pre>",
 * building one when Shiki produced inline tokens (single-line examples).
 */
export function unwrapExampleCode(value: Element): void {
  value.children = value.children.map((child): ElementContent => {
    if (child.type !== 'element' || child.tagName !== 'code') {
      return child
    }

    const block = child.children.find((grandchild) => {
      return grandchild.type === 'element' && grandchild.tagName === 'pre'
    })

    if (block) {
      return block
    }

    return {
      type: 'element',
      tagName: 'pre',
      properties: { class: 'shiki' },
      children: [
        {
          type: 'element',
          tagName: 'code',
          properties: {},
          children: child.children,
        },
      ],
    }
  })
}

/**
 * Open the links in the popup (JSDoc "@see", MDN references) in a new
 * tab so the reader keeps their place, and render "@example" tags
 * as code blocks (see the shell styles).
 */
export function enhancePopupContent(node: ElementContent | Root): void {
  if (node.type === 'element') {
    if (node.tagName === 'a' && typeof node.properties.href === 'string') {
      node.properties.target = '_blank'
      node.properties.rel = 'noopener noreferrer'
    }

    if (hasClass(node, 'twoslash-popup-docs-tag')) {
      const [name, value] = node.children

      if (
        name &&
        getTextContent(name) === '@example' &&
        value?.type === 'element'
      ) {
        node.properties.class = `${node.properties.class} twoslash-popup-docs-tag-example`
        unwrapExampleCode(value)
      }
    }

    if (node.content) {
      enhancePopupContent(node.content)
    }
  }

  if ('children' in node) {
    for (const child of node.children) {
      enhancePopupContent(child)
    }
  }
}

/**
 * Enhance the hover popups: open popup links in a new tab and give
 * every popup its own floating-vue show group so only one popup
 * is visible at a time.
 */
export function enhanceHoverPopups(renderer: TwoslashRenderer): TwoslashRenderer {
  const renderStaticInfo = renderer.nodeStaticInfo

  if (!renderStaticInfo) {
    return renderer
  }

  return {
    ...renderer,
    nodeStaticInfo(info, node) {
      // The popup highlights the type text with the snippet's own options;
      // the snippet's word-highlight decorations must not leak into it.
      const context = {
        ...this,
        options: { ...this.options, decorations: [] },
      }
      const rendered = renderStaticInfo.call(context, info, node)

      if (rendered.type !== 'element') {
        return rendered
      }

      const snippetHash = createHash('sha1')
        .update(this.source)
        .digest('hex')
        .slice(0, 8)
      rendered.properties['show-group'] = `${snippetHash}-${info.start}`
      enhancePopupContent(rendered)

      return rendered
    },
  }
}

function createCompilerOptions(): ts.CompilerOptions {
  return {
    strict: true,
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    moduleDetection: ts.ModuleDetectionKind.Force,
    lib: ['lib.esnext.d.ts', 'lib.dom.d.ts', 'lib.dom.iterable.d.ts'],
    types: ['node'],
    jsx: ts.JsxEmit.ReactJSX,
    allowJs: true,
    resolveJsonModule: true,
    allowImportingTsExtensions: true,
    noEmit: true,
    skipLibCheck: true,
    skipDefaultLibCheck: true,
  }
}

function createResultCache(options: SiteTwoslashOptions) {
  const directory = path.join(options.siteDirectory, '.vitepress/cache/twoslash')
  const seed = [CACHE_VERSION, options.cacheKey, options.globals ?? ''].join(
    '\n',
  )

  function getPath(code: string, extension: string): string {
    const hash = createHash('sha256')
      .update(`${seed}\n${extension}\n${code}`)
      .digest('hex')
      .slice(0, 16)

    return path.join(directory, `${hash}.json`)
  }

  return {
    read(code: string, extension: string): TwoslashReturn | undefined {
      const cachePath = getPath(code, extension)

      if (!existsSync(cachePath)) {
        return undefined
      }

      return JSON.parse(readFileSync(cachePath, 'utf8'))
    },
    write(code: string, extension: string, result: TwoslashReturn): void {
      mkdirSync(directory, { recursive: true })
      writeFileSync(getPath(code, extension), JSON.stringify(result))
    },
  }
}

/**
 * Create a twoslasher resolving imports from the site's "node_modules".
 */
export function createSiteTwoslasher(
  options: SiteTwoslashOptions,
): TwoslashInstance {
  const twoslasher = createTwoslasher({
    vfsRoot: options.siteDirectory,
    compilerOptions: createCompilerOptions(),
    handbookOptions: {
      // Snippets are illustrative and mostly partial: never fail
      // the build on them, and only show diagnostics when reporting.
      noErrorValidation: true,
      noErrors: !options.reportErrors,
    },
    extraFiles: {
      [GLOBALS_FILENAME]: options.globals ?? '',
    },
  })
  const cache = options.reportErrors ? undefined : createResultCache(options)

  function siteTwoslasher(
    code: string,
    extension = 'ts',
    executeOptions?: TwoslashExecuteOptions,
  ): TwoslashReturn {
    const cached = cache?.read(code, extension)

    if (cached) {
      return cached
    }

    const result = twoslasher(code, extension, executeOptions)
    result.nodes = result.nodes.filter((node) => {
      return node.type !== 'hover' || !isUnresolvedHover(node)
    })
    for (const node of result.nodes) {
      if (node.type === 'hover') {
        normalizeHoverTags(node)
      }
    }
    cache?.write(code, extension, result)

    return result
  }

  return Object.assign(siteTwoslasher, {
    getCacheMap: twoslasher.getCacheMap,
  })
}

/**
 * Shiki transformer adding inline type information to the TypeScript
 * and JavaScript code snippets, resolved against the site's packages.
 */
export function siteTwoslashTransformer(
  options: SiteTwoslashOptions,
): ShikiTransformer {
  const twoslash = transformerTwoslash({
    explicitTrigger: false,
    langs: ['ts', 'tsx', 'js', 'jsx'],
    twoslasher: createSiteTwoslasher(options),
    renderer: enhanceHoverPopups(rendererFloatingVue()),
    throws: false,
    onTwoslashError(error, code) {
      const [firstLine] = code.split('\n')
      console.warn(
        `Twoslash skipped a code snippet starting with "${firstLine}":`,
        error instanceof Error ? error.message : error,
      )
    },
  })

  return {
    ...twoslash,
    pre(node) {
      twoslash.pre?.call(this, node)
      // Consumed by "twoslashLineNumbersPlugin".
      node.properties[LINE_COUNT_ATTRIBUTE] = this.lines.length
    },
  }
}

export const LINE_COUNT_ATTRIBUTE = 'data-line-count'
const LINE_COUNT_REGEXP = new RegExp(`\\s${LINE_COUNT_ATTRIBUTE}="(\\d+)"`)
const LINE_NUMBERS_REGEXP =
  /<div class="line-numbers-wrapper" aria-hidden="true">.*?<\/div>/s

/**
 * A markdown-it plugin fixing the line numbers of the code blocks
 * with inline type information. VitePress counts the lines between
 * the first "<code>" and "</code>" tags, and the type popups that
 * twoslash nests in the code block contain their own.
 */
export function twoslashLineNumbersPlugin(md: MarkdownIt): void {
  const fence = md.renderer.rules.fence

  if (!fence) {
    return
  }

  md.renderer.rules.fence = (...args) => {
    const html = fence(...args)
    const match = html.match(LINE_COUNT_REGEXP)

    if (!match) {
      return html
    }

    const lineCount = Number.parseInt(match[1], 10)
    const output = html.replace(match[0], '')

    if (!LINE_NUMBERS_REGEXP.test(output)) {
      return output
    }

    const [tokens, index] = args
    const startLine = Number.parseInt(
      tokens[index].info.match(/=(\d+)/)?.[1] ?? '1',
      10,
    )
    const lineNumbers = Array.from({ length: lineCount }, (_, offset) => {
      return `<span class="line-number">${startLine + offset}</span><br>`
    }).join('')

    return output.replace(
      LINE_NUMBERS_REGEXP,
      `<div class="line-numbers-wrapper" aria-hidden="true">${lineNumbers}</div>`,
    )
  }
}
