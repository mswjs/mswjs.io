import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'

/** Add result ordering at VitePress 1.6's search boundary, before its result limit. */
export function localSearchRanking(): Plugin {
  const rankingModule = fileURLToPath(new URL('./search.ts', import.meta.url))
  return {
    name: 'msw:local-search-ranking',
    enforce: 'pre',
    transform(source, id) {
      if (!id.replaceAll('\\', '/').endsWith('/VPLocalSearchBox.vue')) {
        return
      }
      const search = /index\s*\.search\(filterTextValue\)\s*\.slice\(0, 16\)/
      if (!search.test(source)) {
        this.error('VitePress local search changed. Update the MSW result-ranking integration.')
      }
      return source
        .replace('<script lang="ts" setup>', `<script lang="ts" setup>\nimport { rankLocalSearchResults } from ${JSON.stringify(rankingModule)}`)
        .replace(search, 'rankLocalSearchResults(index.search(filterTextValue), filterTextValue).slice(0, 16)')
    },
  }
}
