/**
 * Returns the `location` object in the browser environment
 * and its compatible stub in a NodeJS environment.
 */
export function useIsomorphicLocation() {
  return typeof location !== 'undefined'
    ? location
    : {
        search: {},
        href: undefined,
      }
}
