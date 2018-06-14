import { ChartOptions } from '@gog/xform-sg-interfaces'
import { Scene as SceneSpec } from '@gog/mark-spec-interfaces'
import { GeneratedScene } from './interfaces'
import { SceneInstance } from './SceneInstance'

/**
 * The scene generator class
 */
export class SceneGenerator {
	/**
	 * Generates a scenegraph instance given data and a scene specification
	 * @param scene The scene specification
	 * @param data The data to bind with
	 * @param options The charting options
	 */
	public generateScene(
		scene: SceneSpec,
		options: ChartOptions,
	): GeneratedScene {
		return new SceneInstance(scene, options).build()
	}
}
