/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import { CategoryData, ProcessedCategoryData } from '../types'

export function useDataGroupSorted(
	groupBy: string | undefined,
	data: CategoryData[],
): ProcessedCategoryData[] {
	return useMemo(() => {
		// calculate position for each category based on groupBy prop
		const categorized = data.reduce((acc: any, datapoint: CategoryData) => {
			const value = groupBy ? datapoint[groupBy] : 'default'
			const d = { ...datapoint, _category: value }
			if (acc[value]) {
				acc[value].push(d)
			} else {
				acc[value] = [d]
			}
			return acc
		}, {})
		const posCatagories = Object.values(categorized).reduce(
			(acc: any, d: any) => {
				const sortByKey = d.sort((a: any, b: any) => a.key - b.key)
				sortByKey.forEach((item: any) => acc.push(item))
				return acc
			},
			[],
		) as any
		return posCatagories
	}, [data, groupBy]) as ProcessedCategoryData[]
}
