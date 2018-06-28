// tslint:disable no-this-assignment
import { SceneNode, ScaleCreator } from '@gog/interfaces'
import { MarkBuilder } from './MarkBuilder'

export class SceneNodeBuilder {
	private marks: MarkBuilder[] = []

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
		this.marks.push(...builders)
		return this
	}

	/**
	 * Builds the scene object
	 */
	public build(): SceneNode {
		const { scales, marks } = this
		if (marks.length === 0) {
			throw new Error('scene node has no mark set')
		}
		return {
			marks: marks.map(m => m.build()),
			scales,
		}
	}
}
