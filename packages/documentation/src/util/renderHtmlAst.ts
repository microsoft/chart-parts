/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { createElement } from 'react'
import components from '../examples'
import processImages from './processImagesInMarkdownAst'
const log = require('debug')('site:renderHtmlAst')

const rehypeReact = require('rehype-react')
const renderAst = new rehypeReact({
  createElement,
  components,
}).Compiler

export default function renderHtmlAst(node: any) {
  try {
    processImages(node)
    return renderAst(node)
  } catch (err) {
    log('error rendering doc page', err)
  }
}
