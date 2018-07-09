// tslint:disable no-this-assignment
import { SceneNode, ScaleCreator } from '../../interfaces/lib'
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
		...creators: Array<ScaleCreator | { build: () => ScaleCreator }>
	): SceneNodeBuilder {
		creators.forEach(c =>
			this.scales.push(
				typeof (c as any).build === 'function' ? (c as any).build() : c,
			),
		)
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
		if (markBuilders.length === 0) {
			throw new Error('scene node has no mark set')
		}
		return {
			marks: markBuilders.map(m => m.build()),
			axes: axisBuilders.map(m => m.build()),
			scales,
		}
	}
}
