import * as React from 'react'
import { VirtualDomNode } from '@gog/marks'
import { camelCase } from 'lodash'

function createElementFor(
	vdom: VirtualDomNode,
	key?: string,
): React.ReactElement<any> {
	const { type, children, attrs } = vdom
	const element: Element = document.createElement(type)
	const reactAttrs = { key }
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
export class ReactDomRenderer {
	public render(vdom: VirtualDomNode): React.ReactElement<any> {
		return createElementFor(vdom)
	}
}
