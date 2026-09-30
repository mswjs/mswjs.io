export {}

declare global {
  interface Window {
    /**
     * EthicalAds client. Present once its script has loaded.
     * @see https://www.ethicalads.io/publisher-guide/
     */
    ethicalads?: {
      reload: () => void
    }
  }
}
