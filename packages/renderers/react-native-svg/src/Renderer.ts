import * as React from 'react'
import vdomMap from './vdomMap'
import { VirtualDomNode } from '@gog/vdom-interfaces'
import { camelCase } from 'lodash'
import processAttribute from './processAttribute'

function createElementFor(
	vdom: VirtualDomNode,
	key?: string,
): React.ReactElement<any> | null {
	const { type, children, attrs } = vdom
	const element: Element = React.createElement(type)
	const reactSvgType = vdomMap.get(type)
	if (!reactSvgType) {
		return null
	}
	const reactAttrs = { key }
	Object.keys(attrs).forEach((attrKey: string) => {
		reactAttrs[camelCase(attrKey)] = processAttribute(attrKey, attrs[attrKey])
	})

	console.log('vdom ', type, !!element, reactAttrs)
	return React.createElement(
		reactSvgType,
		attrs,
		(children || [])
			.map((c, index) => createElementFor(c, `${index}`))
			.filter(t => !!t),
	)
}

/**
 * Renders a Virtual DOM out to React-DOM's Virtual DOM
 */
export class Renderer {
	public render(vdom: VirtualDomNode): React.ReactElement<any> | null {
		return createElementFor(vdom, 'root')
	}
}
