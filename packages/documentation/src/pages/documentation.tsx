import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import Doc from '../components/doc'
import convertGraphqlToc from '../util/convertGraphqlToc'

const Documentation = ({ data: { toc, introduction } }: any) => {
  return (
    <Layout
      logoTo="/documentation"
      sidebar={
        <Sidebar items={convertGraphqlToc(toc)} activePath="/documentation" />
      }
    >
      <Doc docPage={introduction} />
    </Layout>
  )
}

export default Documentation

export const query = graphql`
  {
    introduction: markdownRemark(
      frontmatter: { path: { eq: "/documentation/introduction" } }
    ) {
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
