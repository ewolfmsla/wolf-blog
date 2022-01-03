import React from "react"
import propTypes from "prop-types"


const PostedOn = ({ post }) => {
  return <span className={'date'}>Posted on {new Date(post?.createdOn).toLocaleString()}</span>
}

PostedOn.propTypes = {
  post: propTypes.object.isRequired
}

export default PostedOn