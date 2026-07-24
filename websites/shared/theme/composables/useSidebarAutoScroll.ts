import { onBeforeUnmount, onMounted } from 'vue'
import { onContentUpdated } from 'vitepress'

const SIDEBAR_SCROLL_KEY = 'docs-sidebar-scroll'
const ACTIVE_LINK_SELECTOR =
  '.VPSidebarItem.is-active > .item > .link'

export function useSidebarAutoScroll(): void {
  let scheduledFrame: number | null = null
  let sidebarObserver: MutationObserver | null = null
  let activeLinkObserver: IntersectionObserver | null = null

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

    activeLinkObserver?.disconnect()
    activeLinkObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          activeLink.scrollIntoView({
            block: 'center',
            behavior: 'auto',
          })
        }

        activeLinkObserver?.disconnect()
        activeLinkObserver = null
      },
      {
        root: sidebar,
        threshold: 0.1,
      },
    )
    activeLinkObserver.observe(activeLink)
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

  const observeSidebar = () => {
    const sidebar = getSidebar()

    if (!sidebar) {
      return
    }

    sidebarObserver?.disconnect()
    sidebarObserver = new MutationObserver(scheduleReveal)
    sidebarObserver.observe(sidebar, {
      attributes: true,
      attributeFilter: ['class'],
      childList: true,
      subtree: true,
    })
  }

  const restoreScrollPosition = () => {
    const sidebar = getSidebar()
    const storedScrollValue = sessionStorage.getItem(
      SIDEBAR_SCROLL_KEY,
    )

    if (!sidebar || storedScrollValue == null) {
      return
    }

    const storedScrollPosition = Number.parseInt(storedScrollValue, 10)

    if (!Number.isFinite(storedScrollPosition)) {
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
    observeSidebar()
    scheduleReveal()
    window.addEventListener('beforeunload', saveScrollPosition)
  })

  onContentUpdated(() => {
    observeSidebar()
    scheduleReveal()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', saveScrollPosition)
    sidebarObserver?.disconnect()
    activeLinkObserver?.disconnect()

    if (scheduledFrame != null) {
      cancelAnimationFrame(scheduledFrame)
      scheduledFrame = null
    }
  })
}
