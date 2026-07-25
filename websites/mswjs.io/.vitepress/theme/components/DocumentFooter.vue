<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import { PencilSquareIcon } from '@heroicons/vue/20/solid'

interface PagerLink {
  text?: string
  link?: string
}

function isPagerLink(value: unknown): value is PagerLink {
  if (value == null || typeof value !== 'object') {
    return false
  }

  if ('text' in value && value.text != null) {
    if (typeof value.text !== 'string') {
      return false
    }
  }

  if ('link' in value && value.link != null) {
    if (typeof value.link !== 'string') {
      return false
    }
  }

  return true
}

const { theme, page, frontmatter } =
  useData<DefaultTheme.Config>()
const route = useRoute()

function normalizePath(path: string): string {
  const cleanPath = path.split(/[?#]/)[0].replace(/\/$/, '')
  return cleanPath || '/'
}

function flattenSidebar(
  items: Array<DefaultTheme.SidebarItem>,
): Array<DefaultTheme.SidebarItem> {
  const links: Array<DefaultTheme.SidebarItem> = []

  for (const item of items) {
    if (item.link) {
      links.push(item)
    }

    if (item.items) {
      links.push(...flattenSidebar(item.items))
    }
  }

  return links
}

function getCurrentSidebar(): Array<DefaultTheme.SidebarItem> {
  const configuredSidebar = theme.value.sidebar

  if (!configuredSidebar) {
    return []
  }

  if (Array.isArray(configuredSidebar)) {
    return configuredSidebar
  }

  const matchingPrefix = Object.keys(configuredSidebar)
    .filter((prefix) => {
      return route.path.startsWith(prefix)
    })
    .sort((left, right) => right.length - left.length)[0]
  const matchedSidebar = configuredSidebar[matchingPrefix]

  if (!matchedSidebar) {
    return []
  }

  if (Array.isArray(matchedSidebar)) {
    return matchedSidebar
  }

  return matchedSidebar.items
}

function resolvePagerLink(
  override: unknown,
  candidate: DefaultTheme.SidebarItem | undefined,
): PagerLink | undefined {
  if (override === false) {
    return undefined
  }

  if (typeof override === 'string') {
    return {
      text: override,
      link: candidate?.link,
    }
  }

  if (isPagerLink(override)) {
    return {
      text:
        override.text ??
        candidate?.docFooterText ??
        candidate?.text,
      link: override.link ?? candidate?.link,
    }
  }

  if (!candidate) {
    return undefined
  }

  return {
    text: candidate.docFooterText ?? candidate.text,
    link: candidate.link,
  }
}

const pager = computed(() => {
  const links = flattenSidebar(getCurrentSidebar()).filter(
    (item, index, allItems) => {
      return (
        allItems.findIndex((candidate) => {
          return (
            normalizePath(candidate.link ?? '') ===
            normalizePath(item.link ?? '')
          )
        }) === index
      )
    },
  )
  const currentIndex = links.findIndex((item) => {
    return (
      item.link &&
      normalizePath(item.link) === normalizePath(route.path)
    )
  })

  const previousOverride = frontmatter.value.prev
  const nextOverride = frontmatter.value.next
  const previousHidden =
    (theme.value.docFooter?.prev === false &&
      !previousOverride) ||
    previousOverride === false
  const nextHidden =
    (theme.value.docFooter?.next === false && !nextOverride) ||
    nextOverride === false
  const previous = previousHidden
    ? undefined
    : resolvePagerLink(
        previousOverride,
        currentIndex > 0 ? links[currentIndex - 1] : undefined,
      )
  const next = nextHidden
    ? undefined
    : resolvePagerLink(
        nextOverride,
        currentIndex >= 0 && currentIndex < links.length - 1
          ? links[currentIndex + 1]
          : undefined,
      )

  return {
    previous,
    next,
  }
})

const editLink = computed(() => {
  const configuration = theme.value.editLink

  if (!configuration || frontmatter.value.editLink === false) {
    return null
  }

  const url =
    typeof configuration.pattern === 'function'
      ? configuration.pattern(page.value)
      : configuration.pattern.replace(/:path/g, page.value.filePath)

  return {
    url,
    text: configuration.text ?? 'Edit this page',
  }
})

const lastUpdated = computed(() => {
  if (!page.value.lastUpdated) {
    return null
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(page.value.lastUpdated)
})
</script>

<template>
  <footer
    v-if="editLink || lastUpdated || pager.previous || pager.next"
    class="mt-16"
  >
    <div
      v-if="editLink || lastUpdated"
      class="pb-[18px] sm:flex sm:items-center sm:justify-between sm:pb-3.5"
    >
      <a
        v-if="editLink"
        :href="editLink.url"
        class="inline-flex items-center gap-2 text-sm font-medium leading-8 text-primary hover:text-orange-300"
      >
        <PencilSquareIcon class="h-4 w-4" />
        {{ editLink.text }}
      </a>
      <p v-if="lastUpdated" class="text-xs font-medium text-neutral-500">
        {{ theme.lastUpdated?.text ?? 'Last updated' }} {{ lastUpdated }}
      </p>
    </div>

    <nav
      v-if="pager.previous?.link || pager.next?.link"
      class="grid gap-2 border-t border-neutral-800 pt-6 sm:grid-cols-2 sm:gap-4"
      aria-label="Pagination"
    >
      <a
        v-if="pager.previous?.link"
        :href="pager.previous.link"
        class="block h-full w-full rounded-lg border border-neutral-800 px-4 pb-[13px] pt-[11px] transition-colors hover:border-primary"
      >
        <span class="block text-xs font-medium leading-5 text-neutral-400">
          {{ theme.docFooter?.prev || 'Previous page' }}
        </span>
        <span class="block text-sm font-medium leading-5 text-primary">
          {{ pager.previous.text }}
        </span>
      </a>
      <span v-else />

      <a
        v-if="pager.next?.link"
        :href="pager.next.link"
        class="block h-full w-full rounded-lg border border-neutral-800 px-4 pb-[13px] pt-[11px] text-right transition-colors hover:border-primary"
      >
        <span class="block text-xs font-medium leading-5 text-neutral-400">
          {{ theme.docFooter?.next || 'Next page' }}
        </span>
        <span class="block text-sm font-medium leading-5 text-primary">
          {{ pager.next.text }}
        </span>
      </a>
    </nav>
  </footer>
</template>
