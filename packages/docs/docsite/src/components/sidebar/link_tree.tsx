/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { memo, useState, useMemo, useCallback, useEffect } from 'react'
import { TreeNode } from './interfaces'
import { Link as RawLink } from 'gatsby'
import styled from 'styled-components'
import theme from '../../util/theme'
import {
	FaAngleDown as ExpandedIconRaw,
	FaAngleRight as CollapsedIconRaw,
} from 'react-icons/fa'

export interface LinkTreeProps {
	node: TreeNode
	depth: number
	expanded?: boolean
	activePath: string
	flat?: boolean
}

const ToggleSize = 15

const LinkTree: React.FC<LinkTreeProps> = memo(
	({
		expanded: expandedProp,
		node,
		activePath: activePathRaw,
		depth,
		flat,
	}) => {
		const activePath = useMemo(
			() => activePathRaw.replace('/chart-parts', ''),
			[activePathRaw]
		)
		const [expanded, setExpanded] = useState<boolean>(!!expandedProp)
		useEffect(() => {
			if (activePath.indexOf(node.item.path) >= 0) {
				setExpanded(true)
			}
		}, [])

		const linkStyle = useMemo(() => {
			if (!node.item) {
				return {}
			}
			const marginLeft = flat ? 0 : 15 + depth * 15
			const fontSize = 14 - depth * 2
			const linkStyle: React.CSSProperties = {
				marginLeft,
				fontSize,
				color: '#3173BD',
			}

			if (activePath === node.item.path) {
				linkStyle.fontStyle = 'italic'
				linkStyle.fontWeight = '400' as any
			}
			return linkStyle
		}, [depth, activePath, node.item])

		const handleExpandCollapseClick = useCallback(() => {
			setExpanded(!expanded)
		}, [expanded])

		if (!node.item) {
			return null
		}
		const childKeys = Object.keys(node.children)
		return (
			<Container>
				<CurrentLevel>
					{flat ? null : (
						<LinkTreeIcon
							childKeys={childKeys}
							expanded={expanded}
							onExpandCollapseClick={handleExpandCollapseClick}
						/>
					)}
					<Link to={node.item.path} {...{ style: linkStyle }}>
						{node.item.title || node.pathKey}
					</Link>
				</CurrentLevel>
				<LinkTreeChildren
					childKeys={childKeys}
					expanded={expanded}
					node={node}
					depth={depth}
					activePath={activePath}
				/>
			</Container>
		)
	}
)
LinkTree.displayName = 'LinkTree'
export default LinkTree

interface LinkTreeIconProps {
	childKeys: string[]
	expanded: boolean
	onExpandCollapseClick: () => void
}
const LinkTreeIcon: React.FC<LinkTreeIconProps> = memo(
	({ childKeys, expanded, onExpandCollapseClick }) => {
		if (childKeys.length === 0) {
			return <IconSpacer />
		} else if (expanded) {
			return <ExpandedIcon onClick={onExpandCollapseClick} size={ToggleSize} />
		} else {
			return <CollapsedIcon onClick={onExpandCollapseClick} size={ToggleSize} />
		}
	}
)
LinkTreeIcon.displayName = 'LinkTreeIcon'

export interface LinkTreeChildrenProps {
	childKeys: string[]
	node: TreeNode
	depth: number
	activePath: string
	expanded: boolean
}
const LinkTreeChildren: React.FC<LinkTreeChildrenProps> = memo(
	({ childKeys, node, depth, activePath, expanded }) => {
		// Get the nodes for the children and sort them
		const childNodes = childKeys.map(ck => node.children[ck])
		childNodes.sort((a, b) => (a.item.order || 0) - (b.item.order || 0))

		return !expanded ? null : (
			<>
				{childNodes.map(c => (
					<LinkTree
						key={c.pathKey}
						node={c}
						depth={depth + 1}
						activePath={activePath}
					/>
				))}
			</>
		)
	}
)
LinkTreeChildren.displayName = 'LinkTreeChildren'

const Container = styled.div``

const IconSpacer = styled.span`
	width: 15px;
`

const CurrentLevel = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const ExpandedIcon = styled(ExpandedIconRaw)`
	color: #999;
	cursor: pointer;
	width: 15px;
`

const CollapsedIcon = styled(CollapsedIconRaw)`
	color: #999;
	cursor: pointer;
	width: 15px;
`

const Link = styled(RawLink)`
	font-family: ${theme.text.fontFamily};
	line-height: ${theme.text.lineHeight * 1.5};
	font-weight: 100;
	font-size: 16px;
	display: flex;
	flex-direction: column;
`
