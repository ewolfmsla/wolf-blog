import React, {useContext, useState} from "react";
import UserContext from "../context/UserContext";

const Login = () => {
  const {onLogin} = useContext(UserContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  console.log('Login component render')

  const handleLogin = (event) => {
    event.preventDefault()
    onLogin(username, password)
  }

  return (<form className={"container"} onSubmit={handleLogin}>
      <h1>Login</h1>
      <label htmlFor={"username"}>Username:</label>
      <input type={"text"} id={"username"} onChange={event => setUsername(event.target.value)}
             placeholder={"Enter email"}/>
      <label htmlFor={"password"}>Password:</label>
      <input type={"text"} id={"password"} onChange={event => setPassword(event.target.value)}
             placeholder={"Enter password"}/>
      <div>
        <button className={"form-button"} disabled={!username || !password} type={"submit"}>Login</button>
      </div>
    </form>
  )
}

export default Login