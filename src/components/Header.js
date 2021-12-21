import React, {useContext} from "react";
import {Link} from "react-router-dom";
import FoodTruck from "./FoodTruck";
import UserContext from "../context/UserContext";

const Header = () => {

  const {user, onLogout} = useContext(UserContext)

  return <header className="App-header">
    <FoodTruck/>
    <ul className="container">
      <li>
        <Link to={'/'}>Wolf Blog</Link>
      </li>
      {user.isAuthenticated ? (
        <>
          <li>
            <Link to={'/new'}>Add Post</Link>
          </li>
          <li>
            <button className={'logout'} onClick={(event) => {
              event.preventDefault()
              onLogout()
            }}>Logout
            </button>
          </li>
        </>
      ) : (<li>
        <Link to={"/login"}>Login</Link>
      </li>)}
    </ul>
  </header>
}

export default Header