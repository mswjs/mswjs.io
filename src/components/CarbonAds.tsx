import { useEffect, useRef } from 'react'
import { Box } from 'atomic-layout'
import './carbon-ads.css'

const CARBON_URL =
  'https://cdn.carbonads.com/carbon.js?serve=CEBIV5QY&placement=mswjsio'

export const CarbonAds: React.FC = () => {
  useEffect(() => {
    const firstParagraph = document
      .getElementById('docs-page')
      .querySelector('p')
    const element = document.createElement('script')
    const container = document.createElement('div')
    container.setAttribute('id', 'carbon-container')

    element.setAttribute('src', CARBON_URL)
    element.setAttribute('async', 'true')
    element.setAttribute('id', '_carbonads_js')
    container.appendChild(element)

    firstParagraph.insertAdjacentElement('afterend', container)
    // container.appendChild(element)
  }, [])

  return null
}
