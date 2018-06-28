import * as React from 'react'
import { SceneNodeBuilder } from '@gog/scene'

export const {
	Consumer: SceneNodeBuilderConsumer,
	Provider: SceneNodeBuilderProvider,
} = React.createContext<SceneNodeBuilder>(new SceneNodeBuilder())
