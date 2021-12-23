import React, {useContext} from "react";
import {Link} from "react-router-dom";
import propTypes from "prop-types";
import UserContext from "../context/UserContext";
import {FaBlog, FaEdit, FaTrash} from "react-icons/all";

const Posts = ({posts, deletePost}) => {
  const {user} = useContext(UserContext)
  return (
    <article className="container">
      <h1><FaBlog size={20}/>{' '}Posts</h1>
      <ul>
        {posts.length < 1 && (
          <li>No posts yet!</li>
        )}
        {posts.sort((a, b) =>
          (a.createdOn < b.createdOn) ? 1 : (a.createdOn > b.createdOn) ? -1 : 0
        ).map(post =>
          <li key={post.key}>
            <h2>
              <Link to={`/post/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            {user.isAuthenticated && (
              <p>
                <Link to={`/edit/${post.slug}`}><FaEdit/></Link>{' | '}
                <button className="linkLike" type="submit" onClick={() => deletePost(post)}><FaTrash/></button>
              </p>
            )}
          </li>
        )}
      </ul>
    </article>)
}


Posts.propTypes = {
  deletePost: propTypes.func.isRequired,
  posts: propTypes.array
}

export default Posts

