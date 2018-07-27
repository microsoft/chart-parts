// tslint:disable jsx-no-lambda
import * as React from 'react'
import { SingleMarkTester } from './util/single-mark-tester'
import * as palette from './util/palette'

const BASE_ITEM = {
  stroke: palette.CRIMSON,
  fill: palette.GREY,
  fillOpacity: 1,
  strokeOpacity: 1,
  strokeWidth: 2,
  tension: 0,
}
const chartHeight = 250
const interval = chartHeight / 4

const AreaTesterVertical: React.SFC = () => (
  <SingleMarkTester
    chartWidth={420}
    chartHeight={chartHeight}
    chartOrigin={[10, 0]}
    initialScenegraph={{
      marktype: 'area',
      items: [
        {
          y: interval * 0,
          x: 98.18,
          x2: 400,
          orient: 'vertical',
          ...BASE_ITEM,
        },
        {
          y: interval,
          x: 0,
          x2: 400,
          orient: 'vertical',
          ...BASE_ITEM,
        },
        {
          y: interval * 2,
          x: 47.27,
          x2: 400,
          orient: 'vertical',
          ...BASE_ITEM,
        },
        {
          y: interval * 3,
          x: 76.36,
          x2: 400,
          orient: 'vertical',
          ...BASE_ITEM,
        },
        {
          y: interval * 4,
          x: 25.4545,
          x2: 400,
          orient: 'vertical',
          ...BASE_ITEM,
        },
      ],
    }}
    sliders={[
      { name: 'x2', max: 400, min: 0 },
      { name: 'tension', min: 0, max: 1, step: 0.1 },
      { name: 'strokeWidth', max: 10 },
      { name: 'strokeOpacity', max: 1, min: 0, step: 0.1 },
      { name: 'fillOpacity', max: 1, min: 0, step: 0.1 },
    ]}
    dropdowns={[
      {
        name: 'interpolate',
        options: [
          'basis',
          'cardinal',
          'catmull-rom',
          'linear',
          'monotone',
          'natural',
          'step',
          'step-after',
          'step-before',
        ],
      },
    ]}
    toggles={[{ name: 'defined' }]}
    updateScenegraph={(update, scenegraph) => {
      scenegraph.items.forEach((item: any) => {
        Object.keys(update).forEach(key => (item[key] = update[key]))
      })
      return scenegraph
    }}
  />
)

export default AreaTesterVertical
