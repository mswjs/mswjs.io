const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const REPO_URL = 'https://github.com/mswjs/mockserviceworker.io'
const DOCS_BASE_PATH = 'docs'
const DOCS_TEMPLATE_PATH = path.resolve(
  __dirname,
  'src/templates/docs/singlePage.tsx',
)
const DOCS_CATEGORY_PAGE_PATH = path.resolve(
  __dirname,
  'src/templates/docs/categoryPage.tsx',
)

const unslugify = (slug) => {
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
const getRelativePagePath = (absolutePath) => {
  return path.relative(
    path.resolve(process.cwd(), DOCS_BASE_PATH),
    absolutePath,
  )
}

/**
 * Determines if the given filename is a root file.
 */
const isRootFile = (filename) => {
  return /^(index|readme)\.mdx?$/i.test(filename)
}

/**
 * Returns a breadcrumbs list for the given MDX node.
 */
const getDocumentBreadcrumbs = (node) => {
  const relativePath = getRelativePagePath(node.fileAbsolutePath)
  const pathChunks = relativePath.split('/').slice(0, -1)
  const breadcrumbs = pathChunks.map((filePath) => {
    return {
      title: unslugify(filePath),
      url: node.fields.url,
    }
  })

  // Do not create a separate node for root files
  if (isRootFile(relativePath)) {
    return breadcrumbs
  }

  return breadcrumbs.concat({
    title: node.frontmatter.title,
    display: node.frontmatter.displayName,
    url: node.fields.url,
  })
}

/**
 * Creates a deep nested navigation tree from the given
 * MDX documents list.
 */
const createNavTree = (edges) => {
  const items = edges.map(({ node }) => ({
    url: node.fields.url,
    title: node.frontmatter.title,
    displayName: node.frontmatter.displayName,
    pathChunks: getRelativePagePath(node.fileAbsolutePath).split('/'),
    filename: path.basename(node.fileAbsolutePath),
  }))

  function getRecursiveTree(pages) {
    return pages.reduce((tree, page) => {
      let { pathChunks, filename, url, title } = page
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

  return getRecursiveTree(items)
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const { errors, data } = await graphql(`
    {
      # MDX documents with no content are considered categories
      categories: allMdx(filter: { wordCount: { paragraphs: { eq: null } } }) {
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

      pages: allMdx(
        filter: {
          frontmatter: { title: { ne: "" } }
          wordCount: { paragraphs: { ne: null } }
        }
        sort: { order: ASC, fields: [frontmatter___order] }
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              url
            }
            frontmatter {
              title
              displayName
            }
            body
          }
        }
      }
    }
  `)

  if (errors) {
    console.log(errors)
    return null
  }

  const { categories, pages } = data
  const navTree = createNavTree(pages.edges)

  pages.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.url,
      component: DOCS_TEMPLATE_PATH,
      context: {
        postId: node.id,
        breadcrumbs: getDocumentBreadcrumbs(node),
        navTree,
      },
    })
  })

  categories.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.url,
      component: DOCS_CATEGORY_PAGE_PATH,
      context: {
        categoryTitle: node.frontmatter.title,
        categoryDescription: node.frontmatter.description,
        categoryRegex: new RegExp(`^${node.fields.url}\/.+`).toString(),
        breadcrumbs: getDocumentBreadcrumbs(node),
        navTree,
      },
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (['mdx'].includes(node.internal.type.toLowerCase())) {
    const postSlug = createFilePath({
      node,
      getNode,
      basePath: DOCS_BASE_PATH,
      trailingSlash: false,
    })

    createNodeField({
      node,
      name: 'slug',
      value: postSlug,
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
      value: path.join(REPO_URL, 'tree/master', relativeFilePath),
    })

    createNodeField({
      node,
      name: 'url',
      value: ['/', DOCS_BASE_PATH, '/', postSlug]
        .filter(Boolean)
        .join('')
        .replace(/\/+/g, '/'),
    })
  }
}
