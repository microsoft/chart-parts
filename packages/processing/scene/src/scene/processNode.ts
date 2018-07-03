import {
	SGMark,
	SGItem,
	SceneNode,
	MarkType,
	SGGroupItem,
	ItemSpace,
	AxisOrientation,
	Axis,
} from '@gog/interfaces'
import { SceneFrame } from './SceneFrame'
import { buildMarkItem } from './marks/buildMarkItem'
import { buildAxesMarks } from './axes/buildAxesMarks'
import { createMark, createItem } from '@gog/scenegraph'
import { AxisSpace } from '../interfaces'

export type SGMarkAny = SGMark<SGItem>

/**
 * Processes a scene specification node into the SceneGraph model
 * @param node The scene node to process
 * @param scaleFrame The scales available for the given scene node
 */
export function processNode(
	node: SceneNode,
	parentFrame: SceneFrame,
): SGMarkAny[] {
	// Push the new node, which registers channels and recomputes scales
	const frame = parentFrame.pushNode(node)

	// Build out the axes, which may or may not update the frame
	const { remainingSpace, axes } = buildAxes(node, frame)

	// Construct the items for the marks
	const markFrame = frame.pushView(remainingSpace.shape as any)
	const markItems = node.marks.map(mark => buildMarkItem(mark, markFrame))

	// Emit the result - if axes are present, wrap the marks in a group to put them in the correct space
	if (axes.length > 0) {
		return [...axes, createMarkGroup(markItems, remainingSpace)]
	} else {
		return markItems
	}
}
function buildAxes(
	node: SceneNode,
	frame: SceneFrame,
): {
	axes: SGMarkAny[]
	remainingSpace: ItemSpace
} {
	if (node.axes.length === 0) {
		return {
			axes: [],
			remainingSpace: { origin: { x: 0, y: 0 }, shape: frame.view },
		}
	}

	const axisSpace = getAxisSpace(frame)
	const axes = buildAxesMarks(frame, axisSpace)

	// Build the frame here so that the marks have updated scales
	const remainingSpace = getRemainingSpace(frame, axisSpace)
	return {
		axes,
		remainingSpace,
	}
}

function getRemainingSpace(frame: SceneFrame, axisSpace: AxisSpace): ItemSpace {
	const { width: availableWidth = 0, height: availableHeight = 0 } = frame.view
	// Build the frame here so that the marks have updated scales
	const remainingSpace: ItemSpace = {
		origin: {
			x: axisSpace.left,
			y: axisSpace.top,
		},
		shape: {
			width: availableWidth - axisSpace.left - axisSpace.right,
			height: availableHeight - axisSpace.top - axisSpace.bottom,
		},
	}
	return remainingSpace
}

/**
 * Gets the space consumed by the axes. Each key is an axis orientation, and the values are their respective thickness
 * @param frame
 */
function getAxisSpace(frame: SceneFrame) {
	const result = { top: 0, left: 0, bottom: 0, right: 0 }
	frame.node.axes.forEach(a => {
		const thickness = axisThickness(a)
		switch (a.orient) {
			case AxisOrientation.Top:
				result.top = Math.max(result.top, thickness)
			case AxisOrientation.Right:
				result.right = Math.max(result.right, thickness)
			case AxisOrientation.Bottom:
				result.bottom = Math.max(result.bottom, thickness)
			case AxisOrientation.Left:
				result.left = Math.max(result.left, thickness)
		}
	})
	return result
}

function axisThickness(axis: Axis) {
	return 20
}

function createMarkGroup(items: Array<SGMark<SGItem>>, space: ItemSpace) {
	return createMark(MarkType.Group, [
		createItem(MarkType.Group, {
			role: 'marks',
			...space.origin,
			...space.shape,
			items,
		}),
	]) as SGMark<SGGroupItem>
}
