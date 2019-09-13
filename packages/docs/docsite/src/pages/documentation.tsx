/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import Doc from '../components/doc'
import convertGraphqlToc from '../util/convertGraphqlToc'

const Documentation = ({ data: { toc, currentPage } }: any) => {
	return (
		<Layout
			title={currentPage.frontmatter.title}
			sidebar={
				<Sidebar items={convertGraphqlToc(toc)} activePath="/documentation" />
			}
		>
			<Doc docPage={currentPage} />
		</Layout>
	)
}

export default Documentation

export const query = graphql`
	{
		currentPage: markdownRemark(
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
