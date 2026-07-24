<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import Container from '../components/Container.vue'
import Grid from '../components/Grid.vue'

const route = useRoute()
const { site } = useData()

const reportMissingPageUrl = computed(() => {
  const url = new URL('issues/new', 'https://github.com/mswjs/mswjs.io/')
  url.searchParams.set(
    'title',
    `${site.value.title}: Missing page at "${route.path}"`,
  )
  url.searchParams.set(
    'body',
    '<!-- Please describe what you expected to see at that URL -->',
  )

  return url.href
})
</script>

<template>
  <Container>
    <Grid>
      <section class="py-16 col-span-full xl:col-start-3 xl:col-span-8">
        <header class="mb-10">
          <h1 class="mb-5">Page not found</h1>
          <p class="text-neutral-400 text-xl">It must be a cookie monster.</p>
        </header>
        <main>
          <p>
            The page you are trying to load has been moved or never existed, to
            begin with. Spooky! If you think something should be here, please
            let us know.
          </p>
        </main>
        <footer class="mt-5">
          <a
            :href="reportMissingPageUrl"
            class="inline-block button button-primary"
            target="_blank"
            rel="noopener noreferrer"
            >Report a missing page</a
          >
        </footer>
      </section>
    </Grid>
  </Container>
</template>
