import { MarkType } from '@gog/mark-interfaces'

/**
 * Specification for rendering a scene
 */
export interface SceneSpec {
	/**
	 * The marks that compose this scene
	 */
	marks: MarkSpec[]

	/**
	 * Scale factories used to generate scales, which are used by marks to
	 * transform logical values to screen values
	 */
	scales: NamedScaleCreator[]
}

/**
 * Specification for rendering a mark in a scene
 */
export interface MarkSpec {
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
	channels: MarkChannels
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
	 * The configured scales, which may be used to transform row data
	 */
	scales: Scales
}

/**
 * When they appear in the scale map config, a scale is just a function that can
 * trasform a source domain to a target domain, where each domain can be of any
 * primitive type
 */
export interface Scales {
	[key: string]: Transformer<any, any>
}

/**
 * A hash of mark encodings by property name
 */
export interface MarkEncodings {
	[key: string]: MarkEncoding
}

/**
 * A hash of mark event channels by event name
 */
export interface MarkChannels {
	[key: string]: (arg: any) => void
}

/**
 * An hash of scale-name to scale-creator functions
 */
export interface NamedScaleCreator {
	name: string
	scaleCreator: ScaleCreator<any>
}

/**
 * A factory function that creates a scale instance.
 */
export type ScaleCreator<Datum> = (
	input: ScaleCreatorArgs<Datum>,
) => Transformer<any, any>

/**
 * Interface for the scale creation argument object, which is used to
 * create scale instances when a chart drawn or resized.
 */
export interface ScaleCreatorArgs<Datum> {
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
	 * The data to evaluate when creating the scale
	 */
	data: Datum[]

	/**
	 * The current set of configured scales
	 */
	scales: Scales
}

/**
 *  Basic interface for a scale, this type does not include some exotic
 * methods that may exist on specific d3-scales.
 */
export type Transformer<In, Out> = (input?: In) => Out

/**
 * A view rectangle in the SVG, using SVG Coordinates
 */
export interface ViewRect {
	top: number
	left: number
	bottom: number
	right: number
}
