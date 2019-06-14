/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	MarkType,
	SGMark,
	SGGroupItem,
	VSvgNode,
	getItemSpace,
	ItemSpace,
} from '@chart-parts/interfaces'
import { commonProps, assertTypeIs } from './util'
import { renderMark } from './index'
import { rectangle } from '../path'
import {
	VSvgMarkConverter,
	VSvgMarkOutput,
	VSvgRenderContext,
	translate,
} from './interfaces'

function flatMap<T, K>(items: T[], lambda: (input: T) => K[]): K[] {
	const mappedItems = items.map(lambda)
	return Array.prototype.concat.apply([], mappedItems)
}

/**
 * Renders a group's "rectangle", which can have a fill and stroke
 * @param item
 */
function renderGroupRectangle(item: SGGroupItem, space: ItemSpace): VSvgNode {
	const groupRectCommonProps = commonProps(item)
	const originX = space.origin.x || 0
	const originY = space.origin.y || 0

	const rectItem = item as any
	rectItem.width = space.shape.width
	rectItem.height = space.shape.height

	const groupRectShape = {
		d: rectangle(item, originX, originY).toString(),
	}

	const attrs = { ...groupRectCommonProps, ...groupRectShape }
	const { metadata, channels } = item
	const groupRect: VSvgNode = {
		type: 'path',
		attrs,
		metadata,
		channels,
		ariaTitle: item.ariaTitle,
		ariaDescription: item.ariaDescription,
	}
	return groupRect
}

/**
 * Renders children of the group
 * @param item The group item
 */
function renderChildren(
	item: SGGroupItem,
	context: VSvgRenderContext,
): VSvgMarkOutput {
	let nodes: VSvgNode[] = []
	let defs: VSvgNode[] = []

	const groupItems = item.items || []
	groupItems.forEach(m => {
		const renderedChild = renderMark(m, context)
		if (renderedChild.defs) {
			defs = [...defs, ...renderedChild.defs]
		}
		nodes = [...nodes, ...renderedChild.nodes]
	})

	return { defs, nodes }
}

function renderGroup(
	item: SGGroupItem,
	space: ItemSpace,
	children: VSvgNode[],
): VSvgNode {
	const { channels, metadata } = item
	const group: VSvgNode = {
		type: 'g',
		transforms: [translate(space.origin.x, space.origin.y)],
		children,
		metadata,
		channels,
	}
	return group
}

function renderGroupClip(clipId: string, group: VSvgNode, groupRect: VSvgNode) {
	const clipPath: VSvgNode = {
		type: 'clipPath',
		attrs: {
			id: clipId,
		},
		children: [groupRect],
	}

	group = {
		type: 'g',
		attrs: {
			clipPath: `url(#${clipId})`,
		},
		children: [group],
	}

	return { clipPath, group }
}

export class GroupRenderer implements VSvgMarkConverter {
	public static TARGET_MARK_TYPE = MarkType.Group

	public render(mark: SGMark<SGGroupItem>, context: VSvgRenderContext) {
		assertTypeIs(mark, GroupRenderer.TARGET_MARK_TYPE)

		const defs: VSvgNode[] = []
		const nodes = flatMap(mark.items, (item: SGGroupItem) => {
			const space = getItemSpace(item)

			// Render the Group's Rectangle
			const groupRect = renderGroupRectangle(item, space)

			// Render the Group's children
			const { defs: groupDefs, nodes: groupChildren } = renderChildren(
				item,
				context,
			)
			defs.push(...(groupDefs || []))
			// Render the group
			let group = renderGroup(item, space, groupChildren)

			// Handle if the group is clipped
			if (item.clip) {
				const { group: groupWrapper, clipPath } = renderGroupClip(
					`clip${context.nextId()}`,
					group,
					groupRect,
				)
				defs.push(clipPath)
				group = groupWrapper
			}

			return [groupRect, group]
		})

		return { nodes, defs }
	}
}
