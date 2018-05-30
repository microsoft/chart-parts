import { VirtualDomNode } from '@gog/marks'

function createElementFor(vdom: VirtualDomNode) {
	const { type, children, attrs } = vdom
	const element: Element = document.createElement(type)
	Object.keys(attrs).forEach(name => {
		element.setAttribute(name, `${attrs[name]}`)
	})
	const domChildren = (children || []).map(child => createElementFor(child))
	domChildren.forEach(child => element.appendChild(child))
	return element
}

/**
 * Renders a Virtual DOM out to an actual DOM
 */
export class DomStringRenderer {
	public render(vdom: VirtualDomNode) {
		createElementFor(vdom)
	}
}
