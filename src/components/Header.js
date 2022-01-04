
import propTypes from "prop-types";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logout } from "../firebase"
import LoginModal from "./LoginModal";
import Logo from "./Logo";

const Header = ({ displayMessage, user }) => {

  const [show, setShow] = useState(false)

  const onLogin = (event) => {
    event.preventDefault()
    setShow(true)
  }

  const onLogout = (event) => {
    event.preventDefault()
    logout()
      .then(() => displayMessage("logout"))
  }

  return (
    <>
      {show && <LoginModal show={show} setShow={setShow} />}
      <header className="App-header">
        <ul className="container">
          <li>
            <Link to={'/'}><Logo /></Link>
          </li>
          {user?.isAuthenticated ? (
            <>
              {user?.isAdmin && <li>
                <Link to={'/new'}><FaPlus /></Link>
              </li>}
              <li>
                <Button onClick={onLogout} className={'logoutButton'}>Logout</Button>
                {/* <FaUser size={20}
                  style={{ margin: '.5rem', float: 'right', color: '#ffff00' }}
                  title={user?.email} /> */}
              </li>
            </>
          ) : (<li>
            <Button className={"loginButton"} onClick={onLogin}>Login</Button>
          </li>)}
        </ul>
      </header>
    </>
  )

}

Header.propTypes = {
  displayMessage: propTypes.func.isRequired,
  user: propTypes.object.isRequired
}

export default Header