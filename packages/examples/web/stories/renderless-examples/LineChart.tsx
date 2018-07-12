// tslint:disable
import * as React from 'react'
import { SymbolType } from '@gog/interfaces'
import { Chart, Group, Symbol, Line, LinearScale, Dimension } from '@gog/react'
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

export interface BarChartState {
	hoverRowIndex: number | undefined
}

const SCALE_PAD = 5
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
			<Chart height={200} width={200} data={{ series }} renderer={renderer}>
				<LinearScale
					name="x"
					table="series"
					bindDomain="x"
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
				</Group>
			</Chart>
		)
	}
}
