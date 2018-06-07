import {
	MarkSpec,
	SceneSpec,
	ScaleCreator,
	NamedScaleCreator,
} from '@gog/mark-spec-interfaces'

/**
 * The scene builder allows clients to build-up a scene specification
 * that may be used to then generate scenegraphs when bound to data
 */
export class SceneBuilder {
	private scales: NamedScaleCreator[] = []
	private marks: MarkSpec[] = []

	/**
	 * Adds a scale-creator to the scene configuration
	 * @param name The name of the scale-creator to add
	 * @param scaleCreator The scale-creator
	 */
	public addScaleCreator(name: string, scaleCreator: ScaleCreator<any>) {
		this.scales.push({ name, scaleCreator })
	}

	/**
	 * Adds a mark to the scene-configuration
	 * @param mark the mark to add
	 */
	public addMark(mark: MarkSpec) {
		this.marks.push(mark)
	}

	/**
	 * Builds the scene object
	 */
	public build(): SceneSpec {
		return {
			scales: this.scales,
			marks: this.marks,
		}
	}
}
