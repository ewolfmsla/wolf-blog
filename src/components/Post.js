import React from "react";
import propTypes from 'prop-types'

const Post = ({post}) => {
  return (
    <article className={"container"}>
      <h1>{post.title}</h1>
      <div className={"content"} dangerouslySetInnerHTML={{__html: post.content}}/>
    </article>
  )
}

Post.propTypes = {
  post: propTypes.object
}

export default Post