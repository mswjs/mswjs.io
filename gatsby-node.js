const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const REPO_URL = 'https://github.com/mswjs/mockserviceworker.io'
const DOCS_BASE_PATH = 'docs'
const DOCS_TEMPLATE_PATH = path.resolve(
  __dirname,
  './src/templates/docs/singlePage.tsx',
)

const unslugify = (slug) => {
  return slug
    .replace(/^(\d+?)-/g, '')
    .replace(/^([a-z])/, (_, letter) => letter.toUpperCase())
    .replace(/-([a-zA-Z])/g, (_, letter) => {
      return ` ${letter.toUpperCase()}`
    })
}

const getRelativePagePath = (absolutePath) => {
  return path.relative(
    path.resolve(process.cwd(), DOCS_BASE_PATH),
    absolutePath,
  )
}

const isRootFile = (filename) => {
  return /^(index|readme)\.mdx?$/i.test(filename)
}

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

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMdx(
        filter: { frontmatter: { title: { ne: "" } } }
        sort: { order: ASC, fields: [frontmatter___order] }
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              url
              slug
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
  `).then((result) => {
    if (result.errors) {
      console.log(result.errors)
      return Promise.reject(result.errors)
    }

    const { edges } = result.data.allMdx
    const navTree = createNavTree(edges)

    edges.forEach(({ node }) => {
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
