// tslint:disable no-var-requires
import { DatasetTransform } from './interfaces'
declare var require: any
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
	 * Adds a new data table to the dataset
	 * @param name the name of the dataset to add
	 * @param dataset the array of data rows to add
	 */
	add(
		name: string,
		dataset: any[],
		...transforms: DatasetTransform[]
	): DatasetManager

	/**
	 * Gets a dataset
	 * @param name The name of the dataset
	 */
	get(name: string): any[] | undefined
}

export class DatasetManagerImpl implements DatasetManager {
	// Datasets are stored in a vega transform pipeline
	private pipelines: Map<string, Pipeline> = new Map()

	public add(name: string, data: any[], ...transforms: DatasetTransform[]) {
		const pipeline = createTransformPipeline(transforms)
		pushData(data, pipeline)
		this.pipelines.set(name, pipeline)
		return this
	}

	public get(name: string): any[] | undefined {
		const ds = this.pipelines.get(name)
		return ds && ds.end.value
	}
}

function pushData(data: any[], pipeline: Pipeline) {
	const { dataflow, start } = pipeline
	dataflow.pulse(start, changeset().insert(data)).run()
}

function createTransformPipeline(transforms: DatasetTransform[]): Pipeline {
	const df = new Dataflow()
	const entry = df.add(collect)
	let latest = entry

	transforms.forEach(t => (latest = t.build(df, latest)))
	latest = df.add(collect, { pulse: latest })

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
