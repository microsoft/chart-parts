/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	Gradient,
	StrokeCap,
	StrokeJoin,
	Orientation,
	Interpolation,
	HorizontalAlignment,
	VerticalAlignment,
	VerticalTextAlignment,
	SymbolType,
	TextDirection,
	FontWeight,
} from '../common-types'
import { Axis } from './axes'
import { Metadata } from '../scenegraph'

export enum MarkEncodingKey {
	// Common encoding keys
	x = 'x',
	x2 = 'x2',
	xc = 'xc',
	y = 'y',
	y2 = 'y2',
	yc = 'yc',
	width = 'width',
	height = 'height',
	opacity = 'opacity',
	fill = 'fill',
	fillOpacity = 'fillOpacity',
	stroke = 'stroke',
	strokeOpacity = 'strokeOpacity',
	strokeWidth = 'strokeWidth',
	strokeCap = 'strokeCap',
	strokeDash = 'strokeDash',
	strokeDashOffset = 'strokeDashOffset',
	strokeJoin = 'strokeJoin',
	strokeMiterLimit = 'strokeMiterLimit',
	cursor = 'cursor',
	href = 'href',
	tooltip = 'tooltip',
	zIndex = 'zIndex',

	// Arc encoding keys
	startAngle = 'startAngle',
	endAngle = 'endAngle',
	padAngle = 'padAngle',
	innerRadius = 'innerRadius',
	outerRadius = 'outerRadius',
	cornerRadius = 'cornerRadius',

	// Area encoding keys
	orient = 'orient',
	interpolate = 'interpolate',
	tension = 'tension',
	defined = 'defined',

	// Group encoding keys
	clip = 'clip',

	// Image encoding keys
	url = 'url',
	aspect = 'aspect',
	align = 'align',
	baseline = 'baseline',

	// Path encoding keys
	path = 'path',

	// Symbol encoding keys
	size = 'size',
	shape = 'shape',

	// Text encoding keys
	angle = 'angle',
	dir = 'dir',
	dx = 'dx',
	dy = 'dy',
	ellipsis = 'ellipsis',
	font = 'font',
	fontSize = 'fontSize',
	fontWeight = 'fontWeight',
	fontVariant = 'fontVariant',
	fontStyle = 'fontStyle',
	limit = 'limit',
	radius = 'radius',
	text = 'text',
	theta = 'theta',

	// Accessibility keys
	ariaTitle = 'aria-title',
	ariaDescription = 'aria-description',
	tabIndex = 'tab-index',

	// Metadata
	metadata = 'metadata',
}

/**
 * Each scene node binds data with a set of marks and scales
 */
export interface SceneNode {
	/**
	 * The scales defined at this scene node
	 */
	scales: ScaleCreator[]

	/**
	 * The marks defined at this scene-node. Scales defined in this node apply to these marks
	 */
	marks: Mark[]

	/**
	 * The axes defined at this level
	 */
	axes: Axis[]
}

export type ItemIdGenerator = (d: any, index: number, table: any[]) => string

/**
 * Specification for rendering a mark in a scene
 */
export interface Mark {
	/**
	 * The type of mark to render
	 */
	type: MarkType

	/**
	 * The name of the data-table to bind this mark to. If mark or facet is not defined, the mark
	 * will render as a single instance.
	 */
	table?: string

	/**
	 * Optional generator for item ids. If this is unset, then the index of the item will be used
	 */
	idGenerator?: ItemIdGenerator

	/**
	 * The encodings, which map data values into attribute values
	 */
	encodings: MarkEncodings

	/**
	 * The event channels of the mark to listen to
	 */
	channels: Channels

	/**
	 * The role of this mark
	 */
	role?: string

	/**
	 * A helpful name for this mark
	 */
	name?: string

	/**
	 * For group marks, an optional parameter on data faceting
	 */
	facet?: Facet

	/**
	 * The child scene of this mark
	 */
	child?: SceneNode
}

/**
 * A single data tuple.
 */
export type Datum = any

/**
 * A table of data
 */
export type Table = Datum[]

/**
 * Faceting configuration to apply on incoming data
 */
export interface Facet {
	/**
	 * The name of the facet-tables that dowstream marks will see
	 */
	name: string

	/**
	 * The name to use for the group mark's bound-data row in the context of
	 * facet encoding. If the group mark has a bound data row, it will be mapped to
	 * a facet partition using the facet's group-by mechanism. If the group is not
	 * bound to a data row, it will be bound to the data facet partitions.
	 */
	keyRowName?: string

	/**
	 * The name of the source table to generate facets from. If not defined,
	 * then the parent table will be used
	 */
	table?: string

	/**
	 * For data-driven facets, an array of field names by which to partition the data.
	 * This property is required if using data-driven facets.
	 */
	groupBy?: string | string[] | ((row: any) => any)

	/**
	 * Data transformation to apply on data partitions after partitioning
	 */
	transform?: (data: any[]) => any[]
}

export interface EncodingContext {
	/**
	 * The current datum to encode, e.g. a row in the bound data array.
	 */
	d: Datum

	/**
	 * The index of the datum within the data collection
	 */
	index: number

	/**
	 * The dimensions of the current working view (e.g. Chart-Dimensions or
	 * current Group Dimensions)
	 */
	view: ViewSize

	/**
	 * Named data tables, datum instances, and scales..
	 *
	 * The data tables are a combination of the source dataset and any faceting
	 * tables created at this point. Nomed datums are generated from faceting
	 * when the parent row is named.
	 */
	[key: string]: Datum | Table | Scale<any, any>
}

export type MarkEncoding<T> = T | ((ctx: EncodingContext) => T)

export enum Dimension {
	Height = 'height',
	Width = 'width',
}

/**
 * When they appear in the scale map config, a scale is just a function that can
 * trasform a source domain to a target domain, where each domain can be of any
 * primitive type
 */
export interface Scales {
	[key: string]: Scale<any, any>
}

/**
 * A hash of mark encodings by property name
 */
export interface MarkEncodings {
	[MarkEncodingKey.x]?: MarkEncoding<number>
	[MarkEncodingKey.x2]?: MarkEncoding<number>
	[MarkEncodingKey.xc]?: MarkEncoding<number>
	[MarkEncodingKey.width]?: MarkEncoding<number>
	[MarkEncodingKey.y]?: MarkEncoding<number>
	[MarkEncodingKey.y2]?: MarkEncoding<number>
	[MarkEncodingKey.yc]?: MarkEncoding<number>
	[MarkEncodingKey.height]?: MarkEncoding<number>
	[MarkEncodingKey.opacity]?: MarkEncoding<number>
	[MarkEncodingKey.fill]?: MarkEncoding<string | Gradient>
	[MarkEncodingKey.fillOpacity]?: MarkEncoding<number>
	[MarkEncodingKey.stroke]?: MarkEncoding<string | Gradient>
	[MarkEncodingKey.strokeOpacity]?: MarkEncoding<number>
	[MarkEncodingKey.strokeWidth]?: MarkEncoding<number>
	[MarkEncodingKey.strokeCap]?: MarkEncoding<StrokeCap>
	[MarkEncodingKey.strokeDash]?: MarkEncoding<[number, number]>
	[MarkEncodingKey.strokeDashOffset]?: MarkEncoding<number>
	[MarkEncodingKey.strokeJoin]?: MarkEncoding<StrokeJoin>
	[MarkEncodingKey.strokeMiterLimit]?: MarkEncoding<number>
	[MarkEncodingKey.cursor]?: MarkEncoding<string>
	[MarkEncodingKey.href]?: MarkEncoding<string>
	[MarkEncodingKey.tooltip]?: MarkEncoding<string>
	[MarkEncodingKey.zIndex]?: MarkEncoding<number>

	[MarkEncodingKey.startAngle]?: MarkEncoding<number>
	[MarkEncodingKey.endAngle]?: MarkEncoding<number>
	[MarkEncodingKey.padAngle]?: MarkEncoding<number>
	[MarkEncodingKey.innerRadius]?: MarkEncoding<number>
	[MarkEncodingKey.outerRadius]?: MarkEncoding<number>
	[MarkEncodingKey.cornerRadius]?: MarkEncoding<number>
	[MarkEncodingKey.orient]?: MarkEncoding<Orientation>
	[MarkEncodingKey.interpolate]?: MarkEncoding<Interpolation>
	[MarkEncodingKey.tension]?: MarkEncoding<number>
	[MarkEncodingKey.defined]?: MarkEncoding<boolean>
	[MarkEncodingKey.clip]?: MarkEncoding<boolean>
	[MarkEncodingKey.url]?: MarkEncoding<string>
	[MarkEncodingKey.aspect]?: MarkEncoding<boolean>
	[MarkEncodingKey.align]?: MarkEncoding<HorizontalAlignment>
	[MarkEncodingKey.baseline]?: MarkEncoding<
		VerticalAlignment | VerticalTextAlignment
	>
	[MarkEncodingKey.path]?: MarkEncoding<string>
	[MarkEncodingKey.size]?: MarkEncoding<number>
	[MarkEncodingKey.shape]?: MarkEncoding<SymbolType | string>
	[MarkEncodingKey.angle]?: MarkEncoding<number>
	[MarkEncodingKey.dir]?: MarkEncoding<TextDirection>
	[MarkEncodingKey.dx]?: MarkEncoding<number>
	[MarkEncodingKey.dy]?: MarkEncoding<number>
	[MarkEncodingKey.ellipsis]?: MarkEncoding<string>
	[MarkEncodingKey.font]?: MarkEncoding<string>
	[MarkEncodingKey.fontSize]?: MarkEncoding<number>
	[MarkEncodingKey.fontWeight]?: MarkEncoding<FontWeight>
	[MarkEncodingKey.fontVariant]?: MarkEncoding<string | number>
	[MarkEncodingKey.fontStyle]?: MarkEncoding<number>
	[MarkEncodingKey.limit]?: MarkEncoding<number>
	[MarkEncodingKey.radius]?: MarkEncoding<number>
	[MarkEncodingKey.text]?: MarkEncoding<string>
	[MarkEncodingKey.theta]?: MarkEncoding<number>

	[MarkEncodingKey.metadata]?: MarkEncoding<Metadata>

	// catch all, and to allow indexing
	[key: string]: MarkEncoding<any> | undefined
}

export type ChannelHandler<T> = (eventArg: Metadata & { event: T }) => void

/**
 * A hash of mark event channels by event name
 */
export interface Channels {
	[key: string]: ChannelHandler<any>
}

/**
 * A factory function that creates a scale instance.
 */
export type ScaleCreator = (input: ScaleCreationContext) => Scales

export interface ScaleBuilder {
	build: ScaleCreator
}

/**
 * Interface for the scale creation argument object, which is used to
 * create scale instances when a chart drawn or resized.
 */
export interface ScaleCreationContext {
	/**
	 * The current view size
	 */
	view: ViewSize

	/**
	 * The rectangle of the area that marks will be drawn in,
	 * This is (chartRect minus space reserved for axes)
	 */
	viewBounds: {
		x: [number, number]
		y: [number, number]
	}

	/**
	 * The current set of configured scales
	 */
	scales: Scales

	/**
	 * The dataset to bind with
	 */
	data: DataFrame
}

/**
 *  Basic interface for a scale, this type does not include some exotic
 * methods that may exist on specific d3-scales.
 */
export interface Scale<In, Out> {
	(input?: In): Out

	range?: () => Out[]
	domain?: () => In[]
	ticks?: any
	tickFormat?: any
	bandwidth?: any

	/**
	 * The kind of scale this is, used for downstream logic (e.g. utc, time, etc..)
	 */
	__scaletype__?: string
}

/**
 * A view rectangle in the SVG, using SVG Coordinates
 */
export interface ViewSize {
	width: number
	height: number
}

/**
 * Named tables and rows for various encoding contexts
 */
export interface DataFrame {
	[key: string]: Table | Datum
}

export interface ChannelNames {
	[key: string]: string
}
