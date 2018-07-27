import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import Post from '../components/post'
import convertGraphqlToc from '../util/convertGraphqlToc'

export default function Template(arg: any) {
  const { post, toc } = arg.data

  return (
    <Layout
      logoTo="/blog"
      sidebar={
        <Sidebar
          items={convertGraphqlToc(toc)}
          activePath={arg.location.pathname}
        />
      }
    >
      <Post post={post} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }

    toc: allMarkdownRemark(
      filter: { frontmatter: { path: { regex: "/^/blog/.*/" } } }
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
