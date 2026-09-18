import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
import type { Element, ElementContent, Root } from 'hast'
import type { ShikiTransformer } from 'shiki'
import type { TwoslashRenderer } from '@shikijs/twoslash'
import { rendererFloatingVue, transformerTwoslash } from '@shikijs/vitepress-twoslash'
import {
  createTwoslasher,
  getObjectHash,
  type NodeHover,
  type TwoslashExecuteOptions,
  type TwoslashInstance,
  type TwoslashReturn,
} from 'twoslash'
import { repositoryUrl, type MswSource } from '../scripts/msw-source.mjs'
import {
  LINE_COUNT_ATTRIBUTE,
  enhancePopupContent,
  hasClass,
  isUnresolvedHover,
  normalizeHoverTags,
  twoslashLineNumbersPlugin,
  unwrapExampleCode,
} from './twoslashHelpers.ts'

export {
  enhancePopupContent,
  isUnresolvedHover,
  normalizeHoverTags,
  twoslashLineNumbersPlugin,
  unwrapExampleCode,
}

const siteDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)

/**
 * Bump when the cached twoslash results change shape.
 */
const CACHE_VERSION = 3
const GLOBALS_FILENAME = 'msw-docs-globals.d.ts'

/**
 * Ambient declarations for documentation snippets that omit their imports
 * (most of them do). Snippet-level imports and declarations shadow these.
 */
const DOCS_GLOBALS = `
declare const http: typeof import('msw').http
declare const graphql: typeof import('msw').graphql
declare const ws: typeof import('msw').ws
declare const sse: typeof import('msw').sse
declare const HttpResponse: typeof import('msw').HttpResponse
declare const delay: typeof import('msw').delay
declare const passthrough: typeof import('msw').passthrough
declare const bypass: typeof import('msw').bypass
declare const getResponse: typeof import('msw').getResponse
declare const setupWorker: typeof import('msw/browser').setupWorker
declare const setupServer: typeof import('msw/node').setupServer
declare const worker: import('msw/browser').SetupWorker
declare const server: import('msw/node').SetupServer
declare const handlers: Array<
  import('msw').RequestHandler | import('msw').WebSocketHandler
>
declare const client: import('msw').WebSocketHandlerConnection['client']
declare const fromTraffic: typeof import('@msw/source/traffic').fromTraffic
declare const fromOpenApi: typeof import('@msw/source/open-api').fromOpenApi
declare const Collection: typeof import('@msw/data').Collection
declare const Query: typeof import('@msw/data').Query
declare const z: typeof import('zod').z
`

export interface SourceDefinition {
  /**
   * File path relative to the MSW repository root, e.g. "src/core/ws.ts".
   */
  path: string
  /**
   * 1-based line number of the definition.
   */
  line: number
}

interface TwoslasherOptions {
  /**
   * Report compiler diagnostics instead of hiding them.
   * Used by the report script, never by the site.
   */
  reportErrors?: boolean
}

/**
 * Map an index in the twoslash output code back to the input code
 * by re-inserting the ranges twoslash removed (notations, cut sections).
 */
export function toOriginalIndex(
  index: number,
  removals: Array<[number, number]>,
): number {
  const ascending = [...removals].sort((left, right) => {
    return left[0] - right[0]
  })
  let original = index

  for (const [start, end] of ascending) {
    if (start > original) {
      break
    }

    original += end - start
  }

  return original
}

export function createSourceUrl(
  source: Pick<MswSource, 'tag'>,
  definition: SourceDefinition,
): string {
  return `${repositoryUrl}/blob/${source.tag}/${definition.path}#L${definition.line}`
}

export function getSourceDefinition(
  node: NodeHover,
): SourceDefinition | undefined {
  if (!('source' in node)) {
    return undefined
  }

  const { source } = node

  if (
    typeof source === 'object' &&
    source !== null &&
    'path' in source &&
    typeof source.path === 'string' &&
    'line' in source &&
    typeof source.line === 'number'
  ) {
    return { path: source.path, line: source.line }
  }

  return undefined
}

/**
 * Find the hover popup inside the rendered hover token.
 * The floating-vue renderer nests it in a "<template>" content root.
 */
export function findPopupContainer(
  node: ElementContent | Root,
): Element | undefined {
  if (node.type === 'element') {
    if (hasClass(node, 'twoslash-popup-container')) {
      return node
    }

    if (node.content) {
      const found = findPopupContainer(node.content)

      if (found) {
        return found
      }
    }
  }

  if ('children' in node) {
    for (const child of node.children) {
      const found = findPopupContainer(child)

      if (found) {
        return found
      }
    }
  }

  return undefined
}

function createSourceLink(
  source: Pick<MswSource, 'tag'>,
  definition: SourceDefinition,
): Element {
  return {
    type: 'element',
    tagName: 'div',
    properties: { class: 'twoslash-popup-source' },
    children: [
      {
        type: 'element',
        tagName: 'a',
        properties: {
          href: createSourceUrl(source, definition),
          target: '_blank',
          rel: 'noopener noreferrer',
          title: `View the definition in MSW ${source.tag} on GitHub`,
        },
        children: [
          {
            type: 'text',
            value: `${definition.path}:${definition.line}`,
          },
        ],
      },
    ],
  }
}

/**
 * Enhance the hover popups: link the symbols defined in the MSW source
 * to GitHub (also via Cmd/Ctrl+click on the token, see the theme),
 * open popup links in a new tab, and give every popup its own
 * floating-vue show group so only one popup is visible at a time.
 */
export function enhanceHoverPopups(
  renderer: TwoslashRenderer,
  source: Pick<MswSource, 'tag'>,
): TwoslashRenderer {
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

      const definition = getSourceDefinition(info)

      if (definition) {
        rendered.properties['data-source'] = createSourceUrl(source, definition)
        const popup = findPopupContainer(rendered)
        popup?.children.push(createSourceLink(source, definition))
      }

      return rendered
    },
  }
}

function createPathMappings(source: MswSource): Record<string, Array<string>> {
  const coreDirectory = path.join(source.sourceDirectory, 'src/core')
  const paths: Record<string, Array<string>> = {
    // MSW's own import alias, used across its source.
    '#core': [coreDirectory],
    '#core/*': [`${coreDirectory}/*`],
  }

  for (const entry of source.entryPoints) {
    for (const specifier of entry.exports) {
      paths[specifier] = [path.join(source.sourceDirectory, entry.source)]
    }
  }

  return paths
}

function createCompilerOptions(source: MswSource): ts.CompilerOptions {
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
    paths: createPathMappings(source),
  }
}

function createResultCache(source: MswSource) {
  const directory = path.join(
    siteDirectory,
    '.vitepress/cache/twoslash',
    source.tag,
  )
  const seed = [CACHE_VERSION, source.commit, DOCS_GLOBALS].join('\n')

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
 * Create a twoslasher that resolves "msw" imports to the checked-out
 * release source and annotates hover nodes with their source definition.
 */
export function createMswTwoslasher(
  source: MswSource,
  options: TwoslasherOptions = {},
): TwoslashInstance {
  const fsRoot = `${siteDirectory}/`
  const sourceRoot = `${path.resolve(source.sourceDirectory)}/`
  const globalsPath = `${fsRoot}${GLOBALS_FILENAME}`
  const twoslasher = createTwoslasher({
    vfsRoot: siteDirectory,
    compilerOptions: createCompilerOptions(source),
    handbookOptions: {
      // Snippets are illustrative and mostly partial: never fail
      // the build on them, and only show diagnostics when reporting.
      noErrorValidation: true,
      noErrors: !options.reportErrors,
    },
    extraFiles: {
      [GLOBALS_FILENAME]: DOCS_GLOBALS,
    },
  })
  const cache = options.reportErrors ? undefined : createResultCache(source)

  function toSourceDefinition(
    program: ts.Program,
    definition: ts.DefinitionInfo,
  ): SourceDefinition | undefined {
    const fileName = path.resolve(definition.fileName)

    if (!fileName.startsWith(`${sourceRoot}src/`)) {
      return undefined
    }

    const sourceFile = program.getSourceFile(definition.fileName)

    if (!sourceFile) {
      return undefined
    }

    const { line } = sourceFile.getLineAndCharacterOfPosition(
      definition.textSpan.start,
    )

    return {
      path: path.relative(sourceRoot, fileName),
      line: line + 1,
    }
  }

  function findSourceDefinition(
    languageService: ts.LanguageService,
    filepath: string,
    position: number,
  ): SourceDefinition | undefined {
    const program = languageService.getProgram()

    if (!program) {
      return undefined
    }

    // Prefer the symbol's own definition (an exported API), and fall back
    // to its type (a snippet variable holding an MSW value).
    const candidates = [
      ...(languageService.getDefinitionAtPosition(filepath, position) ?? []),
      ...(languageService.getTypeDefinitionAtPosition(filepath, position) ??
        []),
    ]

    for (const candidate of candidates) {
      const definition = toSourceDefinition(program, candidate)

      if (definition) {
        return definition
      }
    }

    return undefined
  }

  function attachSourceDefinitions(result: TwoslashReturn): void {
    const environment = twoslasher
      .getCacheMap()
      ?.get(getObjectHash(result.meta.compilerOptions))

    if (!environment) {
      return
    }

    const files = result.meta.virtualFiles.filter((file) => {
      return file.supportLsp
    })

    // Twoslash blanks its virtual files once done; restore them
    // for the duration of the definition lookups.
    for (const file of files) {
      environment.createFile(
        file.filepath,
        `${file.prepend ?? ''}${file.content}${file.append ?? ''}`,
      )
    }
    environment.createFile(globalsPath, DOCS_GLOBALS)

    for (const node of result.nodes) {
      if (node.type !== 'hover') {
        continue
      }

      const originalIndex = toOriginalIndex(node.start, result.meta.removals)
      const file = files.find((candidate) => {
        return (
          originalIndex >= candidate.offset &&
          originalIndex < candidate.offset + candidate.content.length
        )
      })

      if (!file) {
        continue
      }

      const definition = findSourceDefinition(
        environment.languageService,
        file.filepath,
        originalIndex - file.offset + (file.prepend?.length ?? 0),
      )

      if (definition) {
        Object.assign(node, { source: definition })
      }
    }

    for (const file of files) {
      environment.createFile(file.filepath, '')
    }
    environment.createFile(globalsPath, '')
  }

  function mswTwoslasher(
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
    attachSourceDefinitions(result)
    cache?.write(code, extension, result)

    return result
  }

  return Object.assign(mswTwoslasher, {
    getCacheMap: twoslasher.getCacheMap,
  })
}

/**
 * Shiki transformer adding inline type information to the TypeScript
 * and JavaScript code snippets, resolved against the given MSW release.
 */
export function mswTwoslashTransformer(source: MswSource): ShikiTransformer {
  const twoslash = transformerTwoslash({
    explicitTrigger: false,
    langs: ['ts', 'tsx', 'js', 'jsx'],
    twoslasher: createMswTwoslasher(source),
    renderer: enhanceHoverPopups(rendererFloatingVue(), source),
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

