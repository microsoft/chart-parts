/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AxisOrientation } from '@chart-parts/interfaces'
import {
  Axis,
  Chart,
  Rect,
  LinearScale,
  BandScale,
  Dimension,
  Rule,
} from '@chart-parts/react'
import { mean } from 'd3-array'
import React, { memo } from 'react'

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

export const BarChartWithMean: React.FC = memo(function BarChartWithMean() {
  return (
    <BarChart>
      <Rule
        x={0}
        x2={({ view }) => view.width}
        y={({ y, data }) => y(mean(data, (d: any) => d.amount))}
        stroke="firebrick"
      />
    </BarChart>
  )
})

const BarChart: React.FC = memo(function BarChart({ children }) {
  return (
    <Chart width={400} height={200} data={dataset}>
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
})

const Scales: React.FC = memo(function Scales() {
  return (
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
})

const Axes: React.FC = memo(function Axes() {
  return (
    <>
      <Axis orient={AxisOrientation.Bottom} scale="x" />
      <Axis orient={AxisOrientation.Left} scale="y" />
    </>
  )
})
