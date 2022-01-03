import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <article className={"container"}>
    <h1>404 Page Not Found</h1>
    <Link to={'/'}>Return to posts</Link>
  </article>)


export default NotFound