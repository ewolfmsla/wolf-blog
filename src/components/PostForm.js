import React, { useState } from "react";
import 'react-quill/dist/quill.snow.css'
import ReactQuill from "react-quill";
import propTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";

const PostForm = ({ content, formTitle, onSubmit, setContent, title, setTitle }) => {

  const [saved, setSaved] = useState(false)
  const history = useHistory()

  const handlePostForm = (event) => {
    event.preventDefault()
    if (title) {
      onSubmit()
      setSaved(true)
    } else {
      alert('Title is required!')
    }
  }

  const onCancel = () => {
    let path = '/';
    history.push(path);
  }

  return !saved ? (<form className={"container"} onSubmit={handlePostForm}>
    <h1>{formTitle}</h1>
    <label htmlFor={"form-title"}>Title:</label>
    <input id={"form-title"} onChange={event => setTitle(event.target.value)} value={title} />
    <label htmlFor={"form-content"}>Content:</label>
    <ReactQuill theme={"snow"} defaultValue={content} onChange={setContent} value={content} />
    <button className={"form-button"} type={"submit"}>Save</button>
    <button className={"form-button"} type={"button"} onClick={onCancel}>Cancel</button>
  </form>) : <Redirect to={"/"} />

}

PostForm.propTypes = {
  content: propTypes.string.isRequired,
  formTitle: propTypes.string.isRequired,
  onSubmit: propTypes.func.isRequired,
  setContent: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  setTitle: propTypes.func.isRequired
}

export default PostForm