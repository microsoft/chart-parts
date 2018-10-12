/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	AxisOrientation,
	EncodingContext,
	ChartOptions,
} from '@chart-parts/interfaces'
import { MarkBuilder } from './MarkBuilder'
import { SceneNodeBuilder } from './SceneNodeBuilder'
import { AxisBuilder } from './AxisBuilder'
import { ChartOptionsManager } from './ChartOptionsManager'

export * from './MarkBuilder'
export * from './SceneNodeBuilder'
export * from './ChartOptionsManager'

/**
 * A factory function for creating a new scene
 */
export function scene(
	cb: (child: SceneNodeBuilder) => SceneNodeBuilder,
	opts: ChartOptions,
): SceneNodeBuilder {
	const optsManager = new ChartOptionsManager(opts)
	return new SceneNodeBuilder().mark(
		group('root')
			.role('frame')
			.singleton(true)
			.zIndex(0)
			.encode({
				x: () => optsManager.paddingLeft,
				y: () => optsManager.paddingTop,
				width: (arg: EncodingContext) =>
					optsManager.chartSpace.shape.width as number,
				height: (arg: EncodingContext) =>
					optsManager.chartSpace.shape.height as number,
			})
			.child(cb),
	)
}

/**
 * A factory function for creating a new mark
 * @param type The mark type to create
 */
export function mark(type: MarkType) {
	return new MarkBuilder(type)
}

//
// Utility functions for creating typed marks
//

/**
 * Initiates construction of a new _arc_ typed mark
 * @param name
 */
export function arc(name?: string) {
	return markWithName(MarkType.Arc, name)
}
export function area(name?: string) {
	return markWithName(MarkType.Area, name)
}
export function group(name?: string) {
	return markWithName(MarkType.Group, name)
}
export function image(name?: string) {
	return markWithName(MarkType.Image, name)
}
export function line(name?: string) {
	return markWithName(MarkType.Line, name)
}
export function path(name?: string) {
	return markWithName(MarkType.Path, name)
}
export function rect(name?: string) {
	return markWithName(MarkType.Rect, name)
}
export function rule(name?: string) {
	return markWithName(MarkType.Rule, name)
}
export function shape(name?: string) {
	return markWithName(MarkType.Shape, name)
}
export function symbol(name?: string) {
	return markWithName(MarkType.Symbol, name)
}
export function text(name?: string) {
	return markWithName(MarkType.Text, name)
}
export function trail(name?: string) {
	return markWithName(MarkType.Trail, name)
}

function markWithName(markType: MarkType, name?: string) {
	const result = mark(markType)
	return name ? result.name(name) : result
}

/**
 * Creates a new Axis builder
 * @param scale The name of the scale to align the axis with
 * @param orientation The positioning of the axis in the view-space
 */
export function axis(scale: string, orientation: AxisOrientation): AxisBuilder {
	return new AxisBuilder(scale, orientation)
}
