<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useData } from 'vitepress'
import Container from '../components/Container.vue'
import Grid from '../components/Grid.vue'
import FormattedDate from '../components/FormattedDate.vue'
import ReactIsland from '../components/ReactIsland.vue'
import { FeedbackWidget } from '../react/feedbackWidget'
import Ads from './Ads.vue'
import DocsNavTree from './DocsNavTree.vue'
import DocsMobileNav from './DocsMobileNav.vue'
import DocsTableOfContents from './DocsTableOfContents.vue'
import DocsSidebarLinks from './DocsSidebarLinks.vue'
import DocsSidebarPartners from './DocsSidebarPartners.vue'
import { buildHeadings } from './buildHeadings'

const { page, frontmatter, theme } = useData()

const pageTitle = computed(() => {
  return frontmatter.value.displayTitle || frontmatter.value.title
})

const nestedHeadings = computed(() => {
  return buildHeadings(page.value.headers || [], {
    maxDepth: frontmatter.value.tableOfContents?.maxDepth,
  })
})

const editUrl = computed(() => {
  return theme.value.editLink.pattern.replace(
    ':path',
    page.value.relativePath,
  )
})

const NAV_TREE_SCROLL_KEY = 'nav-tree-scroll'

onMounted(() => {
  const docsNavTree = document.getElementById('docs-nav-tree')

  if (!docsNavTree) {
    return
  }

  const storedScrollValue = sessionStorage.getItem(NAV_TREE_SCROLL_KEY)
  const storedScrollPosition = storedScrollValue
    ? parseInt(storedScrollValue, 10)
    : undefined
  const activeDocsLink =
    document.getElementsByClassName('docs-link-active')[0]

  const scrollToActiveLink = () => {
    // If there's no stored scroll position, scroll to the
    // currently active link in the nav tree.
    activeDocsLink?.scrollIntoView({
      block: 'center',
      behavior: 'instant',
    })
  }

  if (storedScrollPosition == null) {
    scrollToActiveLink()
  } else {
    docsNavTree.scrollTop = storedScrollPosition

    if (activeDocsLink) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            scrollToActiveLink()
          }

          observer.disconnect()
        },
        { root: null, threshold: 0.1 },
      )

      observer.observe(activeDocsLink)
    }
  }

  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem(NAV_TREE_SCROLL_KEY, String(docsNavTree.scrollTop))
  })
})
</script>

<template>
  <Container :compact="true">
    <!-- Mobile: Nav tree -->
    <DocsMobileNav>
      <nav>
        <DocsNavTree :items="theme.sidebar" />
      </nav>
    </DocsMobileNav>

    <article>
      <Grid class="relative">
        <!-- Nav tree -->
        <section
          class="hidden xl:block xl:w-1/5 xl:col-span-3 xl:fixed xl:top-[60px]"
        >
          <nav
            id="docs-nav-tree"
            class="py-10 pr-10 overflow-y-auto h-[calc(100vh_-_60px)]"
          >
            <DocsNavTree :items="theme.sidebar" />
          </nav>
        </section>

        <!-- Content -->
        <div class="py-10 mdx sm:col-span-9 xl:col-start-4 xl:col-span-7">
          <header class="mb-8">
            <h1 class="mb-3">{{ pageTitle }}</h1>
            <p
              v-if="frontmatter.description"
              class="mb-6 text-lg font-medium text-neutral-400"
            >
              {{ frontmatter.description }}
            </p>
            <Ads v-if="theme.ads" publisher="mswjsio" />
          </header>
          <div class="prose max-w-none">
            <Content />
          </div>
          <footer
            class="justify-between pt-5 mt-10 text-sm font-medium border-t text-neutral-400 border-neutral-800 md:flex"
          >
            <p>
              <span v-if="page.lastUpdated">
                Last updated on
                <FormattedDate :date="page.lastUpdated" />
              </span>
            </p>
            <a
              :href="editUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-white hover:underline"
            >
              Edit this page on GitHub
            </a>
          </footer>
          <ClientOnly>
            <ReactIsland
              :component="FeedbackWidget"
              :component-props="{ pageTitle }"
            />
          </ClientOnly>
        </div>

        <!-- Table of contents -->
        <aside
          class="hidden py-10 pl-5 text-sm font-medium text-neutral-400 lg:block sm:col-span-3 xl:col-span-2"
        >
          <div class="sticky top-28">
            <div
              class="flex flex-col gap-8 h-[calc(100vh_-_2.5rem_-_60px)] pb-12 overflow-x-hidden"
            >
              <section
                v-if="nestedHeadings.length > 0"
                class="min-h-0 overflow-y-auto"
              >
                <h4
                  class="mb-2 text-xs font-bold tracking-widest text-white uppercase"
                >
                  Contents
                </h4>
                <DocsTableOfContents :headings="nestedHeadings" />
              </section>

              <DocsSidebarLinks
                :git-hub-url="theme.docsLinks.gitHubUrl"
                :blog-url="theme.docsLinks.blogUrl"
              />

              <div>
                <h4
                  class="mb-2 text-xs font-bold tracking-widest text-white uppercase"
                >
                  Partners
                </h4>
                <DocsSidebarPartners />
              </div>
            </div>
          </div>
        </aside>
      </Grid>
    </article>
  </Container>
</template>
