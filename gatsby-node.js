const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const REPO_URL = 'https://github.com/mswjs/mockserviceworker.io'
const DOCS_BASE_PATH = 'docs'
const DOCS_PAGE_TEMPLATE = path.resolve(
  __dirname,
  'src/templates/docs/singlePage.tsx',
)
const DOCS_CATEGORY_TEMPLATE = path.resolve(
  __dirname,
  'src/templates/docs/categoryPage.tsx',
)

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

    console.log({ postSlug })

    createNodeField({
      node,
      name: 'isHomepage',
      value: postSlug === '/',
    })

    createNodeField({
      node,
      name: 'breadcrumbs',
      value: ['a', 'b', 'c'],
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
  const breadcrumbs = []
  const { url } = node.fields

  const traverseTree = (items) => {
    items.forEach((chunk) => {
      if (url.startsWith(chunk.url)) {
        breadcrumbs.push({
          title: chunk.displayName || chunk.title,
          url: chunk.url,
        })

        if (chunk.items) {
          return traverseTree(chunk.items)
        }
      }
    })
  }

  traverseTree(tree)

  // Unshift the first entry because it matches the "<docsRoot>/index.mdx" file.
  // breadcrumbs.shift()

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
    pathChunks: getRelativePagePath(node.fileAbsolutePath).split('/'),
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
