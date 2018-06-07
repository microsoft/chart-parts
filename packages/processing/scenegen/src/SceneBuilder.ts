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

	public addScaleCreator(name: string, scaleCreator: ScaleCreator<any>) {
		this.scales.push({ name, scaleCreator })
	}

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
