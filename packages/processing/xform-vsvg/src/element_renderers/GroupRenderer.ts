// tslint:disable no-submodule-imports
import { Path } from 'd3-path'
import { MarkType } from '@gog/mark-interfaces'
import { SGMark, SGGroupItem } from '@gog/scenegraph-interfaces'
import { VSvgNode, VSvgTransformType } from '@gog/vdom-interfaces'
import flatMap from 'lodash/flatMap'
import { commonProps, assertTypeIs, emitMarkGroup } from './util'
import { renderMark } from './index'
import { rectangle } from '../path'
import {
	VSvgMarkConverter,
	VSvgMarkOutput,
	VSvgRenderContext,
	translate,
} from './interfaces'

/**
 * Renders a group's "rectangle", which can have a fill and stroke
 * @param item
 */
function renderGroupRectangle(item: SGGroupItem): VSvgNode {
	const { x = 0, y = 0 } = item
	const groupRect: VSvgNode = {
		type: 'path',
		attrs: {
			...commonProps(item),
			d: rectangle(item, x, y).toString(),
		},
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
	let nodes = []
	let defs = []

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

function renderGroup(item: SGGroupItem, children: VSvgNode[]): VSvgNode {
	const group: VSvgNode = {
		type: 'g',
		attrs: commonProps(item),
		transforms: [translate(item.x || 0, item.y || 0)],
		children,
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

		let defs = []
		const nodes = emitMarkGroup(
			MarkType.Group,
			mark.role,
			flatMap(mark.items, item => {
				// Render the Group's Rectangle
				const groupRect = renderGroupRectangle(item)

				// Render the Group's children
				const { defs: groupDefs, nodes: groupChildren } = renderChildren(
					item,
					context,
				)
				defs = [...defs, ...groupDefs]

				// Render the group
				let group = renderGroup(item, groupChildren)

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
			}),
		)
		return { nodes, defs }
	}
}
