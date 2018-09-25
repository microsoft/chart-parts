// tslint:disable
import * as React from 'react'
import {
  Axis,
  Chart,
  Rect,
  LinearScale,
  BandScale,
  Dimension,
  Rule,
} from '@chart-parts/react'
import { AxisOrientation } from '@chart-parts/interfaces'
import { Renderer } from '@chart-parts/react-svg-renderer'
import { mean } from 'd3-array'

const renderer = new Renderer()

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
const dataset = { data }

const AugmentedBarChart = () => (
  <BarChart>
    <Rule
      singleton
      x={0}
      x2={({ view }) => view.width}
      y={({ y, data }) => y(mean(data, (d: any) => d.amount))}
      stroke="firebrick"
    />
  </BarChart>
)

export default AugmentedBarChart

const BarChart: React.SFC = ({ children }) => (
  <Chart width={400} height={200} renderer={renderer} data={dataset}>
    <Scales />
    <Axes />
    <Rect
      table="data"
      x={({ d, x }) => x(d.category)}
      y={({ d, y }) => y(d.amount)}
      width={({ band }) => band()}
      y2={({ y }) => y(0)}
      fill={'steelblue'}
    />
    {children}
  </Chart>
)

const Scales = () => (
  <>
    <LinearScale
      name="y"
      domain="data.amount"
      range={Dimension.Height}
      nice
      zero
    />
    <BandScale
      name="x"
      bandWidth="band"
      domain="data.category"
      padding={0.05}
      range={Dimension.Width}
    />
  </>
)

const Axes = () => (
  <>
    <Axis orient={AxisOrientation.Bottom} scale="x" />
    <Axis orient={AxisOrientation.Left} scale="y" />
  </>
)
