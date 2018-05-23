import { Mark } from './Mark'

/**
 * Path marks are arbitrary shapes, defined as an SVG path. Path marks can be used to represent custom shapes,
 * including geographic regions on maps.
 */
export class Path extends Mark {
	/**
	 * An SVG path string describing the geometry of the path.
	 */
	public path?: string
}
