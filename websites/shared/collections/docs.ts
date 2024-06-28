import { defineCollection, z } from 'astro:content'

export const docsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  order: z.number().optional(),
  children: z.string().optional(),
  standalone: z.boolean().optional(),
  tableOfContents: z
    .object({
      maxDepth: z.number().optional(),
    })
    .optional(),
})

export const docs = defineCollection({
  type: 'content',
  schema: docsSchema,
})

export type DocsFrontmatter = z.infer<typeof docsSchema>
