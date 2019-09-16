/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	Axis,
	AxisOrientation,
	TickValue,
	FontWeight,
} from '@chart-parts/interfaces'
import { Subject } from 'rxjs'
import { AxisSpec } from '../spec/AxisSpec'

export class AxisBuilder {
	public readonly onChange = new Subject()
	public readonly spec: AxisSpec
	// #endregion

	public constructor(scale: string, orent: AxisOrientation) {
		this.spec = new AxisSpec(scale, orent)
	}

	public domain(value: boolean | undefined): AxisBuilder {
		this.spec.domain = value
		this.onChange.next()
		return this
	}

	public domainWidth(value: number | undefined): AxisBuilder {
		this.spec.domainWidth = value
		this.onChange.next()
		return this
	}

	public domainColor(value: string | undefined): AxisBuilder {
		this.spec.domainColor = value
		this.onChange.next()
		return this
	}

	public ticks(value: boolean | undefined): AxisBuilder {
		this.spec.ticks = value
		this.onChange.next()
		return this
	}

	public tickColor(value: string | undefined): AxisBuilder {
		this.spec.tickColor = value
		this.onChange.next()
		return this
	}

	public tickCount(value: number | undefined): AxisBuilder {
		this.spec.tickCount = value
		this.onChange.next()
		return this
	}

	public tickOffset(value: number | undefined): AxisBuilder {
		this.spec.tickOffset = value
		this.onChange.next()
		return this
	}

	public tickRound(value: boolean | undefined): AxisBuilder {
		this.spec.tickRound = value
		this.onChange.next()
		return this
	}

	public tickSize(value: number | undefined): AxisBuilder {
		this.spec.tickSize = value
		this.onChange.next()
		return this
	}

	public tickWidth(value: number | undefined): AxisBuilder {
		this.spec.tickWidth = value
		this.onChange.next()
		return this
	}

	public bandPosition(value: number | undefined): AxisBuilder {
		this.spec.bandPosition = value
		this.onChange.next()
		return this
	}

	public values(values: TickValue[] | undefined): AxisBuilder {
		this.spec.values = values
		this.onChange.next()
		return this
	}

	// #region Labels Configuration
	public labels(value: boolean | undefined): AxisBuilder {
		this.spec.labels = value
		this.onChange.next()
		return this
	}

	public labelFont(value: string | undefined): AxisBuilder {
		this.spec.labelFont = value
		this.onChange.next()
		return this
	}

	public labelFontSize(value: number | undefined): AxisBuilder {
		this.spec.labelFontSize = value
		this.onChange.next()
		return this
	}

	public labelColor(value: string | undefined): AxisBuilder {
		this.spec.labelColor = value
		this.onChange.next()
		return this
	}

	public labelPadding(value: number | undefined): AxisBuilder {
		this.spec.labelPadding = value
		this.onChange.next()
		return this
	}

	public labelFontWeight(value: FontWeight | undefined): AxisBuilder {
		this.spec.labelFontWeight = value
		this.onChange.next()
		return this
	}

	public labelAngle(value: number | undefined): AxisBuilder {
		this.spec.labelAngle = value
		this.onChange.next()
		return this
	}

	public labelFormat(value: string | undefined): AxisBuilder {
		this.spec.labelFormat = value
		this.onChange.next()
		return this
	}

	public thickness(value: number | undefined): AxisBuilder {
		this.spec.thickness = value
		this.onChange.next()
		return this
	}

	// #endregion

	public build(): Axis {
		return this.spec
	}
}
