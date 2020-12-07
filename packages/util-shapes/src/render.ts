/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { segments } from './arc'
const temp = ['l', 0, 0, 0, 0, 0, 0, 0]

function scale(current: any, s: any) {
	const c = (temp[0] = current[0])
	if (c === 'a' || c === 'A') {
		temp[1] = s * current[1]
		temp[2] = s * current[2]
		temp[6] = s * current[6]
		temp[7] = s * current[7]
	} else {
		for (let i = 1, n = current.length; i < n; ++i) {
			temp[i] = s * current[i]
		}
	}
	return temp
}

export function renderPath(context: any, path: any, l: any, t: any, s: any) {
	let current // current instruction
	let previous = null
	let x = 0 // current x
	let y = 0 // current y
	let controlX = 0 // current control point x
	let controlY = 0 // current control point y
	let tempX
	let tempY
	let tempControlX
	let tempControlY

	if (l == null) {
		l = 0
	}
	if (t == null) {
		t = 0
	}
	if (s == null) {
		s = 1
	}

	if (context.beginPath) {
		context.beginPath()
	}

	for (let i = 0, len = path.length; i < len; ++i) {
		current = path[i]
		if (s !== 1) {
			current = scale(current, s)
		}

		switch (
			current[0] // first letter
		) {
			case 'l': // lineto, relative
				x += current[1]
				y += current[2]
				context.lineTo(x + l, y + t)
				break

			case 'L': // lineto, absolute
				x = current[1]
				y = current[2]
				context.lineTo(x + l, y + t)
				break

			case 'h': // horizontal lineto, relative
				x += current[1]
				context.lineTo(x + l, y + t)
				break

			case 'H': // horizontal lineto, absolute
				x = current[1]
				context.lineTo(x + l, y + t)
				break

			case 'v': // vertical lineto, relative
				y += current[1]
				context.lineTo(x + l, y + t)
				break

			case 'V': // verical lineto, absolute
				y = current[1]
				context.lineTo(x + l, y + t)
				break

			case 'm': // moveTo, relative
				x += current[1]
				y += current[2]
				context.moveTo(x + l, y + t)
				break

			case 'M': // moveTo, absolute
				x = current[1]
				y = current[2]
				context.moveTo(x + l, y + t)
				break

			case 'c': // bezierCurveTo, relative
				tempX = x + current[5]
				tempY = y + current[6]
				controlX = x + current[3]
				controlY = y + current[4]
				context.bezierCurveTo(
					x + current[1] + l, // x1
					y + current[2] + t, // y1
					controlX + l, // x2
					controlY + t, // y2
					tempX + l,
					tempY + t,
				)
				x = tempX
				y = tempY
				break

			case 'C': // bezierCurveTo, absolute
				x = current[5]
				y = current[6]
				controlX = current[3]
				controlY = current[4]
				context.bezierCurveTo(
					current[1] + l,
					current[2] + t,
					controlX + l,
					controlY + t,
					x + l,
					y + t,
				)
				break

			case 's': // shorthand cubic bezierCurveTo, relative
				// transform to absolute x,y
				tempX = x + current[3]
				tempY = y + current[4]
				// calculate reflection of previous control points
				controlX = 2 * x - controlX
				controlY = 2 * y - controlY
				context.bezierCurveTo(
					controlX + l,
					controlY + t,
					x + current[1] + l,
					y + current[2] + t,
					tempX + l,
					tempY + t,
				)

				// set control point to 2nd one of this command
				// the first control point is assumed to be the reflection of
				// the second control point on the previous command relative
				// to the current point.
				controlX = x + current[1]
				controlY = y + current[2]

				x = tempX
				y = tempY
				break

			case 'S': // shorthand cubic bezierCurveTo, absolute
				tempX = current[3]
				tempY = current[4]
				// calculate reflection of previous control points
				controlX = 2 * x - controlX
				controlY = 2 * y - controlY
				context.bezierCurveTo(
					controlX + l,
					controlY + t,
					current[1] + l,
					current[2] + t,
					tempX + l,
					tempY + t,
				)
				x = tempX
				y = tempY
				// set control point to 2nd one of this command
				// the first control point is assumed to be the reflection of
				// the second control point on the previous command relative
				// to the current point.
				controlX = current[1]
				controlY = current[2]

				break

			case 'q': // quadraticCurveTo, relative
				// transform to absolute x,y
				tempX = x + current[3]
				tempY = y + current[4]

				controlX = x + current[1]
				controlY = y + current[2]

				context.quadraticCurveTo(
					controlX + l,
					controlY + t,
					tempX + l,
					tempY + t,
				)
				x = tempX
				y = tempY
				break

			case 'Q': // quadraticCurveTo, absolute
				tempX = current[3]
				tempY = current[4]

				context.quadraticCurveTo(
					current[1] + l,
					current[2] + t,
					tempX + l,
					tempY + t,
				)
				x = tempX
				y = tempY
				controlX = current[1]
				controlY = current[2]
				break

			case 't': // shorthand quadraticCurveTo, relative
				// transform to absolute x,y
				tempX = x + current[1]
				tempY = y + current[2]

				if (previous[0].match(/[QqTt]/) === null) {
					// If there is no previous command or if the previous command was not a Q, q, T or t,
					// assume the control point is coincident with the current point
					controlX = x
					controlY = y
				} else if (previous[0] === 't') {
					// calculate reflection of previous control points for t
					controlX = 2 * x - (tempControlX as number)
					controlY = 2 * y - (tempControlY as number)
				} else if (previous[0] === 'q') {
					// calculate reflection of previous control points for q
					controlX = 2 * x - controlX
					controlY = 2 * y - controlY
				}

				tempControlX = controlX
				tempControlY = controlY

				context.quadraticCurveTo(
					controlX + l,
					controlY + t,
					tempX + l,
					tempY + t,
				)
				x = tempX
				y = tempY
				controlX = x + current[1]
				controlY = y + current[2]
				break

			case 'T':
				tempX = current[1]
				tempY = current[2]

				// calculate reflection of previous control points
				controlX = 2 * x - controlX
				controlY = 2 * y - controlY
				context.quadraticCurveTo(
					controlX + l,
					controlY + t,
					tempX + l,
					tempY + t,
				)
				x = tempX
				y = tempY
				break

			case 'a':
				drawArc(context, x + l, y + t, [
					current[1],
					current[2],
					current[3],
					current[4],
					current[5],
					current[6] + x + l,
					current[7] + y + t,
				])
				x += current[6]
				y += current[7]
				break

			case 'A':
				drawArc(context, x + l, y + t, [
					current[1],
					current[2],
					current[3],
					current[4],
					current[5],
					current[6] + l,
					current[7] + t,
				])
				x = current[6]
				y = current[7]
				break

			case 'z':
			case 'Z':
				context.closePath()
				break
		}
		previous = current
	}
}

function drawArc(context: any, x: any, y: any, coords: any) {
	const seg = segments(
		coords[5], // end x
		coords[6], // end y
		coords[0], // radius x
		coords[1], // radius y
		coords[3], // large flag
		coords[4], // sweep flag
		coords[2], // rotation
		x,
		y,
	)
	seg.forEach((bez: any) => {
		context.bezierCurveTo(bez[0], bez[1], bez[2], bez[3], bez[4], bez[5])
	})
}
