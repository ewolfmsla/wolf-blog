import React, { useRef } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../firebase"
import { useAuth } from "../firebase";

const Login = () => {

  const username = useRef()
  const password = useRef()

  const user = useAuth()

  const onSubmit = (event) => {
    event.preventDefault()

    const loginUser = async () => {
      try {
        await login(username.current.value, password.current.value)
      } catch (error) {
        console.log({ error })
      }
    }

    loginUser()
  }

  if (!user?.email) {
    return (<form className={"container"} onSubmit={onSubmit}>
      <h1>Login</h1>
      <label htmlFor={"username"}>Username:</label>
      <input type={"text"} id={"username"} ref={username} placeholder={"Enter email"} />
      <label htmlFor={"password"}>Password:</label>
      <input type={"text"} id={"password"} ref={password} placeholder={"Enter password"} />
      <div>
        <button className={"form-button"} disabled={user?.email} type={"submit"}>Login</button>
      </div>
    </form>
    )
  } else {
    return <Redirect to={"/"} />
  }
}

export default Login