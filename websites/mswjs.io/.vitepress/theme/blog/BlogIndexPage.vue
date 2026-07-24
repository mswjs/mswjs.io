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

        <ul class="mb-16 space-y-5 md:space-y-10">
          <li v-for="post of posts" :key="post.url">
            <article
              class="p-10 flex items-center md:items-start flex-col gap-4 md:flex-row md:gap-8 bg-neutral-800 bg-opacity-40 border border-neutral-800 rounded-lg"
            >
              <img
                :src="post.thumbnailUrl"
                :alt="post.title"
                class="inline-flex w-32 drop-shadow-md"
              />
              <div>
                <a
                  :href="post.url"
                  class="mb-2 inline-block text-2xl font-bold text-white hover:underline"
                  >{{ post.title }}</a
                >
                <p class="text-sm text-neutral-400 font-medium font-mono italic">
                  <FormattedDate :date="post.publishedAt" />
                </p>
                <p v-if="post.description" class="mt-5 text-neutral-300">
                  {{ post.description }}
                </p>
                <a
                  :href="post.url"
                  class="button button-secondary inline-flex items-center mt-8 group"
                >
                  Read more
                  <ArrowRightIcon
                    class="w-3 ml-2 transition-transform group-hover:translate-x-1.5"
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
