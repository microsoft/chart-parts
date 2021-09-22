/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { testCharts } from '@chart-parts/testdata'
import { storiesOf } from '@storybook/react'
import { SGChart } from './util'

let stories = storiesOf('Vega Examples (Captured Scenegraphs)', module)
testCharts.forEach(tc => {
	stories = stories.add(tc.title, () => (
		<SGChart
			data={tc.scenegraph}
			height={tc.dimensions.height}
			width={tc.dimensions.width}
			origin={tc.dimensions.origin}
		/>
	))
})
