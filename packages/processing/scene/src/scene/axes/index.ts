import { SceneNode, ItemSpace, AxisOrientation, Axis } from '@gog/interfaces'
import { SceneFrame } from '../SceneFrame'
import { buildAxis } from '../axes/buildAxis'
import { AxisSpace } from '../../interfaces'
import { SGMarkAny } from '../processNode'

export function buildAxes(
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
	const axes = node.axes.map(axis => buildAxis(axis, frame, axisSpace))

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
