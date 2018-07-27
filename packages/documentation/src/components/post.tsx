import * as React from 'react'

export interface PostProps {
  post: {
    html: string
    frontmatter: {
      date: string
    }
  }
}

const Post: React.SFC<PostProps> = ({ post }) => (
  <div className="blog-post-container">
    <div className="blog-post">
      <h2>{post.frontmatter.date}</h2>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </div>
  </div>
)

export default Post
