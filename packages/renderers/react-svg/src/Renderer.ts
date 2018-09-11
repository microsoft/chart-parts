import * as React from 'react'
import {
	VSvgNode,
	VSvgTransformType,
	VSvgTransform,
	ChannelHandler,
	HandlerMetadata,
} from '@markable/interfaces'

function createElementFor(
	vdom: VSvgNode,
	key: string,
	handlers: { [key: string]: ChannelHandler },
): React.ReactElement<any> {
	const {
		type,
		children,
		attrs = {},
		style,
		transforms: vdomTransforms = [],
		channels = {},
		metadata = { index: -1 },
	} = vdom
	const reactAttrs: { [key: string]: any } = {
		key,
		style,
		transform: getTransformAttribute(vdomTransforms),
		...attrs,
	}

	// Map the handlers into the vdom
	Object.keys(channels).forEach(eventName => {
		const eventId = channels[eventName]
		const reactEventName = eventName
		const handler = handlers[eventId]
		reactAttrs[reactEventName] = (eventArg: any) =>
			handler(eventArg, metadata as HandlerMetadata)
	})

	return React.createElement(
		type,
		reactAttrs,
		(children || [])
			.filter(c => !!c)
			.map(
				(c, index) =>
					typeof c !== 'object'
						? c
						: createElementFor(c, `${key}::${index}`, handlers),
			),
	)
}

function getTransformAttribute(vdomTransforms: Array<VSvgTransform<any>>) {
	const transforms: string[] = []
	vdomTransforms.forEach(t => {
		if (t.type === VSvgTransformType.rotate) {
			transforms.push(`rotate(${t.value})`)
		} else if (t.type === VSvgTransformType.translate) {
			transforms.push(`translate(${t.value[0]}, ${t.value[1]})`)
		}
	})
	return transforms.length > 0 ? transforms.join(' ') : undefined
}
/**
 * Renders a Virtual DOM out to React-DOM's Virtual DOM
 */
export class Renderer {
	public render(
		vdom: VSvgNode,
		handlers: { [key: string]: (arg: any) => void },
	): React.ReactElement<any> {
		return createElementFor(vdom, 'root', handlers)
	}
}
