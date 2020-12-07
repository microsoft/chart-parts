/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import { MarkEncoding, Facet } from '@chart-parts/interfaces'

export const encodeCategoryAriaTitle: MarkEncoding<string> = ({ d }): any =>
	`Category ${d.key}`
export const encodeCategoryAriaDescription: MarkEncoding<string> = ({
	d,
}: any) => `Category ${d.key} value is ${d.value}`

export function useGroupByFaceting(groupBy: string | undefined): Facet {
	return useMemo(() => ({ name: 'facet', groupBy }), [groupBy])
}
