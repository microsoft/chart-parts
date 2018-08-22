// tslint:disable jsx-no-lambda
import * as React from 'react'
import { Orientation } from '@markable/interfaces'
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

const AreaTesterHorizontal: React.SFC = () => (
  <SingleMarkTester
    chartWidth={420}
    chartOrigin={[10, 0]}
    initialScenegraph={{
      marktype: 'area',
      items: [
        {
          orient: Orientation.Horizontal,
          x: 0,
          y: 98.18,
          y2: 200,
          ...BASE_ITEM,
        },
        {
          x: 80,
          y: 0,
          y2: 200,
          ...BASE_ITEM,
        },
        {
          x: 160,
          y: 47.27,
          y2: 200,
          ...BASE_ITEM,
        },
        {
          x: 240,
          y: 76.36,
          y2: 200,
          ...BASE_ITEM,
        },
        {
          x: 400,
          y: 25.4545,
          y2: 200,
          ...BASE_ITEM,
        },
      ],
    }}
    sliders={[
      { name: 'y2' },
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

export default AreaTesterHorizontal
