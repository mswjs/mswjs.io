<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { onContentUpdated } from 'vitepress'

/**
 * Collapse a long code block to its first lines, with a toggle to reveal
 * the rest. Wrap a Markdown code fence:
 *
 * <CollapsibleCode :max-lines="20">
 *
 * ```json
 * ...
 * ```
 *
 * </CollapsibleCode>
 */
const props = withDefaults(
  defineProps<{
    /**
     * The number of lines shown while collapsed.
     */
    maxLines?: number
  }>(),
  {
    maxLines: 20,
  },
)

const root = ref<HTMLElement>()
const expanded = ref(false)
const totalLines = ref(0)

const collapsible = computed(() => {
  return totalLines.value > props.maxLines
})
const hiddenLines = computed(() => {
  return totalLines.value - props.maxLines
})

function countLines(): void {
  totalLines.value = root.value?.querySelectorAll('pre code .line').length ?? 0
}

onMounted(countLines)
onContentUpdated(countLines)
</script>

<template>
  <div
    ref="root"
    class="collapsible-code"
    :class="{ 'collapsible-code-collapsed': collapsible && !expanded }"
    :style="{ '--collapsible-code-lines': maxLines }"
  >
    <slot />
    <button
      v-if="collapsible"
      type="button"
      class="collapsible-code-toggle"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'Show less' : `Show ${hiddenLines} more lines` }}
    </button>
  </div>
</template>
