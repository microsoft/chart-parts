import * as React from 'react'
import { SingleMarkTester } from './util/single-mark-tester'
import * as palette from './util/palette'

const BASE_ITEM = {
  stroke: palette.CRIMSON,
  fill: palette.GREY,
}

const RectTester: React.SFC = () => (
  <SingleMarkTester
    initialScenegraph={{
      marktype: 'rect',
      items: [
        {
          x: 50,
          y: 50,
          width: 75,
          height: 75,
          cornerRadius: 0,
          stroke: palette.CRIMSON,
          fill: palette.GREY,
          strokeWidth: 4,
        },
      ],
    }}
    sliders={[
      { name: 'x' },
      { name: 'y' },
      { name: 'width' },
      { name: 'height' },
      { name: 'cornerRadius', max: 15 },
      { name: 'strokeWidth', max: 10 },
    ]}
  />
)

export default RectTester
