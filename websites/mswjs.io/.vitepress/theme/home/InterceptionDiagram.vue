<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export interface InterceptionStep {
  label: string
  detail?: string
}

export interface InterceptionBoundary {
  /**
   * Index of the step after which the boundary is drawn.
   */
  after: number
  label: string
}

const props = defineProps<{
  steps: Array<InterceptionStep>
  /**
   * Index of the step MSW's request reaches before it is handled.
   */
  mswReach: number
  /**
   * Labeled delimiters between steps, e.g. where your app ends.
   */
  boundaries?: Array<InterceptionBoundary>
}>()

/**
 * One cycle of the animation. A single "--progress" value (0–100) on
 * the figure drives every moving part through the CSS in "site.css",
 * so the request, its trail, and the lit steps can never drift apart,
 * whatever happens to the layout in between.
 */
const CYCLE_MS = 5000
/**
 * The exact arrival frame: the request sits at the interception point,
 * fully visible, with the trail complete and every passed step lit.
 * Reduced-motion users get this frame, frozen.
 */
const RESTING_PROGRESS = 56
const PULSE_RADIUS = 7
/**
 * Below this width the steps stack vertically with a fixed gap.
 */
const HORIZONTAL_QUERY = '(min-width: 768px)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

type Axis = 'x' | 'y'

interface Layout {
  axis: Axis
  /**
   * Where the request starts: the far edge of the request client,
   * relative to the track.
   */
  start: number
  /**
   * How far the request travels: up to the boundary of the interception point.
   */
  distance: number
  /**
   * The share (0–1) of the travel at which the request reaches each step.
   */
  arrivals: Array<number>
  /**
   * Where each boundary delimiter sits, relative to the track.
   */
  boundaryPositions: Array<number>
}

const figureElement = ref<HTMLElement>()
const trackElement = ref<HTMLElement>()
const stepElements = ref<Array<HTMLElement>>([])
const layout = ref<Layout>()
let resizeObserver: ResizeObserver | undefined
let visibilityObserver: IntersectionObserver | undefined
let horizontalQuery: MediaQueryList | undefined
let reducedMotionQuery: MediaQueryList | undefined
let frame = 0
let cycleStart = 0

function setStepElement(element: unknown, index: number): void {
  if (element instanceof HTMLElement) {
    stepElements.value[index] = element
  }
}

/**
 * Measure the steps along the current axis, relative to the track.
 * Positions come from bounding rectangles, so they hold for any
 * offset parent, font, or viewport.
 */
function measure(): void {
  const track = trackElement.value
  const client = stepElements.value[0]
  const target = stepElements.value[props.mswReach]

  if (!track || !client || !target) {
    return
  }

  const axis: Axis = horizontalQuery?.matches ? 'x' : 'y'
  const trackRect = track.getBoundingClientRect()
  const edges = stepElements.value.map((element) => {
    const rect = element.getBoundingClientRect()
    return axis === 'x'
      ? { near: rect.left - trackRect.left, far: rect.right - trackRect.left }
      : { near: rect.top - trackRect.top, far: rect.bottom - trackRect.top }
  })
  const start = edges[0].far
  const distance = edges[props.mswReach].near - start - PULSE_RADIUS

  layout.value = {
    axis,
    start,
    distance,
    arrivals: edges.map((edge, index) => {
      if (index === 0) {
        return 0
      }

      return (edge.near - start - PULSE_RADIUS) / distance
    }),
    // Each delimiter sits halfway between the two steps it separates.
    boundaryPositions: (props.boundaries ?? []).map((boundary) => {
      const before = edges[boundary.after]
      const after = edges[boundary.after + 1]
      return (before.far + after.near) / 2
    }),
  }
}

function setProgress(progress: number): void {
  figureElement.value?.style.setProperty('--progress', progress.toFixed(2))
}

function tick(now: number): void {
  if (cycleStart === 0) {
    cycleStart = now
  }

  setProgress(((now - cycleStart) % CYCLE_MS / CYCLE_MS) * 100)
  frame = requestAnimationFrame(tick)
}

function play(): void {
  if (frame === 0) {
    frame = requestAnimationFrame(tick)
  }
}

function pause(): void {
  cancelAnimationFrame(frame)
  frame = 0
}

/**
 * Animate only while on screen, and not at all for people who prefer
 * reduced motion (they get the arrival frame instead).
 */
function syncPlayback(): void {
  if (reducedMotionQuery?.matches) {
    pause()
    setProgress(RESTING_PROGRESS)
    return
  }

  visibilityObserver?.disconnect()
  visibilityObserver = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      play()
    } else {
      pause()
    }
  })

  if (figureElement.value) {
    visibilityObserver.observe(figureElement.value)
  }
}

function stepStyle(index: number): Record<string, string> {
  const arrival = layout.value?.arrivals[index]

  // Steps past the interception point never light up; the request
  // client is lit from the start.
  if (arrival === undefined || index > props.mswReach) {
    return { '--arrival': '2' }
  }

  return { '--arrival': index === 0 ? '-1' : arrival.toFixed(4) }
}

/**
 * Place an element at "position" along the track axis, centered on the
 * track's other axis.
 */
function alongTrack(position: number): Record<string, string> {
  return layout.value?.axis === 'x'
    ? { left: `${position}px`, top: '50%' }
    : { top: `${position}px`, left: '50%' }
}

/**
 * Delimiters hang from the track upwards (horizontal) so their label
 * clears the step boxes however close those are.
 */
function boundaryStyle(position: number): Record<string, string> {
  return layout.value?.axis === 'x'
    ? { left: `${position}px`, bottom: '50%' }
    : { top: `${position}px`, left: '50%' }
}

const pulseStyle = computed(() => {
  if (!layout.value) {
    return undefined
  }

  const { axis, start, distance } = layout.value
  return {
    ...alongTrack(start),
    '--travel-x': axis === 'x' ? `${distance}px` : '0px',
    '--travel-y': axis === 'y' ? `${distance}px` : '0px',
  }
})

const trailStyle = computed(() => {
  if (!layout.value) {
    return undefined
  }

  const { axis, start, distance } = layout.value
  const length = `${distance + PULSE_RADIUS}px`
  return {
    ...alongTrack(start),
    ...(axis === 'x' ? { width: length } : { height: length }),
  }
})

onMounted(() => {
  horizontalQuery = window.matchMedia(HORIZONTAL_QUERY)
  horizontalQuery.addEventListener('change', measure)
  reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  reducedMotionQuery.addEventListener('change', syncPlayback)

  measure()
  // The steps keep their size when the viewport changes; the track does not.
  // Observing both catches reflows as well as late font loading.
  resizeObserver = new ResizeObserver(measure)
  for (const element of [trackElement.value, ...stepElements.value]) {
    if (element) {
      resizeObserver.observe(element)
    }
  }

  syncPlayback()
})

onBeforeUnmount(() => {
  pause()
  resizeObserver?.disconnect()
  visibilityObserver?.disconnect()
  horizontalQuery?.removeEventListener('change', measure)
  reducedMotionQuery?.removeEventListener('change', syncPlayback)
})
</script>

<template>
  <figure
    ref="figureElement"
    class="interception-diagram"
    :class="layout?.axis === 'y' ? 'interception-diagram-vertical' : ''"
  >
    <div ref="trackElement" class="relative">
      <div
        class="absolute bg-neutral-700 max-md:inset-y-0 max-md:left-1/2 max-md:w-px max-md:-translate-x-1/2 md:inset-x-0 md:top-1/2 md:h-px md:-translate-y-1/2"
        aria-hidden="true"
      />
      <ol
        class="relative flex max-md:flex-col max-md:items-center max-md:gap-10 md:items-center md:justify-between md:gap-4"
      >
        <li
          v-for="(step, index) in steps"
          :key="step.label"
          :ref="(element) => setStepElement(element, index)"
          class="interception-step relative z-10 flex flex-col items-center rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-center"
          :style="stepStyle(index)"
        >
          <span class="font-mono text-sm font-semibold text-white">
            {{ step.label }}
          </span>
          <span v-if="step.detail" class="text-xs text-neutral-500">
            {{ step.detail }}
          </span>
        </li>
      </ol>
      <template v-if="layout">
        <div
          v-for="(boundary, index) in boundaries"
          :key="boundary.label"
          class="absolute z-10 border-dashed border-neutral-600 max-md:w-8 max-md:-translate-x-1/2 max-md:border-t md:h-12 md:border-l"
          :style="boundaryStyle(layout.boundaryPositions[index])"
          aria-hidden="true"
        >
          <span
            class="absolute whitespace-nowrap text-sm font-medium text-neutral-500 max-md:left-full max-md:top-1/2 max-md:ml-2 max-md:-translate-y-1/2 md:bottom-full md:left-1/2 md:mb-1.5 md:-translate-x-1/2"
          >
            {{ boundary.label }}
          </span>
        </div>
        <span class="interception-trail" :style="trailStyle" aria-hidden="true" />
        <span class="interception-request" :style="pulseStyle" aria-hidden="true" />
      </template>
    </div>
    <figcaption
      class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-widest text-neutral-500"
    >
      <span class="inline-flex items-center gap-2">
        <span class="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
        Request with MSW
      </span>
      <span class="inline-flex items-center gap-2">
        <span class="h-2.5 w-2.5 rounded-full bg-neutral-500" aria-hidden="true" />
        Request with other tools
      </span>
    </figcaption>
  </figure>
</template>
