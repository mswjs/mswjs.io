import { onBeforeUnmount, onMounted } from 'vue'
import { onContentUpdated } from 'vitepress'

/**
 * Keeps the active heading indicator visible within the
 * internally-scrollable outline (table of contents). VitePress
 * positions the ".outline-marker" element next to the active
 * link as the page scrolls; follow it by scrolling the outline
 * container whenever it leaves the visible band.
 */
export function useOutlineAutoScroll(): void {
  let observer: MutationObserver | null = null

  const followMarker = (outline: HTMLElement, marker: HTMLElement) => {
    const outlineRect = outline.getBoundingClientRect()
    const markerRect = marker.getBoundingClientRect()

    // The marker's position within the outline's scroll space.
    const markerTop = markerRect.top - outlineRect.top + outline.scrollTop
    const visibleTop = outline.scrollTop
    const visibleBottom = visibleTop + outline.clientHeight
    const margin = 48

    if (markerTop < visibleTop + margin) {
      outline.scrollTo({ top: markerTop - margin })
    } else if (markerRect.height + markerTop > visibleBottom - margin) {
      outline.scrollTo({
        top: markerTop - outline.clientHeight + margin,
      })
    }
  }

  const attach = () => {
    observer?.disconnect()
    observer = null

    const outline = document.querySelector<HTMLElement>('.VPDocAsideOutline')
    const marker = outline?.querySelector<HTMLElement>('.outline-marker')

    if (!outline || !marker) {
      return
    }

    observer = new MutationObserver(() => {
      // Follow after the layout settles for the new marker position.
      requestAnimationFrame(() => {
        followMarker(outline, marker)
      })
    })
    observer.observe(marker, {
      attributes: true,
      attributeFilter: ['style'],
    })

    followMarker(outline, marker)
  }

  onMounted(attach)
  onContentUpdated(attach)

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })
}
