import React from "react";
import PropTypes from "prop-types";

const Message = ({type}) => {
  const messages = {
    saved: "Your post has been saved.",
    updated: "Your post has been updated.",
    deleted: "Your post has been deleted.",
    logout: "You have been logged out",
    loginError: "Invalid username and/or password"
  }
  return <div className={`App-message ${type}`}>
    <p className={"container"}>
      <strong>{messages[type]}</strong>
    </p>
  </div>
}

Message.prototypes = {
  type: PropTypes.string.isRequired
}

export default Message