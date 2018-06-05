import * as React from 'react'
import { VSvgNode, VSvgTransformType } from '@gog/vdom-interfaces'

function createElementFor(
	vdom: VSvgNode,
	key?: string,
): React.ReactElement<any> {
	const {
		type,
		children,
		attrs = {},
		style,
		transforms: vdomTransforms = [],
	} = vdom
	const element: Element = document.createElement(type)
	const reactAttrs: { [key: string]: any } = { key, style, ...attrs }

	const transforms = []
	vdomTransforms.forEach(t => {
		if (t.type === VSvgTransformType.rotate) {
			transforms.push(`rotate(${t.value})`)
		} else if (t.type === VSvgTransformType.translate) {
			transforms.push(`translate(${t.value[0]}, ${t.value[1]})`)
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
