import React, { useEffect, useState } from "react";
// import firebase from "../firebase";
import RegisterModal from "./RegisterModal";
import AddComment from "./AddComment";
import propTypes from 'prop-types'
import Comment from "./Comment";
import useLocalStorageState from "use-local-storage-state";

const Comments = ({ post, visitor, setVisitor }) => {

  const [comments, setComments] = useLocalStorageState(`state-comments-${post.key}`, [])
  const [loaded, setLoaded] = useState(false)
  // const [show, setShow] = useState(false);

  // const sort = (comments) => {
  //   if (comments) {
  //     return comments.sort((a, b) => (a.createdOn < b.createdOn) ? 1 : (a.createdOn > b.createdOn) ? -1 : 0)
  //   }
  //   return []
  // }

  useEffect(() => {
    if (!loaded) {
      console.log("loading, post.key = ", post.key)

      // const commentsRef = firebase.database().ref("comments/" + post.key)
      // commentsRef.on("value", (snapshot) => {
      //     const values = snapshot.val()
      //     if (values) {
      //       console.log("yes, got em from firebase")
      //       commentsRef.off()
      //       setComments(sort(values))
      //     }
      //   }
      // )

      setLoaded(true)
    }
  }, [loaded, post.key, setComments])

  // const onSetComment = (comments) => {
  //   const commentsWithCreatedOnDate = ensureCreatedOn(comments)
  //   const commentsRef = firebase.database().ref("comments/" + post.key)
  //   commentsRef.on("value", (snapshot) => {
  //       commentsRef.set(commentsWithCreatedOnDate)
  //       commentsRef.off()
  //       setComments(sort(commentsWithCreatedOnDate))
  //     }
  //   )
  // }
  //
  // const onClick = () => {
  //   setShow(true)
  // }

  return (
    <>
      <div className={'foo'}>
        {!visitor && (<RegisterModal setVisitor={setVisitor} />)}
        {visitor && (<AddComment visitor={visitor}
          comments={comments} setComments={setComments} />)}
      </div>

      {comments.map(comment =>
        <Comment key={comment.comId}
          comment={comment} visitor={visitor}
          comments={comments} setComments={setComments} />
      )}

      {/*<CommentSection currentUser={visitor} commentsArray={comments}/>*/}
    </>
  )
}

Comments.propTypes = {
  post: propTypes.object.isRequired,
  setVisitor: propTypes.func.isRequired,
  visitor: propTypes.object
}

export default Comments
