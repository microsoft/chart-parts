import * as React from 'react'
import styled from 'styled-components'
import components from '../examples'
import processImages from '../util/processImagesInMarkdownAst'

// tslint:disable-next-line
const rehypeReact = require('rehype-react')

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components,
}).Compiler

export interface DocProps {
  docPage: {
    htmlAst: any
  }
}

function renderDocPage(doc: any) {
  try {
    const ast = renderAst(doc)
    processImages(ast)
    return ast
  } catch (err) {
    // tslint:disable-next-line
    console.log('error rendering doc page', err)
  }
}

const Doc: React.SFC<DocProps> = ({ docPage }) => {
  return (
    <Container>
      <Gutter />
      <Content>{renderDocPage(docPage.htmlAst)}</Content>
      <Gutter />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const Gutter = styled.div`
  flex: 1;
`

const Content = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
`

export default Doc
