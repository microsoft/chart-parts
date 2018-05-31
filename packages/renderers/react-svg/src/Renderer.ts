import * as React from 'react'
import { VSvgNode } from '@gog/vdom-interfaces'

function createElementFor(
	vdom: VSvgNode,
	key?: string,
): React.ReactElement<any> {
	const { type, children, attrs, style } = vdom
	const element: Element = document.createElement(type)
	const reactAttrs: { [key: string]: any } = { key }

	return React.createElement(
		type,
		{ ...attrs, key, style },
		(children || []).map((c, index) => createElementFor(c, `${index}`)),
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
