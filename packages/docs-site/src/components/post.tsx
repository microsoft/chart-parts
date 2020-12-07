/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import renderAst from '../util/renderHtmlAst'
import { TextContainer, Gutter, TextContent } from './common'

export interface PostProps {
	post: {
		html: string
		htmlAst: any
		frontmatter: {
			date: string
		}
	}
}

const Post: React.FC<PostProps> = ({ post }) => {
	return (
		<TextContainer>
			<Gutter />
			<TextContent>
				<h6>{post.frontmatter.date}</h6>
				{renderAst(post.htmlAst)}
			</TextContent>
			<Gutter />
		</TextContainer>
	)
}

export default Post
