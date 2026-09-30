import { pullMswTypes } from './msw-source.mjs'

const lazy = process.argv.includes('--lazy')
const release = await pullMswTypes({ lazy })

console.log(
  lazy
    ? `Pinned MSW ${release.tag} (its source is checked out on demand)`
    : `Pulled the types of MSW ${release.tag}`,
)
