/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	CurveFactory,
	CurveBundleFactory,
	curveBasis,
	curveBasisClosed,
	curveBasisOpen,
	curveBundle,
	curveCardinal,
	curveCardinalClosed,
	curveCardinalOpen,
	curveCatmullRom,
	curveCatmullRomClosed,
	curveCatmullRomOpen,
	curveLinear,
	curveLinearClosed,
	curveMonotoneX,
	curveMonotoneY,
	curveNatural,
	curveStep,
	curveStepAfter,
	curveStepBefore,
} from 'd3-shape'
import { Orientation } from '@chart-parts/interfaces'

const lookup: {
	[key: string]: {
		curve?: CurveFactory | CurveBundleFactory
		tension?: string
		value?: number
		horizontal?: any
		vertical?: any
	}
} = {
	basis: {
		curve: curveBasis,
	},
	'basis-closed': {
		curve: curveBasisClosed,
	},
	'basis-open': {
		curve: curveBasisOpen,
	},
	bundle: {
		curve: curveBundle,
		tension: 'beta',
		value: 0.85,
	},
	cardinal: {
		curve: curveCardinal,
		tension: 'tension',
		value: 0,
	},
	'cardinal-open': {
		curve: curveCardinalOpen,
		tension: 'tension',
		value: 0,
	},
	'cardinal-closed': {
		curve: curveCardinalClosed,
		tension: 'tension',
		value: 0,
	},
	'catmull-rom': {
		curve: curveCatmullRom,
		tension: 'alpha',
		value: 0.5,
	},
	'catmull-rom-closed': {
		curve: curveCatmullRomClosed,
		tension: 'alpha',
		value: 0.5,
	},
	'catmull-rom-open': {
		curve: curveCatmullRomOpen,
		tension: 'alpha',
		value: 0.5,
	},
	linear: {
		curve: curveLinear,
	},
	'linear-closed': {
		curve: curveLinearClosed,
	},
	monotone: {
		horizontal: curveMonotoneY,
		vertical: curveMonotoneX,
	},
	natural: {
		curve: curveNatural,
	},
	step: {
		curve: curveStep,
	},
	'step-after': {
		curve: curveStepAfter,
	},
	'step-before': {
		curve: curveStepBefore,
	},
}

export default function curves(
	type: string,
	orientation?: Orientation | undefined,
	tension?: number | undefined,
): CurveFactory {
	const entry =
		Object.prototype.hasOwnProperty.call(lookup, type) && lookup[type]
	// let curve: CurveFactory | CurveBundleFactory

	if (entry) {
		const curveFactory = entry.curve || entry[orientation || 'vertical']
		if (entry.tension && tension != null) {
			return curveFactory[entry.tension](tension)
		} else {
			return curveFactory
		}
	} else {
		throw new Error(
			`could not retrieve curveFactory type ${type}, orientation ${orientation}`,
		)
	}
}
