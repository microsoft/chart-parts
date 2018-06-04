import { SGMark, SGItem } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'

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
export function copyCommonProps(item: SGItem, result: VSvgNode): void {
	if (item.fill !== undefined) {
		result.attrs.fill = item.fill
	}

	if (item.fillOpacity !== undefined) {
		result.attrs.fillOpacity = item.fillOpacity
	}

	if (item.stroke !== undefined) {
		result.attrs.stroke = item.stroke
	}

	if (item.strokeWidth !== undefined) {
		result.attrs.strokeWidth = item.strokeWidth
	}

	if (item.strokeOpacity !== undefined) {
		result.attrs.strokeOpacity = item.strokeOpacity
	}

	if (item.strokeJoin !== undefined) {
		result.attrs.strokeLinejoin = item.strokeJoin
	}

	if (item.strokeCap !== undefined) {
		result.attrs.strokeLinecap = item.strokeCap
	}

	if (item.strokeDash !== undefined) {
		result.attrs.strokeDasharray = item.strokeDash
	}

	if (item.strokeDashOffset !== undefined) {
		result.attrs.strokeDashoffset = item.strokeDashOffset
	}
}
