/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { graphql } from 'gatsby'
import { memo, FC } from 'react'
import Layout from '../components/layout'
import Post from '../components/post'
import Sidebar from '../components/sidebar'
import convertGraphqlToc from '../util/convertGraphqlToc'

export interface BlogStructureProps {
	toc: any
	pathname: string
	post: any
}
export const BlogStructure: FC<BlogStructureProps> = memo(
	function BlogStructure({ toc, pathname, post }) {
		return (
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
	}
)

export default function Template({
	data: { post, toc },
	location: { pathname },
}: any) {
	return <BlogStructure post={post} toc={toc} pathname={pathname} />
}

export const pageQuery = graphql`
	query ($path: String!) {
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
