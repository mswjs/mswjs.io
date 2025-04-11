import type { MDXInstance } from 'astro'
import type { DocsFrontmatter } from '@mswjs/shared/collections/docs'
import {
  createNavTreeBuilder,
  type DocsItem,
} from '@mswjs/shared/utils/buildNavTree'

export function buildDocsNavTree(
  pages: Array<MDXInstance<DocsFrontmatter>>,
): Array<DocsItem> {
  const builder = createNavTreeBuilder(pages)

  return [
    ...builder.get('*.mdx'),

    {
      kind: 'group',
      title: 'Mocking HTTP',
      children: builder.get('http/**/*.mdx'),
    },
    {
      kind: 'group',
      title: 'Mocking GraphQL',
      children: builder.get('graphql/**/*.mdx'),
    },
    {
      kind: 'group',
      title: 'Mocking WebSocket',
      children: builder.get('websocket/**/*.mdx'),
    },

    // ---

    {
      kind: 'group',
      title: 'Concepts',
      children: builder.get('concepts/**/*.mdx'),
    },
    {
      kind: 'group',
      title: 'Integrations',
      children: builder.get('integrations/**/*.mdx'),
    },
    {
      kind: 'group',
      title: 'API',
      children: builder.get('api/**/*.mdx'),
    },
    {
      kind: 'group',
      title: 'CLI',
      children: builder.get('cli/**/*.mdx'),
    },
    {
      kind: 'group',
      title: 'Best practices',
      children: builder.get('best-practices/**/*.mdx'),
    },
    {
      kind: 'group',
      title: 'Recipes',
      children: builder.get('recipes/**/*.mdx'),
    },
  ]
}
