/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Path, path } from 'd3-path'

export function drawDiamond(context: Path, radius: number) {
	if (!context) {
		context = path()
	}
	context.moveTo(-radius, 0)
	context.lineTo(0, -radius)
	context.lineTo(radius, 0)
	context.lineTo(0, radius)
	context.closePath()
	return context
}
