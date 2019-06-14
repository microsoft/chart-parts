/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ChartOptions, SceneNode, DataFrame } from '@chart-parts/interfaces'
import { ChartOptionsManager } from '@chart-parts/builder'
import { SceneFrame } from './SceneFrame'
import { GeneratedScene } from '../interfaces'
import { processNode } from './processNode'

/**
 * Builds a new scenegraph instance by binding data to a scene specification.
 *
 * @param data The data to bind with
 */
export function createScenegraph(
	root: SceneNode,
	data: DataFrame,
	options: ChartOptions,
): GeneratedScene {
	const optionsManager = new ChartOptionsManager(options)
	const width = optionsManager.chartSpace.shape.width as number
	const height = optionsManager.chartSpace.shape.height as number
	const emptyNode = (undefined as any) as SceneNode
	const rootFrame = new SceneFrame(emptyNode, undefined, data, {
		width,
		height,
	})

	return {
		root: processNode(root, rootFrame)[0],
		channelHandlers: rootFrame.channelHandlers,
	}
}
