import React, { useState } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { FaEdit, FaTrash, FaArrowRight } from "react-icons/all";
import { css } from "@emotion/react";
import ConfirmModal from "./ConfirmModal";
import { FadeLoader } from "react-spinners";
import PostedOn from "./PostedOn";

const Posts = ({ posts, deletePost, loading, user }) => {
  const [deleteClicked, setDeleteClicked] = useState(false)
  const [targetPost, setTargetPost] = useState()

  const onDeletePostClicked = (post) => {
    setTargetPost(post)
    setDeleteClicked(true)
  }

  const onDelete = (postKey) => {
    setDeleteClicked(false)
    deletePost(postKey)
  }

  const onCancel = () => {
    setDeleteClicked(false)
  }

  const deleteText = (targetPost) => {
    return `Are you sure you would like to delete <em><b>${targetPost.title}</b></em>?`
  }

  return (
    <article className="container">
      {deleteClicked && <ConfirmModal
        id={targetPost.key}
        text={deleteText(targetPost)}
        onCancel={onCancel}
        onContinue={onDelete}
        title={"Delete Post"} />}

      {/* <h1>Posts{' '}<FaBlog size={20} /></h1> */}
      <div>
        {loading && (
          <FadeLoader loading={loading} css={override} height={15} radius={2} width={5} margin={2} />
        )}
        {posts.sort((a, b) =>
          (a.createdOn < b.createdOn) ? 1 : (a.createdOn > b.createdOn) ? -1 : 0
        ).map(post =>
          <div key={post.key} className={'post'}>
            <div >
              <Link to={`/post/${post?.key}`} className={'postTitle'}>
                {post.title}
              </Link>
              <div><PostedOn post={post} /></div>
              <div dangerouslySetInnerHTML={{ __html: post?.content }} className={'postBody'} />
              {user?.isAdmin && (
                <p>
                  <Link to={`/edit/${post?.key}`}><FaEdit /></Link>{' | '}
                  <button className="linkLike" type="submit" onClick={() => onDeletePostClicked(post)}><FaTrash /></button>
                </p>
              )}
            </div>
            <div><img alt={'spacer'} src={"/images/spacer.gif"} />
              <Link to={`/post/${post?.key}`} style={{ float: 'right' }}>Full No Outlet <FaArrowRight /> Blog post </Link>
            </div>
            <hr />
          </div>
        )}
      </div>
    </article>)
}


Posts.propTypes = {
  deletePost: propTypes.func.isRequired,
  posts: propTypes.array.isRequired,
  loading: propTypes.bool.isRequired,
  user: propTypes.object.isRequired
}

const override = css`
  display: block;
  margin: 0 auto;
`;

export default Posts

