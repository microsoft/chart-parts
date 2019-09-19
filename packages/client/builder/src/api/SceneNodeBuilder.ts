/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { SceneNode, ScaleCreator, ScaleBuilder } from '@chart-parts/interfaces'
import { Subject, Subscription } from 'rxjs'
import { MarkBuilder } from './MarkBuilder'
import { AxisBuilder } from './AxisBuilder'
import { SceneNodeSpec } from '../spec/SceneNodeSpec'

interface SubscribableHandle<T> {
	item: T
	subscription: Subscription
}

/**
 * The build component for scene nodes
 * @category Builder
 */
export class SceneNodeBuilder {
	public readonly onChange = new Subject<any>()
	public readonly spec = new SceneNodeSpec()
	private markBuilders: Array<SubscribableHandle<MarkBuilder>> = []
	private axisBuilders: Array<SubscribableHandle<AxisBuilder>> = []

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
	public scale(
		...creators: Array<ScaleCreator | ScaleBuilder>
	): SceneNodeBuilder {
		creators.forEach(c => {
			const scaleCreator = typeof c === 'function' ? c : c.build
			this.spec.addScale(scaleCreator)
			this.scales.push(scaleCreator)
		})
		this.onChange.next('node add scales')
		return this
	}

	public removeScale(scale: ScaleCreator | ScaleBuilder): SceneNodeBuilder {
		if (typeof scale === 'function') {
			this.spec.removeScale(scale)
			this.scales = this.scales.filter(s => s !== scale)
		} else {
			this.spec.removeScale(scale.build)
			this.scales = this.scales.filter(s => s !== scale.build)
		}
		this.onChange.next('node remove scale')
		return this
	}

	public mark(...builders: MarkBuilder[]): SceneNodeBuilder {
		builders.forEach(b => {
			this.spec.addMark(b.spec)
			this.markBuilders.push({
				item: b,
				subscription: b.onChange.subscribe(c => this.onChange.next(c)),
			})
		})
		this.onChange.next('node add marks')
		return this
	}

	public removeMark(builder: MarkBuilder): SceneNodeBuilder {
		this.markBuilders = this.markBuilders.filter(t => {
			if (t.item === builder) {
				this.spec.removeMark(t.item.spec)
				t.subscription.unsubscribe()
			}
			return t.item !== builder
		})
		this.onChange.next('node remove mark')
		return this
	}

	public axes(...builders: AxisBuilder[]): SceneNodeBuilder {
		builders.forEach(b => {
			this.spec.addAxis(b.spec)
			this.axisBuilders.push({
				item: b,
				subscription: b.onChange.subscribe(c => this.onChange.next(c)),
			})
		})
		this.onChange.next('node remove axes')
		return this
	}

	public removeAxis(builder: AxisBuilder): SceneNodeBuilder {
		this.axisBuilders = this.axisBuilders.filter(t => {
			if (t.item === builder) {
				this.spec.removeAxis(t.item.spec)
				t.subscription.unsubscribe()
			}
			return t.item !== builder
		})
		this.onChange.next('node remove axis')
		return this
	}

	/**
	 * Builds the scene object
	 */
	public build(): SceneNode {
		return this.spec
	}
}
