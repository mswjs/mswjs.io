<script setup lang="ts">
import Container from '@mswjs/shared/theme/components/Container.vue'
import Grid from '@mswjs/shared/theme/components/Grid.vue'
import PageHeaderWrapper from '@mswjs/shared/theme/components/PageHeaderWrapper.vue'
import PageHeaderSubtitle from '@mswjs/shared/theme/components/PageHeaderSubtitle.vue'
import IconBlock from '@mswjs/shared/theme/components/IconBlock.vue'
import sourceLogo from '../../../../source.mswjs.io/src/images/source.svg'
</script>

<template>
  <Container>
    <Grid>
      <div class="sm:col-span-8 lg:col-start-3">
        <PageHeaderWrapper class="mt-16 md:mt-24">
          <h1 class="mb-8 capitalize">Ecosystem</h1>
          <PageHeaderSubtitle class="md:w-3/6">
            Expand your developer experience through the native ecosystem
            packages.
          </PageHeaderSubtitle>
        </PageHeaderWrapper>
      </div>
    </Grid>

    <Grid class="py-24 gap-y-24">
      <article class="sm:col-span-6 flex items-start gap-8">
        <IconBlock
          image-url="https://raw.githubusercontent.com/mswjs/data/main/logo.svg"
          alt="Data logo"
        />
        <div>
          <h2 class="mt-7">Data</h2>
          <p class="text-lg text-neutral-400 text-pretty">
            Data modeling and relation library for testing JavaScript
            applications.
          </p>
          <footer class="mt-10">
            <a
              href="https://github.com/mswjs/data"
              target="_blank"
              class="button button-primary"
              >Visit repository</a
            >
          </footer>
        </div>
      </article>

      <article class="sm:col-span-6 flex items-start gap-8">
        <IconBlock :image-url="sourceLogo" alt="Source logo" />
        <div>
          <h2 class="mt-7">Source</h2>
          <p class="text-lg text-neutral-400 text-pretty">
            Generate request handler from various sources, like HAR files or
            OpenAPI specifications.
          </p>
          <footer class="mt-10">
            <a
              href="https://source.mswjs.io"
              class="inline-flex button button-primary"
              >Visit website</a
            >
          </footer>
        </div>
      </article>
    </Grid>
  </Container>
</template>
