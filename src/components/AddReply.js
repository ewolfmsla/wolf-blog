import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import propTypes from "prop-types";
import {v4 as uuidV4} from "uuid";

const AddReply = ({show, setShow, comment, comments, setComments, visitor}) => {

  const [reply, setReply] = useState("")
  const [error, setError] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (reply.trim().length === 0) {
      setError(true)
    } else {
      const replyToAdd = {
        comId: uuidV4(),
        avatarUrl: visitor.avatarUrl,
        createdOn: Date.now(),
        fullName: visitor.fullName,
        text: reply,
        userId: visitor.userId,
        replies: []
      }
      if (comment.replies) {
        comment.replies.push(replyToAdd)
        console.log({comments})
      } else {
        console.log("uh oh", {comment})
      }
      console.log('type: ', typeof comments)
      const foo = [comment]
      console.log('foo ', typeof foo)
      
      const updatedComments = comments.map(c => {
        if (c.comId === comment.comId) {
          return comment
        } else {
          return c
        }
      })
      setComments(updatedComments)
      setShow(false)
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reply</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <label className={"label"} htmlFor={"form-reply"}>Reply:</label>
          <textarea placeholder={"Enter your reply..."}
                    className={"reply-input"}
                    onChange={event => setReply(event.target.value)}/>
          {error && <div className={"requiredField"}>* This field is required</div>}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Reply
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

AddReply.propTypes = {
  comment: propTypes.object.isRequired,
  comments: propTypes.array.isRequired,
  setComments: propTypes.func.isRequired,
  show: propTypes.bool.isRequired,
  setShow: propTypes.func.isRequired,
  visitor: propTypes.object.isRequired
}

export default AddReply