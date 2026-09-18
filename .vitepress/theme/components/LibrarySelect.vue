<script lang="ts">
import { defineComponent, h, type PropType } from 'vue'
import { useRouter } from 'vitepress'
import { libraries, type Library } from '../libraries'

/**
 * The library whose documentation is being read. A native select styled
 * with the customizable select API ("appearance: base-select"); browsers
 * without it show the plain select with the library names (the "label").
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

    return () => {
      return h('label', { class: 'library-select items-center' }, [
        h('span', { class: 'sr-only' }, 'Library'),
        h(
          'select',
          {
            value: props.library.url,
            'aria-label': 'Library',
            onChange: handleChange,
          },
          [
            h('button', { type: 'button' }, [
              h('selectedcontent'),
              h(
                'span',
                { class: 'library-select-caret', 'aria-hidden': 'true' },
                '▾',
              ),
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
                    h('span', { class: 'library-select-name' }, candidate.name),
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
