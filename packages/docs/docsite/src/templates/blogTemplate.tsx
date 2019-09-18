/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import Post from '../components/post'
import convertGraphqlToc from '../util/convertGraphqlToc'

export default function Template(arg: any) {
	const { post, toc } = arg.data
	console.log('POST', post, toc)
	return (
		<Layout
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
			htmlAst
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
