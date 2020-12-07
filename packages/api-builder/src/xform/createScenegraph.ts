/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ChartOptionsManager } from '../api/ChartOptionsManager'
import { SceneFrame } from './context/SceneFrame'
import { GeneratedScenegraph } from './interfaces'
import { processNode } from './processNode'
import { ChartOptions, SceneNode, DataFrame } from '@chart-parts/interfaces'

/**
 * Builds a new scenegraph instance by binding data to a scene specification.
 *
 * @category Transformation
 * @param root The scene specifiaction
 * @param data The data tables
 * @param options The charting options
 * @returns A generated scenegraph
 */
export function createScenegraph(
	root: SceneNode,
	data: DataFrame,
	options: ChartOptions,
): GeneratedScenegraph {
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
