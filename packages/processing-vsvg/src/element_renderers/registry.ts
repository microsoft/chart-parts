/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { SGMark } from '@chart-parts/interfaces'
import { VSvgMarkConverter, VSvgRenderContext } from './interfaces'

const itemRendererRegistry = new Map<string, VSvgMarkConverter>()

export function registerRenderer(
	markType: string,
	markRenderer: VSvgMarkConverter,
) {
	itemRendererRegistry.set(markType, markRenderer)
}

export function renderMark(mark: SGMark<any>, context: VSvgRenderContext) {
	if (!mark.marktype) {
		throw new Error(`Unhandled mark type "${mark.marktype}"`)
	}
	const renderer = itemRendererRegistry.get(mark.marktype)
	return renderer ? renderer.render(mark, context) : { nodes: [] }
}
