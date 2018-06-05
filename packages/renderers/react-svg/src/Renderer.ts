import * as React from 'react'
import { VSvgNode } from '@gog/vdom-interfaces'

function createElementFor(
	vdom: VSvgNode,
	key?: string,
): React.ReactElement<any> {
	const { type, children, attrs, style } = vdom
	const element: Element = document.createElement(type)

	const reactAttrs: { [key: string]: any } = { key, style }

	const transforms = []
	Object.keys(attrs).forEach(k => {
		if (k === 'origin') {
			const [x, y] = attrs[k]
			transforms.push(`translate(${x},${y})`)
		} else if (k === 'rotation') {
			const angle = attrs[k]
			transforms.push(`rotate(${angle})`)
		} else {
			reactAttrs[k] = attrs[k]
		}
	})

	if (transforms.length > 0) {
		reactAttrs.transform = transforms.join(' ')
	}

	return React.createElement(
		type,
		reactAttrs,
		(children || [])
			.filter(c => !!c)
			.map(
				(c, index) =>
					typeof c !== 'object' ? c : createElementFor(c, `${index}`),
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
