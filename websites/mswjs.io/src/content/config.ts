import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    thumbnailUrl: z.string(),
    author: z.object({
      name: z.string(),
      twitterHandle: z.string(),
    }),
    keywords: z.array(z.string()).optional(),
  }),
})

export const docsSchema = z.object({
  title: z.string(),
  displayTitle: z.string().optional(),
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

const docs = defineCollection({
  type: 'content',
  schema: docsSchema,
})

export const collections = {
  docs,
  blog,
}
