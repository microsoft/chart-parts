import { Axis, Scale, TickValue } from '@gog/interfaces'
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
	crossStartProperty: string
	crossEndProperty: string
	horizontal: boolean
	topOrLeft: boolean
	frame: SceneFrame

	// Tick Data
	ticks?: PositionedTickValue[]
	tickSize?: number
	tickWidth?: number
}

export interface PositionedTickValue extends TickValue {
	position: number
}
