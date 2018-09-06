// tslint:disable no-this-assignment no-submodule-imports no-var-requires
import { ChartOptions, SceneNode, DataFrame } from '@markable/interfaces'
import { ChartOptionsManager } from '@markable/builder'
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
