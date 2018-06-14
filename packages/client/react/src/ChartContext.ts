import * as React from 'react'
import { SceneBuilder } from '@gog/scenegen'

export const {
	Consumer: ChartContextConsumer,
	Provider: ChartContextProvider,
} = React.createContext<SceneBuilder>(new SceneBuilder())
