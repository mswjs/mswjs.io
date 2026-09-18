const MODIFIER_CLASS = 'twoslash-source-modifier'

function findSourceToken(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) {
    return null
  }

  return target.closest<HTMLElement>('.twoslash-hover[data-source]')
}

function hasModifier(event: MouseEvent | KeyboardEvent): boolean {
  return event.metaKey || event.ctrlKey
}

/**
 * Cmd/Ctrl+click on an identifier defined in the MSW source opens
 * its definition on GitHub in a new tab, like "go to definition".
 * Holding the modifier marks the tokens that can be followed.
 */
export function setupTwoslashSourceLinks(): void {
  if (typeof window === 'undefined') {
    return
  }

  const root = document.documentElement

  function setModifier(active: boolean): void {
    root.classList.toggle(MODIFIER_CLASS, active)
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Meta' || event.key === 'Control') {
      setModifier(true)
    }
  })
  window.addEventListener('keyup', (event) => {
    if (event.key === 'Meta' || event.key === 'Control') {
      setModifier(false)
    }
  })
  window.addEventListener('blur', () => {
    setModifier(false)
  })

  window.addEventListener(
    'click',
    (event) => {
      if (!hasModifier(event)) {
        return
      }

      const token = findSourceToken(event.target)
      const url = token?.dataset.source

      if (!url) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    { capture: true },
  )
}
