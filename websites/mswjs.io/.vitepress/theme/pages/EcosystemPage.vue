<script setup lang="ts">
import Container from '../components/Container.vue'
import Grid from '../components/Grid.vue'
import PageHeaderWrapper from '../components/PageHeaderWrapper.vue'
import PageHeaderSubtitle from '../components/PageHeaderSubtitle.vue'
import IconBlock from '../components/IconBlock.vue'
import sourceLogo from '../../../src/images/source.svg'
import dataLogo from '../../../src/images/data.svg'
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

    <Grid class="pb-24 gap-y-24">
      <article class="sm:col-span-6 flex items-start gap-8">
        <IconBlock :image-url="dataLogo" alt="Data logo" />
        <div>
          <h2 class="mt-7">Data</h2>
          <p class="text-lg leading-tight text-neutral-400 text-pretty">
            Data modeling and relation library for testing JavaScript
            applications.
          </p>
          <footer class="mt-10">
            <a href="/ecosystem/data" class="inline-flex button button-primary"
              >Read the docs</a
            >
          </footer>
        </div>
      </article>

      <article class="sm:col-span-6 flex items-start gap-8">
        <IconBlock :image-url="sourceLogo" alt="Source logo" />
        <div>
          <h2 class="mt-7">Source</h2>
          <p class="text-lg leading-tight text-neutral-400 text-pretty">
            Generate request handler from various sources, like HAR files or
            OpenAPI specifications.
          </p>
          <footer class="mt-10">
            <a href="/ecosystem/source" class="inline-flex button button-primary"
              >Read the docs</a
            >
          </footer>
        </div>
      </article>
    </Grid>
  </Container>
</template>
