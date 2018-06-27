import * as React from 'react'
import { SceneNodeBuilder } from '@gog/scenegen'

export const {
	Consumer: SceneNodeBuilderConsumer,
	Provider: SceneNodeBuilderProvider,
} = React.createContext<SceneNodeBuilder>(new SceneNodeBuilder())
