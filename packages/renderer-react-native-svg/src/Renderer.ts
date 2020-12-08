/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import elementMap from './elementMap'
import {
	VSvgNode,
	VSvgTransformType,
	Channels,
	Metadata,
} from '@chart-parts/interfaces'

function createElementFor(
	vdom: VSvgNode,
	key: string,
	handlers: Channels,
): React.ReactElement<any> | null {
	const {
		type,
		children,
		attrs,
		style,
		transforms = [],
		channels = {},
		metadata = { index: -1 },
	} = vdom
	const reactSvgType = elementMap.get(type)
	if (!reactSvgType) {
		return null
	}

	let translateX = 0
	let translateY = 0
	let rotate = 0
	transforms.forEach(t => {
		const { type: transformType, value } = t
		if (transformType === VSvgTransformType.translate) {
			translateX += value[0]
			translateY += value[1]
		} else if (transformType === VSvgTransformType.rotate) {
			rotate += value
		}
	})

	const reactAttrs = {
		...attrs,
		key,
		style,
		x: translateX,
		y: translateY,
		rotate,
	}

	// Map the handlers into the vdom
	Object.keys(channels).forEach(eventName => {
		const eventId = channels[eventName]
		const reactEventName = eventName
		const handler = handlers[eventId]
		reactAttrs[reactEventName] = (event: any) =>
			handler({ ...(metadata as Metadata), event })
	})

	const result = React.createElement(
		reactSvgType,
		reactAttrs,
		(children || [])
			.map((c, index) =>
				typeof c !== 'object'
					? c
					: createElementFor(c, `${key}::${index}`, handlers),
			)
			.filter(t => !!t),
	)
	return result
}

/**
 * Renders a Virtual DOM out to React-DOM's Virtual DOM
 */
export class Renderer {
	public render(
		vdom: VSvgNode,
		handlers: Channels,
	): React.ReactElement<any> | null {
		return createElementFor(vdom, 'root', handlers)
	}
}
