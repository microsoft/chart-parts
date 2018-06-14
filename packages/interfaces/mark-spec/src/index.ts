import { MarkType } from '@gog/mark-interfaces'

/**
 * Specification for rendering a scene
 */
export interface Scene {
	/**
	 * The nodes representing this scene
	 */
	nodes: SceneNode[]
}

/**
 * Each scene node binds data with a set of marks and scales
 */
export interface SceneNode {
	/**
	 * The bound data table for this scene node
	 */
	data: any[]

	/**
	 * The marks that compose this scene
	 */
	marks: Mark[]

	/**
	 * Scale factories used to generate scales, which are used by marks to
	 * transform logical values to screen values
	 */
	scales: NamedScaleCreator[]
}

/**
 * Specification for rendering a mark in a scene
 */
export interface Mark {
	/**
	 * The type of mark to render
	 */
	type: MarkType

	/**
	 * The encodings, which map data values into attribute values
	 */
	encodings: MarkEncodings

	/**
	 * The event channels of the mark to listen to
	 */
	channels: Channels
}

/**
 * An encoding specification for a mark property. This can either be a static
 * primitive or a function that generates the value
 */
export type MarkEncoding =
	| number
	| string
	| boolean
	| ((arg: MarkEncodingFunctionArgs) => any)

/**
 * The arguments used for mark encoding functions
 */
export interface MarkEncodingFunctionArgs {
	/**
	 * The current row of the data to encode.
	 */
	row: any

	/**
	 * The index of the current Row
	 */
	rowIndex: number

	/**
	 * The configured scales, which may be used to transform row data
	 */
	scales: Scales

	/**
	 * The full dataset
	 */
	data: any[]
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
	[key: string]: MarkEncoding
}

export type ChannelHandler = (arg: any) => void

/**
 * A hash of mark event channels by event name
 */
export interface Channels {
	[key: string]: ChannelHandler
}

/**
 * An hash of scale-name to scale-creator functions
 */
export interface NamedScaleCreator {
	name: string
	scaleCreator: ScaleCreator
}

/**
 * A factory function that creates a scale instance.
 */
export type ScaleCreator = (input: CreateScaleArgs) => Scale<any, any>

/**
 * Interface for the scale creation argument object, which is used to
 * create scale instances when a chart drawn or resized.
 */
export interface CreateScaleArgs {
	/**
	 * The rectangle of the entire charting area
	 */
	chartRect: ViewRect

	/**
	 * The rectangle of the area that marks will be drawn in,
	 * This is (chartRect - space reserved for axes)
	 */
	drawRect: ViewRect

	/**
	 * The current set of configured scales
	 */
	scales: Scales

	/**
	 * The dataset to bind with
	 */
	data: any[]
}

/**
 *  Basic interface for a scale, this type does not include some exotic
 * methods that may exist on specific d3-scales.
 */
export type Scale<In, Out> = (input?: In) => Out

/**
 * A view rectangle in the SVG, using SVG Coordinates
 */
export interface ViewRect {
	top: number
	left: number
	bottom: number
	right: number
}
