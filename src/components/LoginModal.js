import Modal from 'react-bootstrap/Modal'
import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import propTypes from "prop-types";
import { login } from "../firebase"

const LoginModal = ({ show, setShow }) => {
  const username = useRef()
  const password = useRef()

  const [errors, setErrors] = useState({})

  const handleCancel = () => {
    setShow(false)
  }

  const handleSubmit = () => {

    setErrors({})

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const loginUser = async () => {
      try {
        await login(username.current.value, password.current.value)
        setShow(false)
      } catch (error) {
        const errorCode = error.code

        switch (errorCode) {
          case 'auth/invalid-email':
            setErrors({ username: 'Invalid email.' })
            break
          case 'auth/user-not-found':
            setErrors({ username: 'User not found.' })
            break
          case 'auth/wrong-password':
            setErrors({ password: 'Wrong password.' })
            break
          default:
            console.log({ error })
        }
      }
    }

    loginUser()

  }

  const validate = () => {
    const emailValue = username.current.value
    const passwordValue = password.current.value

    const newErrors = {}
    if (!emailValue || emailValue.trim().length === 0) {
      newErrors.username = 'Email may not be blank.'
    }
    if (!passwordValue || passwordValue.trim().length === 0) {
      newErrors.password = 'Password may not be blank.'
    }
    return newErrors
  }

  return <Modal show={show} onHide={handleCancel}>
    <Modal.Header closeButton>
      <Modal.Title>Login</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={username} isInvalid={errors?.username} />
          {!errors.username && <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>}
          {errors?.username && <Form.Control.Feedback type='invalid'>
            {errors?.username}
          </Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={password} isInvalid={errors?.password} />
          {errors?.password && <Form.Control.Feedback type='invalid'>
            {errors?.password}
          </Form.Control.Feedback>}
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="primary" disabled={!show} onClick={handleSubmit}>
        Submit
      </Button>
    </Modal.Footer>
  </Modal>
}

LoginModal.propTypes = {
  show: propTypes.bool.isRequired,
  setShow: propTypes.func.isRequired
}

export default LoginModal