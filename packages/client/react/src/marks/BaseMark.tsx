/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { memo, useContext, useMemo } from 'react'
import { SceneNodeBuilderContext } from '../Context'
import {
	MarkType,
	MarkEncodings,
	MarkEncoding,
	ChannelHandler,
	Channels,
	Metadata,
} from '@chart-parts/interfaces'
import { mark, MarkBuilder, SceneNodeBuilder } from '@chart-parts/builder'
import { CommonMarkProps, captureCommonEncodings } from '../interfaces'

export function addMarkToScene(
	api: SceneNodeBuilder,
	mark: MarkBuilder,
): SceneNodeBuilder {
	return api.mark(mark)
}

export function createMarkInstance(
	markType: MarkType,
	props: CommonMarkProps,
	channels: Channels,
	encodings: MarkEncodings,
): MarkBuilder {
	const { table, name, role, metadata } = props
	let result = mark(markType)
		.handle(channels)
		.encode(encodings)

	if (table) {
		result = result.table(table as string)
	}

	if (name) {
		result = result.name(name as string)
	}

	if (role) {
		result = result.role(role as string)
	}

	if (metadata) {
		result.metadata(metadata as MarkEncoding<Metadata>)
	}

	return result
}

export function getChannels<T extends CommonMarkProps>(props: T) {
	const eventHandlers = (props.eventHandlers as Channels) || {}
	const channels: Channels = {
		...eventHandlers,
	}
	Object.keys(props).forEach(propKey => {
		if (propKey.startsWith('on')) {
			channels[propKey] = ((props as any)[propKey] as any) as ChannelHandler<
				any
			>
		}
	})
	return channels
}

export function getEncodings<T extends CommonMarkProps>(
	props: T,
	encodeCustomProperties: (props: T) => any,
): MarkEncodings {
	const encodingProps = {
		...captureCommonEncodings(props),
		...encodeCustomProperties(props),
	}
	return Object.entries(encodingProps).reduce(
		(prev, [name, propValue]) => {
			prev[name] = (typeof propValue === 'function'
				? propValue
				: ((() => propValue) as any)) as MarkEncoding<any>
			return prev
		},
		({} as any) as MarkEncodings,
	)
}

export function createMarkComponent<T extends CommonMarkProps>(
	markType: MarkType,
	encodeCustomProperties: (props: T) => any = () => ({}),
	generateMark = createMarkInstance,
	generateChannels = getChannels,
	generateEncodings = getEncodings,
	addMark = addMarkToScene,
): React.FC<T> {
	const result: React.FC<T> = memo(({ children, ...props }) => {
		const api = useContext(SceneNodeBuilderContext)
		const channels = generateChannels(props)
		const encodings = generateEncodings(props as T, encodeCustomProperties)
		const mark = useMemo(
			() => generateMark(markType, props, channels, encodings),
			[generateMark, markType, props, channels, encodings, api],
		)
		const node = useMemo(() => api && addMark(api, mark), [api])
		return (
			<SceneNodeBuilderContext.Provider value={node}>
				{children}
			</SceneNodeBuilderContext.Provider>
		)
	})
	return result
}
