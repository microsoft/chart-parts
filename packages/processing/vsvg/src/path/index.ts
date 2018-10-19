/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Path } from 'd3-path'
import {
	SGArcItem,
	SGAreaItem,
	SGLineItem,
	SGRectItem,
	SGSymbolItem,
	Interpolation,
	Orientation,
} from '@chart-parts/interfaces'
import {
	rectShape,
	arcShape,
	areavShape,
	areahShape,
	lineShape,
	symbolWithArea,
	symbolWithWidth,
} from '@chart-parts/shapes'
import curves from './curves'

export function arc(item: SGArcItem, context?: Path) {
	return arcShape.context(context as any)(item)
}

export function area(items: SGAreaItem[], context?: Path) {
	const first = items[0]
	const interp = first.interpolate || Interpolation.Linear
	const isHorizontal = first.orient === Orientation.Horizontal
	const variant = isHorizontal ? areahShape : areavShape
	return variant
		.curve(curves(interp, first.orient, first.tension))
		.context(context as any)(items)
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

export function symbol(item: SGSymbolItem, context?: Path) {
	if (item.width != null) {
		return symbolWithWidth.context(context as any)(item)
	} else {
		return symbolWithArea.context(context as any)(item)
	}
}
