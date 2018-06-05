// tslint:disable jsx-no-array-literal-props
import React from 'react'

import { storiesOf } from '@storybook/react'
import { StrokeCap } from '@gog/mark-interfaces'
import { Chart } from './util'
import { testCharts } from '@gog/testdata'

let stories = storiesOf('Vega Examples', module)
testCharts.forEach(tc => {
	stories = stories.add(tc.title, () => (
		<Chart
			data={tc.scenegraph}
			height={tc.dimensions.height}
			width={tc.dimensions.width}
			origin={tc.dimensions.origin}
		/>
	))
})
