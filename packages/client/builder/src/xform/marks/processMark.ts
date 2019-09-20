/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Mark, Facet, SGItem, SGMark, DataFrame } from '@chart-parts/interfaces'
import { createMark } from '@chart-parts/scenegraph'
import { SceneFrame } from '../context/SceneFrame'
import { createBoundItem } from './createBoundItem'

/**
 * @ignore
 */
export interface FacetedData {
	name: string
	keyRowName?: string
	facets: DataFacet[]
}

/**
 * @ignore
 */
export interface DataFacet {
	parent?: any
	key: string
	data: any[]
}

type BoundData = any[] | FacetedData

/**
 * @ignore
 */
export function processMark(mark: Mark, frame: SceneFrame): SGMark<SGItem> {
	const markFrame = frame.pushMark(mark)
	const boundData = getBoundData(mark, markFrame)
	const items = createItems(markFrame, boundData)
	return createMark(mark.type, items)
}

function createItems(frame: SceneFrame, boundData: BoundData): SGItem[] {
	if (Array.isArray(boundData)) {
		return createItemPerDataRow(frame, boundData)
	}

	return createItemPerFacet(frame, boundData)
}

/**
 * Creates one scenegraph item per facet partition
 *
 * @param frame The current scene frame
 * @param partitions the item faceting configuration
 */
function createItemPerFacet(
	frame: SceneFrame,
	{ name, keyRowName, facets }: FacetedData,
) {
	return facets.map((facet, index) => {
		const newData: DataFrame = {
			[name]: facet.data,
		}
		if (keyRowName) {
			newData[keyRowName] = facet.parent
		}
		const facetFrame = frame.pushData(newData, facet.key)
		return createBoundItem(
			facetFrame,
			facet.parent || facet.data,
			index,
			facets,
		)
	})
}

/**
 * Creates one sceengraph item per row in a data-table
 * @param frame The current scene frame
 * @param data The data table
 */
function createItemPerDataRow(frame: SceneFrame, data: any[]) {
	return data.map((row, index) => createBoundItem(frame, row, index, data))
}

/**
 * Gets the bound data for a mark.
 * * If the mark is a singleton, this will return an array with a single sentinel object.
 * * If the mark is not faceted, this will return the source table specified by the mark
 * * If the mark is faceted, this will return a partition set, with data for each facet partition.
 *
 * @param mark The mark to bind data to
 * @param dataFrame The current data-frame, which provides data-sets at this scope
 */
function getBoundData(mark: Mark, frame: SceneFrame): BoundData {
	const { table, facet } = mark

	// If the table is unset, render as a singleton of the existing bound data-item
	const isSingleton = !table && !facet
	if (isSingleton) {
		return [frame.boundDataItem]
	}

	if (!table) {
		throw new Error('table must be set when facet is set')
	}

	const sourceTable = frame.data[table]
	if (facet) {
		const facetSourceTable = facet.table || table
		if (!facetSourceTable) {
			throw new Error('mark does not have table or faceting table defined')
		}
		if (!facet.groupBy) {
			throw new Error('faceting must groupBy defined')
		}
		const facetSource = frame.data[facetSourceTable]
		const result = createFacetedData(facet, facetSource, sourceTable)
		return result
	} else {
		if (!sourceTable) {
			throw new Error(`could not find table ${table}`)
		}
		return sourceTable
	}
}

function createFacetedData(
	facet: Facet,
	facetSourceTable: any[],
	markSourceTable: any[],
): FacetedData {
	const getKey = keyGetter(facet.groupBy!)
	const facetMap = new Map<string, DataFacet>()
	const markMap = new Map<string, any>()
	const facets: DataFacet[] = []

	// If the mark source table is defineod, then the rows _should_ represent
	// aggregations over the facet source table, so try to link them up
	// start by mapping them by key
	if (markSourceTable) {
		markSourceTable.forEach(markRow => {
			const key = getKey(markRow)
			markMap.set(key, markRow)
		})
	}

	// Map the data from the facet source table into the faceting structure
	facetSourceTable.forEach((row: any) => {
		const key = getKey(row)
		if (!facetMap.has(key)) {
			const parent = markMap.get(key)
			const newFacet: DataFacet = {
				data: [],
				key,
				parent,
			}
			facets.push(newFacet)
			facetMap.set(key, newFacet)
		}
		const f = facetMap.get(key)!
		f.data.push(row)
	})

	// Return the faceting results
	const result = {
		name: facet.name,
		keyRowName: facet.keyRowName,
		facets,
	}
	return result
}

function keyGetter(groupBy: string | string[] | ((row: any) => any)) {
	if (typeof groupBy === 'function') {
		return groupBy
	} else {
		const groupByKeys: string[] =
			typeof groupBy === 'string' ? [groupBy] : groupBy
		return (row: any) => groupByKeys.map(g => row[g]).join('|')
	}
}
