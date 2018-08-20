// tslint:disable
import * as React from 'react'
import { VerticalTextAlignment } from '@gog/interfaces'
import {
	Chart,
	Group,
	Circle,
	Line,
	LinearScale,
	BandScale,
	Dimension,
	Text,
} from '@gog/react'
import { Renderer } from '@gog/react-svg-renderer'

const renderer = new Renderer()

const series = [
	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 0,
		y: 0.0302001953125,
	},
	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 1,
		y: 0.002349853515625,
	},

	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 2,
		y: 0.0008544921875,
	},

	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 3,
		y: 0.000030517578125,
	},

	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 4,
		y: 0,
	},

	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 5,
		y: 0,
	},

	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 6,
		y: 0,
	},

	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 7,
		y: 0,
	},

	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 8,
		y: 0,
	},
	{
		__series_id: 0,
		fill: 'rgba(150,200,255,0.4)',
		line: 'rgba(150,200,255,0.8)',
		x: 9,
		y: 0,
	},
]

const kpis = [
	{ label: 'docs', value: 609, fill: 'rgba(220,150,250,0.6)' },
	{ label: 'spread', value: '0.25', fill: 'rgba(220,150,250,0.6)' },
	{ label: 'max sse', value: '1.00', fill: 'rgba(220,150,250,0.6)' },
]

export interface BarChartState {
	hoverRowIndex: number | undefined
}

const SCALE_PAD = 5
const TEXT_GROUP_HEIGHT = 110

/**
 * Adapted from https://vega.github.io/vega/examples/bar-chart/
 */
export class LineChart extends React.Component<{}, BarChartState> {
	constructor(props: {}) {
		super(props)
		this.state = { hoverRowIndex: undefined }
	}

	public render() {
		return (
			<Chart
				height={200}
				width={200}
				data={{ kpis, series }}
				renderer={renderer}
			>
				<LinearScale
					name="x"
					table="series"
					domain="x"
					range={Dimension.Width}
					padding={SCALE_PAD}
				/>
				<LinearScale
					name="y"
					domain="y"
					table="series"
					range={Dimension.Height}
					padding={SCALE_PAD}
				/>
				<Group
					table="series"
					facetKey={d => d.__series_id}
					facetName="facetedSeries"
				>
					<Line
						table="facetedSeries"
						x={({ datum }, { x }) => x(datum.x)}
						y={({ datum }, { y }) => y(datum.y)}
						stroke={({ datum }) => datum.line}
					/>
					<Circle
						table="facetedSeries"
						fill={({ datum }) => datum.fill}
						size={50}
						x={({ datum }, { x }) => x(datum.x)}
						y={({ datum }, { y }) => y(datum.y)}
					/>
					<Group singleton x={140} y={60} width={50} height={TEXT_GROUP_HEIGHT}>
						<BandScale
							name="kpiLoc"
							table="kpis"
							domain="label"
							range={Dimension.Height}
							bandWidth="kpiHeight"
							align={0}
						/>
						<Group
							name="kpis"
							table="kpis"
							y={({ datum }, { kpiLoc }) => kpiLoc(datum.label)}
							height={(d, { kpiHeight }) => kpiHeight()}
						>
							<Text
								singleton
								baseline={VerticalTextAlignment.Top}
								text={({ datum }) => datum.value}
								fill={'black'}
								fontSize={15}
							/>
							<Text
								singleton
								baseline={VerticalTextAlignment.Top}
								y={15}
								text={({ datum }) => datum.label}
								fill={({ datum }) => datum.fill}
								fontSize={10}
							/>
						</Group>
					</Group>
				</Group>
			</Chart>
		)
	}
}
