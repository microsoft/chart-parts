import { ChartOptions } from '@gog/xform-sg-interfaces'
import { SceneNode } from '@gog/mark-spec-interfaces'
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
		scene: SceneNode,
		options: ChartOptions,
		tables: { [key: string]: any[] },
	): GeneratedScene {
		return new SceneInstance(scene, options, tables).build()
	}
}
