// tslint:disable
import * as React from 'react'
import {
	Chart,
	LinearScale,
	BandScale,
	Dimension,
	OrdinalScale,
	CategoricalColorScheme,
	Group,
	Rect,
	Text,
} from '@markable/react'
import { Renderer } from '@markable/react-svg-renderer'
import {
	VerticalTextAlignment,
	HorizontalAlignment,
} from '@markable/interfaces'
const renderer = new Renderer()

const data = [
	{ category: 'A', position: 0, value: 0.1 },
	{ category: 'A', position: 1, value: 0.6 },
	{ category: 'A', position: 2, value: 0.9 },
	{ category: 'A', position: 3, value: 0.4 },
	{ category: 'B', position: 0, value: 0.7 },
	{ category: 'B', position: 1, value: 0.2 },
	{ category: 'B', position: 2, value: 1.1 },
	{ category: 'B', position: 3, value: 0.8 },
	{ category: 'C', position: 0, value: 0.6 },
	{ category: 'C', position: 1, value: 0.1 },
	{ category: 'C', position: 2, value: 0.2 },
	{ category: 'C', position: 3, value: 0.7 },
]

/**
 * Adapted from https://vega.github.io/vega/examples/grouped-bar-chart/q
 */
export class GroupedBarChart extends React.Component<{}> {
	public render() {
		return (
			<Chart
				width={300}
				height={240}
				padding={5}
				data={{ data }}
				renderer={renderer}
			>
				<BandScale
					name="y"
					table="data"
					bandWidth="categoryHeight"
					range={Dimension.Height}
					domain="category"
					padding={0.2}
				/>
				<LinearScale
					name="x"
					table="data"
					range={Dimension.Width}
					domain="value"
					nice
					zero
				/>
				<OrdinalScale
					name="color"
					table="data"
					domain="position"
					colorScheme={CategoricalColorScheme.category20}
				/>
				<Group
					name="chartgroup"
					table="data"
					facet={{ groupBy: 'category', name: 'facet' }}
					y={({ d }, { y }) => y(d[0].category)}
					height={(d, { categoryHeight }) => categoryHeight()}
				>
					<BandScale
						name="pos"
						bandWidth="rowHeight"
						range={Dimension.Height}
						table="facet"
						domain="position"
					/>
					<Rect
						name="bars"
						table="facet"
						x={({ d }, { x }) => x(d.value)}
						y={({ d }, { pos }) => pos(d.position)}
						x2={(d, { x }) => x(0)}
						fill={({ d }, { color }) => color(d.position)}
						height={(d, { rowHeight }) => rowHeight()}
					/>
					<Text
						table="facet"
						x={({ d }, { x }) => x(d.value) - 3}
						y={({ d }, { pos, rowHeight }) =>
							pos(d.position) + rowHeight() * 0.5
						}
						fill={'white'}
						align={HorizontalAlignment.Right}
						baseline={VerticalTextAlignment.Middle}
						text={({ d }) => d.value}
					/>
				</Group>
			</Chart>
		)
	}
}
