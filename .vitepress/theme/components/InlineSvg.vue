<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  svg: string
}>()

const attrs = useAttrs()

/**
 * Inlines a raw SVG string, mirroring what "vite-plugin-svgr"
 * (with the "removeTitle"/"removeDimensions" SVGO plugins)
 * previously did for React: strips the XML prolog, title,
 * and fixed dimensions, and applies the incoming class.
 */
const processedSvg = computed(() => {
  const withoutProlog = props.svg
    .replace(/<\?xml[\s\S]*?\?>/, '')
    .replace(/<title>[\s\S]*?<\/title>/, '')

  return withoutProlog.replace(/<svg([^>]*)>/, (_, svgAttributes) => {
    const cleanedAttributes = svgAttributes.replace(
      /\s(width|height)="[^"]*"/g,
      '',
    )
    const classAttribute = attrs.class ? ` class="${attrs.class}"` : ''

    return `<svg${cleanedAttributes}${classAttribute}>`
  })
})
</script>

<template>
  <span style="display: contents" v-html="processedSvg" />
</template>
