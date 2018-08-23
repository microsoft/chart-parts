const path = require('path')
const fs = require('fs')

/**
 * Dynamically creates pages in the static website
 */
async function createPages({ actions, graphql }) {
  await createMarkdownPages(actions, graphql)
  await createApidocPages(actions, graphql)
}

async function createMarkdownPages(actions, graphql) {
  const retrieveMarkdownPages = () =>
    graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `)

  const blogTemplate = path.resolve(`src/templates/blogTemplate.tsx`)
  const docTemplate = path.resolve(`src/templates/docTemplate.tsx`)
  const result = await retrieveMarkdownPages()

  if (result.errors) {
    console.error('graphql error', result.errors)
    throw new Error('Error invoking graphql for pages')
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const {
      frontmatter: { path: pagePath },
    } = node
    const category = pagePath.split('/').filter(t => !!t)[0]
    actions.createPage({
      path: pagePath,
      component: category === 'blog' ? blogTemplate : docTemplate,
      context: {}, // additional data can be passed via context
    })
  })
}

async function createApidocPages(acitons, graphql) {}

exports.createPages = createPages
