/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { SGMark, Axis, Scale, TickValue } from '@chart-parts/interfaces'
import { SceneFrame } from '../context/SceneFrame'

export interface AxisSpace {
	top: number
	right: number
	bottom: number
	left: number
}

/**
 * A context object for generating axis components
 */
export interface AxisContext {
	axis: Axis
	thickness: number
	scale: Scale<any, any>
	range: [number, number]
	rangeProperty: string
	rangeEndProperty: string
	crossProperty: string
	crossEndProperty: string
	horizontal: boolean
	topOrLeft: boolean
	frame: SceneFrame

	// Domain Data
	domainCross: number
	domainMinRange: number
	domainMaxRange: number

	// Tick Data
	ticks: PositionedTickValue[]
	tickCrossStart: number
	tickCrossEnd: number

	// Labels
	labelFormatter: (input: any) => string
}

export interface PositionedTickValue extends TickValue {
	position: number
}

/**
 * Interface for axis components such as ticks and labels
 */
export interface AxisComponent {
	/**
	 * Constructs the AxisContext object, which is used to render all axis components. Any
	 * pieces of context which this component generates or knows about should be populated here.
	 *
	 * @param context The intermediate context-object, which may be partially defined at this point
	 */
	createContext(context: Partial<AxisContext>): Partial<AxisContext>

	/**
	 * Determines whether the axis configuration results in this component emitting any information.
	 *
	 * @param context The axis context object
	 */
	isScenegraphElementGenerated(context: AxisContext): boolean

	/**
	 * Creates the scenegraph items for this axis component
	 *
	 * @param context The axis context object
	 */
	createScenegraphElement(context: AxisContext): SGMark<any>
}
