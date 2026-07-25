import {
  getScrollOffset,
  onContentUpdated,
  useData,
} from 'vitepress'
import {
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
} from 'vue'
import type { DefaultTheme } from 'vitepress/theme'

export interface DocumentOutlineItem {
  title: string
  link: string
  level: number
  children: Array<DocumentOutlineItem>
}

interface FlatDocumentHeading {
  title: string
  link: string
  level: number
  element: HTMLHeadingElement
}

function getOutlineRange(
  outline: DefaultTheme.Config['outline'],
): [number, number] {
  if (outline === false) {
    return [0, 0]
  }

  const configuredLevel =
    typeof outline === 'object' && !Array.isArray(outline)
      ? outline.level
      : outline

  if (configuredLevel === 'deep') {
    return [2, 6]
  }

  if (Array.isArray(configuredLevel)) {
    return configuredLevel
  }

  const level = configuredLevel ?? 2
  return [level, level]
}

function serializeHeading(heading: HTMLHeadingElement): string {
  return Array.from(heading.childNodes)
    .filter((node) => {
      if (!(node instanceof HTMLElement)) {
        return true
      }

      return !node.matches(
        '.header-anchor, .footnote-ref, .ignore-header',
      )
    })
    .map((node) => node.textContent ?? '')
    .join('')
    .trim()
}

function collectHeadings(
  outline: DefaultTheme.Config['outline'],
): Array<FlatDocumentHeading> {
  const [minimumLevel, maximumLevel] = getOutlineRange(outline)
  const content = document.querySelector('[data-document-content]')

  if (!content || minimumLevel === 0) {
    return []
  }

  return Array.from(
    content.querySelectorAll<HTMLHeadingElement>(
      'h1, h2, h3, h4, h5, h6',
    ),
  )
    .filter((heading) => {
      const level = Number(heading.tagName.slice(1))

      return (
        Boolean(heading.id) &&
        !heading.classList.contains('ignore-header') &&
        level >= minimumLevel &&
        level <= maximumLevel
      )
    })
    .map((heading) => {
      return {
        title: serializeHeading(heading),
        link: `#${heading.id}`,
        level: Number(heading.tagName.slice(1)),
        element: heading,
      }
    })
}

function buildOutlineTree(
  headings: Array<FlatDocumentHeading>,
): Array<DocumentOutlineItem> {
  const rootItems: Array<DocumentOutlineItem> = []
  const parentStack: Array<DocumentOutlineItem> = []

  for (const heading of headings) {
    const item: DocumentOutlineItem = {
      title: heading.title,
      link: heading.link,
      level: heading.level,
      children: [],
    }

    while (
      parentStack.length > 0 &&
      parentStack[parentStack.length - 1].level >= item.level
    ) {
      parentStack.pop()
    }

    const parent = parentStack[parentStack.length - 1]

    if (parent) {
      parent.children.push(item)
    } else {
      rootItems.push(item)
    }

    parentStack.push(item)
  }

  return rootItems
}

export function useDocumentOutline() {
  const { frontmatter, theme } = useData<DefaultTheme.Config>()
  const items = shallowRef<Array<DocumentOutlineItem>>([])
  const activeLink = ref<string | null>(null)
  let headings: Array<FlatDocumentHeading> = []
  let scheduledFrame: number | null = null

  const refresh = () => {
    const outline = frontmatter.value.outline ?? theme.value.outline
    headings = collectHeadings(outline)
    items.value = buildOutlineTree(headings)
    updateActiveLink()
  }

  const updateActiveLink = () => {
    if (headings.length === 0 || window.scrollY < 1) {
      activeLink.value = null
      return
    }

    const pageBottom =
      Math.abs(
        window.scrollY +
          window.innerHeight -
          document.documentElement.scrollHeight,
      ) < 1

    if (pageBottom) {
      activeLink.value = headings[headings.length - 1].link
      return
    }

    const offset = getScrollOffset() + 4
    let nextActiveLink: string | null = null

    for (const heading of headings) {
      const headingTop =
        heading.element.getBoundingClientRect().top + window.scrollY

      if (headingTop > window.scrollY + offset) {
        break
      }

      nextActiveLink = heading.link
    }

    activeLink.value = nextActiveLink
  }

  const scheduleRefresh = () => {
    if (scheduledFrame != null) {
      cancelAnimationFrame(scheduledFrame)
    }

    scheduledFrame = requestAnimationFrame(() => {
      scheduledFrame = null
      refresh()
    })
  }

  onMounted(() => {
    scheduleRefresh()
    window.addEventListener('scroll', updateActiveLink, {
      passive: true,
    })
  })

  onContentUpdated(scheduleRefresh)

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateActiveLink)

    if (scheduledFrame != null) {
      cancelAnimationFrame(scheduledFrame)
    }
  })

  return {
    items,
    activeLink,
    refresh,
  }
}
