module.exports = {
  siteMetadata: {
    siteUrl: 'https://mswjs.io',
    title: `Mock Service Worker`,
    description: `Seamless API mocking library for browser and Node.`,
    twitterAccount: `@ApiMocking`,
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
        name: `Mock Service Worker`,
        short_name: `MSW`,
        start_url: `/`,
        background_color: `#ef9e57`,
        theme_color: `#ef9e57`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-svgr`,
      options: {
        // Disable SVGO entirely, because `svgoConfig: { cleanupIDs: false}` doesn't work.
        // It strips IDs anyway, making SVGs much harder to style and animate.
        svgo: false,
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
        displayName: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-169627680-1`,
      },
    },
  ],
}
