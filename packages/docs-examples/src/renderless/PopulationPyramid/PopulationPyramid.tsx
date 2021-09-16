/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Adapted from https://vega.github.io/vega/examples/population-pyramid/
 */
import {
	VerticalTextAlignment,
	HorizontalAlignment,
	AxisOrientation,
	ScaleCreationContext,
} from '@chart-parts/interfaces'
import {
	Axis,
	Group,
	Chart,
	BandScale,
	Text,
	Rect,
	OrdinalScale,
	LinearScale,
} from '@chart-parts/react'
import { dataset, filter, aggregate } from '@chart-parts/transform'
import React, { memo, useState, useCallback, useMemo } from 'react'
import population from 'vega-datasets/data/population.json'

const chartWidth = 600
const chartHeight = 500
const textLineWidth = 18
const AXIS_THICKNESS = 25
const chartPadding = 10
const chartSegmentWidth = (chartWidth - chartPadding * 2 - textLineWidth) / 2

export interface PopulationPyramidState {
	year: number
}

const styles: Record<string, React.CSSProperties> = {
	yearPickerContainer: { margin: 10, display: 'flex', alignItems: 'center' },
}

export const PopulationPyramid: React.FC = memo(function PopulationPyramid() {
	const [year, setYear] = useState(2000)
	const handleYearChanged = useCallback(
		(arg: React.ChangeEvent<any>) => {
			const year = parseInt(arg.target.value, 10)
			setYear(year)
		},
		[setYear],
	)

	const tables = useMemo(
		() =>
			dataset()
				.addTable('population', population)
				.addDerivedTable(
					'popYear',
					'population',
					filter((d: any) => d.year === year),
				)
				.addDerivedTable(
					'males',
					'popYear',
					filter((d: any) => d.sex === 1),
				)
				.addDerivedTable(
					'females',
					'popYear',
					filter((d: any) => d.sex === 2),
				)
				.addDerivedTable('ageGroups', 'population', aggregate().groupBy('age'))
				.tables,
		[year],
	)

	return (
		<div>
			<PyramidChart data={tables} />
			<YearPicker year={year} onChange={handleYearChanged} />
		</div>
	)
})

interface YearPickerProps {
	year: number
	onChange: (arg: React.ChangeEvent<HTMLInputElement>) => void
}
const YearPicker: React.FC<YearPickerProps> = function YearPicker({
	year,
	onChange,
}) {
	return (
		<div style={styles.yearPickerContainer}>
			<input
				type="range"
				min="1850"
				max="2000"
				step="10"
				value={year}
				onChange={onChange}
			/>
			<p>{year}</p>
		</div>
	)
}

interface PyramidChartProps {
	data: { [key: string]: any[] }
}
const PyramidChart: React.FC<PyramidChartProps> = function PyramidChart({
	data,
}) {
	return (
		<Chart
			width={chartWidth}
			height={chartHeight}
			padding={chartPadding}
			data={data}
		>
			<ChartScales />
			<AgeLabels />
			<MPerYear />
			<FPerYear />
		</Chart>
	)
}

const ChartScales: React.FC = function ChartScales() {
	return (
		<>
			<BandScale
				name="y"
				bandWidth="yband"
				range={useCallback(
					(arg: ScaleCreationContext) =>
						[arg.view.height - AXIS_THICKNESS, 0] as [number, number],
					[],
				)}
				domain="ageGroups.age"
				padding={0.1}
				round
			/>
			<OrdinalScale
				name="c"
				domain={useMemo(() => ['1', '2'], [])}
				range={useMemo(() => ['#1f77b4', '#e377c2'], [])}
			/>
		</>
	)
}

const AgeLabels: React.FC = memo(function AgeLabels() {
	return (
		<Text
			table="ageGroups"
			x={chartSegmentWidth + textLineWidth / 2}
			y={useCallback(({ d, y, yband }) => y(d.age) + yband() / 2, [])}
			text={useCallback(({ d }) => d.age, [])}
			baseline={VerticalTextAlignment.Middle}
			align={HorizontalAlignment.Center}
			fill="#000"
		/>
	)
})

const FPerYear: React.FC = memo(function FPerYear() {
	return (
		<GenderPerYearSection
			xStart={0}
			table="females"
			xRange={[chartSegmentWidth, 0]}
		/>
	)
})

const MPerYear: React.FC = memo(function MPerYear() {
	return (
		<GenderPerYearSection
			table="males"
			xStart={chartSegmentWidth + textLineWidth}
			xRange={[0, chartSegmentWidth]}
		/>
	)
})

interface GenderPerYearSectionProps {
	table: string
	xRange: [number, number]
	xStart: number
}
const GenderPerYearSection: React.FC<GenderPerYearSectionProps> = memo(
	function GenderPerYearSection({ table, xRange, xStart }) {
		return (
			<Group
				x={xStart}
				height={useCallback(({ view }) => view.height, [])}
				width={chartSegmentWidth}
			>
				<LinearScale
					domain="population.people"
					range={xRange}
					name="x"
					nice
					zero
				/>
				<Axis
					orient={AxisOrientation.Bottom}
					scale="x"
					labelFormat="~s"
					thickness={AXIS_THICKNESS}
				/>
				<GenderPerYearRect table={table} />
			</Group>
		)
	},
)

interface GenderPerYearRectProps {
	table: string
}

const GenderPerYearRect: React.FC<GenderPerYearRectProps> = memo(
	function GenderPerYearRect({ table }) {
		return (
			<Rect
				table={table}
				x={useCallback(({ d, x }) => x(d.people), [])}
				x2={useCallback(({ x }) => x(0), [])}
				y={useCallback(({ d, y }) => y(d.age), [])}
				height={useCallback(({ yband }) => yband(), [])}
				fillOpacity={0.6}
				fill={useCallback(({ d, c }) => c(d.sex), [])}
			/>
		)
	},
)
