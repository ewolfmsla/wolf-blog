import React, { useState } from "react"
import propTypes from "prop-types"
import PostForm from "./PostForm"

const AddPost = ({ addPost }) => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  const onSubmit = () => {
    addPost({ title: title, content: content })
  }


  return <PostForm
    content={content} setContent={setContent}
    formTitle={"Add Post"}
    onSubmit={onSubmit}
    title={title} setTitle={setTitle} />

}

AddPost.propTypes = {
  addPost: propTypes.func.isRequired
}

export default AddPost