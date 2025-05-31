export function isPartiallyActiveUrl(
  url: string | null | undefined,
  currentPathname: string,
  options?: {
    standalone?: boolean
  },
): boolean {
  if (!url) {
    return false
  }

  if (options?.standalone) {
    return currentPathname === url
  }

  const urlSegments = url.replace(/(^\/|\/$)/g, '').split('/')
  const isRootPage = urlSegments.length <= 1

  if (isRootPage) {
    return currentPathname.replace(/\/$/, '') === url.replace(/\/$/, '')
  }

  return currentPathname.startsWith(url)
}
