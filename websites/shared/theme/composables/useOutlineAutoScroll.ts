import { onBeforeUnmount, onMounted } from 'vue'
import { onContentUpdated } from 'vitepress'

export function useOutlineAutoScroll(): void {
  let observer: MutationObserver | null = null

  const revealActiveLink = () => {
    const outline = document.querySelector<HTMLElement>(
      '[data-document-outline]',
    )
    const activeLink = outline?.querySelector<HTMLElement>(
      '[data-outline-active]',
    )

    if (!outline || !activeLink) {
      return
    }

    const outlineBounds = outline.getBoundingClientRect()
    const activeLinkBounds = activeLink.getBoundingClientRect()
    const visibleMargin = 48

    if (
      activeLinkBounds.top < outlineBounds.top + visibleMargin ||
      activeLinkBounds.bottom >
        outlineBounds.bottom - visibleMargin
    ) {
      activeLink.scrollIntoView({
        block: 'center',
        behavior: 'auto',
      })
    }
  }

  const attach = () => {
    observer?.disconnect()
    observer = null

    const outline = document.querySelector<HTMLElement>(
      '[data-document-outline]',
    )

    if (!outline) {
      return
    }

    observer = new MutationObserver(revealActiveLink)
    observer.observe(outline, {
      attributes: true,
      attributeFilter: ['data-outline-active'],
      subtree: true,
    })
    revealActiveLink()
  }

  onMounted(attach)
  onContentUpdated(attach)

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })
}
