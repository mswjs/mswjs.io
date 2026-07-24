<script setup lang="ts">
import Container from '@mswjs/shared/theme/components/Container.vue'
import Grid from '@mswjs/shared/theme/components/Grid.vue'
import PageHeaderWrapper from '@mswjs/shared/theme/components/PageHeaderWrapper.vue'
import PageHeaderSubtitle from '@mswjs/shared/theme/components/PageHeaderSubtitle.vue'
import InlineSvg from '@mswjs/shared/theme/components/InlineSvg.vue'
import ReactIsland from '@mswjs/shared/theme/components/ReactIsland.vue'
import { CopyButton } from '@mswjs/shared/theme/react/copyButton'
import mswLogoRaw from '../../../src/images/msw.svg?raw'
import mswLogoMonoRaw from '../../../src/images/msw-mono.svg?raw'
import mswLogoIncorrectNoBackgroundRaw from '../../../src/images/msw-incorrect-no-bg.svg?raw'
import usageGridRaw from '../../../src/images/usage-grid.svg?raw'
</script>

<template>
  <Container>
    <Grid>
      <div class="sm:col-span-8 lg:col-start-3">
        <PageHeaderWrapper class="mt-16 md:mt-24">
          <h1 class="mb-8 capitalize">Branding</h1>
          <PageHeaderSubtitle class="md:w-3/6">
            Guidelines on using the Mock Service Worker logo.
          </PageHeaderSubtitle>
        </PageHeaderWrapper>
      </div>
    </Grid>

    <Grid>
      <div class="mb-16 flex flex-col gap-24 sm:col-span-8 lg:col-start-3">
        <section class="inline-flex gap-6 md:gap-10 justify-center">
          <div class="flex gap-3 items-center">
            <div id="msw-logo" class="size-12">
              <InlineSvg :svg="mswLogoRaw" />
            </div>
            <ClientOnly>
              <ReactIsland
                :component="CopyButton"
                :component-props="{
                  elementId: 'msw-logo',
                  className: 'button button-primary text-sm',
                  children: 'Copy SVG',
                }"
              />
            </ClientOnly>
          </div>
          <div class="flex gap-3 items-center">
            <div id="msw-logo-mono" class="size-12">
              <InlineSvg :svg="mswLogoMonoRaw" />
            </div>
            <ClientOnly>
              <ReactIsland
                :component="CopyButton"
                :component-props="{
                  elementId: 'msw-logo-mono',
                  className: 'button button-primary text-sm',
                  children: 'Copy SVG',
                }"
              />
            </ClientOnly>
          </div>
        </section>

        <hr />

        <section class="flex flex-col gap-10">
          <div>
            <h2>Background</h2>
            <p>
              Keep the dark background of the logo to create a proper contrast.
            </p>
          </div>
          <div class="md:justify-self-end">
            <div
              class="flex flex-col sm:flex-row items-center md:justify-items-center gap-10 -space-x-px"
            >
              <div
                class="relative flex flex-col gap-5 size-64 items-center justify-center"
              >
                <InlineSvg
                  :svg="usageGridRaw"
                  class="absolute inset-0 -z-10 stroke-neutral-800"
                />
                <InlineSvg :svg="mswLogoRaw" class="size-20" />
                <div
                  class="absolute bottom-[34px] size-7 bg-green-500 bg-opacity-80 rounded-full flex items-center justify-center text-lg"
                >
                  ✓
                </div>
              </div>
              <div
                class="relative flex flex-col gap-5 size-64 items-center justify-center"
              >
                <InlineSvg
                  :svg="usageGridRaw"
                  class="absolute inset-0 -z-10 stroke-neutral-800"
                />
                <InlineSvg
                  :svg="mswLogoIncorrectNoBackgroundRaw"
                  class="size-20"
                />
                <div
                  class="absolute bottom-[34px] size-7 bg-red-500 bg-opacity-80 rounded-full flex items-center justify-center text-lg"
                >
                  ✗
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="flex flex-col gap-10">
          <div>
            <h2>Primary color</h2>
            <p>
              Keep the orange (<code class="text-primary">#FF6A33</code>) fill
              color for the arrows.
            </p>
          </div>
          <div class="md:justify-self-end">
            <div
              class="flex flex-col sm:flex-row items-center md:justify-items-center gap-10 -space-x-px"
            >
              <div
                class="relative flex flex-col gap-5 size-64 items-center justify-center"
              >
                <InlineSvg
                  :svg="usageGridRaw"
                  class="absolute inset-0 -z-10 stroke-neutral-800"
                />
                <InlineSvg :svg="mswLogoRaw" class="size-20" />
                <div
                  class="absolute bottom-[34px] size-7 bg-green-500 bg-opacity-80 rounded-full flex items-center justify-center text-lg"
                >
                  ✓
                </div>
              </div>
              <div
                class="relative flex flex-col gap-5 size-64 items-center justify-center"
              >
                <InlineSvg
                  :svg="usageGridRaw"
                  class="absolute inset-0 -z-10 stroke-neutral-800"
                />
                <div class="relative">
                  <InlineSvg :svg="mswLogoRaw" class="size-20" />
                  <div class="absolute inset-0 bg-blue-500 mix-blend-hue" />
                </div>
                <div
                  class="absolute bottom-[34px] size-7 bg-red-500 bg-opacity-80 rounded-full flex items-center justify-center text-lg"
                >
                  ✗
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="flex flex-col gap-10">
          <div>
            <h2>Monochrome variant</h2>
            <p>
              Use a designated monochrome variant for the black-and-white logo.
            </p>
          </div>
          <div class="md:justify-self-end">
            <div
              class="flex flex-col sm:flex-row items-center md:justify-items-center gap-10 -space-x-px"
            >
              <div
                class="relative flex flex-col gap-5 size-64 items-center justify-center"
              >
                <InlineSvg
                  :svg="usageGridRaw"
                  class="absolute inset-0 -z-10 stroke-neutral-800"
                />
                <InlineSvg :svg="mswLogoMonoRaw" class="size-20" />
                <div
                  class="absolute bottom-[34px] size-7 bg-green-500 bg-opacity-80 rounded-full flex items-center justify-center text-lg"
                >
                  ✓
                </div>
              </div>
              <div
                class="relative flex flex-col gap-5 size-64 items-center justify-center"
              >
                <InlineSvg
                  :svg="usageGridRaw"
                  class="absolute inset-0 -z-10 stroke-neutral-800"
                />
                <InlineSvg :svg="mswLogoRaw" class="size-20 grayscale" />
                <div
                  class="absolute bottom-[34px] size-7 bg-red-500 bg-opacity-80 rounded-full flex items-center justify-center text-lg"
                >
                  ✗
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Grid>
  </Container>
</template>
