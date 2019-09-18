/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { memo } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import Post from '../components/post'
import convertGraphqlToc from '../util/convertGraphqlToc'

export interface BlogStructureProps {
	toc: any
	pathname: string
	post: any
}
export const BlogStructure: React.FC<BlogStructureProps> = memo(
	({ toc, pathname, post }) => (
		<Layout
			title={post.title}
			sidebar={
				<Sidebar
					items={convertGraphqlToc(toc)}
					activePath={pathname}
					flat={true}
				/>
			}
		>
			<Post post={post} />
		</Layout>
	)
)
BlogStructure.displayName = 'BlogStructure'

export default function Template({
	data: { post, toc },
	location: { pathname },
}: any) {
	return <BlogStructure post={post} toc={toc} pathname={pathname} />
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
