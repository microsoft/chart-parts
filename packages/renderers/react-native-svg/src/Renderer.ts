import * as React from 'react'
import elementMap from './elementMap'
import { VSvgNode } from '@gog/vdom-interfaces'
import { camelCase } from 'lodash'

function createElementFor(
	vdom: VSvgNode,
	key?: string,
): React.ReactElement<any> | null {
	const { type, children, attrs, style } = vdom
	const element: Element = React.createElement(type)
	const reactSvgType = elementMap.get(type)
	if (!reactSvgType) {
		return null
	}

	return React.createElement(
		reactSvgType,
		{ ...attrs, key, style },
		(children || [])
			.map((c, index) => createElementFor(c, `${index}`))
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
