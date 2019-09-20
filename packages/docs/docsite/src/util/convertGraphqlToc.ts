/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { SidebarItem } from '../components/sidebar'

export default function convertGraphqlToc(input: {
	edges: Array<{
		node: {
			frontmatter: {
				path: string
				title: string
				order: number
			}
		}
	}>
}): SidebarItem[] {
	return input.edges.map(e => {
		const pathItems = e.node.frontmatter.path
			.split('/')
			.filter(t => !!t)
			.slice(1)

		return {
			path: e.node.frontmatter.path,
			pathItems,
			title: e.node.frontmatter.title,
			area: pathItems[0],
			order: e.node.frontmatter.order,
		}
	})
}
