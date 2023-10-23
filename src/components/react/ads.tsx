import { useState } from 'react'
import { Warning } from './warning'

export function Ads({
  url,
}: {
  // Treat the URL as the unique "key" to trigger
  // re-render across view transitions.
  url: string
}) {
  const [displayWarning, setDisplayWarning] = useState(false)

  console.log('ads render', url)

  return (
    <div key={url}>
      <script
        async
        src="https://media.ethicalads.io/media/client/ethicalads.min.js"
        onAbort={() => console.log('ABORT')}
        onLoad={() => {
          console.log('script loaded!')
        }}
        onError={() => {
          setDisplayWarning(true)
        }}
      ></script>
      <div
        className="horizontal dark flat"
        data-ea-publisher="mswjsio"
        data-ea-type="text"
      />
      {displayWarning ? (
        <div id="adblocker-warning" style={{ display: 'none' }}>
          <Warning>
            <strong>Please allow ads on this website.</strong> Thank you.
          </Warning>
        </div>
      ) : null}
    </div>
  )
}
