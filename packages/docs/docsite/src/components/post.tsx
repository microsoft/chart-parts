/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import renderAst from '../util/renderHtmlAst'
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
		<div className="blog-post-container">
			<div className="blog-post">
				<h2>{post.frontmatter.date}</h2>
				<div className="blog-post-content">{renderAst(post.htmlAst)}</div>
			</div>
		</div>
	)
}

export default Post
