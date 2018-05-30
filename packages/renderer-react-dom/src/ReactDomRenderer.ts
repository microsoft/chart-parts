import * as React from 'react'
import { VirtualDomNode } from '@gog/marks'

function createElementFor(vdom: VirtualDomNode): React.ReactElement<any> {
	const { type, children, attrs } = vdom
	const element: Element = document.createElement(type)
	return React.createElement(
		type,
		attrs,
		(children || []).map(c => createElementFor(c)),
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
