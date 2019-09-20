/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	ChartOptions,
	DEFAULT_HEIGHT,
	DEFAULT_WIDTH,
	ItemSpace,
} from '@chart-parts/interfaces'

/**
 * A class for managing chart options
 * @category Builder
 */
export class ChartOptionsManager {
	public constructor(private options: ChartOptions = {}) {}

	public get ariaTitle() {
		return this.options.ariaTitle || 'data visualization using chart-parts'
	}

	public get ariaDescription() {
		return this.options.ariaDescription || ''
	}

	public get chartSpace(): ItemSpace {
		const chartWidth = this.options.width || DEFAULT_WIDTH
		const chartHeight = this.options.height || DEFAULT_HEIGHT
		const paddingLeft = this.paddingLeft
		const paddingRight = this.paddingRight
		const paddingTop = this.paddingTop
		const paddingBottom = this.paddingBottom

		const x = paddingLeft
		const y = paddingTop
		const width = chartWidth - paddingLeft - paddingRight
		const height = chartHeight - paddingTop - paddingBottom

		return {
			origin: { x, y },
			shape: { width, height },
		}
	}

	public get paddingTop() {
		return this.getPadding('top')
	}

	public get paddingBottom() {
		return this.getPadding('bottom')
	}

	public get paddingLeft() {
		return this.getPadding('left')
	}

	public get paddingRight() {
		return this.getPadding('right')
	}

	private getPadding(name: string): number {
		const paddingType = typeof this.options.padding
		if (paddingType === 'number') {
			return this.options.padding as number
		} else if (paddingType === 'object') {
			return (this.options.padding as any)[name] || 0
		}
		return 0
	}
}
