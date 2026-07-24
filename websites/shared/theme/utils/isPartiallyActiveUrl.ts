function ensureTrailingSlash(pathname: string): string {
  return pathname.endsWith('/') ? pathname : `${pathname}/`
}

export function normalizePathname(pathname: string): string {
  return pathname.replace(/index\.html$/, '').replace(/\.html$/, '')
}

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

  const pathname = normalizePathname(currentPathname)

  if (options?.standalone) {
    return pathname.replace(/\/$/, '') === url.replace(/\/$/, '')
  }

  const urlSegments = url.replace(/(^\/|\/$)/g, '').split('/')
  const isRootPage = urlSegments.length <= 1

  if (isRootPage) {
    return pathname.replace(/\/$/, '') === url.replace(/\/$/, '')
  }

  return ensureTrailingSlash(pathname).startsWith(ensureTrailingSlash(url))
}
