/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { scalePoint } from 'd3-scale'
import { DomainRangeScale } from '../DomainRangeScale'
import { getBoundRange } from '../getBoundRange'
import { optionalArgument } from '../util'
import {
	Dimension,
	ScaleCreationContext,
	Scales,
	Scale,
} from '@chart-parts/interfaces'

export class PointScale extends DomainRangeScale<
	string[],
	[number, number],
	Dimension
> {
	private alignValue?: number
	private paddingValue?: number
	private roundValue?: boolean
	private stepNameValue?: string

	/**
	 * Bin alignment 0-beginning, 1=end
	 */
	public align(value?: number): this {
		this.alignValue = value
		return this
	}

	/**
	 * The outer and inner padding value
	 */
	public padding(value?: number): this {
		this.paddingValue = value
		return this
	}

	public round(value?: boolean): this {
		this.roundValue = optionalArgument(value, arguments.length, true, false)
		return this
	}

	public stepName(value?: string): this {
		this.stepNameValue = value
		return this
	}

	protected createScale(args: ScaleCreationContext): Scales {
		const scale = scalePoint()
			.domain(this.getDomain(args))
			.range(this.getRange(args))

		if (this.paddingValue !== undefined) {
			scale.padding(this.paddingValue)
		}

		if (this.alignValue !== undefined) {
			scale.align(this.alignValue)
		}

		if (this.roundValue !== undefined) {
			scale.round(this.roundValue)
		}

		if (!this.nameValue) {
			throw new Error('scale name must be defined')
		}
		const result: Scales = { [this.nameValue]: scale }
		if (this.stepNameValue) {
			result[this.stepNameValue as string] = scale.step as Scale<any, number>
		}
		return result
	}

	protected handleRangeBind(
		args: ScaleCreationContext,
		rangeBind: Dimension,
	): [number, number] {
		return getBoundRange(args, rangeBind)
	}
}
