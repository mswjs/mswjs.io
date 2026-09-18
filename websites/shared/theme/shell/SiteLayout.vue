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
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from './SiteHeader.vue'
import DocsSidebar from './DocsSidebar.vue'
import LocalNav from './LocalNav.vue'
import DocumentLayout from './DocumentLayout.vue'
import NotFoundPage from './NotFoundPage.vue'
import { useDocumentOutline } from '../composables/useDocumentOutline'
import { useSidebarAutoScroll } from '../composables/useSidebarAutoScroll'

/**
 * The page shell shared by the MSW websites: header with the light/dark
 * switch, documentation sidebar and outline, and the framed footer.
 * Pages with "layout: page" render their content as-is inside the shell.
 */
const props = withDefaults(
  defineProps<{
    /**
     * Root paths of the documentation pages (with a sidebar and an outline).
     */
    documentationRoots?: Array<string>
    /**
     * Accessible label of the logo link in the header.
     */
    homeLabel?: string
    /**
     * Where a right click on the logo leads (the branding page), if anywhere.
     */
    brandingUrl?: string
    /**
     * The publisher id of the documentation ads, when enabled.
     */
    adsPublisher?: string
    /**
     * Root path of the blog, when the site has one. Blog posts render the
     * "blog-post-nav" and "blog-post-header" slots and keep the header
     * sticky on small screens.
     */
    blogRoot?: string
  }>(),
  {
    documentationRoots: () => ['/docs'],
    homeLabel: 'Home',
    adsPublisher: 'mswjsio',
  },
)

const { page, frontmatter } = useData<DefaultTheme.Config>()
const route = useRoute()
const sidebarControl = useSidebar()
const documentOutline = useDocumentOutline()
const navigationOpen = ref(false)
const sidebarOpen = ref(false)

const isDocumentationPage = computed(() => {
  const hasDocumentationRoot = props.documentationRoots.some((rootPath) => {
    return route.path === rootPath || route.path.startsWith(`${rootPath}/`)
  })

  return hasDocumentationRoot && !page.value.isNotFound
})

const isBlogPost = computed(() => {
  return (
    props.blogRoot !== undefined &&
    route.path.startsWith(`${props.blogRoot}/`) &&
    frontmatter.value.layout !== 'page' &&
    !page.value.isNotFound
  )
})

const isStandalonePage = computed(() => {
  return frontmatter.value.layout === 'page'
})

const hasDocumentationSidebar = computed(() => {
  return isDocumentationPage.value && sidebarControl.hasSidebar.value
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
      document.querySelector<HTMLElement>('[data-site-menu-trigger]')?.focus()
      return
    }

    if (sidebarWasOpen) {
      document.querySelector<HTMLElement>('[data-sidebar-trigger]')?.focus()
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

  const overlaysOpen = navigationOpen.value || sidebarOpen.value
  document.body.style.overflow = overlaysOpen ? 'hidden' : ''
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
</script>

<template>
  <Content v-if="frontmatter.layout === false" />

  <div
    v-else
    class="flex min-h-screen flex-col bg-neutral-900 pt-[var(--site-layout-top-height)]"
    :class="frontmatter.pageClass"
  >
    <a
      href="#main-content"
      class="fixed left-4 top-4 z-[70] -translate-y-24 rounded bg-neutral-800 px-4 py-2 font-medium text-white transition-transform focus:translate-y-0"
    >
      Skip to content
    </a>

    <SiteHeader
      :menu-open="navigationOpen"
      :sticky-on-mobile="isBlogPost"
      :documentation-roots="documentationRoots"
      :home-label="homeLabel"
      :branding-url="brandingUrl"
      @toggle-menu="navigationOpen = !navigationOpen"
      @close-menu="navigationOpen = false"
    />

    <div class="flex flex-1 flex-col min-[960px]:pt-16">
      <LocalNav
        v-if="!isStandalonePage && !isBlogPost && !page.isNotFound"
        :has-sidebar="hasDocumentationSidebar"
        :sidebar-open="sidebarOpen"
        :outline-items="documentOutline.items.value"
        :active-outline-link="documentOutline.activeLink.value"
        @open-sidebar="sidebarOpen = true"
      />

      <div
        class="w-full flex-1"
        :class="{
          'mx-auto max-w-[var(--vp-layout-max-width)]':
            !isStandalonePage && !isBlogPost,
          'msw-container home-frame': isBlogPost,
          'min-[960px]:pl-[var(--vp-sidebar-width)]': hasDocumentationSidebar,
          // The sidebar draws the left rail; the content draws the right
          // one, continuing the header's border.
          'border-r border-neutral-800': isDocumentationPage,
        }"
      >
        <NotFoundPage v-if="page.isNotFound" />

        <main v-else-if="isStandalonePage" id="main-content">
          <Content />
        </main>

        <!-- Blog posts continue the header's rails down to the footer. -->
        <div
          v-else-if="isBlogPost"
          class="home-frame-rails border-x border-neutral-800"
        >
          <slot name="blog-post-nav" />
          <DocumentLayout
            :documentation-page="false"
            blog-post
            :outline-items="documentOutline.items.value"
            :active-outline-link="documentOutline.activeLink.value"
            :ads-publisher="adsPublisher"
          >
            <template #header>
              <slot name="blog-post-header" />
            </template>
          </DocumentLayout>
        </div>

        <DocumentLayout
          v-else
          :documentation-page="isDocumentationPage"
          :blog-post="false"
          :outline-items="documentOutline.items.value"
          :active-outline-link="documentOutline.activeLink.value"
          :ads-publisher="adsPublisher"
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
      class="w-full"
      :class="{
        'mx-auto max-w-[var(--vp-layout-max-width)] min-[960px]:pl-[var(--vp-sidebar-width)]':
          hasDocumentationSidebar,
      }"
    >
      <SiteFooter framed>
        <template #sections>
          <slot name="footer-sections" />
        </template>
      </SiteFooter>
    </div>
  </div>
</template>
