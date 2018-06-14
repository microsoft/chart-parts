import {
	Mark,
	SceneNode,
	ScaleCreator,
	NamedScaleCreator,
} from '@gog/mark-spec-interfaces'

export class SceneNodeBuilder {
	private scales: NamedScaleCreator[] = []
	private marks: Mark[] = []

	constructor(public data: any[]) {}

	public setData(data: any[]) {
		this.data = data
	}

	/**
	 * Adds a scale-creator to the scene configuration
	 * @param name The name of the scale-creator to add
	 * @param scaleCreator The scale-creator
	 */
	public addScale(name: string, scaleCreator: ScaleCreator) {
		this.scales.push({ name, scaleCreator })
	}

	/**
	 * Adds a mark to the scene-configuration
	 * @param mark the mark to add
	 */
	public addMark(mark: Mark) {
		this.marks.push(mark)
	}

	/**
	 * Builds the scene object
	 */
	public build(): SceneNode {
		return {
			data: this.data,
			scales: this.scales,
			marks: this.marks,
		}
	}
}
