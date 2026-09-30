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

export interface PullMswTypesOptions {
  /**
   * Only pin the release, leaving its source to be checked out
   * on the first twoslash result cache miss.
   */
  lazy?: boolean
}

export const repositoryUrl: string
export function resolveLatestRelease(
  fetchRelease?: typeof fetch,
): Promise<MswRelease>
export function resolvePublicEntryPoints(
  manifest: Record<string, unknown>,
  sourceDirectory: string,
): Array<PublicEntryPoint>
export function ensureMswSourceSync(release: MswRelease): MswSource
export function pullMswTypes(options?: PullMswTypesOptions): Promise<MswRelease>
export function readPulledMswRelease(): MswRelease | undefined
