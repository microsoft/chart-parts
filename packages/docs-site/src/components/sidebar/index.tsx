/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { FC } from 'react'
import styled from 'styled-components'
import { createTree } from './createTree'
import { SidebarItem, TreeNode } from './interfaces'
import LinkTree from './link_tree'

export { SidebarItem } from './interfaces'

export interface SidebarProps {
	items: SidebarItem[]
	activePath: string
	flat?: boolean
}

const Sidebar: FC<SidebarProps> = ({ items, activePath, flat }) => {
	const tree: TreeNode[] = createTree(items)
	return (
		<Container>
			{tree
				.map((subtree) => {
					return !subtree.item ? null : (
						<LinkTree
							key={subtree.pathKey}
							node={subtree}
							flat={flat}
							depth={0}
							activePath={activePath}
						/>
					)
				})
				.filter((t) => !!t)}
		</Container>
	)
}

const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	height: 100%;
`

export default Sidebar
