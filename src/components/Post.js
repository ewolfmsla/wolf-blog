import React, { useEffect, useRef, useState } from "react";
import propTypes from 'prop-types'
import NotFound from "./NotFound";
import 'react-comments-section/dist/index.css'
// import Comments from "./Comments";
import { fetchPost } from "../firebase";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
import PostedOn from "./PostedOn";

const Post = ({ postKey, visitor, setVisitor }) => {
  const [post, setPost] = useState({ title: "", content: "" })
  let [loading, setLoading] = useState(true);
  const hasFetchedData = useRef(false);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (!hasFetchedData.current) {
      fetchPost(postKey).then((post) => {
        sleep(5).then(() => {
          setPost(post)
          setLoading(false)
        })
      })
      hasFetchedData.current = false
    }
  }, [postKey])

  return (
    <article className={"container"}>
      {loading ? (<FadeLoader loading={loading} css={override} height={15} radius={2} width={5} margin={2} />
      ) : post?.key ? (
        <>
          <h3 className={'heading date'}>
            <div>{post.title}</div>
            <div><PostedOn post={post} /></div>
          </h3>
          <div className={"content"} dangerouslySetInnerHTML={{ __html: post.content }} />
          {/* <hr className={"solid"} /> */}
          {/* <Comments post={post} visitor={visitor} setVisitor={setVisitor} /> */}
        </>
      ) : <NotFound />}
    </article>
  )
}

Post.propTypes = {
  postKey: propTypes.string.isRequired,
  setVisitor: propTypes.func.isRequired,
  visitor: propTypes.object,
}

const override = css`
  display: block;
  margin: 0 auto;
`;

export default Post