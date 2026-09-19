<script setup lang="ts">
import Container from '../components/Container.vue'
import PageHeaderSubtitle from '../components/PageHeaderSubtitle.vue'
import FormattedDate from '../components/FormattedDate.vue'
import ArrowNarrowRightIcon from '../components/icons/arrow-narrow-right.svg?component'
import { data as posts } from './posts.data'
</script>

<template>
  <Container class="home-frame">
    <!-- The grid's outer tile borders overhang onto the frame's own
         borders; clipping keeps that overhang off the viewport edge below
         "lg", where the frame has no side rails. -->
    <div
      class="home-frame-rails -mb-px -mt-px overflow-x-clip border border-neutral-800"
    >
      <header
        class="border-b border-neutral-800 px-6 py-16 text-center md:py-24"
      >
        <h1 class="mb-6 capitalize">Blog</h1>
        <PageHeaderSubtitle class="lg:w-3/6">
          News and announcements from the Mock Service Worker team.
        </PageHeaderSubtitle>
      </header>

      <!-- Every tile draws all four borders. Each tile pulls up and left by
           a pixel so shared edges collapse into one line, and the grid
           pulls right and down by a pixel so the outer edges land on the
           frame's borders. -->
      <ul class="-mb-px -mr-px grid md:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="post of posts"
          :key="post.url"
          class="-ml-px -mt-px border border-neutral-800"
        >
          <a
            :href="post.url"
            class="group flex h-full flex-col p-6 focus-visible:-outline-offset-2 md:p-8"
          >
            <!-- The artwork on its own tinted panel. -->
            <div
              class="flex items-center justify-center rounded-xl bg-neutral-800/30 py-10"
            >
              <img
                :src="post.thumbnailUrl"
                alt=""
                class="h-40 w-40 object-contain drop-shadow-xl"
              />
            </div>

            <h2 class="mb-0 mt-6 text-xl font-bold tracking-tight text-white">
              {{ post.title }}
            </h2>
            <p
              v-if="post.description"
              class="mt-2 text-base leading-snug text-neutral-400 text-pretty"
            >
              {{ post.description }}
            </p>

            <!-- Pinned to the bottom so the rows line up. -->
            <p
              class="mt-auto flex items-center gap-x-2 pt-8 text-sm font-medium text-neutral-400"
            >
              <FormattedDate :date="post.publishedAt" />
              <span aria-hidden="true">&middot;</span>
              <span class="inline-flex items-center gap-1 text-white">
                Read more
                <ArrowNarrowRightIcon
                  class="h-4 w-4 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </span>
            </p>
          </a>
        </li>
      </ul>
    </div>
  </Container>
</template>
