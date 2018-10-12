/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Channels } from './specification'

/**
 * Interface describing a rendering phase.
 * @param SourceForm The type of incoming data form
 * @param TargetForm the output form
 */
export interface Renderer<SourceForm, TargetForm> {
	/**
	 * Renders incoming data form into the output form
	 * @param input The input data of an input form
	 * @param handlers Event handlers that have been mapped
	 */
	render(input: SourceForm, handlers: Channels): TargetForm
}
