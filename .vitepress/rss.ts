import * as fs from 'node:fs'
import * as path from 'node:path'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from './consts'

export async function buildRssFeed(config: SiteConfig): Promise<void> {
  const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    id: `${SITE_URL}/`,
    link: `${SITE_URL}/`,
    language: 'en',
    copyright: '',
  })

  const posts = await createContentLoader('blog/*.md', {
    includeSrc: true,
  }).load()

  const blogPosts = posts
    .filter((post) => {
      return typeof post.frontmatter.publishedAt !== 'undefined'
    })
    .sort((left, right) => {
      return (
        new Date(right.frontmatter.publishedAt).valueOf() -
        new Date(left.frontmatter.publishedAt).valueOf()
      )
    })

  for (const post of blogPosts) {
    const body = post.src?.replace(/^---[\s\S]*?---\s*/, '') || ''

    feed.addItem({
      title: post.frontmatter.title,
      id: `${SITE_URL}${post.url}`,
      link: `${SITE_URL}${post.url}`,
      description: post.frontmatter.description,
      content: body,
      author: [
        {
          name: post.frontmatter.author?.name,
        },
      ],
      date: new Date(post.frontmatter.publishedAt),
    })
  }

  fs.writeFileSync(path.join(config.outDir, 'rss.xml'), feed.rss2())
}
