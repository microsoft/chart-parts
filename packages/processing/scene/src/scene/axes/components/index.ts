import { AxisComponent } from '../interfaces'
import { Domain } from './domain'
import { TickLines } from './tickLines'
import { TickLabels } from './tickLabels'

/**
 * The axis component class instances
 */
export const components: AxisComponent[] = [
	new Domain(),
	new TickLines(),
	new TickLabels(),
]
