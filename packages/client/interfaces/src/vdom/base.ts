/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Renderer } from '../render'
import { Metadata } from '../scenegraph'

/**
 * Interface describing a Virtual Dom representation of a Node
 */
export interface VDomNode<Attrs, Style> {
	type: string
	attrs?: Attrs
	style?: Style & { [key: string]: any }
	children?: Array<string | VDomNode<any, any>>
	channels?: { [key: string]: string }
	metadata?: Metadata
}

export interface VDomRenderer<TargetForm>
	extends Renderer<VDomNode<any, any>, TargetForm> {}
