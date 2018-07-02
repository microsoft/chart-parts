import {
	SGMark,
	SGItem,
	SceneNode,
	// MarkType,
	// SGGroupItem,
	// ItemSpace,
} from '@gog/interfaces'
import { SceneFrame } from './SceneFrame'
import { buildMarkItem } from './marks/buildMarkItem'
// import { buildAxisItems } from './axes/buildAxisItems'
// import { createMark, createItem } from '@gog/scenegraph'

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
	// const axisResult = buildAxes(node, frame)
	// frame = axisResult.frame

	// Construct the items for the marks
	return node.marks.map(mark => buildMarkItem(mark, frame))

	// Emit the result - if axes are present, wrap the marks in a group to put them in the correct space
	// if (node.axes.length > 0 && axisResult.remaining) {
	// 	return [
	// 		...axisResult.axes,
	// 		createMarkGroup(markItems, axisResult.remaining),
	// 	]
	// } else {
	// 	return markItems
	// }
	// }

	// function buildAxes(node: SceneNode, frame: SceneFrame): {
	// 	remaining:
	// 	frame: SceneFrame
	// } {
	// 	//	if (node.axes.length === 0) {
	// 	return {
	// 		axes: [],
	// 		remaining: undefined,
	// 		frame,
	// 	}
	// 	//	}

	// 	/*
	// 	// Build the frame here so that the marks have updated scales
	// 	const remaining: ItemSpace = viewSpaceMinusAxisSpace(node, frame)
	// 	const viewFrame = frame.pushView(remaining.shape as {
	// 		width: number
	// 		height: number
	// 	})

	// 	const { items: axes, remaining: freeSpace } = buildAxisItems(frame, viewFrame)
	// 	remaining = freeSpace
	// 	axes.push(...items)

	// 	return { axes, remaining, frame: viewFrame }
	// 	*/
	// }

	// function createMarkGroup(items: Array<SGMark<SGItem>>, space: ItemSpace) {
	// 	return createMark(MarkType.Group, [
	// 		createItem(MarkType.Group, {
	// 			role: 'marks',
	// 			...space.origin,
	// 			...space.shape,
	// 			items,
	// 		}),
	// 	]) as SGMark<SGGroupItem>
	// }
}
