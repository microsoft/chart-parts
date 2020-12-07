/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

export function randomBetween(minValue: number, maxValue: number): number {
	return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
}
