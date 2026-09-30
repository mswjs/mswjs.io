import { createContentLoader } from 'vitepress'

export interface BlogPostSummary {
  url: string
  title: string
  description?: string
  publishedAt: string
  thumbnailUrl: string
  author: {
    name: string
    twitterHandle: string
  }
}

declare const data: Array<BlogPostSummary>
export { data }

export default createContentLoader('blog/*.md', {
  transform(rawPosts): Array<BlogPostSummary> {
    return rawPosts
      .filter((post) => {
        return typeof post.frontmatter.publishedAt !== 'undefined'
      })
      .map((post) => {
        return {
          url: post.url,
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          publishedAt: new Date(post.frontmatter.publishedAt).toISOString(),
          thumbnailUrl: post.frontmatter.thumbnailUrl,
          author: post.frontmatter.author,
        }
      })
      .sort((left, right) => {
        return (
          new Date(right.publishedAt).valueOf() -
          new Date(left.publishedAt).valueOf()
        )
      })
  },
})
