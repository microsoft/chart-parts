/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// tslint:disable no-this-assignment
import { SceneNode, ScaleCreator, ScaleBuilder } from '@chart-parts/interfaces'
import { MarkBuilder } from './MarkBuilder'
import { AxisBuilder } from './AxisBuilder'

export class SceneNodeBuilder {
	private markBuilders: MarkBuilder[] = []
	private axisBuilders: AxisBuilder[] = []

	/**
	 * The scales defined for children of this node
	 */
	private scales: ScaleCreator[] = []

	/**
	 * Adds a scale-creator to the scene configuration
	 * @param name The name of the scale-creator to add
	 * @param table The name of the bound datatable to use
	 * @param creator The scale-creator
	 */
	public scale(
		...creators: Array<ScaleCreator | ScaleBuilder>
	): SceneNodeBuilder {
		creators.forEach(c => {
			const scaleCreator = typeof c === 'function' ? c : c.build
			this.scales.push(scaleCreator)
		})
		return this
	}

	public mark(...builders: MarkBuilder[]): SceneNodeBuilder {
		this.markBuilders.push(...builders)
		return this
	}

	public axes(...builders: AxisBuilder[]): SceneNodeBuilder {
		this.axisBuilders.push(...builders)
		return this
	}

	/**
	 * Builds the scene object
	 */
	public build(): SceneNode {
		const { scales, markBuilders, axisBuilders } = this
		return {
			marks: markBuilders.map(m => m.build()),
			axes: axisBuilders.map(m => m.build()),
			scales,
		}
	}
}
