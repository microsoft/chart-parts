/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo, useMemo } from 'react'
import styled from 'styled-components'
import renderAst from '../util/renderHtmlAst'
import { TextContainer, Gutter, TextContent } from './common'

export interface DocProps {
	docPage: {
		htmlAst: any
		tableOfContents: string
	}
}

const Doc: React.FC<DocProps> = memo(function Doc({ docPage }) {
	return (
		<TextContainer>
			<Gutter />
			<TextContent>
				<PageToc toc={docPage.tableOfContents} />
				{renderAst(docPage.htmlAst)}
			</TextContent>
			<Gutter />
		</TextContainer>
	)
})

export default Doc

interface PageTocProps {
	toc: string
}
const PageToc: React.FC<PageTocProps> = memo(function PageToc({ toc }) {
	const tocMarkup = useMemo(() => ({ __html: toc }), [toc])
	if (toc.indexOf('li') === -1) {
		return null
	}
	return (
		<TocContainer>
			<TocHeader>Contents</TocHeader>
			<TocContent className="docpage-toc" dangerouslySetInnerHTML={tocMarkup} />
		</TocContainer>
	)
})

const TocContainer = styled.div`
	width: 100%;
	border-bottom: 1px solid lightgrey;
	margin-bottom: 40px;
`

const TocHeader = styled.div`
	font-family: sans-serif;
	font-size: 12px;
	margin-bottom: 10px;
	font-weight: 400;
`

const TocContent = styled.div`
	ul {
		list-style: none;
		li {
			font-size: 12px;
			font-weight: 100;
			font-family: sans-serif;
			line-height: 1;
		}
	}
`
