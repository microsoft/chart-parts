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

export class MarkBuilder {
	private childNode?: SceneNodeBuilder
	private tableValue?: string
	private roleValue?: string
	private nameValue?: string
	private facetValue?: Facet
	private itemIdGenerator?: ItemIdGenerator
	private channelsValue: Channels = {}
	private encodingsValue: MarkEncodings = {}
	private metadataValue?: MarkEncoding<Metadata>

	public constructor(private type: MarkType) {}

	public table(table: string | undefined): MarkBuilder {
		if (typeof table != null) {
			this.tableValue = table
			return this
		} else {
			this.tableValue = undefined
			return this
		}
	}

	public role(role: string | undefined): MarkBuilder {
		this.roleValue = role
		return this
	}

	public name(name: string | undefined): MarkBuilder {
		this.nameValue = name
		return this
	}

	public idGenerator(generator: ItemIdGenerator): MarkBuilder {
		this.itemIdGenerator = generator
		return this
	}

	public metadata(value: MarkEncoding<Metadata> | undefined) {
		if (value != null) {
			this.metadataValue = value
		} else {
			this.metadataValue = undefined
		}
		return this
	}

	public zIndex(zIndex: number | undefined): MarkBuilder {
		if (zIndex !== undefined) {
			this.encode(MarkEncodingKey.zIndex, () => zIndex)
		} else {
			delete this.encodingsValue.zIndex
		}

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
			this.applyHandler(name, handler)
		} else {
			Object.entries(name as Channels).forEach(([nameVal, handlerVal]) =>
				this.applyHandler(nameVal, handlerVal),
			)
		}

		return this
	}

	private applyHandler(key: string, handler: ChannelHandler<any> | undefined) {
		if (handler != null) {
			this.channelsValue[key] = handler
		} else {
			delete this.channelsValue[key]
		}
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
			this.applyEncoding(first as string, encoding)
		} else {
			// Handle encode(map) invocations
			Object.entries(first as MarkEncodings).forEach(
				([name, entryEncoding]) => {
					this.applyEncoding(name, entryEncoding)
				},
			)
			return this
		}
		return this
	}

	private applyEncoding<T>(key: string, encoding: undefined | MarkEncoding<T>) {
		if (encoding != null) {
			this.encodingsValue[key] = encoding
		} else {
			delete this.encodingsValue[key]
		}
	}

	public facet(facet: Facet | undefined): MarkBuilder {
		if (facet !== undefined && this.type !== MarkType.Group) {
			throw new Error('faceting can only be applied to "group" type marks')
		}
		this.facetValue = facet
		return this
	}

	/**
	 * Pushes a new scene node onto the graph
	 */
	public child(callback: (b: SceneNodeBuilder) => void): MarkBuilder {
		this.childNode = new SceneNodeBuilder()
		callback(this.childNode)
		return this
	}

	public build(): Mark {
		const {
			type,
			tableValue: table,
			channelsValue: channels,
			encodingsValue: encodings,
			roleValue: role,
			nameValue: name,
			facetValue: facet,
			childNode,
			itemIdGenerator: idGenerator,
			metadataValue: metadata,
		} = this

		if (!type) {
			throw new Error('mark type must be set')
		}

		return {
			table,
			type,
			channels,
			encodings,
			role,
			name,
			facet,
			idGenerator,
			metadata,
			child: childNode && childNode.build(),
		}
	}
}
