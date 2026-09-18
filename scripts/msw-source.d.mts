export interface MswSourceEntryPoint {
  /**
   * Source path relative to the checkout, e.g. "src/core/index.ts".
   */
  source: string
  /**
   * Import specifiers resolving to this source, e.g. ["msw"].
   */
  exports: Array<string>
}

export interface MswSource {
  tag: string
  publishedAt: string
  commit: string
  sourceDirectory: string
  entryPoints: Array<MswSourceEntryPoint>
}

export interface MswRelease {
  tag: string
  publishedAt: string
}

export interface PublicEntryPoint {
  sourcePath: string
  exports: Array<string>
}

export interface ResolveMswSourceOptions {
  /**
   * Reuse the newest cached checkout instead of resolving the latest release.
   */
  preferCache?: boolean
}

export const repositoryUrl: string
export function resolveLatestRelease(
  fetchRelease?: typeof fetch,
): Promise<MswRelease>
export function resolvePublicEntryPoints(
  manifest: Record<string, unknown>,
  sourceDirectory: string,
): Array<PublicEntryPoint>
export function ensureMswSource(release: MswRelease): Promise<MswSource>
export function ensureLatestMswSource(): Promise<MswSource>
export function findCachedMswSource(): Promise<MswSource | undefined>
export function resolveMswSourceForSite(
  options?: ResolveMswSourceOptions,
): Promise<MswSource>
