/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import {
	VSvgNode,
	VSvgTransformType,
	VSvgTransform,
	Channels,
	Metadata,
} from '@chart-parts/interfaces'

function createElementFor(
	vdom: VSvgNode,
	key: string,
	handlers: Channels,
): React.ReactElement<any> {
	const {
		type,
		children,
		attrs = {},
		style,
		transforms: vdomTransforms = [],
		channels = {},
		metadata = { index: -1, id: 'unknown' },
		ariaDescription,
		ariaTitle,
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
		reactAttrs[reactEventName] = (event: any) =>
			handler({ ...(metadata as Metadata), event })
	})

	const childrenElements = (children || [])
		.filter(c => !!c)
		.map((c, index) =>
			typeof c !== 'object'
				? c
				: createElementFor(c, `${key}::${index}`, handlers),
		)

	const labelledBy: string[] = []
	if (ariaTitle) {
		const titleId = `${metadata.id}__title`
		childrenElements.push(
			<title key="t" id={titleId}>
				{ariaTitle}
			</title>,
		)
		labelledBy.push(titleId)
	}
	if (ariaDescription) {
		const descId = `${metadata.id}__desc`
		childrenElements.push(
			<desc key="d" id={descId}>
				{ariaDescription}
			</desc>,
		)
		labelledBy.push(descId)
	}
	if (labelledBy.length > 0) {
		reactAttrs['aria-labelledby'] = labelledBy.join(' ')
	}

	const visualElement = React.createElement(type, reactAttrs, childrenElements)
	return visualElement
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
	public render(vdom: VSvgNode, handlers: Channels): React.ReactElement<any> {
		return createElementFor(vdom, 'root', handlers)
	}
}
