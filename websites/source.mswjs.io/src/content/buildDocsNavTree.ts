import type { MDXInstance } from 'astro'
import type { DocsFrontmatter } from '@mswjs/shared/collections/docs'
import {
  createNavTreeBuilder,
  type DocsItem,
} from '@mswjs/shared/utils/buildNavTree'

export function buildDocsNavTree(
  pages: Array<MDXInstance<DocsFrontmatter>>
): Array<DocsItem> {
  const builder = createNavTreeBuilder(pages)

  return [
    ...builder.get('*.mdx'),
    {
      kind: 'group',
      title: 'API',
      children: builder.get('api/**/*.mdx'),
    },
  ]
}
