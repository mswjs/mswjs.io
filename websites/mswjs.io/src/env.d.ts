/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ALGOLIA_APP_ID?: string
  readonly PUBLIC_ALGOLIA_INDEX_NAME?: string
  readonly PUBLIC_ALGOLIA_SEARCH_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
