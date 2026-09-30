<script lang="ts">
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  type PropType,
} from 'vue'
import { useRouter } from 'vitepress'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { libraries, type Library } from '../libraries'

/**
 * The library whose documentation is being read. A native select styled
 * with the customizable select API ("appearance: base-select"). Browsers
 * without it (Safari, including every browser on iOS) can only render a
 * plain text select, so they get a menu of links that looks the same.
 *
 * Rendered with a render function: the rich option content is only valid
 * markup under the customizable select API, which the template compiler
 * (and the HTML parser of older browsers) rejects. It renders on the
 * client only for the same reason (see the header).
 */
export default defineComponent({
  name: 'LibrarySelect',
  props: {
    library: {
      type: Object as PropType<Library>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()

    function handleChange(event: Event): void {
      const url = (event.target as HTMLSelectElement).value

      if (url.startsWith('/')) {
        router.go(url)
        return
      }

      window.location.assign(url)
    }

    // Only ever evaluated on the client (see the component description).
    const supportsCustomizableSelect =
      typeof CSS !== 'undefined' && CSS.supports('appearance', 'base-select')
    const menuElement = ref<HTMLElement>()
    const isMenuOpen = ref(false)

    function closeMenu(): void {
      isMenuOpen.value = false
    }

    function handleDocumentPointerDown(event: PointerEvent): void {
      if (
        event.target instanceof Node &&
        menuElement.value?.contains(event.target)
      ) {
        return
      }

      closeMenu()
    }

    function handleDocumentKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    onMounted(() => {
      if (supportsCustomizableSelect) {
        return
      }

      document.addEventListener('pointerdown', handleDocumentPointerDown)
      document.addEventListener('keydown', handleDocumentKeyDown)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('pointerdown', handleDocumentPointerDown)
      document.removeEventListener('keydown', handleDocumentKeyDown)
    })

    function renderLibrary(candidate: Library) {
      return [
        h('img', {
          src: candidate.logoUrl,
          alt: '',
          class: 'library-select-logo',
        }),
        h('span', { class: 'library-select-text' }, [
          h(
            'span',
            { class: 'library-select-name leading-tight' },
            candidate.name,
          ),
          h('span', {
            class: 'library-select-description',
            'data-text': candidate.description,
          }),
        ]),
      ]
    }

    function renderMenu() {
      return h(
        'div',
        { ref: menuElement, class: 'library-select library-menu items-center' },
        [
          h(
            'button',
            {
              type: 'button',
              class: 'library-menu-button',
              'aria-label': `Library: ${props.library.name}`,
              'aria-haspopup': 'true',
              'aria-expanded': isMenuOpen.value,
              onClick() {
                isMenuOpen.value = !isMenuOpen.value
              },
            },
            [
              h(
                'span',
                { class: 'library-menu-selected' },
                renderLibrary(props.library),
              ),
              h(ChevronDownIcon, {
                class: 'library-select-caret',
                'aria-hidden': 'true',
              }),
            ],
          ),
          isMenuOpen.value
            ? h(
                'div',
                { class: 'library-menu-list' },
                libraries.map((candidate) => {
                  const isCurrent = candidate.url === props.library.url

                  return h(
                    'a',
                    {
                      key: candidate.name,
                      href: candidate.url,
                      class: 'library-menu-item',
                      'aria-current': isCurrent ? 'page' : undefined,
                      onClick: closeMenu,
                    },
                    renderLibrary(candidate),
                  )
                }),
              )
            : null,
        ],
      )
    }

    return () => {
      if (!supportsCustomizableSelect) {
        return renderMenu()
      }

      return h('label', { class: 'library-select items-center' }, [
        h('span', { class: 'sr-only' }, 'Library'),
        h(
          'select',
          {
            value: props.library.url,
            id: 'library',
            'aria-label': 'Library',
            onChange: handleChange,
          },
          [
            h('button', { type: 'button' }, [
              h('selectedcontent'),
              // The same chevron as the sidebar section toggles.
              h(ChevronDownIcon, {
                class: 'library-select-caret',
                'aria-hidden': 'true',
              }),
            ]),
            ...libraries.map((candidate) => {
              return h(
                'option',
                {
                  key: candidate.name,
                  value: candidate.url,
                  selected: candidate.url === props.library.url,
                },
                [
                  h('img', {
                    src: candidate.logoUrl,
                    alt: '',
                    class: 'library-select-logo',
                  }),
                  h('span', { class: 'library-select-text' }, [
                    h(
                      'span',
                      { class: 'library-select-name leading-tight' },
                      candidate.name,
                    ),
                    // Drawn with CSS so the option's text (the fallback
                    // label in browsers without the customizable select
                    // API) stays the library name.
                    h('span', {
                      class: 'library-select-description',
                      'data-text': candidate.description,
                    }),
                  ]),
                ],
              )
            }),
          ],
        ),
      ])
    }
  },
})
</script>
