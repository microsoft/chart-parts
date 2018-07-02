import {
	Axis,
	MarkType,
	SGMark,
	SGItem,
	AxisOrientation,
	ItemSpace,
} from '@gog/interfaces'
import { createMark, createItem } from '@gog/scenegraph'
import { SceneFrame } from '../SceneFrame'
import { determineRemainingSpace } from './determineRemainingSpace'
export function buildAxisItems(frame: SceneFrame) {
	const {
		node: { axes },
	} = frame
	const builtAxes = axes.map(axis => processAxis(axis, frame))
	return {
		items: builtAxes.map(ba => ba.mark),
		remaining: determineRemainingSpace(frame.view.shape as any, builtAxes),
	}
}

function processAxis(
	axis: Axis,
	frame: SceneFrame,
): { mark: SGMark<SGItem>; thickness: number; orient: AxisOrientation } {
	const { orient } = axis
	const {
		view: {
			shape: { height: viewHeight = 0, width: viewWidth = 0 },
		},
	} = frame
	const children: Array<SGMark<SGItem>> = []
	const scaleName = axis.scale
	const scale = frame.scales[scaleName]
	const range = (scale.range && scale.range()) || [0, 0]

	const isHorizontal =
		orient === AxisOrientation.Top || orient === AxisOrientation.Bottom
	const rangeStart = isHorizontal ? 'x' : 'y'
	const rangeEnd = isHorizontal ? 'x2' : 'y2'
	const cross = isHorizontal ? 'y' : 'x'

	if (axis.domain) {
		children.push(
			createMark(MarkType.Rule, [
				createItem(MarkType.Rule, {
					stroke: axis.domainColor,
					strokeWidth: axis.domainWidth,
					[rangeStart]: range[0],
					[rangeEnd]: range[1],
					[cross]: 5,
				}),
			]),
		)
	}

	const thickness = 8
	const space: ItemSpace = {
		origin: {
			x: orient === AxisOrientation.Right ? viewWidth - thickness : 0,
			y: orient === AxisOrientation.Bottom ? viewHeight - thickness : 0,
		},
		shape: {
			width: isHorizontal ? viewWidth : thickness,
			height: isHorizontal ? thickness : viewHeight,
		},
	}

	const mark = createMark(MarkType.Group, [
		createItem(MarkType.Group, {
			items: children,
			...space.origin,
			...space.shape,
		}),
	])

	return { mark, thickness, orient }
}
