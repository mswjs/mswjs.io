<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/solid'
import Container from '@mswjs/shared/theme/components/Container.vue'
import Grid from '@mswjs/shared/theme/components/Grid.vue'
import PageHeaderWrapper from '@mswjs/shared/theme/components/PageHeaderWrapper.vue'
import PageHeaderSubtitle from '@mswjs/shared/theme/components/PageHeaderSubtitle.vue'
import FormattedDate from '@mswjs/shared/theme/components/FormattedDate.vue'
import { data as posts } from './posts.data'
</script>

<template>
  <Container>
    <Grid>
      <div class="sm:col-span-8 lg:col-start-3">
        <PageHeaderWrapper class="mt-16 md:mt-24">
          <h1 class="mb-8 capitalize">Blog</h1>
          <PageHeaderSubtitle class="md:w-3/6">
            News and announcements from the Mock Service Worker team.
          </PageHeaderSubtitle>
        </PageHeaderWrapper>

        <ul class="mb-16 space-y-5">
          <li v-for="post of posts" :key="post.url">
            <article
              class="blog-post-card flex flex-col gap-5 rounded-lg border border-neutral-800 bg-neutral-950 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8"
            >
              <img
                :src="post.thumbnailUrl"
                :alt="post.title"
                class="h-24 w-24 shrink-0 self-start object-contain sm:self-center"
              />
              <div class="min-w-0 flex-1">
                <p class="mb-2 text-xs font-medium leading-4 text-neutral-500">
                  <FormattedDate :date="post.publishedAt" />
                </p>
                <h2 class="m-0 text-xl font-semibold leading-tight tracking-tight">
                  <a :href="post.url" class="text-white hover:text-primary">
                    {{ post.title }}
                  </a>
                </h2>
                <p v-if="post.description" class="mt-2 text-base leading-6 text-neutral-400">
                  {{ post.description }}
                </p>
                <a
                  :href="post.url"
                  class="group mt-4 inline-flex items-center gap-2 text-sm font-semibold leading-5 text-primary"
                  :aria-label="`Read more: ${post.title}`"
                >
                  Read more
                  <ArrowRightIcon
                    aria-hidden="true"
                    class="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </Grid>
  </Container>
</template>
