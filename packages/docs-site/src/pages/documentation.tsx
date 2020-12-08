/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { graphql } from 'gatsby'
import DocTemplate from '../templates/docTemplate'

// Gatsby page handler for http://<domain>/documentation
export default DocTemplate

export const query = graphql`
	{
		currentPage: markdownRemark(
			frontmatter: { path: { eq: "/documentation/introduction" } }
		) {
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
