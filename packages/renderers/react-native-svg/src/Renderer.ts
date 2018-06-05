import * as React from 'react'
import elementMap from './elementMap'
import { VSvgNode, VSvgTransformType } from '@gog/vdom-interfaces'

function createElementFor(
	vdom: VSvgNode,
	key?: string,
): React.ReactElement<any> | null {
	const { type, children, attrs, style, transforms = [] } = vdom
	const element: Element = React.createElement(type)
	const reactSvgType = elementMap.get(type)
	if (!reactSvgType) {
		console.log('DROPPING', vdom)
		return null
	}

	let translateX = 0
	let translateY = 0
	let rotate = 0
	transforms.forEach(t => {
		const { type: transformType, value } = t
		if (transformType === VSvgTransformType.translate) {
			translateX += value[0]
			translateY += value[1]
		} else if (transformType === VSvgTransformType.rotate) {
			rotate += value
		}
	})

	const reactAttrs = {
		...attrs,
		key,
		style,
		x: translateX,
		y: translateY,
		rotate,
	}

	return React.createElement(
		reactSvgType,
		reactAttrs,
		(children || [])
			.map(
				(c, index) =>
					typeof c !== 'object' ? c : createElementFor(c, `${index}`),
			)
			.filter(t => !!t),
	)
}

/**
 * Renders a Virtual DOM out to React-DOM's Virtual DOM
 */
export class Renderer {
	public render(vdom: VSvgNode): React.ReactElement<any> | null {
		return createElementFor(vdom, 'root')
	}
}
