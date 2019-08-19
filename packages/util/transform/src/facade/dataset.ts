/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { DatasetTransform } from './interfaces'
declare const require: any
const { Dataflow, changeset } = require('vega-dataflow')
const { collect } = require('vega-transforms')

/**
 * Storage structure for tracking datasets
 */
interface Pipeline {
	dataflow: any
	start: any
	end: any
}

export interface DatasetManager {
	/**
	 * The table set
	 */
	tables: { [key: string]: any[] }

	/**
	 * Adds a new data table to the dataset
	 * @param name the name of the dataset to add
	 * @param dataset the array of data rows to add
	 */
	addTable(
		name: string,
		dataset: any[],
		...transforms: DatasetTransform[]
	): DatasetManager

	addDerivedTable(
		name: string,
		source: string,
		...transforms: DatasetTransform[]
	): DatasetManager

	/**
	 * Gets a dataset
	 * @param name The name of the dataset
	 */
	getTable(name: string): any[]
}

export class DatasetManagerImpl implements DatasetManager {
	// Datasets are stored in a vega transform pipeline
	private pipelines: Map<string, Pipeline> = new Map()

	public addTable(
		name: string,
		data: any[],
		...transforms: DatasetTransform[]
	) {
		const pipeline = createTransformPipeline(transforms, this)
		pushData(data, pipeline)
		this.pipelines.set(name, pipeline)
		return this
	}

	public addDerivedTable(
		name: string,
		from: string,
		...transforms: DatasetTransform[]
	) {
		const pipeline = createTransformPipeline(transforms, this)
		const sourceTable = this.getTable(from)
		pushData(sourceTable, pipeline)
		this.pipelines.set(name, pipeline)
		return this
	}

	public getTable(name: string): any[] {
		const ds = this.pipelines.get(name)
		const result = ds && ds.end.value
		if (!result) {
			throw new Error(`could not find table ${name}`)
		}
		return result
	}

	public get tables() {
		const keys = this.pipelines.keys()
		const result: { [key: string]: any[] } = {}
		for (const key of keys) {
			result[key] = this.getTable(key)
		}
		return result
	}
}

function pushData(data: any[], pipeline: Pipeline) {
	const { dataflow, start } = pipeline
	dataflow.pulse(start, changeset().insert(data)).run()
}

function createTransformPipeline(
	transforms: DatasetTransform[],
	ds: DatasetManager,
): Pipeline {
	const df = new Dataflow()
	const entry = df.add(collect)
	let latest = entry

	transforms.forEach(t => {
		latest = t.build(df, latest, ds)
		latest = df.add(collect, { pulse: latest })
	})

	return {
		dataflow: df,
		start: entry,
		end: latest,
	}
}

/**
 * Create a new dataset builder
 */
export function dataset(): DatasetManager {
	return new DatasetManagerImpl()
}
