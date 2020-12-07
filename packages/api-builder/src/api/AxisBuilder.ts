/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Subject } from 'rxjs'
import { AxisSpec } from '../spec/AxisSpec'
import {
	Axis,
	AxisOrientation,
	TickValue,
	FontWeight,
} from '@chart-parts/interfaces'

/**
 * A builder class for defining Axes
 * @category Builder
 */
export class AxisBuilder {
	public readonly onChange = new Subject<any>()
	public readonly spec: AxisSpec
	// #endregion

	public constructor(scale: string, orient: AxisOrientation) {
		if (!scale) {
			throw new Error('scale must be defined')
		}

		if (!orient) {
			throw new Error('orient must be defined')
		}
		this.spec = new AxisSpec(scale, orient)
	}

	public domain(value: boolean | undefined): this {
		this.spec.domain = value
		this.onChange.next('axis domain changed')
		return this
	}

	public domainWidth(value: number | undefined): this {
		this.spec.domainWidth = value
		this.onChange.next('axis domain width changed')
		return this
	}

	public domainColor(value: string | undefined): this {
		this.spec.domainColor = value
		this.onChange.next('axis domain color changed')
		return this
	}

	public ticks(value: boolean | undefined): this {
		this.spec.ticks = value
		this.onChange.next('axis ticks changed')
		return this
	}

	public tickColor(value: string | undefined): this {
		this.spec.tickColor = value
		this.onChange.next('axis tick color changed')
		return this
	}

	public tickCount(value: number | undefined): this {
		this.spec.tickCount = value
		this.onChange.next('axis tick count changed')
		return this
	}

	public tickOffset(value: number | undefined): this {
		this.spec.tickOffset = value
		this.onChange.next('axis tick offset changed')
		return this
	}

	public tickRound(value: boolean | undefined): this {
		this.spec.tickRound = value
		this.onChange.next('axis tickRound changed')
		return this
	}

	public tickSize(value: number | undefined): this {
		this.spec.tickSize = value
		this.onChange.next('axis tickSize changed')
		return this
	}

	public tickWidth(value: number | undefined): this {
		this.spec.tickWidth = value
		this.onChange.next('axis tickWidth changed')
		return this
	}

	public bandPosition(value: number | undefined): this {
		this.spec.bandPosition = value
		this.onChange.next('axis bandPosition changed')
		return this
	}

	public values(values: TickValue[] | undefined): this {
		this.spec.values = values
		this.onChange.next('axis values changed')
		return this
	}

	// #region Labels Configuration
	public labels(value: boolean | undefined): this {
		this.spec.labels = value
		this.onChange.next('axis labels changed')
		return this
	}

	public labelFont(value: string | undefined): this {
		this.spec.labelFont = value
		this.onChange.next('axis labelFont changed')
		return this
	}

	public labelFontSize(value: number | undefined): this {
		this.spec.labelFontSize = value
		this.onChange.next('axis labelFontSize changed')
		return this
	}

	public labelColor(value: string | undefined): this {
		this.spec.labelColor = value
		this.onChange.next('axis labelColor changed')
		return this
	}

	public labelPadding(value: number | undefined): this {
		this.spec.labelPadding = value
		this.onChange.next('axis labelPadding changed')
		return this
	}

	public labelFontWeight(value: FontWeight | undefined): this {
		this.spec.labelFontWeight = value
		this.onChange.next('axis labelFontWeight changed')
		return this
	}

	public labelAngle(value: number | undefined): this {
		this.spec.labelAngle = value
		this.onChange.next('axis labelAngel changed')
		return this
	}

	public labelFormat(value: string | undefined): this {
		this.spec.labelFormat = value
		this.onChange.next('axis labelFormat changed')
		return this
	}

	public thickness(value: number | undefined): this {
		this.spec.thickness = value
		this.onChange.next('axis thickness changed')
		return this
	}

	// #endregion

	public build(): Axis {
		return this.spec
	}
}
