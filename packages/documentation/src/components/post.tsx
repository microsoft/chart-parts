import * as React from 'react'
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

const Post: React.SFC<PostProps> = ({ post }) => {
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
