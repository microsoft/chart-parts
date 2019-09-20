/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

export interface SidebarItem {
	path: string
	title: string
	area: string
	order: number
}

export interface TreeNode {
	item: SidebarItem
	pathKey: string
	order?: number
	children: { [key: string]: TreeNode }
}
