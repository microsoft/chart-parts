/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import dbg from 'debug'
import { createElement } from 'react'
import components from '../components/md'
import processImages from './processImagesInMarkdownAst'
import rehypeReact from 'rehype-react'
const log = dbg('site:renderHtmlAst')

const renderAst = new rehypeReact({
	createElement,
	components,
}).Compiler

export default function renderHtmlAst(node: any) {
	try {
		processImages(node)
		const result = renderAst(node)
		return result
	} catch (err) {
		log('error rendering doc page', err)
	}
}
