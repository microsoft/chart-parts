/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Path, path } from 'd3-path'

export function drawSquare(context: Path, width: number) {
	if (!context) {
		context = path()
	}
	const x = -width / 2
	context.rect(x, x, width, width)
	return context
}
