// tslint:disable
import * as React from 'react'
import {
	Axis,
	Chart,
	Rect,
	LinearScale,
	BandScale,
	Dimension,
} from '@gog/react'
import { Renderer } from '@gog/react-native-svg-renderer'
import { AxisOrientation } from '../node_modules/@gog/interfaces'

const data = [
	{ category: 'A', amount: 28 },
	{ category: 'B', amount: 55 },
	{ category: 'C', amount: 43 },
	{ category: 'D', amount: 91 },
	{ category: 'E', amount: 81 },
	{ category: 'F', amount: 53 },
	{ category: 'G', amount: 19 },
	{ category: 'H', amount: 87 },
]

const renderer = new Renderer()

export interface BarChartState {
	hoverRowIndex: number | undefined
}

export default class BarChart extends React.Component<{}, BarChartState> {
	constructor(props: {}) {
		super(props)
		this.state = { hoverRowIndex: undefined }
	}

	public render() {
		// Externalized Event Handlers
		const onPress = (evt, { index }) => {
			if (this.state.hoverRowIndex !== index) {
				this.setState({ hoverRowIndex: index })
			}
		}
		return (
			<Chart width={400} height={200} data={{ data }} renderer={renderer}>
				<LinearScale
					name="yscale"
					table="data"
					domain="amount"
					range={Dimension.Height}
				/>
				<BandScale
					name="xscale"
					table="data"
					bandWidth="xband"
					domain="category"
					padding={0.05}
					range={Dimension.Width}
				/>

				<Axis orient={AxisOrientation.Bottom} scale="xscale" />
				<Axis orient={AxisOrientation.Left} scale="yscale" />
				<Rect
					eventHandlers={{ onPress }}
					x={({ datum }, { xscale }) => xscale(datum.category)}
					y={({ datum }, { yscale }) => yscale(datum.amount)}
					width={(d, { xband }) => xband()}
					y2={200}
					fill={({ index }) => {
						return this.state.hoverRowIndex === index
							? 'firebrick'
							: 'steelblue'
					}}
				/>
			</Chart>
		)
	}
}
