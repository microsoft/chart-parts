import { DatasetManager } from './dataset'

export interface DatasetTransform {
	/**
	 * Build the transformation
	 * @param df The vega dataflow instance
	 * @param from The vega-dataflow node that is the parent of this node
	 * @param ds The markable dataset
	 */
	build(df: any, from: any, ds: DatasetManager): any
}
