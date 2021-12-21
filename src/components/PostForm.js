import React, {useEffect, useRef, useState} from "react";
import 'react-quill/dist/quill.snow.css'
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import propTypes from "prop-types";
import {Redirect, useHistory} from "react-router-dom";

const PostForm = ({post: propsPost, addNewPost, updatePost}) => {
  console.log("PostForm Rendering...")
  const [post, setPost] = useState({...propsPost})
  const [saved, setSaved] = useState(false)
  const history = useHistory()

  const prevPostRef = useRef(post)
  useEffect(() => {
    prevPostRef.current = post
  }, [post])
  const prevPost = prevPostRef.current

  const quillRef = React.useRef(ReactQuill)

  const getQuillEditor = () => {
    return quillRef.current.getEditor()
  }

  useEffect(() => {
    if (prevPost && quillRef.current) {
      if (prevPost.id !== propsPost.id) {
        setPost({...propsPost})
        console.log({post})
        getQuillEditor().setText("")
      }
    }
  }, [post, prevPost, propsPost])

  const onCancel = () => {
    let path = '/';
    history.push(path);
  }

  const handlePostForm = (event) => {
    console.log("handlePostForm called...")
    event.preventDefault()
    if (post.title) {
      if (updatePost) {
        updatePost(post)
      } else {
        addNewPost(post)
      }
      setSaved(true)
    } else {
      alert('Title is required!')
    }
  }

  const h1Value = () => !!updatePost ? "Edit Post" : "Add a New Post"

  if (saved) {
    return <Redirect to={"/"}/>
  } else {
    return (<form className={"container"} onSubmit={handlePostForm}>
      <h1>{h1Value()}</h1>
      <label htmlFor={"form-title"}>Title:</label>
      <input id={"form-title"} value={post.title}
             onChange={event => setPost({...post, title: event.target.value})}/>
      <label htmlFor={"form-content"}>Content:</label>
      <ReactQuill ref={quillRef} defaultValue={post.content} onChange={(content, delta, source, editor) => {
        setPost({...post, content: editor.getHTML()})
      }}/>
      <button className={"form-button"} type={"submit"}>Save</button>
      <button className={"form-button"} type={"button"} onClick={onCancel}>Cancel</button>
    </form>)
  }
}

PostForm.propTypes = {
  post: propTypes.object.isRequired,
  addNewPost: PropTypes.func,
  updatePost: PropTypes.func
}

export default PostForm