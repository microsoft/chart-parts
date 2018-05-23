import { Mark } from './Mark'

/**
 * Rect marks are rectangles with a given position, width and height.
 * Rect marks are useful in a wide variety of visualizations, including bar charts and timelines.
 */
export class Rect extends Mark {
	/**
	 * The radius in pixels of rounded rectangle corners (default 0).
	 */
	public cornerRadius?: number = 0
}
