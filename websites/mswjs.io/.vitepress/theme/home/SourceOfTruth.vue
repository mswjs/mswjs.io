<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import PageHeaderSubtitle from '@mswjs/shared/theme/components/PageHeaderSubtitle.vue'
import FeatureLink from './FeatureLink.vue'

export interface SourceOfTruthScene {
  /**
   * The last word of the heading, e.g. "testing".
   */
  word: string
  /**
   * Name of the slot holding this scene's code snippet.
   */
  slot: string
}

const props = defineProps<{
  scenes: Array<SourceOfTruthScene>
  /**
   * How long each scene stays on screen, in milliseconds.
   */
  interval?: number
}>()

const DEFAULT_INTERVAL_MS = 5000
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const rootElement = ref<HTMLElement>()
const wordElement = ref<HTMLElement>()
const activeIndex = ref(0)
/**
 * The snippet stacked behind the active one. Starts as the last scene,
 * so there is a card behind the first one from the very beginning.
 */
const previousIndex = ref(props.scenes.length - 1)
/**
 * Width of the current word, so the heading slides to fit it
 * instead of jumping.
 */
const wordWidth = ref<number>()
/**
 * Whether the scenes are rotating (on screen, motion allowed); the
 * progress indicator only runs while they are.
 */
const playing = ref(false)
let timer = 0
let visibilityObserver: IntersectionObserver | undefined
let reducedMotionQuery: MediaQueryList | undefined

function show(index: number): void {
  if (index === activeIndex.value) {
    return
  }

  previousIndex.value = activeIndex.value
  activeIndex.value = index
}

function next(): void {
  show((activeIndex.value + 1) % props.scenes.length)
}

/**
 * Jump to a scene; the rotation (and its progress) restarts from there.
 */
function select(index: number): void {
  show(index)

  if (playing.value) {
    pause()
    play()
  }
}

function panelClass(index: number): string {
  if (index === activeIndex.value) {
    return 'scene-panel-active'
  }

  if (index === previousIndex.value) {
    return 'scene-panel-behind'
  }

  return 'scene-panel-hidden'
}

/**
 * The wrapper animates to the width of the word that is actually
 * rendered: the new word enters right away (the old one leaves out of
 * flow), so its measured width is exactly what the wrapper must end at.
 */
async function measureWord(): Promise<void> {
  await nextTick()
  // Fractional width: rounding down would shave the last glyph.
  wordWidth.value = wordElement.value?.getBoundingClientRect().width
}

watch(activeIndex, measureWord)

function play(): void {
  if (timer === 0 && props.scenes.length > 1) {
    timer = window.setInterval(next, props.interval ?? DEFAULT_INTERVAL_MS)
    playing.value = true
  }
}

function pause(): void {
  window.clearInterval(timer)
  timer = 0
  playing.value = false
}

/**
 * Rotate only while on screen, and never for people who prefer reduced
 * motion (they get the first scene).
 */
function syncPlayback(): void {
  visibilityObserver?.disconnect()

  if (reducedMotionQuery?.matches) {
    pause()
    activeIndex.value = 0
    return
  }

  visibilityObserver = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      play()
    } else {
      pause()
    }
  })

  if (rootElement.value) {
    visibilityObserver.observe(rootElement.value)
  }
}

onMounted(() => {
  reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  reducedMotionQuery.addEventListener('change', syncPlayback)
  syncPlayback()
  measureWord()
})

onBeforeUnmount(() => {
  pause()
  visibilityObserver?.disconnect()
  reducedMotionQuery?.removeEventListener('change', syncPlayback)
})
</script>

<template>
  <div
    ref="rootElement"
    class="relative"
    :style="{ '--scene-interval': `${interval ?? DEFAULT_INTERVAL_MS}ms` }"
  >
    <!-- Scene controls: one bar per scene, the active one wider and
         filling up with the time left until the next scene. Beside the
         section from "lg" up; above the heading, rotated a quarter turn,
         below that (the bars stand upright and fill top to bottom; the
         column is reversed so the first scene still comes first). -->
    <div class="flex h-14 items-center justify-center pt-8 lg:contents">
      <div
        class="flex flex-col items-end max-lg:flex-col-reverse max-lg:items-start max-lg:rotate-90 lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2"
        role="tablist"
        aria-label="Scenes"
      >
        <!-- The button is the hit area; the bar inside is what you see. -->
        <button
          v-for="(scene, index) in scenes"
          :key="scene.slot"
          type="button"
          role="tab"
          class="scene-control flex w-14 items-center justify-end px-2 py-2.5 max-lg:justify-start"
          :class="{ 'scene-control-active': index === activeIndex }"
          :aria-selected="index === activeIndex"
          :aria-label="`Show: ${scene.word}`"
          @click="select(index)"
        >
          <span class="scene-control-bar" aria-hidden="true">
            <span
              v-if="index === activeIndex && playing"
              :key="`progress-${activeIndex}`"
              class="scene-control-progress"
            />
          </span>
        </button>
      </div>
    </div>
    <header class="px-6 py-16 text-center md:py-24">
      <h2 class="relative mx-auto mb-0 max-w-xl capitalize">
        <slot name="heading" />&#32;<span
          class="scene-word-slot relative inline-block whitespace-nowrap align-bottom text-primary"
          :style="
            wordWidth === undefined ? undefined : { width: `${wordWidth}px` }
          "
        >
          <Transition name="scene-word">
            <span
              ref="wordElement"
              :key="scenes[activeIndex].word"
              class="inline-block"
              >{{ scenes[activeIndex].word }}</span
            >
          </Transition>
        </span>
      </h2>
      <PageHeaderSubtitle class="mt-6 lg:w-3/6">
        Become in charge of the network across the entire stack.
      </PageHeaderSubtitle>
      <p class="mt-8">
        <FeatureLink href="/guides/" large>Explore integrations</FeatureLink>
      </p>
    </header>
    <!-- Every scene's snippet is rendered in the same grid cell, so the
         panel keeps the height of the tallest one and only fades. -->
    <div class="mx-auto grid w-full max-w-3xl px-6 md:px-12">
      <div
        v-for="(scene, index) in scenes"
        :key="scene.slot"
        class="scene-panel home-code home-code-panel home-code-bleed-b vp-doc min-w-0 [grid-area:1/1]"
        :class="panelClass(index)"
        :aria-hidden="index !== activeIndex"
      >
        <slot :name="scene.slot" />
      </div>
    </div>
  </div>
</template>
