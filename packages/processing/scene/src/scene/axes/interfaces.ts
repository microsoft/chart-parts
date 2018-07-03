import { Axis, Scale } from '@gog/interfaces'

export interface AxisContext {
	axis: Axis
	thickness: number
	scale: Scale<any, any>
	range: [number, number]
	rangeStartProperty: string
	rangeEndProperty: string
	crossProperty: string
	horizontal: boolean
}
