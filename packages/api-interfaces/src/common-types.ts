/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * An enumeration for the possible mark types.
 * Possible values are
 * 	'arc',
 *  'area',
 *  'group',
 *  'image',
 *  'line',
 *  'path',
 *  'rect',
 *  'rule',
 *  'symbol',
 *  'text', and
 *  'trail'.
 */
export enum MarkType {
	Arc = 'arc',
	Area = 'area',
	Group = 'group',
	Image = 'image',
	Line = 'line',
	Path = 'path',
	Rect = 'rect',
	Rule = 'rule',
	Symbol = 'symbol',
	Text = 'text',
	Trail = 'trail',
	Shape = 'shape',
}

export type FontWeight =
	| 'normal'
	| 'bold'
	| 'bolder'
	| 'lighter'
	| '100'
	| '200'
	| '300'
	| '400'
	| '500'
	| '600'
	| '700'
	| '800'
	| '900'

/**
 * An enumeration for area marks. May be 'horizontal' or 'vertical'
 */
export enum Orientation {
	Horizontal = 'horizontal',
	Vertical = 'vertical',
}

/**
 * Line interpolation types. These define if and how curves are
 * smoothed in line, area, and stream marks.
 */
export enum Interpolation {
	Basis = 'basis',
	Bundle = 'bundle',
	Cardinal = 'cardinal',
	CatmullRom = 'catmull-rom',
	Linear = 'linear',
	Monotone = 'monotone',
	Natural = 'natural',
	step = 'step',
	stepAfter = 'step-after',
	stepBefore = 'step-before',
}

/**
 * Horizontal Alignment parameter for marks. Mostly useful for Text marks.
 */
export enum HorizontalAlignment {
	Left = 'left',
	Center = 'center',
	Right = 'right',
}

/**
 * Vertical Alignment enumeration for marks (Image and Text)
 */
export enum VerticalAlignment {
	Top = 'top',
	Middle = 'middle',
	Bottom = 'bottom',
}

/**
 * Vertical Text Alignment parameter for Text marks.
 */
export enum VerticalTextAlignment {
	Alphabetic = 'alphabetic',
	Top = 'top',
	Middle = 'middle',
	Bottom = 'bottom',
}

/**
 * An enumeration of the kinds of symbols the Symbol mark may represent.
 */
export enum SymbolType {
	Circle = 'circle',
	Square = 'square',
	Cross = 'cross',
	Diamond = 'diamond',
	TriangleUp = 'triangle-up',
	TriangleDown = 'triangle-down',
	TriangleRight = 'triangle-right',
	TriangleLeft = 'triangle-left',
}

/**
 * An enumeration of the TextDirection values for Text marks.
 */
export enum TextDirection {
	LTR = 'ltr',
	RTL = 'rtl',
}

/**
 * Stroke-cap style for Marks with lines.
 */
export enum StrokeCap {
	Butt = 'butt',
	Round = 'round',
	Square = 'square',
}

/**
 * Stroke-join style for Marks with lines.
 */
export enum StrokeJoin {
	Miter = 'miter',
	Round = 'round',
	Bevel = 'bevel',
}

export interface Gradient {
	id: string
	x1: number
	y1: number
	x2: number
	y2: number
	stops: GradientStop[]
}

export interface GradientStop {
	color: string
	offset: number
}
