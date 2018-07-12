// tslint:disable
import * as React from 'react'
import { SymbolType, VerticalTextAlignment } from '@gog/interfaces'
import {
	Chart,
	Group,
	Symbol,
	Line,
	LinearScale,
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
					bindDomain={'x'}
					bindRange={Dimension.Width}
					padding={SCALE_PAD}
				/>
				<LinearScale
					name="y"
					bindDomain="y"
					table="series"
					bindRange={Dimension.Height}
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
					<Symbol
						table="facetedSeries"
						fill={({ datum }) => datum.fill}
						shape={() => SymbolType.CIRCLE}
						x={({ datum }, { x }) => x(datum.x)}
						y={({ datum }, { y }) => y(datum.y)}
						size={() => 50}
					/>
					<Group
						singleton={true}
						stroke="red"
						x={() => 140}
						y={() => 60}
						width={50}
						height={TEXT_GROUP_HEIGHT}
					>
						<Group
							table="kpis"
							stroke="green"
							y={({ index }) => index * (TEXT_GROUP_HEIGHT / kpis.length)}
							height={() => TEXT_GROUP_HEIGHT / kpis.length}
						>
							<Text
								singleton={true}
								baseline={VerticalTextAlignment.TOP}
								x={3}
								y={5}
								text={({ datum }) => datum.value}
								fill={({ datum }) => 'black'}
								fontSize={15}
							/>
							<Text
								singleton={true}
								baseline={VerticalTextAlignment.TOP}
								x={3}
								y={20}
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
