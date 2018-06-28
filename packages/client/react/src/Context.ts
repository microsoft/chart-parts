import * as React from 'react'
import { SceneNodeBuilder } from '@gog/builder'

export const {
	Consumer: SceneNodeBuilderConsumer,
	Provider: SceneNodeBuilderProvider,
} = React.createContext<SceneNodeBuilder>(new SceneNodeBuilder())
