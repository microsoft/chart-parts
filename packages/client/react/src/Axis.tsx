import * as React from 'react'

export type AxisOrientation = 'top' | 'left' | 'bottom' | 'right'

/**
 * Axis Component Props
 */
export interface AxisProps {
	/**
	 * A name reference for a scale
	 */
	scale: string

	/**
	 * The axis' orientation on the chart
	 */
	orient: AxisOrientation
}

export class Axis extends React.PureComponent<AxisProps> {
	public render() {
		return null
	}
}
