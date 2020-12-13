const withMDX = require('@jensmeindertsma/next-mdx')

module.exports = withMDX({
  nextConfig: {
    pageExtensions: ['tsx', 'mdx'],
  },
})
