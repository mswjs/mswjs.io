<script setup lang="ts">
import Hero from '@mswjs/shared/theme/components/Hero.vue'
import Container from '@mswjs/shared/theme/components/Container.vue'
import PageHeaderWrapper from '@mswjs/shared/theme/components/PageHeaderWrapper.vue'
import PageHeaderSubtitle from '@mswjs/shared/theme/components/PageHeaderSubtitle.vue'
import GettingStarted from '@mswjs/shared/theme/components/GettingStarted.vue'
import HomepageCodeExample from './HomepageCodeExample.vue'
import sourceLogo from '../../../src/images/source.svg'
</script>

<template>
  <Hero
    repo-url="https://github.com/mswjs/source"
    getting-started-url="/docs/getting-started"
  >
    <template #title>
      Lift The <span class="text-primary">Source</span> of Truth Up
    </template>
    <template #subtitle>
      <span class="text-white">Source</span> is a library that allows you to
      generate request handlers from various sources, like HAR files or OpenAPI
      documents.
    </template>
  </Hero>

  <section class="my-24 md:my-48">
    <Container class="relative">
      <div
        class="absolute -top-10 left-0 right-0 w-[2px] h-full mx-auto bg-primary bg-opacity-30 rounded-full -z-10"
      />

      <!-- Step 1: Source -->
      <PageHeaderWrapper class="mt-0 py-5 bg-neutral-900">
        <span
          class="p-4 mb-4 inline-flex items-center justify-center size-8 border-2 border-primary text-sm font-bold rounded-full text-primary"
          >1</span
        >
        <h2 class="mb-8 capitalize">Take your truth</h2>
        <PageHeaderSubtitle class="md:w-3/6">
          Record your traffic in the browser or take an OpenAPI specification as
          the source of truth.
        </PageHeaderSubtitle>
      </PageHeaderWrapper>

      <!-- Step 2: Handlers -->
      <PageHeaderWrapper class="mt-0 py-5 bg-neutral-900">
        <span
          class="p-4 mb-4 inline-flex items-center justify-center size-8 border-2 border-primary text-sm font-bold rounded-full text-primary"
          >2</span
        >
        <h2 class="mb-8 capitalize">Generate request handlers</h2>
        <PageHeaderSubtitle class="md:w-3/6">
          Provide the supported input to
          <code
            class="px-1 border border-neutral-700 rounded-md text-base bg-neutral-800 bg-opacity-60"
            >@msw/source</code
          >
          and get the list of request handlers back.
        </PageHeaderSubtitle>
        <div class="max-w-xl mx-auto">
          <HomepageCodeExample />
        </div>
      </PageHeaderWrapper>

      <!-- Step 3: Integration -->
      <PageHeaderWrapper class="mt-0 py-5 bg-neutral-900">
        <span
          class="p-4 mb-4 inline-flex items-center justify-center size-8 border-2 border-primary text-sm font-bold rounded-full text-primary"
          >3</span
        >
        <h2 class="mb-8 capitalize">Integrate anywhere</h2>
        <PageHeaderSubtitle class="md:w-3/6">
          Integrate with
          <a href="https://mswjs.io" class="text-white hover:underline"
            >Mock Service Worker</a
          >
          to achieve reliable network reproductions anywhere, anytime.
        </PageHeaderSubtitle>
      </PageHeaderWrapper>
    </Container>
  </section>

  <GettingStarted
    title="Try out Source"
    :icon-url="sourceLogo"
    icon-alt="Source logo"
    link-text="Get started"
    link-url="/docs/getting-started"
  >
    <span class="text-white">Source</span> is a useful tool to replay the
    recorded network traffic when mocking or debugging.
  </GettingStarted>
</template>
