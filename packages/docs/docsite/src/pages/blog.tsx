/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import { graphql } from 'gatsby'
import { BlogStructure } from '../templates/blogTemplate'

// Gatsby page handler for http://<domain>/blog
export default function Blog({
	data: {
		toc,
		post: {
			edges: {
				[0]: { node: post },
			},
		},
	},
	location: { pathname },
}: any) {
	return <BlogStructure toc={toc} post={post} pathname={pathname} />
}

export const query = graphql`
	{
		post: allMarkdownRemark(
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
