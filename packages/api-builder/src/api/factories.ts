/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	MarkType,
	AxisOrientation,
	ChartOptions,
	MarkEncodingKey,
} from '@chart-parts/interfaces'
import { MarkBuilder } from './MarkBuilder'
import { SceneNodeBuilder } from './SceneNodeBuilder'
import { AxisBuilder } from './AxisBuilder'
import { ChartOptionsManager } from './ChartOptionsManager'

/**
 * A factory function for creating a new scene
 * @category Builder
 */
export function scene(
	cb: (child: SceneNodeBuilder) => SceneNodeBuilder,
	opts: ChartOptions,
): SceneNodeBuilder {
	const optsManager = new ChartOptionsManager(opts)
	return new SceneNodeBuilder().mark(
		group('root')
			.role('frame')
			.encode({
				[MarkEncodingKey.zIndex]: 0,
				[MarkEncodingKey.x]: optsManager.paddingLeft,
				[MarkEncodingKey.y]: optsManager.paddingTop,
				[MarkEncodingKey.width]: optsManager.chartSpace.shape.width,
				[MarkEncodingKey.height]: optsManager.chartSpace.shape.height,
			})
			.child(cb),
	)
}

/**
 * A factory function for creating a new mark
 * @param type The mark type to create
 * @category Builder
 */
export function mark(type: MarkType) {
	return new MarkBuilder(type)
}

/**
 * Creates a new _arc_ type mark
 * @param name
 * @category Builder
 */
export function arc(name?: string) {
	return markWithName(MarkType.Arc, name)
}

/**
 * Creates a new _area_ type mark
 * @category Builder
 * @param name
 */
export function area(name?: string) {
	return markWithName(MarkType.Area, name)
}

/**
 * Creates a new _group_ type mark
 * @category Builder
 * @param name
 */
export function group(name?: string) {
	return markWithName(MarkType.Group, name)
}

/**
 * Creates a new _image_ type mark
 * @category Builder
 * @param name
 */
export function image(name?: string) {
	return markWithName(MarkType.Image, name)
}

/**
 * Creates a new _line_ type mark
 * @category Builder
 * @param name
 */
export function line(name?: string) {
	return markWithName(MarkType.Line, name)
}

/**
 * Creates a new _path_ type mark
 * @category Builder
 * @param name
 */
export function path(name?: string) {
	return markWithName(MarkType.Path, name)
}

/**
 * Creates a new _rect_ type mark
 * @category Builder
 * @param name
 */
export function rect(name?: string) {
	return markWithName(MarkType.Rect, name)
}

/**
 * Creates a new _rule_ type mark
 * @category Builder
 * @param name
 */
export function rule(name?: string) {
	return markWithName(MarkType.Rule, name)
}

/**
 * Creates a new _shape_ type mark
 * @category Builder
 * @param name
 */
export function shape(name?: string) {
	return markWithName(MarkType.Shape, name)
}

/**
 * Creates a new _symbol_ type mark
 * @category Builder
 * @param name
 */
export function symbol(name?: string) {
	return markWithName(MarkType.Symbol, name)
}

/**
 * Creates a new _text_ type mark
 * @category Builder
 * @param name
 */
export function text(name?: string) {
	return markWithName(MarkType.Text, name)
}

/**
 * Creates a new _trail_ type mark
 * @category Builder
 * @param name
 */
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
 * @category Builder
 */
export function axis(scale: string, orientation: AxisOrientation): AxisBuilder {
	return new AxisBuilder(scale, orientation)
}
