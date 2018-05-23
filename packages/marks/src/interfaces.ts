export enum Orientation {
	HORIZONTAL = 'horizontal',
	VERTICAL = 'vertical',
}

export enum Interpolation {
	BASIS = 'basis',
	BUNDLE = 'bundle',
	CARDINAL = 'cardinal',
	CATMULL_ROM = 'catmull-rom',
	LINEAR = 'linear',
	MONOTONE = 'monotone',
	NATURAL = 'natural',
	STEP = 'step',
	STEP_AFTER = 'step-after',
	STEP_BEFORE = 'step-before',
}

export enum HorizontalAlignment {
	LEFT = 'left',
	CENTER = 'center',
	RIGHT = 'right',
}

export enum VerticalAlignment {
	TOP = 'top',
	MIDDLE = 'middle',
	BOTTOM = 'bottom',
}

export enum VerticalTextAlignment {
	ALPHABETIC = 'alphabetic',
	TOP = 'top',
	MIDDLE = 'middle',
	BOTTOM = 'bottom',
}

export const INTERPOLATION_DEFAULT_TENSIONS = {
	[Interpolation.BUNDLE]: 0.8,
	[Interpolation.CARDINAL]: 0,
	[Interpolation.CATMULL_ROM]: 0.5,
}

export enum SymbolType {
	CIRCLE = 'circle',
	SQUARE = 'square',
	CROSS = 'cross',
	DIAMOND = 'diamond',
	TRIANGLE_UP = 'triangle-up',
	TRIANGLE_DOWN = 'triangle-down',
	TRIANGLE_RIGHT = 'triangle-right',
	TRIANGLE_LEFT = 'triangle-left',
}

export enum TextDirection {
	LTR = 'ltr',
	RTL = 'rtl',
}
