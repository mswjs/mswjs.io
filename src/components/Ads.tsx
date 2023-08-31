import { useEffect } from 'react'
import './ads.css'

const ADS_PROVIDER_URL =
  'https://media.ethicalads.io/media/client/ethicalads.min.js'

export const Ads: React.FC = () => {
  useEffect(() => {
    const firstParagraph = document
      .getElementById('docs-page')
      .querySelector('p')
      
    const adsContainer = document.createElement('div')
    adsContainer.setAttribute('id', 'ads-container')
      
    const script = document.createElement('script')
    script.setAttribute('src', ADS_PROVIDER_URL)
    script.setAttribute('async', 'true')
    adsContainer.appendChild(script)

    const adBlock = document.createElement('div')
    adBlock.setAttribute('data-ea-publisher', 'mswjs.io')
    adBlock.setAttribute('data-ea-type', 'image')
    adsContainer.appendChild(adBlock)

    firstParagraph.insertAdjacentElement('afterend', adsContainer)
  }, [])

  return null
}
