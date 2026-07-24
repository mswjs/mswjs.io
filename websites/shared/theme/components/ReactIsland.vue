<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { createElement, type ComponentType } from 'react'
import { createRoot, type Root } from 'react-dom/client'

/**
 * Mounts an interactive React component into the
 * server-rendered Vue page (a "React island").
 */
const props = defineProps<{
  component: ComponentType<Record<string, unknown>>
  componentProps?: Record<string, unknown>
}>()

const containerRef = ref<HTMLElement | null>(null)
let reactRoot: Root | null = null

const render = () => {
  reactRoot?.render(createElement(props.component, props.componentProps))
}

onMounted(() => {
  if (containerRef.value) {
    reactRoot = createRoot(containerRef.value)
    render()
  }
})

watch(
  () => props.componentProps,
  () => {
    render()
  },
  { deep: true },
)

onBeforeUnmount(() => {
  reactRoot?.unmount()
  reactRoot = null
})
</script>

<template>
  <div ref="containerRef" class="contents" />
</template>
