<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const scrollTrapRef = ref<HTMLDivElement | null>(null)

watch(
  () => props.isOpen,
  (isOpen) => {
    const scrollTrapElement = scrollTrapRef.value

    if (!scrollTrapElement) {
      return
    }

    if (isOpen) {
      disableBodyScroll(scrollTrapElement)

      const firstLink = scrollTrapElement.querySelector('a')
      firstLink?.focus()
    } else {
      enableBodyScroll(scrollTrapElement)
    }
  },
)

const keydownListener = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('keydown', keydownListener)
}

onBeforeUnmount(() => {
  document.removeEventListener('keydown', keydownListener)

  if (scrollTrapRef.value) {
    enableBodyScroll(scrollTrapRef.value)
  }
})

defineExpose({
  scrollTrapRef,
})
</script>

<template>
  <section
    class="fixed block top-[60px] bg-neutral-950 inset-0 max-h-[100vh] z-[5]"
    :style="{ display: isOpen ? 'block' : 'none' }"
  >
    <div
      ref="scrollTrapRef"
      class="px-5 pr-24 py-10 max-h-full overflow-y-auto"
    >
      <slot />
    </div>
  </section>
</template>
