import * as React from 'react'
import { VirtualDomNode } from '@gog/vdom-interfaces'
import { camelCase } from 'lodash'

function createElementFor(
	vdom: VirtualDomNode,
	key?: string,
): React.ReactElement<any> {
	const { type, children, attrs } = vdom
	const element: Element = document.createElement(type)
	const reactAttrs = { key }

	// TODO: set viewbox prop based on "0 0 width height"
	// TODO: set transform prop based on "origin"

	Object.keys(attrs).forEach((attrKey: string) => {
		reactAttrs[camelCase(attrKey)] = attrs[attrKey]
	})

	return React.createElement(
		type,
		reactAttrs,
		(children || []).map((c, index) => createElementFor(c, `${index}`)),
	)
}

/**
 * Renders a Virtual DOM out to React-DOM's Virtual DOM
 */
export class Renderer {
	public render(vdom: VirtualDomNode): React.ReactElement<any> {
		return createElementFor(vdom)
	}
}
