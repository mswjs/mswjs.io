const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const DOCS_BASE_PATH = 'docs'
const ORDER_PREFIX_EXP = /(?<=\/)(\d+?)-/g

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

const getDocumentBreadcrumbs = (node) => {
  const relativePath = getRelativePagePath(node.fileAbsolutePath)
  const pathChunks = relativePath.split('/').slice(0, -1)
  const breadcrumbs = pathChunks.map((filePath) => {
    return {
      title: unslugify(filePath),
      url: '#',
    }
  })

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
      let { pathChunks, filename, url, title, displayName } = page
      const resolvedTitle = displayName || title

      // Remove the last node in the path chunks for root pages
      if (/^(index|readme)\.mdx?$/i.test(filename)) {
        pathChunks = pathChunks.slice(0, -1)
      }

      if (pathChunks.length === 0) {
        return tree.concat({
          title,
          displayName: resolvedTitle,
          url,
        })
      } else {
        const targetItems = pathChunks.reduce((acc, pathSegment, index) => {
          const isLastSegment = index === pathChunks.length - 1
          const existingNode = acc.find((node) => node.title === pathSegment)

          if (!existingNode) {
            acc.push(
              Object.assign(
                {
                  title: pathSegment,
                  displayName: unslugify(pathSegment),
                },
                isLastSegment
                  ? {
                      title,
                      displayName: resolvedTitle,
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
            displayName: resolvedTitle,
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
  const singlePageTemplate = path.resolve(
    __dirname,
    './src/templates/documentationPage.tsx',
  )

  return graphql(`
    {
      allMdx(sort: { order: ASC, fields: [fileAbsolutePath] }) {
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
        component: singlePageTemplate,
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

    const postSlugWithoutOrder = postSlug.replace(ORDER_PREFIX_EXP, '')

    createNodeField({
      node,
      name: 'slug',
      value: postSlugWithoutOrder,
    })

    createNodeField({
      node,
      name: 'url',
      value: `/${DOCS_BASE_PATH}/${postSlugWithoutOrder}`.replace(/\/+/g, '/'),
    })
  }
}
