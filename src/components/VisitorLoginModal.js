import propTypes from "prop-types";
import React, {useState} from "react";
import {v4 as uuidV4} from 'uuid';
import {useHistory} from "react-router-dom";

const VisitorLoginModal = ({setVisitor, setShow}) => {

  const [visitorUserName, setVisitorUserName] = useState(undefined)
  const history = useHistory()

  const avatarUrl = () => {
    return `https://ui-avatars.com/api/name=${visitorUserName}&background=random`
  }

  const handlePostForm = (event) => {
    event.preventDefault()
    setVisitor({userId: uuidV4(), avatarUrl: avatarUrl(), name: visitorUserName})
    setShow(false)
  }

  const onCancel = () => {
    const path = "/";
    history.push(path);
  }

  return (
    <div className="backdrop" style={backdropStyle}>
      <div className="modal" style={modalStyle}>
        <form className={"container"} onSubmit={handlePostForm}>
          <h1>Register</h1>
          <label htmlFor={"form-title"}>First Name:</label>
          <input id={"form-username"} placeholder={"Enter your first name..."}
                 onChange={event => setVisitorUserName(event.target.value)}/>
          <div>
            <button className={"form-button"} type={"submit"}>Submit</button>
            <button className={"form-button"} type={"submit"} onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

VisitorLoginModal.propTypes = {
  setVisitor: propTypes.func.isRequired,
  setShow: propTypes.func.isRequired
}

const backdropStyle = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0,0,0,0.3)',
  padding: 50
};

// The modal "window"
const modalStyle = {
  backgroundColor: '#fff',
  borderRadius: 0,
  maxWidth: 500,
  minHeight: 300,
  margin: '0 auto',
  padding: 30
};

export default VisitorLoginModal