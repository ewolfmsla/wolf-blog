import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import propTypes from 'prop-types'
import {v4 as uuidV4} from 'uuid';

const RegisterModal = ({setVisitor}) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("")
  const [error, setError] = useState(false)

  const avatarNameValue = () => {
    const parts = name.split(" ")
    if (parts.length === 2) {
      return `${parts[0][0]}${parts[1][0]}`
    } else if (parts.length === 3) {
      return `${parts[0][0]}${parts[2][0]}`
    }
    return name
  }

  const avatarUrl = () => {
    return `https://ui-avatars.com/api/name=${avatarNameValue(name)}&background=random`
  }

  const handleClose = () => {
    setError(false)
    setShow(false)
  }
  const handleShow = () => setShow(true);

  const handleSubmit = (data) => {
    if (!name || name.trim() === "") {
      setError(true)
    } else {
      console.log(avatarUrl())
      setVisitor({userId: uuidV4(), avatarUrl: avatarUrl(), name: name})
      setError(false)
      setShow(false)
    }
  }

  return (
    <>
      <div className={"register"}>
        In order to post comments, you must register your name.
        <div className={"register-button-div"}>
          <Button variant="primary" onClick={handleShow}>
            Register Name
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Name Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label className={"label"} htmlFor={"form-name"}>Name:</label>
            <input placeholder={"Enter your name..."}
                   onChange={event => setName(event.target.value)}/>
            {error && <div className={"requiredField"}>* This field is required</div>}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

RegisterModal.propTypes = {
  setVisitor: propTypes.func.isRequired
}

export default RegisterModal
