import { onBeforeUnmount, onMounted } from 'vue'
import { onContentUpdated } from 'vitepress'

const SIDEBAR_SCROLL_KEY = 'docs-sidebar-scroll'
const ACTIVE_LINK_SELECTOR =
  '.VPSidebarItem.is-active > .item > .link'

export function useSidebarAutoScroll(): void {
  let scheduledFrame: number | null = null

  const getSidebar = () => {
    return document.querySelector<HTMLElement>('.VPSidebar')
  }

  const revealActiveLink = () => {
    const sidebar = getSidebar()
    const activeLink = sidebar?.querySelector<HTMLElement>(
      ACTIVE_LINK_SELECTOR,
    )

    if (!sidebar || !activeLink) {
      return
    }

    const sidebarRect = sidebar.getBoundingClientRect()
    const activeLinkRect = activeLink.getBoundingClientRect()
    const isAboveViewport = activeLinkRect.top < sidebarRect.top
    const isBelowViewport = activeLinkRect.bottom > sidebarRect.bottom

    if (!isAboveViewport && !isBelowViewport) {
      return
    }

    const activeLinkTop =
      activeLinkRect.top - sidebarRect.top + sidebar.scrollTop
    const centeredScrollTop =
      activeLinkTop -
      sidebar.clientHeight / 2 +
      activeLinkRect.height / 2

    sidebar.scrollTo({
      top: centeredScrollTop,
      behavior: 'auto',
    })
  }

  const scheduleReveal = () => {
    if (scheduledFrame != null) {
      cancelAnimationFrame(scheduledFrame)
    }

    scheduledFrame = requestAnimationFrame(() => {
      scheduledFrame = null
      revealActiveLink()
    })
  }

  const restoreScrollPosition = () => {
    const sidebar = getSidebar()
    const storedScrollPosition = Number(
      sessionStorage.getItem(SIDEBAR_SCROLL_KEY),
    )

    if (!sidebar || !Number.isFinite(storedScrollPosition)) {
      return
    }

    sidebar.scrollTop = storedScrollPosition
  }

  const saveScrollPosition = () => {
    const sidebar = getSidebar()

    if (!sidebar) {
      return
    }

    sessionStorage.setItem(SIDEBAR_SCROLL_KEY, String(sidebar.scrollTop))
  }

  onMounted(() => {
    restoreScrollPosition()
    scheduleReveal()
    window.addEventListener('beforeunload', saveScrollPosition)
  })

  onContentUpdated(scheduleReveal)

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', saveScrollPosition)

    if (scheduledFrame != null) {
      cancelAnimationFrame(scheduledFrame)
      scheduledFrame = null
    }
  })
}
