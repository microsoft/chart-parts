/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// tslint:disable jsx-no-lambda
import * as React from 'react'
import { SingleMarkTester } from './util/single-mark-tester'
import * as palette from './util/palette'

const BASE_ITEM = {
  stroke: palette.CRIMSON,
  strokeOpacity: 1,
  strokeWidth: 1,
}

const LineTester: React.SFC = () => (
  <SingleMarkTester
    chartWidth={420}
    chartOrigin={[10, 0]}
    initialScenegraph={{
      marktype: 'line',
      items: [
        {
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
      { name: 'tension', min: 0, max: 1, step: 0.1 },
      { name: 'strokeWidth', max: 10 },
      { name: 'strokeOpacity', max: 1, min: 0, step: 0.1 },
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
    updateScenegraph={(update, scenegraph) => {
      scenegraph.items.forEach((item: any) => {
        Object.keys(update).forEach(key => (item[key] = update[key]))
      })
      return scenegraph
    }}
  />
)

export default LineTester
