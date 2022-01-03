import React, { useState } from "react";
import propTypes from "prop-types";
import { FaReply, FaTrash } from "react-icons/all";
import AddReply from "./AddReply";
import setOrHideComment from "../utils/comment";

const Comment = ({ comment, isReply = false, visitor, comments, setComments }) => {

  const [show, setShow] = useState(false)

  const onDelete = (comId) => {
    console.log("deleting ", comId)
    const commentsCopy = []
    comments.forEach(c => {
      setOrHideComment(c, comId, true)
      commentsCopy.push(c)
    })
    setComments(commentsCopy)
    console.log("end")
  }

  return (
    <div className={!isReply ? "comment" : "reply"} key={comment.comId}>
      <div className="_qWiSF">
        <div className={"ib"}>{comment.comId === 'hide' ? '*** comment deleted' : comment.text}</div>
        {visitor && comment.userId === visitor.userId && (
          <>
            <div className={"ib-delete"}>
              <button className={"linkLike"}
                onClick={() => onDelete(comment.comId)}>
                <FaTrash size={15} />
              </button>
            </div>
            {/* <div className={"ib-edit"}><FaEdit size={15}/></div> */}
          </>
        )}
        <div>
          <div className={"ib"}>
            <img src={comment.avatarUrl} alt="userIcon" style={avatarDiv} />
          </div>
          <div className={"ib"}>{comment.fullName}</div>
          <button className="reply-button" onClick={() => setShow(true)}><FaReply /> Reply</button>


          {visitor && <AddReply comment={comment}
            comments={comments} setComments={setComments}
            show={show} setShow={setShow}
            visitor={visitor} />}
          {comment?.replies && (
            <div className={"replies"}>
              {comment.replies.map(reply =>
                <Comment key={reply.comId} comment={reply} isReply
                  comments={comments} setComments={setComments}
                  visitor={visitor} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: propTypes.object.isRequired,
  comments: propTypes.array.isRequired,
  setComments: propTypes.func.isRequired,
  isReply: propTypes.bool,
  visitor: propTypes.object
}

const avatarDiv = {
  width: "24px",
  height: "24px",
  borderRadius: 12
}

export default Comment