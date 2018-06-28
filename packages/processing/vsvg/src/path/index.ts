import { Path } from 'd3-path'
import {
	SGArcItem,
	SGAreaItem,
	SGLineItem,
	SGRectItem,
	SGTrailItem,
	SGSymbolItem,
} from '@gog/interfaces'
import { Interpolation, Orientation } from '@gog/interfaces'
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

export function arc(item: SGArcItem, context?: Path) {
	return arcShape.context(context as any)(item as any)
}

export function area(items: SGAreaItem[], context?: Path) {
	const first = items[0]
	const interp = first.interpolate || Interpolation.LINEAR

	return (first.orient === Orientation.HORIZONTAL ? areahShape : areavShape)
		.curve(curves(interp, first.orient, first.tension))
		.context(context as any)(items as any) // TODO: is this correct?
}

export function line(items: SGLineItem[], context?: Path) {
	const item = items[0]
	const interp = item.interpolate || 'linear'
	return lineShape
		.curve(curves(interp, undefined, item.tension))
		.context(context as any)(items as any)
}

export function rectangle(
	item: SGRectItem,
	xOffset?: number,
	yOffset?: number,
	context?: Path,
) {
	return rectShape.build(item, xOffset, yOffset, context)
}

export function trail(items: SGTrailItem[], context?: Path) {
	return trailShape.build(items, context)
}

export function symbol(item: SGSymbolItem, context?: Path) {
	return symbolShape.context(context as any)(item)
}

/*
TODO: Handle Custom shape marks
export function shape(item: ShapeItem, context: Path) {
	return (item.mark.shape || item.shape).context(context)(item)
}
*/

/*
*/
