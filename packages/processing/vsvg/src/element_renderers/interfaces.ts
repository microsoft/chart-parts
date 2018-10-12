/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkConverter,
	VSvgNode,
	VSvgTransformType,
} from '@chart-parts/interfaces'

export interface VSvgMarkOutput {
	nodes: VSvgNode[]
	defs?: VSvgNode[]
}

export interface VSvgRenderContext {
	nextId(): string
}

export type VSvgMarkConverter = MarkConverter<VSvgMarkOutput, VSvgRenderContext>

export function translate(x: number, y: number) {
	return { type: VSvgTransformType.translate, value: [x, y] }
}

export function rotate(angle: number) {
	return { type: VSvgTransformType.rotate, value: angle }
}
