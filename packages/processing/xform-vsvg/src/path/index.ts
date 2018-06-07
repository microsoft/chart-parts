import { Path } from 'd3-path'

import {
	SGArcItem,
	SGAreaItem,
	SGLineItem,
	SGRectItem,
	SGTrailItem,
} from '@gog/scenegraph-interfaces'
import { Interpolation, Orientation } from '@gog/mark-interfaces'
import { SGSymbolItem } from '@gog/scenegraph-interfaces'
import {
	rectShape,
	trailShape,
	arcShape,
	areavShape,
	areahShape,
	lineShape,
	symbolShape,
} from '@gog/shapes'
import curves from './curves'

export function arc(item: SGArcItem, context: CanvasRenderingContext2D) {
	return arcShape.context(context)(item as any)
}

export function area(items: SGAreaItem[], context: CanvasRenderingContext2D) {
	const first = items[0]
	const interp = first.interpolate || Interpolation.LINEAR

	return (first.orient === Orientation.HORIZONTAL ? areahShape : areavShape)
		.curve(curves(interp, first.orient, first.tension))
		.context(context)(items as any) // TODO: is this correct?
}

export function line(items: SGLineItem[], context?: CanvasRenderingContext2D) {
	const item = items[0]
	const interp = item.interpolate || 'linear'
	return lineShape
		.curve(curves(interp, undefined, item.tension))
		.context(context)(items as any)
}

export function rectangle(
	item: SGRectItem,
	xOffset?: number,
	yOffset?: number,
	context?: CanvasRenderingContext2D,
) {
	return rectShape.build(item, xOffset, yOffset, context)
}

export function trail(
	items: SGTrailItem[],
	context?: CanvasRenderingContext2D,
) {
	return trailShape.build(items, context)
}

export function symbol(item: SGSymbolItem, context: any) {
	return symbolShape.context(context)(item)
}

/*
TODO: Handle Custom shape marks
export function shape(item: ShapeItem, context: CanvasRenderingContext2D) {
	return (item.mark.shape || item.shape).context(context)(item)
}
*/

/*
*/
