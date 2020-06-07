module.exports = {
  siteMetadata: {
    title: `Mock Service Worker`,
    description: `API mocking library of the next generation`,
    author: `@kettanaito`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/docs/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs-assets`,
        path: `${__dirname}/docs/assets/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-svgr`,
      options: {
        svgoConfig: {
          cleanupIDs: false,
        },
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        rehypePlugins: [require('rehype-slug')],
        remarkPlugins: [
          {
            resolve: require('remark-validate-links'),
            options: {
              repository: 'mswjs/mswjs.io',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        ssr: true,
        displayName: false,
      },
    },
  ],
}
