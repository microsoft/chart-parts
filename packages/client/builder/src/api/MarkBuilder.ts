/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/* eslint-disable no-dupe-class-members */
import {
	Mark,
	Channels,
	ChannelHandler,
	MarkEncoding,
	MarkEncodings,
	MarkEncodingKey,
	Facet,
	Gradient,
	MarkType,
	StrokeCap,
	StrokeJoin,
	Orientation,
	Interpolation,
	HorizontalAlignment,
	VerticalAlignment,
	VerticalTextAlignment,
	SymbolType,
	FontWeight,
	TextDirection,
	ItemIdGenerator,
	Metadata,
} from '@chart-parts/interfaces'
import { SceneNodeBuilder } from './SceneNodeBuilder'
import { Subject, Subscription } from 'rxjs'
import { MarkSpec } from '../spec/MarkSpec'

/**
 * A builder component for mark specifications
 * @category Builder
 */
export class MarkBuilder {
	public readonly onChange = new Subject()
	public readonly spec: MarkSpec
	private _child?: SceneNodeBuilder
	private _childSubscription?: Subscription

	public constructor(public readonly type: MarkType) {
		this.spec = new MarkSpec(type)
	}

	public table(table: string | undefined): MarkBuilder {
		this.spec.table = table
		this.onChange.next('mark table changed')
		return this
	}

	public role(role: string | undefined): MarkBuilder {
		this.spec.role = role
		this.onChange.next('mark role changed')
		return this
	}

	public name(name: string | undefined): MarkBuilder {
		this.spec.name = name
		this.onChange.next('mark name changed')
		return this
	}

	public idGenerator(generator: ItemIdGenerator): MarkBuilder {
		this.spec.idGenerator = generator
		this.onChange.next('mark idGenerator changed')
		return this
	}

	public handle(
		name: string,
		handler: ChannelHandler<any> | undefined,
	): MarkBuilder
	public handle(channels: Channels): MarkBuilder
	public handle(
		name: string | Channels,
		handler?: ChannelHandler<any>,
	): MarkBuilder {
		if (typeof name === 'string') {
			this.spec.applyHandler(name, handler)
		} else {
			Object.entries(name as Channels).forEach(([nameVal, handlerVal]) =>
				this.spec.applyHandler(nameVal, handlerVal),
			)
		}

		this.onChange.next('mark handlers changed')
		return this
	}

	// #region Mark Encoding
	public encode(
		key: MarkEncodingKey.x,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.x2,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.xc,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.width,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.y,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.y2,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.yc,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.height,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.opacity,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.fill,
		encoding: undefined | MarkEncoding<string | Gradient>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.fillOpacity,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.stroke,
		encoding: undefined | MarkEncoding<string | Gradient>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.strokeOpacity,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.strokeWidth,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.strokeCap,
		encoding: undefined | MarkEncoding<StrokeCap>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.strokeDash,
		encoding: undefined | MarkEncoding<[number, number]>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.strokeDashOffset,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.strokeJoin,
		encoding: undefined | MarkEncoding<StrokeJoin>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.strokeMiterLimit,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.cursor,
		encoding: undefined | MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.href,
		encoding: undefined | MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.tooltip,
		encoding: undefined | MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.zIndex,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.startAngle,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.endAngle,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.padAngle,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.innerRadius,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.outerRadius,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.cornerRadius,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.orient,
		encoding: undefined | MarkEncoding<Orientation>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.interpolate,
		encoding: undefined | MarkEncoding<Interpolation>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.tension,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.defined,
		encoding: undefined | MarkEncoding<boolean>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.clip,
		encoding: undefined | MarkEncoding<boolean>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.url,
		encoding: undefined | MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.aspect,
		encoding: undefined | MarkEncoding<boolean>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.align,
		encoding: undefined | MarkEncoding<HorizontalAlignment>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.baseline,
		encoding:
			| undefined
			| MarkEncoding<VerticalAlignment | VerticalTextAlignment>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.path,
		encoding: undefined | MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.size,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.shape,
		encoding: undefined | MarkEncoding<SymbolType | string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.angle,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.dir,
		encoding: undefined | MarkEncoding<TextDirection>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.dx,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.dy,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.ellipsis,
		encoding: undefined | MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.font,
		encoding: undefined | MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.fontSize,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.fontWeight,
		encoding: undefined | MarkEncoding<FontWeight>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.fontVariant,
		encoding: undefined | MarkEncoding<string | number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.fontStyle,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.limit,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.radius,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.text,
		encoding: undefined | MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.theta,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.ariaTitle,
		encoding: undefined | MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.ariaDescription,
		encoding: undefined | MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.tabIndex,
		encoding: undefined | MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.metadata,
		encoding: undefined | MarkEncoding<Metadata>,
	): MarkBuilder
	public encode(key: MarkEncodingKey, encoding: MarkEncoding<any>): MarkBuilder
	public encode(encodings: MarkEncodings): MarkBuilder

	// #endregion

	// Polymorphic function definition
	public encode(
		first: MarkEncodingKey | MarkEncodings,
		encoding?: MarkEncoding<any>,
	): MarkBuilder {
		if (typeof first === 'string') {
			// Handle encode(key, encoding) invocations
			this.spec.applyEncoding(first as string, encoding)
		} else {
			// Handle encode(map) invocations
			Object.entries(first as MarkEncodings).forEach(
				([name, entryEncoding]) => {
					this.spec.applyEncoding(name, entryEncoding)
				},
			)
		}

		this.onChange.next('mark encoders changed')
		return this
	}

	public facet(facet: Facet | undefined): MarkBuilder {
		if (facet !== undefined && this.type !== MarkType.Group) {
			throw new Error('faceting can only be applied to "group" type marks')
		}
		this.spec.facet = facet
		this.onChange.next('mark facet changed')
		return this
	}

	/**
	 * Pushes a new scene node onto the graph
	 */
	public child(callback: (b: SceneNodeBuilder) => void): MarkBuilder {
		if (this.spec.child) {
			console.warn(`MarkBuilder may only have one child at a time`)
		}
		// in case this was set, clear out any existing subscriptinos
		if (this._childSubscription) {
			this._childSubscription.unsubscribe()
		}

		this._child = new SceneNodeBuilder()
		this.spec.child = this._child.spec
		callback(this._child)
		this._childSubscription = this._child.onChange.subscribe(cause =>
			this.onChange.next(cause),
		)
		this.onChange.next('mark child changed')
		return this
	}

	public build(): Mark {
		if (!this.spec.type) {
			throw new Error('mark type must be set')
		}
		return this.spec
	}
}
