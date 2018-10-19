/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Path, path } from 'd3-path'
import { halfSqrt3 } from './constants'

export function drawTriangleUp(context: Path, radius: number) {
	if (!context) {
		context = path()
	}
	const h = halfSqrt3 * radius
	context.moveTo(0, -h)
	context.lineTo(-radius, h)
	context.lineTo(radius, h)
	context.closePath()
	return context
}

export function drawTriangleDown(context: Path, radius: number) {
	if (!context) {
		context = path()
	}
	const h = halfSqrt3 * radius
	context.moveTo(0, h)
	context.lineTo(-radius, -h)
	context.lineTo(radius, -h)
	context.closePath()
	return context
}

export function drawTriangleLeft(context: Path, radius: number) {
	if (!context) {
		context = path()
	}
	const h = halfSqrt3 * radius
	context.moveTo(-h, 0)
	context.lineTo(h, -radius)
	context.lineTo(h, radius)
	context.closePath()
	return context
}

export function drawTriangleRight(context: Path, radius: number) {
	if (!context) {
		context = path()
	}
	const h = halfSqrt3 * radius
	context.moveTo(h, 0)
	context.lineTo(-h, -radius)
	context.lineTo(-h, radius)
	context.closePath()
	return context
}
