/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Path, path } from 'd3-path'

export function drawCross(context: Path, radius: number) {
	if (!context) {
		context = path()
	}
	const s = radius / 2.5
	context.moveTo(-radius, -s)
	context.lineTo(-radius, s)
	context.lineTo(-s, s)
	context.lineTo(-s, radius)
	context.lineTo(s, radius)
	context.lineTo(s, s)
	context.lineTo(radius, s)
	context.lineTo(radius, -s)
	context.lineTo(s, -s)
	context.lineTo(s, -radius)
	context.lineTo(-s, -radius)
	context.lineTo(-s, -s)
	context.closePath()
	return context
}
