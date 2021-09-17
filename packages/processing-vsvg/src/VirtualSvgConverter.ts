/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	SGMark,
	ScenegraphConverter,
	ChartOptions,
	VSvgNode,
	DEFAULT_HEIGHT,
	DEFAULT_WIDTH,
} from '@chart-parts/interfaces'
import { renderMark } from './element_renderers'
import { translate } from './element_renderers/interfaces'

const DEFAULT_BG_COLOR = 'transparent'
const DEFAULT_ORIGIN: [number, number] = [0, 0]

/**
 * The VirtualSvgRender renders Scenegraph data into a serializable Virtual DOM.
 *
 * The Virtual Dom acts as an intermediate form that can be rendered out into many forms.
 */
export class VirtualSvgConverter implements ScenegraphConverter<VSvgNode> {
	public render(mark: SGMark<any>, options: ChartOptions): VSvgNode {
		const {
			width = DEFAULT_WIDTH,
			height = DEFAULT_HEIGHT,
			backgroundColor = DEFAULT_BG_COLOR,
			origin = DEFAULT_ORIGIN,
			ariaTitle,
			ariaDescription,
		} = options
		const [x = 0, y = 0] = origin

		// Create the rendering Context
		let id = 0
		const context = {
			nextId: () => `${++id}`,
		}

		// Get the rendering of the root mark
		const root = renderMark(mark, context)
		const children: VSvgNode[] = [
			{
				type: 'defs',
				children: root.defs,
			},
			{
				type: 'g',
				transforms: [translate(x, y)],
				children: root.nodes,
			},
		]

		// Wrap the rendered root in an SVG
		const svg: VSvgNode = {
			type: 'svg',
			attrs: {
				width: width + x,
				height: height + y,
				/**
				 * This allows screen-readers to pass over the svg
				 * https://css-tricks.com/accessible-svgs/
				 */
				role: 'img',
			},
			ariaTitle,
			ariaDescription,
			metadata: {
				id: 'root',
			},
			style: {
				backgroundColor,
			},
			children,
		}
		return svg
	}
}
