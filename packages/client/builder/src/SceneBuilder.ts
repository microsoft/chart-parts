/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { SceneNode, ScaleCreator, ScaleBuilder } from '@chart-parts/interfaces'
import { Subject, Subscription } from 'rxjs'
import { MarkBuilder } from './MarkBuilder'
import { AxisBuilder } from './AxisBuilder'

export class SceneBuilder {
	public readonly onChange = new Subject()
	private markBuilders: {
		mark: MarkBuilder
		subscription: Subscription
	}[] = []
	private axisBuilders: { axis: AxisBuilder; subscription: Subscription }[] = []

	/**
	 * The scales defined for children of this node
	 */
	private scales: ScaleCreator[] = []

	/**
	 * Adds a scale-creator to the scene configuration
	 * @param name The name of the scale-creator to add
	 * @param table The name of the bound datatable to use
	 * @param creator The scale-creator
	 */
	public scale(...creators: Array<ScaleCreator | ScaleBuilder>): SceneBuilder {
		creators.forEach(c => {
			const scaleCreator = typeof c === 'function' ? c : c.build
			this.scales.push(scaleCreator)
		})
		this.onChange.next()
		return this
	}

	public removeScale(scale: ScaleCreator | ScaleBuilder): SceneBuilder {
		if (typeof scale === 'function') {
			this.scales = this.scales.filter(s => s !== scale)
		} else {
			this.scales = this.scales.filter(s => s !== scale.build)
		}
		this.onChange.next()
		return this
	}

	public mark(...builders: MarkBuilder[]): SceneBuilder {
		this.markBuilders.push(
			...builders.map(b => ({
				mark: b,
				subscription: b.onChange.subscribe(() => this.onChange.next()),
			})),
		)
		this.onChange.next()
		return this
	}

	public removeMark(builder: MarkBuilder): SceneBuilder {
		this.markBuilders = this.markBuilders.filter(t => {
			if (t.mark === builder) {
				t.subscription.unsubscribe()
			}
			return t.mark !== builder
		})
		this.onChange.next()
		return this
	}

	public axes(...builders: AxisBuilder[]): SceneBuilder {
		this.axisBuilders.push(
			...builders.map(b => ({
				axis: b,
				subscription: b.onChange.subscribe(() => this.onChange.next()),
			})),
		)
		this.onChange.next()
		return this
	}

	public removeAxis(builder: AxisBuilder): SceneBuilder {
		this.axisBuilders = this.axisBuilders.filter(a => {
			if (a.axis === builder) {
				a.subscription.unsubscribe()
			}
			return a.axis !== builder
		})
		this.onChange.next()
		return this
	}

	/**
	 * Builds the scene object
	 */
	public build(): SceneNode {
		const { scales, markBuilders, axisBuilders } = this
		return {
			marks: markBuilders.map(m => m.mark.build()),
			axes: axisBuilders.map(m => m.axis.build()),
			scales,
		}
	}
}
