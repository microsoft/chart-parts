import { SGMark, SGItem } from '@gog/scenegraph-interfaces'

/**
 * Interface for the result of scene-generation
 */
export interface GeneratedScene {
	/**
	 * The root mark of the resultant scene
	 */
	root: SGMark<SGItem>

	/**
	 * The event channels of this scene, a key of channel name to event handlers
	 */
	channelHandlers: { [key: string]: (arg: any) => void }
}
