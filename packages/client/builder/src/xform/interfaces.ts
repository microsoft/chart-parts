/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { SGMark, SGItem, Channels } from '@chart-parts/interfaces'

/**
 * Interface for the result of scene-generation
 * @category Transformation
 */

export interface GeneratedScenegraph {
	/**
	 * The root mark of the resultant scene
	 */
	root: SGMark<SGItem>

	/**
	 * The event channels of this scene, a key of channel name to event handlers
	 */
	channelHandlers: Channels
}
