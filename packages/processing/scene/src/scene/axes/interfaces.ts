import { Axis, Scale } from '@gog/interfaces'
import { SceneFrame } from '../SceneFrame'

/**
 * A context object for generating axis components
 */
export interface AxisContext {
	axis: Axis
	thickness: number
	scale: Scale<any, any>
	range: [number, number]
	rangeStartProperty: string
	rangeEndProperty: string
	crossProperty: string
	horizontal: boolean
	frame: SceneFrame
}
