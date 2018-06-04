import { VSvgNode } from '@gog/vdom-interfaces'

function createElementFor(vdom: VSvgNode) {
	const { type, children, attrs } = vdom
	const element: Element = document.createElement(type)
	Object.keys(attrs).forEach(name => {
		element.setAttribute(name, `${attrs[name]}`)
	})

	const domChildren = children || []
	domChildren.forEach(c => (typeof c === 'string' ? c : createElementFor(c)))
	return element
}

/**
 * Renders a Virtual DOM out to an actual DOM
 */
export class Renderer {
	public render(vdom: VSvgNode) {
		createElementFor(vdom)
	}
}
