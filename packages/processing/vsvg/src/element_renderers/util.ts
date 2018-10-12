/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { SGMark, SGItem, VSvgNode } from '@chart-parts/interfaces'

/**
 * Perform an invariant assertion that a mark is of a given type
 * @param mark The mark to inspect
 * @param itemType The expected item type
 */
export function assertTypeIs(mark: SGMark<any>, itemType: string) {
	if (mark.marktype !== itemType) {
		throw new Error(`
            Tried to render a mark with the incorrect mark renderer. 
            Mark must be of type ${itemType}.
        `)
	}
}

function roleClass(role?: string) {
	return `role-${role || 'mark'}`
}

/**
 *
 * @param marktype
 * @param children
 */
export function emitMarkGroup(
	marktype: string,
	role: string | undefined,
	children: VSvgNode[],
): VSvgNode[] {
	const markGroup: VSvgNode = {
		type: 'g',
		attrs: {
			className: `mark-${marktype} ${roleClass(role)}`,
		},
		children,
	}
	return [markGroup]
}

/**
 * Copies shared vsvg props from the given mark into the vsvg node
 * @param item The mark item to copy from
 * @param result The vsvg node to copy into
 */
export function commonProps(item: SGItem): any {
	const result: { [key: string]: any } = {}

	if (item.fill !== undefined) {
		result.fill = item.fill
	}

	if (item.fillOpacity !== undefined) {
		result.fillOpacity = item.fillOpacity
	}

	if (item.stroke !== undefined) {
		result.stroke = item.stroke
	}

	result.strokeWidth = item.strokeWidth || 1

	if (item.strokeOpacity !== undefined) {
		result.strokeOpacity = item.strokeOpacity
	}

	if (item.strokeJoin !== undefined) {
		result.strokeLinejoin = item.strokeJoin
	}

	if (item.strokeCap !== undefined) {
		result.strokeLinecap = item.strokeCap
	}

	if (item.strokeDash !== undefined) {
		result.strokeDasharray = item.strokeDash
	}

	if (item.strokeDashOffset !== undefined) {
		result.strokeDashoffset = item.strokeDashOffset
	}

	if (item.tabIndex !== undefined) {
		result.tabIndex = item.tabIndex
	}
	return result
}
