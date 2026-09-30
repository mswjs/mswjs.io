import { nextTick, onMounted } from 'vue'

const storageKey = 'msw:hmr-scroll'

export function consumeHmrScroll(storage, url, now = Date.now()) {
  const serialized = storage.getItem(storageKey)
  storage.removeItem(storageKey)
  if (!serialized) {
    return undefined
  }
  try {
    const position = JSON.parse(serialized)
    if (
      position.url === url &&
      Number.isFinite(position.x) &&
      Number.isFinite(position.y) &&
      Number.isFinite(position.savedAt) &&
      now >= position.savedAt &&
      now - position.savedAt < 30_000
    ) {
      return position
    }
  } catch {
    return undefined
  }
}

export function preserveHmrScroll(hot) {
  const position = consumeHmrScroll(sessionStorage, location.href)
  if (position) {
    onMounted(async () => {
      // VitePress mounts after its initial route and hash scrolling.
      await nextTick()
      window.scrollTo({
        left: position.x,
        top: position.y,
        behavior: 'instant',
      })
    })
  }
  const save = () => {
    sessionStorage.setItem(
      storageKey,
      JSON.stringify({
        url: location.href,
        x: window.scrollX,
        y: window.scrollY,
        savedAt: Date.now(),
      }),
    )
  }
  hot.on('vite:beforeFullReload', save)
  hot.dispose(() => {
    hot.off('vite:beforeFullReload', save)
  })
}
