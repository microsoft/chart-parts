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
} from '@gog/react'
import { Renderer } from '@gog/react-svg-renderer'
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
export default class GroupedBarChart extends React.Component<{}> {
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
          nice={true}
          zero={true}
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
          facetKey={row => row.category}
          facetName="facet"
          y={({ datum }, { y }) => y(datum[0].category)}
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
            x={({ datum }, { x }) => x(datum.value)}
            y={({ datum }, { pos }) => pos(datum.position)}
            x2={(d, { x }) => x(0)}
            fill={({ datum }, { color }) => color(datum.position)}
            height={(d, { rowHeight }) => rowHeight()}
          />
          <Text
            table="facet"
            x={({ datum }, { x }) => x(datum.value) - 3}
            y={({ datum }, { pos, rowHeight }) =>
              pos(datum.position) + rowHeight() * 0.5
            }
            fill={'white'}
            align={'right'}
            baseline={'middle'}
            text={({ datum }) => datum.value}
          />
        </Group>
      </Chart>
    )
  }
}
