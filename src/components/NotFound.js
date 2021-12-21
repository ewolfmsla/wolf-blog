import React from "react";
import {Link} from "react-router-dom";
import propTypes from "prop-types";

const NotFound = ({page}) => (
  <article className={"container"}>
    <h1>404 Not Found!</h1>
    <h2>{page}</h2>
    <Link to={'/'}>Return to posts</Link>
  </article>)

NotFound.propTypes = {
  page: propTypes.string.isRequired
}

export default NotFound