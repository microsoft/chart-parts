/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { graphql } from 'gatsby'
import Post from '../components/post'
import Sidebar from '../components/sidebar'
import Layout from '../components/layout'
import convertGraphqlToc from '../util/convertGraphqlToc'

const Blog = ({ data: { toc, latestPost } }: any) => {
	return (
		<Layout
			logoTo="/documentation"
			title={latestPost.edges[0].node.frontmatter.title}
			sidebar={
				<Sidebar items={convertGraphqlToc(toc)} activePath="/documentation" />
			}
		>
			<Post post={latestPost.edges[0].node} />
		</Layout>
	)
}

export default Blog

export const query = graphql`
	{
		latestPost: allMarkdownRemark(
			sort: { order: DESC, fields: frontmatter___date }
			filter: { frontmatter: { path: { regex: "/^/blog/.*/" } } }
			limit: 1
		) {
			edges {
				node {
					html
					htmlAst
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						path
					}
				}
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
