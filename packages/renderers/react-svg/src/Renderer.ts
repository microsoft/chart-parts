import * as React from 'react'
import { VSvgNode } from '@gog/vdom-interfaces'

function createElementFor(
	vdom: VSvgNode,
	key?: string,
): React.ReactElement<any> {
	const { type, children, attrs, style } = vdom
	const element: Element = document.createElement(type)

	const reactAttrs: { [key: string]: any } = { key, style }
	Object.keys(attrs).forEach(k => {
		if (k === 'origin') {
			const [x, y] = attrs[k]
			reactAttrs.transform = `translate(${x},${y})`
		} else {
			reactAttrs[k] = attrs[k]
		}
	})

	return React.createElement(
		type,
		reactAttrs,
		(children || [])
			.filter(c => !!c)
			.map(
				(c, index) =>
					typeof c === 'string' ? c : createElementFor(c, `${index}`),
			),
	)
}

/**
 * Renders a Virtual DOM out to React-DOM's Virtual DOM
 */
export class Renderer {
	public render(vdom: VSvgNode): React.ReactElement<any> {
		return createElementFor(vdom)
	}
}
