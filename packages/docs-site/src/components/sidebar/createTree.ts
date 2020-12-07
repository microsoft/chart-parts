/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { SidebarItem, TreeNode } from './interfaces'

/**
 * Creates a nested tree of sidebar items given a flat array of items
 * @param items The sidebar items to create the tree from
 */
export function createTree(items: SidebarItem[]) {
	const tree: { [key: string]: TreeNode } = {}

	// Insert each item into the tree
	items.forEach(i => insertItemIntoTree(i, tree))
	Object.keys(tree).forEach(key => {
		const subtree = tree[key]
		pruneTree(subtree)
	})

	return Object.keys(tree)
		.map(k => tree[k])
		.filter(t => !!t)
		.sort((a, b) => (a as any).item.order - (b as any).item.order)
}

function pruneTree(tree: TreeNode): TreeNode {
	if (isLeaf(tree)) {
		return tree
	}
	const children = childrenOf(tree).map(c => pruneTree(c))

	const newChildren: TreeNode[] = []
	children.forEach(child => {
		if (child.item === undefined) {
			newChildren.push(...childrenOf(child))
		} else {
			newChildren.push(child)
		}
	})

	tree.children = childHash(newChildren)
	return tree
}

function childHash(children: TreeNode[]) {
	const result: { [key: string]: TreeNode } = {}
	children.forEach(child => (result[child.pathKey] = child))
	return result
}

function childrenOf(tree: TreeNode) {
	return Object.keys(tree.children).map(k => tree.children[k])
}

function isLeaf(tree: TreeNode) {
	return childrenOf(tree).length === 0
}

function insertItemIntoTree(
	item: SidebarItem,
	tree: { [key: string]: TreeNode }
) {
	// Split the path up into "items" which will be used to create the three
	const pathItems = item.path
		.split('/')
		.filter(t => !!t)
		.slice(1)

	const rootItem = pathItems[0]
	let rootTree = tree[rootItem]
	if (!rootTree) {
		rootTree = tree[rootItem] = {
			item: undefined as any,
			pathKey: rootItem,
			children: {},
		}
	}

	if (pathItems.length === 1) {
		rootTree.item = item
	} else {
		insertPathItemIntoTree(item, pathItems, rootTree)
	}
}

function insertPathItemIntoTree(
	item: SidebarItem,
	pathItems: string[],
	tree: TreeNode
) {
	// skip the first item since it's been added to the root hash already
	let current = tree
	pathItems.splice(1).forEach(pi => {
		if (!current.children[pi]) {
			current.children[pi] = {
				item: undefined as any,
				pathKey: pi,
				children: {},
			}
		}
		current = current.children[pi]
	})
	current.item = item
}
