/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	Facet,
	Channels,
	MarkEncodings,
} from '@chart-parts/interfaces'
import { SceneNodeBuilder, MarkBuilder } from '@chart-parts/builder'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { createMarkComponent, createMarkInstance } from './BaseMark'

export interface GroupProps extends CommonMarkProps {
	clip?: MarkEncodingProp<boolean>
	cornerRadius?: MarkEncodingProp<number>
	facet?: Facet
}

function addMark(api: SceneNodeBuilder, mark: MarkBuilder) {
	let node: SceneNodeBuilder | undefined
	api.mark(mark.child(n => (node = n)))
	return node!
}

function createMark(
	markType: MarkType,
	props: GroupProps,
	channels: Channels,
	encodings: MarkEncodings,
) {
	const mark = createMarkInstance(markType, props, channels, encodings)
	const { facet } = props
	return facet ? mark.facet(facet) : mark
}

export const Group = createMarkComponent<GroupProps>(
	MarkType.Group,
	({ clip, cornerRadius }) => ({ clip, cornerRadius }),
	createMark,
	addMark,
)
