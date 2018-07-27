import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import convertGraphqlToc from '../util/convertGraphqlToc'
import Doc from '../components/doc'

// tslint:disable-next-line
require('prismjs/themes/prism-tomorrow.css')

export default function Template(arg: any) {
  const { currentPage, toc } = arg.data

  return (
    <Layout
      logoTo="/documentation"
      sidebar={
        <Sidebar
          items={convertGraphqlToc(toc)}
          activePath={arg.location.pathname}
        />
      }
    >
      <Doc docPage={currentPage} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    currentPage: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }

    toc: allMarkdownRemark(
      filter: { frontmatter: { path: { regex: "/^/documentation/.*/" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            order
          }
        }
      }
    }
  }
`
