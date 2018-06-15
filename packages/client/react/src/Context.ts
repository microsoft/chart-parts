import * as React from 'react'
import { SceneBuilder, SceneNodeBuilder } from '@gog/scenegen'

export const {
	Consumer: SceneBuilderConsumer,
	Provider: SceneBuilderProvider,
} = React.createContext<SceneBuilder>(new SceneBuilder())

export const {
	Consumer: SceneNodeBuilderConsumer,
	Provider: SceneNodeBuilderProvider,
} = React.createContext<SceneNodeBuilder>(new SceneNodeBuilder())
