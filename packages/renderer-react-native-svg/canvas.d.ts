/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

///// <reference no-default-lib="true"/>

/////////////////////////////
/// Canvas DOM APIs
/////////////////////////////

interface SVGMatrix {
	a: number
	b: number
	c: number
	d: number
	e: number
	f: number
	flipX(): SVGMatrix
	flipY(): SVGMatrix
	inverse(): SVGMatrix
	multiply(secondMatrix: SVGMatrix): SVGMatrix
	rotate(angle: number): SVGMatrix
	rotateFromVector(x: number, y: number): SVGMatrix
	scale(scaleFactor: number): SVGMatrix
	scaleNonUniform(scaleFactorX: number, scaleFactorY: number): SVGMatrix
	skewX(angle: number): SVGMatrix
	skewY(angle: number): SVGMatrix
	translate(x: number, y: number): SVGMatrix
}

interface TextMetrics {
	readonly width: number
}

interface CanvasGradient {
	addColorStop(offset: number, color: string): void
}

declare var CanvasGradient: {
	prototype: CanvasGradient
	new (): CanvasGradient
}

interface CanvasPattern {
	setTransform(matrix: SVGMatrix): void
}

declare var CanvasPattern: {
	prototype: CanvasPattern
	new (): CanvasPattern
}

type CanvasFillRule = 'nonzero' | 'evenodd'

interface Path2D extends CanvasPathMethods {}

interface CanvasRenderingContext2D extends Object, CanvasPathMethods {
	readonly canvas: any
	fillStyle: string | CanvasGradient | CanvasPattern
	font: string
	globalAlpha: number
	globalCompositeOperation: string
	imageSmoothingEnabled: boolean
	lineCap: string
	lineDashOffset: number
	lineJoin: string
	lineWidth: number
	miterLimit: number
	msFillRule: CanvasFillRule
	shadowBlur: number
	shadowColor: string
	shadowOffsetX: number
	shadowOffsetY: number
	strokeStyle: string | CanvasGradient | CanvasPattern
	textAlign: string
	textBaseline: string
	mozImageSmoothingEnabled: boolean
	webkitImageSmoothingEnabled: boolean
	oImageSmoothingEnabled: boolean
	beginPath(): void
	clearRect(x: number, y: number, w: number, h: number): void
	clip(fillRule?: CanvasFillRule): void
	clip(path: Path2D, fillRule?: CanvasFillRule): void
	createImageData(imageDataOrSw: number | any, sh?: number): any // ImageData
	createLinearGradient(
		x0: number,
		y0: number,
		x1: number,
		y1: number,
	): CanvasGradient
	createPattern(image: any, repetition: string): CanvasPattern
	createRadialGradient(
		x0: number,
		y0: number,
		r0: number,
		x1: number,
		y1: number,
		r1: number,
	): CanvasGradient
	drawFocusIfNeeded(element: any): void
	drawImage(image: any, dstX: number, dstY: number): void
	drawImage(
		image: any,
		dstX: number,
		dstY: number,
		dstW: number,
		dstH: number,
	): void
	drawImage(
		image: any,
		srcX: number,
		srcY: number,
		srcW: number,
		srcH: number,
		dstX: number,
		dstY: number,
		dstW: number,
		dstH: number,
	): void
	fill(fillRule?: CanvasFillRule): void
	fill(path: Path2D, fillRule?: CanvasFillRule): void
	fillRect(x: number, y: number, w: number, h: number): void
	fillText(text: string, x: number, y: number, maxWidth?: number): void
	getImageData(sx: number, sy: number, sw: number, sh: number): any
	getLineDash(): number[]
	isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean
	isPointInPath(
		path: Path2D,
		x: number,
		y: number,
		fillRule?: CanvasFillRule,
	): boolean
	measureText(text: string): TextMetrics
	putImageData(
		imagedata: any,
		dx: number,
		dy: number,
		dirtyX?: number,
		dirtyY?: number,
		dirtyWidth?: number,
		dirtyHeight?: number,
	): void
	restore(): void
	rotate(angle: number): void
	save(): void
	scale(x: number, y: number): void
	setLineDash(segments: number[]): void
	setTransform(
		m11: number,
		m12: number,
		m21: number,
		m22: number,
		dx: number,
		dy: number,
	): void
	stroke(path?: Path2D): void
	strokeRect(x: number, y: number, w: number, h: number): void
	strokeText(text: string, x: number, y: number, maxWidth?: number): void
	transform(
		m11: number,
		m12: number,
		m21: number,
		m22: number,
		dx: number,
		dy: number,
	): void
	translate(x: number, y: number): void
}

declare var CanvasRenderingContext2D: {
	prototype: CanvasRenderingContext2D
	new (): CanvasRenderingContext2D
}

interface CanvasPathMethods {
	arc(
		x: number,
		y: number,
		radius: number,
		startAngle: number,
		endAngle: number,
		anticlockwise?: boolean,
	): void
	arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void
	bezierCurveTo(
		cp1x: number,
		cp1y: number,
		cp2x: number,
		cp2y: number,
		x: number,
		y: number,
	): void
	closePath(): void
	ellipse(
		x: number,
		y: number,
		radiusX: number,
		radiusY: number,
		rotation: number,
		startAngle: number,
		endAngle: number,
		anticlockwise?: boolean,
	): void
	lineTo(x: number, y: number): void
	moveTo(x: number, y: number): void
	quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void
	rect(x: number, y: number, w: number, h: number): void
}
