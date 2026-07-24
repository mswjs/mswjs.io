<script setup lang="ts">
import { useData } from 'vitepress'
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'
import Container from '@mswjs/shared/theme/components/Container.vue'
import Grid from '@mswjs/shared/theme/components/Grid.vue'
import FormattedDate from '@mswjs/shared/theme/components/FormattedDate.vue'
import Avatar from '../components/Avatar.vue'

const { frontmatter } = useData()
</script>

<template>
  <Container>
    <Grid>
      <article class="lg:col-span-8 lg:col-start-3">
        <aside
          class="sticky z-[2] py-2 text-sm font-medium bg-neutral-900 border-b border-neutral-800 top-[60px]"
        >
          <a
            href="/blog"
            class="inline-flex items-center gap-2 font-medium text-neutral-400 hover:text-white"
          >
            <ArrowLeftIcon class="w-3" />
            Back to Blog
          </a>
        </aside>
        <header class="my-16 lg:my-32 lg:text-center">
          <div class="flex items-start md:flex-col md:items-center gap-8 sm:gap-10">
            <img
              :src="frontmatter.thumbnailUrl"
              :alt="frontmatter.title"
              class="hidden w-24 sm:block sm:w-32 md:w-64 drop-shadow-xl"
            />
            <div>
              <h1 class="mb-4">{{ frontmatter.title }}</h1>
              <p class="mb-10 text-neutral-400 font-medium font-mono">
                <FormattedDate :date="frontmatter.publishedAt" />
              </p>
              <div class="flex md:justify-center text-left">
                <Avatar
                  :url="`/users/${frontmatter.author.twitterHandle}.jpg`"
                  :name="frontmatter.author.name"
                  class-name="flex-shrink-0 w-16 h-16"
                >
                  <a
                    :href="`https://twitter.com/${frontmatter.author.twitterHandle}`"
                    class="text-left text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{{ frontmatter.author.twitterHandle }}
                  </a>
                </Avatar>
              </div>
            </div>
          </div>
        </header>
        <div class="mdx my-16 prose lg:my-32 max-w-none">
          <slot />
        </div>
      </article>
    </Grid>
  </Container>
</template>
