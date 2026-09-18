import type { Element, ElementContent, Root } from 'hast'
import type MarkdownIt from 'markdown-it'
import { defaultHoverInfoProcessor } from '@shikijs/vitepress-twoslash'
import type { NodeHover } from 'twoslash'

/**
 * Bump when the cached twoslash results change shape.
 */
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
