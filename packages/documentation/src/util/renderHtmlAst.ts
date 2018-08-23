import { createElement } from 'react'
import components from '../examples'
import processImages from './processImagesInMarkdownAst'
// tslint:disable-next-line
const log = require('debug')('site:renderHtmlAst')

// tslint:disable-next-line
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
    // tslint:disable-next-line
    log('error rendering doc page', err)
  }
}
