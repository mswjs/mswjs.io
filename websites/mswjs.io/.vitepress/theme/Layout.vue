<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  nextTick,
  ref,
  watch,
  watchEffect,
} from 'vue'
import { inBrowser, useData, useRoute } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import { useSidebar } from 'vitepress/theme-without-fonts'
import SiteFooter from '@mswjs/shared/theme/components/SiteFooter.vue'
import FooterSection from '@mswjs/shared/theme/components/FooterSection.vue'
import SiteHeader from './components/SiteHeader.vue'
import DocsSidebar from './components/DocsSidebar.vue'
import LocalNav from './components/LocalNav.vue'
import DocumentLayout from './components/DocumentLayout.vue'
import NotFoundPage from './components/NotFoundPage.vue'
import { useDocumentOutline } from './composables/useDocumentOutline'
import { useSidebarAutoScroll } from '@mswjs/shared/theme/composables/useSidebarAutoScroll'
import { useOutlineAutoScroll } from '@mswjs/shared/theme/composables/useOutlineAutoScroll'

const { page, frontmatter } = useData<DefaultTheme.Config>()
const route = useRoute()
const sidebarControl = useSidebar()
const documentOutline = useDocumentOutline()
const navigationOpen = ref(false)
const sidebarOpen = ref(false)
const documentationRootPaths = ['/docs', '/guides', '/api']

const isDocumentationPage = computed(() => {
  const hasDocumentationRoot = documentationRootPaths.some(
    (rootPath) => {
      return (
        route.path === rootPath ||
        route.path.startsWith(`${rootPath}/`)
      )
    },
  )

  return hasDocumentationRoot && !page.value.isNotFound
})

const isBlogPost = computed(() => {
  return (
    route.path.startsWith('/blog/') &&
    frontmatter.value.layout !== 'page' &&
    !page.value.isNotFound
  )
})

const isStandalonePage = computed(() => {
  return frontmatter.value.layout === 'page'
})

const hasDocumentationSidebar = computed(() => {
  return (
    isDocumentationPage.value &&
    sidebarControl.hasSidebar.value
  )
})

function closeOverlays(): void {
  navigationOpen.value = false
  sidebarOpen.value = false
}

function handleEscape(event: KeyboardEvent): void {
  if (event.key !== 'Escape') {
    return
  }

  const navigationWasOpen = navigationOpen.value
  const sidebarWasOpen = sidebarOpen.value
  closeOverlays()

  nextTick(() => {
    if (navigationWasOpen) {
      document
        .querySelector<HTMLElement>('[data-site-menu-trigger]')
        ?.focus()
      return
    }

    if (sidebarWasOpen) {
      document
        .querySelector<HTMLElement>('[data-sidebar-trigger]')
        ?.focus()
    }
  })
}

watch(
  () => route.path,
  () => {
    closeOverlays()
  },
)

watchEffect(() => {
  if (!inBrowser) {
    return
  }

  const overlaysOpen =
    navigationOpen.value || sidebarOpen.value
  document.body.style.overflow = overlaysOpen ? 'hidden' : ''
  document.documentElement.style.setProperty(
    '--site-layout-top-height',
    isDocumentationPage.value ? '36px' : '0px',
  )
})

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)

  if (inBrowser) {
    document.body.style.overflow = ''
  }
})

useSidebarAutoScroll()
useOutlineAutoScroll()
</script>

<template>
  <Content v-if="frontmatter.layout === false" />

  <div
    v-else
    class="flex min-h-screen flex-col bg-neutral-900 pt-[var(--site-layout-top-height)]"
    :class="frontmatter.pageClass"
  >
    <aside
      v-if="isDocumentationPage"
      class="fixed inset-x-0 top-0 z-[60] flex h-9 items-center justify-center border-b border-neutral-700 bg-neutral-950 px-5 text-center text-sm font-medium text-neutral-200"
    >
      <p>
        You are viewing the docs for <strong>MSW 2.0</strong>. To
        access the 1.x docs
        <a
          href="https://v1.mswjs.io/"
          class="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          click here
        </a>.
      </p>
    </aside>

    <a
      href="#main-content"
      class="fixed left-4 top-4 z-[70] -translate-y-24 rounded bg-neutral-800 px-4 py-2 font-medium text-white transition-transform focus:translate-y-0"
    >
      Skip to content
    </a>

    <SiteHeader
      :menu-open="navigationOpen"
      :sticky-on-mobile="isBlogPost"
      @toggle-menu="navigationOpen = !navigationOpen"
      @close-menu="navigationOpen = false"
    />

    <div class="flex-1 min-[960px]:pt-16">
      <LocalNav
        v-if="!isStandalonePage && !page.isNotFound"
        :has-sidebar="hasDocumentationSidebar"
        :sidebar-open="sidebarOpen"
        :outline-items="documentOutline.items.value"
        :active-outline-link="documentOutline.activeLink.value"
        @open-sidebar="sidebarOpen = true"
      />

      <div
        class="mx-auto w-full max-w-[var(--vp-layout-max-width)]"
        :class="{
          'min-[960px]:pl-[var(--vp-sidebar-width)]':
            hasDocumentationSidebar,
        }"
      >
        <NotFoundPage v-if="page.isNotFound" />

        <main
          v-else-if="isStandalonePage"
          id="main-content"
        >
          <Content />
        </main>

        <DocumentLayout
          v-else
          :documentation-page="isDocumentationPage"
          :blog-post="isBlogPost"
          :outline-items="documentOutline.items.value"
          :active-outline-link="documentOutline.activeLink.value"
        />
      </div>
    </div>

    <DocsSidebar
      v-if="hasDocumentationSidebar"
      :items="sidebarControl.sidebar.value"
      :open="sidebarOpen"
      @close="sidebarOpen = false"
    />

    <div
      class="mx-auto w-full max-w-[var(--vp-layout-max-width)]"
      :class="{
        'min-[960px]:pl-[var(--vp-sidebar-width)]':
          hasDocumentationSidebar,
      }"
    >
      <SiteFooter>
        <template #sections>
          <div class="sm:col-span-2">
            <FooterSection title="Library">
              <li><a href="/docs">Documentation</a></li>
              <li><a href="/branding">Branding</a></li>
              <li><a href="/blog">Blog</a></li>
            </FooterSection>
          </div>

          <div class="sm:col-span-2">
            <FooterSection title="Resources">
              <li><a href="/docs/quick-start">Quick start</a></li>
              <li>
                <a href="/guides/best-practices">
                  Best practices
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mswjs/examples"
                  target="_blank"
                >
                  Examples
                </a>
              </li>
            </FooterSection>
          </div>

          <div class="sm:col-span-2">
            <FooterSection title="Community">
              <li>
                <a
                  href="https://github.com/mswjs/msw"
                  target="_blank"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/ApiMocking"
                  target="_blank"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://kettanaito.com/discord"
                  target="_blank"
                >
                  Discord
                </a>
              </li>
            </FooterSection>
          </div>
        </template>
      </SiteFooter>
    </div>
  </div>
</template>
