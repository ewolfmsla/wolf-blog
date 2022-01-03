import React from "react";
import propTypes from "prop-types";

const Message = ({ type }) => {
  const messages = {
    saved: "Your post has been saved.",
    updated: "Your post has been updated.",
    deleted: "Your post has been deleted.",
    logout: "You have been logged out",
    loginError: "Invalid username and/or password",
    error: "An error occurred"
  }
  return <div className={`App-message ${type}`}>
    <p className={"container"}>
      <strong>{messages[type]}</strong>
    </p>
  </div>
}

Message.propTypes = {
  type: propTypes.string.isRequired
}

export default Message