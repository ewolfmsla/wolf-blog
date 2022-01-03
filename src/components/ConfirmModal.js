import React, { useState } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import propTypes from "prop-types"

const ConfirmModal = ({ title = "Confirm", id, text, onCancel, onContinue }) => {
  const [show, setShow] = useState(true)

  const handleCancel = () => {
    setShow(false)
    onCancel()
  }

  const handleContinue = () => {
    setShow(false)
    onContinue(id)
  }

  return <Modal show={show} onHide={handleCancel}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="primary" disabled={!show} onClick={handleContinue}>
        Continue
      </Button>
    </Modal.Footer>
  </Modal>
}

ConfirmModal.propTypes = {
  id: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  title: propTypes.string,
  onCancel: propTypes.func.isRequired,
  onContinue: propTypes.func.isRequired
}

export default ConfirmModal