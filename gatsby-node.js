require('dotenv').config()

const path = require('path')
const { execSync } = require('child_process')
const { until } = require('@open-draft/until')
const { createApolloFetch } = require('apollo-fetch')
const { createFilePath } = require('gatsby-source-filesystem')

const { NODE_ENV, GITHUB_ACCESS_TOKEN } = process.env

const IS_DEV = NODE_ENV === 'development'

const REPO_URL = 'https://github.com/mswjs/mswjs.io'
const DOCS_BASE_PATH = 'docs'
const DOCS_PAGE_TEMPLATE = path.resolve(
  __dirname,
  'src/templates/docs/singlePage.tsx',
)
const DOCS_CATEGORY_TEMPLATE = path.resolve(
  __dirname,
  'src/templates/docs/categoryPage.tsx',
)

const fetchFromGitHub = createApolloFetch({
  uri: 'https://api.github.com/graphql',
})

fetchFromGitHub.use(({ options }, next) => {
  if (!options.headers) {
    options.headers = {}
  }
  options.headers.authorization = `bearer ${GITHUB_ACCESS_TOKEN}`
  next()
})

async function getContributors(pages) {
  const pageObjects = pages.map(
    ({ node }, index) => `
      page${index}: object(expression: "master") {
        ... on Commit {
          history(path: "${node.fields.relativeFilePath}", first: 100) {
            nodes {
              author {
                user {
                  id
                  avatarUrl(size: 100)
                  url
                }
              }
            }
          }
        }
      }
    `,
  )

  const CONTRIBUTORS_QUERY = `
    {
      repository(name: "mswjs.io", owner: "mswjs") {
        ${pageObjects}
      }
    }
  `

  // Make a single query to the GitHub GraphQL API
  // to fetch contributors to all documentation pages.
  const [error, res] = await until(() =>
    fetchFromGitHub({ query: CONTRIBUTORS_QUERY }),
  )

  if (error || res.errors || res.message) {
    console.error(JSON.stringify(res, null, 2))
    return []
  }

  const { data } = res

  const contributors = Object.entries(data.repository || {}).reduce(
    (acc, [verboseIndex, chunk]) => {
      const pageIndex = Number(verboseIndex.replace('page', ''))
      const page = pages[pageIndex]
      const { nodes: allContributors } = chunk.history

      const uniqueContributors = allContributors
        .filter((node) => !!node.author.user)
        .reduce((acc, node) => {
          const isUnique = acc.every(
            (existingContributor) =>
              existingContributor.id !== node.author.user.id,
          )

          if (!isUnique) {
            return acc
          }

          return acc.concat(node.author.user)
        }, [])

      acc[page.node.id] = uniqueContributors

      return acc
    },
    {},
  )

  console.log(
    'Successfully retrieved GitHub contributors for %s pages!',
    pages.length,
  )

  return contributors
}

exports.createPages = async ({ actions, graphql }) => {
  const { errors, data } = await graphql(`
    {
      pages: allMdx(
        filter: { frontmatter: { title: { ne: "" } } }
        sort: { order: ASC, fields: [frontmatter___order] }
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              relativeFilePath
              url
              isHomepage
            }
            frontmatter {
              title
              displayName
              description
            }
            wordCount {
              paragraphs
            }
          }
        }
      }
    }
  `)

  if (errors) {
    console.log(errors)
    return null
  }

  const { edges: allPages } = data.pages

  const navTree = createNavTree(allPages)

  // Do not fetch page contributors during development
  // to prevent the GitHub access token reaching the rate limit.
  const contributors = IS_DEV ? [] : await getContributors(allPages)

  const [categories, pages] = allPages.reduce(
    (acc, { node }) => {
      const [prevCategories, prevPages] = acc
      const isCategory = node.wordCount.paragraphs === null

      if (isCategory) {
        return [prevCategories.concat(node), prevPages]
      }

      return [prevCategories, prevPages.concat(node)]
    },
    [[], []],
  )

  pages.forEach((node) => {
    actions.createPage({
      path: node.fields.url,
      component: DOCS_PAGE_TEMPLATE,
      context: {
        postId: node.id,
        breadcrumbs: getDocumentBreadcrumbs(node, navTree),
        navTree,
        contributors: contributors[node.id],
        lastModified: getLastModifiedDate(node.fileAbsolutePath),
      },
    })
  })

  // Populate each category node with its child nodes
  // and build a hierarchical nav tree for each category.
  const categoriesWithChildren = await Promise.all(
    categories.map(async (node) => {
      const regex = new RegExp(`^${node.fields.url}\/.+`).toString()
      const { errors, data } = await graphql(`
        {
          allMdx(
            filter: { fields: { url: { regex: "${regex}" } } }
            sort: { order: ASC, fields: [frontmatter___order] }
          ) {
            edges {
              node {
                fileAbsolutePath
                fields {
                  url
                }
                frontmatter {
                  title
                  displayName
                  description
                }
              }
            }
          }
        }
      `)

      if (errors) {
        return null
      }

      const { edges: childPages } = data.allMdx
      return [node, childPages, createNavTree(childPages)]
    }),
  )

  categoriesWithChildren.forEach(([node, childPages, childNavTree]) => {
    actions.createPage({
      path: node.fields.url,
      component: DOCS_CATEGORY_TEMPLATE,
      context: {
        categoryTitle: node.frontmatter.title,
        categoryDescription: node.frontmatter.description,
        childPages,
        childNavTree,
        breadcrumbs: getDocumentBreadcrumbs(node, navTree),
        navTree,
        contributors: contributors[node.id],
      },
    })
  })
}

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (['mdx'].includes(node.internal.type.toLowerCase())) {
    const postSlug = createFilePath({
      node,
      getNode,
      basePath: DOCS_BASE_PATH,
      trailingSlash: false,
    })

    const relativeFilePath = path.relative(__dirname, node.fileAbsolutePath)
    createNodeField({
      node,
      name: 'relativeFilePath',
      value: relativeFilePath,
    })

    // Reference the raw file on GitHub to allow edits
    createNodeField({
      node,
      name: 'editUrl',
      value: `${REPO_URL}/tree/master/${relativeFilePath}`,
    })

    createNodeField({
      node,
      name: 'url',
      value: ['/', DOCS_BASE_PATH, '/', postSlug]
        .filter(Boolean)
        .join('')
        .replace(/\/+/g, '/'),
    })

    createNodeField({
      node,
      name: 'isHomepage',
      value: postSlug === '/',
    })
  }
}

//
// Utils
//

function unslugify(slug) {
  return slug
    .replace(/^(\d+?)-/g, '')
    .replace(/^([a-z])/, (_, letter) => letter.toUpperCase())
    .replace(/-([a-zA-Z])/g, (_, letter) => {
      return ` ${letter.toUpperCase()}`
    })
}

/**
 * Returns a relative path based on the given absolute path.
 */
function getRelativePagePath(absolutePath) {
  return path.relative(
    path.resolve(process.cwd(), DOCS_BASE_PATH),
    absolutePath,
  )
}

/**
 * Determines if the given filename is a root file.
 */
function isRootFile(filename) {
  return /^(index|readme)\.mdx?$/i.test(filename)
}

/**
 * Returns a breadcrumbs list for the given MDX node.
 */
function getDocumentBreadcrumbs(node, tree) {
  let breadcrumbs = []
  const { url } = node.fields

  const traverseTree = (items) => {
    items.forEach((chunk) => {
      if (url.startsWith(chunk.url)) {
        if (!chunk.isHomepage) {
          breadcrumbs.push({
            title: chunk.displayName || chunk.title,
            url: chunk.url,
          })
        }

        if (chunk.items) {
          return traverseTree(chunk.items)
        }
      }
    })
  }

  traverseTree(tree)

  // If the current page is the only breadcrumb item,
  // produce no breadcrumbs.
  if (breadcrumbs.length == 1) {
    breadcrumbs = []
  }

  return breadcrumbs
}

/**
 * Creates a deep nested navigation tree from the given
 * MDX documents list.
 */
function createNavTree(edges) {
  const items = edges.map(({ node }) => ({
    url: node.fields.url,
    isHomepage: node.fields.isHomepage,
    title: node.frontmatter.title,
    displayName: node.frontmatter.displayName,
    pathChunks: getRelativePagePath(node.fileAbsolutePath).split(path.sep),
    filename: path.basename(node.fileAbsolutePath),
  }))

  function buildRecursiveTree(pages) {
    return pages.reduce((tree, page) => {
      let { pathChunks, filename, url, title, isHomepage } = page
      const displayName = page.displayName || title

      // Remove the last node in the path chunks for root pages
      if (isRootFile(filename)) {
        pathChunks = pathChunks.slice(0, -1)
      }

      if (pathChunks.length === 0) {
        return tree.concat({
          title,
          displayName,
          url,
          isHomepage,
        })
      } else {
        const targetItems = pathChunks.reduce((acc, pathSegment, index) => {
          const isLastSegment = index === pathChunks.length - 1

          const existingNode = acc.find((node) => {
            return node.segment === pathSegment
          })

          if (!existingNode) {
            acc.push(
              Object.assign(
                {},
                {
                  title: pathSegment,
                  segment: pathSegment,
                  displayName: unslugify(pathSegment),
                },
                isLastSegment
                  ? {
                      title,
                      displayName,
                      url,
                    }
                  : {
                      items: [],
                    },
              ),
            )
          } else if (isLastSegment) {
            existingNode.url = url
            return existingNode
          } else if (!existingNode.items) {
            existingNode.items = []
          }

          const nextAcc = existingNode
            ? existingNode.items
            : acc[acc.length - 1].items

          return nextAcc
        }, tree)

        if (targetItems && Array.isArray(targetItems)) {
          targetItems.push({
            title,
            pathSegment,
            displayName,
            url,
          })
        }
      }

      return tree
    }, [])
  }

  return buildRecursiveTree(items)
}

/**
 * Returns the date string of the latest commit for the given path.
 */
function getLastModifiedDate(filePath) {
  const buffer = execSync(`git log -1 --pretty="format:%ci" ${filePath}`)

  if (!buffer) {
    return null
  }

  return buffer.toString()
}
