// tslint:disable
import * as React from 'react'
import { from } from 'rxjs'
import { toArray } from 'rxjs/operators'
import {
  Area,
  Axis,
  Chart,
  Group,
  LinearScale,
  PointScale,
  OrdinalScale,
  Dimension,
  CategoricalColorScheme,
} from '@markable/react'
import { AxisOrientation, Interpolation } from '@markable/interfaces'
import { Renderer } from '@markable/react-svg-renderer'
import { stack, groupBy } from '@markable/transform'

const renderer = new Renderer()

const data = [
  { x: 0, y: 28, c: 0 },
  { x: 0, y: 55, c: 1 },
  { x: 1, y: 43, c: 0 },
  { x: 1, y: 91, c: 1 },
  { x: 2, y: 81, c: 0 },
  { x: 2, y: 53, c: 1 },
  { x: 3, y: 19, c: 0 },
  { x: 3, y: 87, c: 1 },
  { x: 4, y: 52, c: 0 },
  { x: 4, y: 48, c: 1 },
  { x: 5, y: 24, c: 0 },
  { x: 5, y: 49, c: 1 },
  { x: 6, y: 87, c: 0 },
  { x: 6, y: 66, c: 1 },
  { x: 7, y: 17, c: 0 },
  { x: 7, y: 27, c: 1 },
  { x: 8, y: 68, c: 0 },
  { x: 8, y: 16, c: 1 },
  { x: 9, y: 49, c: 0 },
  { x: 9, y: 15, c: 1 },
]
const stackedDataSource = from(data)
  .pipe(
    groupBy('x'),
    stack('y').sort({ field: 'c' }),
    toArray()
  )
  .toPromise()

interface StackedAreaChartState {
  data?: any[]
}

export default class StackedAreaChart extends React.Component<
  {},
  StackedAreaChartState
> {
  public state: StackedAreaChartState = {}

  public componentDidMount() {
    stackedDataSource.then(data => this.setState({ data }))
  }

  public render() {
    const { data } = this.state
    return data ? (
      <Chart width={500} height={200} renderer={renderer} data={{ data }}>
        <PointScale name="x" table="data" domain="x" range={Dimension.Width} />
        <LinearScale
          name="y"
          table="data"
          domain="y1"
          range={Dimension.Height}
          nice
          zero
        />
        <OrdinalScale
          name="color"
          table="data"
          domain="c"
          colorScheme={CategoricalColorScheme.category10}
        />

        <Axis orient={AxisOrientation.Bottom} scale="x" />
        <Axis orient={AxisOrientation.Left} scale="y" />

        <Group table="data" facetKey="c" facetName="faceted">
          <Area
            table="faceted"
            x={({ d }, { x }) => x(d.x)}
            y={({ d }, { y }) => y(d.y0)}
            y2={({ d }, { y }) => y(d.y1)}
            fill={({ d }, { color }) => color(d.c)}
            interpolate={Interpolation.Monotone}
          />
        </Group>
      </Chart>
    ) : null
  }
}
