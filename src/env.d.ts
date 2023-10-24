/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ALGOLIA_APP_ID?: string
  readonly ALGOLIA_WRITE_API_KEY?: string
  readonly PUBLIC_ALGOLIA_SEARCH_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
