import React, { useEffect, useState } from "react"
import propTypes from "prop-types"
import { fetchPost } from "../firebase"
import PostForm from "./PostForm"
import { FadeLoader } from "react-spinners"
import { css } from "@emotion/react";

const EditPost = ({ postKey, updatePost }) => {
  let [loading, setLoading] = useState(true);
  const [post, setPost] = useState()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    const findPost = async () => {
      try {
        return await fetchPost(postKey)
      } catch (error) {
        console.log({ error })
      }
    }
    findPost(postKey).then(post => {
      setPost(post)
      setContent(post.content)
      setTitle(post.title)
      setLoading(false)
    })

  }, [postKey])

  const onSubmit = () => {
    updatePost({ ...post, title: title, content: content })
  }

  if (!loading) {
    return <PostForm
      content={content} setContent={setContent}
      formTitle={"Edit Post"}
      onSubmit={onSubmit}
      title={title} setTitle={setTitle} />
  } else {
    return <FadeLoader loading={loading} css={override} height={15} radius={2} width={5} margin={2} />
  }

}

EditPost.propTypes = {
  postKey: propTypes.string.isRequired,
  updatePost: propTypes.func.isRequired
}

const override = css`
  display: block;
  margin: 0 auto;
`;

export default EditPost