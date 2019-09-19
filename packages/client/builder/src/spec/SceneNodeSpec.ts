/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { SceneNode, ScaleCreator } from '@chart-parts/interfaces'
import { MarkSpec } from './MarkSpec'
import { AxisSpec } from './AxisSpec'

/**
 * Scene Specification Object
 * @category Specification
 */
export class SceneNodeSpec implements SceneNode {
	private _scales: ScaleCreator[] = []
	private _marks: MarkSpec[] = []
	private _axes: AxisSpec[] = []

	public get scales() {
		return this._scales
	}

	public get marks() {
		return this._marks
	}

	public get axes() {
		return this._axes
	}

	public addScale(value: ScaleCreator) {
		this._scales.push(value)
	}

	public removeScale(value: ScaleCreator) {
		this._scales = this._scales.filter(v => v !== value)
	}

	public addMark(value: MarkSpec) {
		this._marks.push(value)
	}

	public removeMark(value: MarkSpec) {
		this._marks = this._marks.filter(m => m !== value)
	}

	public addAxis(value: AxisSpec) {
		this._axes.push(value)
	}

	public removeAxis(value: AxisSpec) {
		this._axes = this._axes.filter(m => m !== value)
	}
}
