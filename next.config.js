const withMDX = require('@next/mdx')()

module.exports = withMDX({
  pageExtensions: ['tsx', 'mdx'],
})
