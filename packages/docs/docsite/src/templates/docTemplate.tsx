/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { memo } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import convertGraphqlToc from '../util/convertGraphqlToc'
import Doc from '../components/doc'

require('prismjs/themes/prism-tomorrow.css')

export interface DocStructureProps {
	toc: any
	pathname: string
	page: any
}
export const DocStructure: React.FC<DocStructureProps> = memo(
	({ toc, pathname, page }) => {
		return (
			<Layout
				title={page.frontmatter.title}
				sidebar={
					<Sidebar
						items={convertGraphqlToc(toc)}
						activePath={pathname}
						flat={false}
					/>
				}
			>
				<Doc docPage={page} />
			</Layout>
		)
	}
)
DocStructure.displayName = 'DocStructure'

export default function Template({
	data: { toc, currentPage },
	location: { pathname },
}: any) {
	return <DocStructure toc={toc} page={currentPage} pathname={pathname} />
}

export const pageQuery = graphql`
	query($path: String!) {
		currentPage: markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			htmlAst
			tableOfContents(maxDepth: 2, pathToSlugField: "frontmatter.path")
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
