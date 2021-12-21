import React, {useContext} from "react";
import {Link} from "react-router-dom";
import propTypes from "prop-types";
import UserContext from "../context/UserContext";

const Posts = ({posts, deletePost}) => {
  const {user} = useContext(UserContext)
  return (
    <article className="container">
      <h1>Posts</h1>
      <ul>
        {posts.length < 1 && (
          <li>No posts yet!</li>
        )}
        {posts.sort((a, b) =>
          (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0
        ).map(post =>
          <li key={post.key}>
            <h2>
              <Link to={`/post/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            {user.isAuthenticated && (
              <p>
                <Link to={`/edit/${post.slug}`}>Edit</Link>{' | '}
                <button className="linkLike" type="submit" onClick={() => deletePost(post)}>Delete</button>
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

