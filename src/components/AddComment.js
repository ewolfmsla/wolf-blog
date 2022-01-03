import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {v4 as uuidV4} from 'uuid';
import propTypes from "prop-types";

const AddComment = ({visitor, comments, setComments}) => {

  const [text, setText] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (text.trim().length === 0) {
      setError(true)
    } else {
      setError(false)
      const comment = {
        comId: uuidV4(),
        avatarUrl: visitor.avatarUrl,
        createdOn: Date.now(),
        fullName: visitor.name,
        text: text,
        userId: visitor.userId,
        replies: []
      }

      setComments([comment, ...comments])
    }

  }

  return (<div>
    <form className={"container"}>
      {error && <div className={"requiredField"}>* This field is required</div>}
      <textarea id={"form-comment"} placeholder={"Enter comment..."}
                className={"reply-input"}
                onChange={event => setText(event.target.value)}/>
      <div className={"submit-comment-button"}>
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
      </div>
      {/*<button className={"form-button"} type={"submit"} onClick={onCancel}>Cancel</button>*/}
    </form>
  </div>)
}

AddComment.propTypes = {
  comments: propTypes.array.isRequired,
  setComments: propTypes.func.isRequired,
  visitor: propTypes.object.isRequired
}

export default AddComment