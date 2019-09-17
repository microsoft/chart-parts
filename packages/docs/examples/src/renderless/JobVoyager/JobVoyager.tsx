/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo, useState, useCallback, useMemo } from 'react'
import {
	Area,
	Group,
	Chart,
	LinearScale,
	OrdinalScale,
	SqrtScale,
	Axis,
	Text,
	QuantizeScale,
	QuantileScale,
} from '@chart-parts/react'
import {
	Dimension,
	AxisOrientation,
	VerticalTextAlignment,
	HorizontalAlignment,
	Metadata,
} from '@chart-parts/interfaces'
import {
	dataset,
	stack,
	CompareOrder,
	aggregate,
	AggregateOperation,
	Offset as StackOffset,
	filter,
} from '@chart-parts/transform'
// @ts-ignore
import source from 'vega-datasets/data/jobs.json'

// TODO:
// - Axis grid
// - prevent recomputes of scales to improve perf

const genderOptions = ['all', 'women', 'men']

export const JobVoyager: React.FC = memo(() => {
	const [gender, setGender] = useState('all')
	const [selectedAreaId, setSelectedAreaId] = useState<string | undefined>()
	const [query, setQuery] = useState<string | undefined>()
	const queryRegExp = useMemo(() => query && new RegExp(query), [query])

	const onQueryChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
		[setQuery],
	)
	const changeGenderSelection = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value),
		[setGender],
	)
	const onEnterArea = useCallback((id: string) => setSelectedAreaId(id), [
		setSelectedAreaId,
	])
	const onClickArea = useCallback((job: string) => setQuery(job), [setQuery])

	const ds = useMemo(
		() =>
			dataset()
				.addTable(
					'jobs',
					source,
					filter(
						(d: any) =>
							(gender === 'all' || d.sex === gender) &&
							(!queryRegExp || queryRegExp.test(d.job)),
					),
					stack('perc')
						.groupBy('year')
						.offset(StackOffset.zero)
						.sort(
							{
								field: 'job',
								order: CompareOrder.descending,
							},
							{
								field: 'sex',
								order: CompareOrder.descending,
							},
						),
				)
				.addDerivedTable(
					'series',
					'jobs',
					aggregate()
						.groupBy('job', 'sex')
						.compute(
							{ op: AggregateOperation.sum, field: 'perc', as: 'sum' },
							{ op: AggregateOperation.argmax, field: 'perc', as: 'argmax' },
						),
				),
		[gender, queryRegExp],
	)

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<JobVoyagerChart
				data={ds.tables}
				selectedAreaId={selectedAreaId}
				onEnterArea={onEnterArea}
				onClickArea={onClickArea}
			/>
			<div>
				<div>
					{genderOptions.map(g => [
						<input
							id={`gender-option-${g}`}
							key={`input:${g}`}
							type="radio"
							style={{ margin: 4 }}
							checked={gender === g}
							value={g}
							onChange={changeGenderSelection}
						/>,
						<label key={`label:${g}`} style={{ margin: 4 }}>
							{g}
						</label>,
					])}
					<input type="text" value={query} onChange={onQueryChange} />
				</div>
			</div>
		</div>
	)
})
JobVoyager.displayName = 'JobVoyager'

interface JobVoyagerChartProps {
	data: any
	selectedAreaId?: string
	onEnterArea: (id: string) => any
	onClickArea: (job: string) => any
}
const JobVoyagerChart: React.FC<JobVoyagerChartProps> = memo(
	({ data, selectedAreaId, onEnterArea, onClickArea }) => (
		<Chart width={850} height={550} padding={10} data={data}>
			<Scales />
			<Axes />

			<Group
				table="series"
				facet={{
					groupBy: ['job', 'sex'],
					keyRowName: 'agg',
					table: 'jobs',
					name: 'facet',
				}}
			>
				<Area
					table="facet"
					x={({ d, x }) => x(d.year)}
					y={({ d, y }) => y(d.y0)}
					y2={({ d, y }) => y(d.y1)}
					fill={({ d, color }) => color(d.sex)}
					fillOpacity={({ agg, id, alpha }) =>
						id === selectedAreaId ? 0.2 : alpha(agg.sum)
					}
					metadata={({ d: { job } }) => (({ job } as any) as Metadata)}
					onMouseOver={({ id }) => onEnterArea(id)}
					onClick={({ job }) => onClickArea(job)}
				/>
			</Group>
			<Text
				table="series"
				x={({ d, x }) => x(d.argmax.year)}
				dx={({ d, offset }) => offset(d.argmax.year)}
				y={({ d, y }) => y(0.5 * (d.argmax.y0 + d.argmax.y1))}
				fill="#000"
				fillOpacity={({ d, opacity }) => opacity(d.argmax.perc)}
				fontSize={({ d, font }) => font(d.argmax.perc)}
				text={({ d }) => d.job}
				align={({ d, align }) => align(d.argmax.year)}
				baseline={VerticalTextAlignment.Middle}
			/>
		</Chart>
	),
)
JobVoyagerChart.displayName = 'JobVoyagerChart'

const Axes: React.FC = memo(() => (
	<>
		<Axis
			orient={AxisOrientation.Bottom}
			scale="x"
			labelFormat="d"
			tickCount={15}
			domain={false}
		/>
		<Axis
			orient={AxisOrientation.Right}
			scale="y"
			labelFormat="~%"
			domain={false}
			tickSize={12}
		/>
	</>
))
Axes.displayName = 'Axes'

const Scales: React.FC = memo(() => (
	<>
		<LinearScale
			name="x"
			domain="jobs.year"
			range={Dimension.Width}
			zero={false}
			round
		/>
		<LinearScale
			name="y"
			domain="jobs.y1"
			range={Dimension.Height}
			zero
			round
		/>
		<OrdinalScale
			name="color"
			domain={['men', 'women']}
			range={['#33f', '#f33']}
		/>
		<LinearScale name="alpha" zero domain="series.sum" range={[0.4, 0.8]} />
		<SqrtScale
			name="font"
			domain="series.argmax.perc"
			range={[0, 22]}
			zero
			round
		/>
		<QuantizeScale
			name="align"
			domain="series.argmax.year"
			range={[
				HorizontalAlignment.Left,
				HorizontalAlignment.Center,
				HorizontalAlignment.Right,
			]}
		/>
		<QuantizeScale
			name="offset"
			domain={[1730, 2130]}
			range={[6, 0, -6]}
			zero={false}
		/>
		<QuantileScale
			name="opacity"
			domain="series.argmax.perc"
			range={[[0, 0, 0, 0, 0, 0.1, 0.2, 0.4, 0.7, 1.0]]}
		/>
	</>
))
Scales.displayName = 'Scales'
