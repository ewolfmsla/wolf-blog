import React, {useState} from "react";
import propTypes from "prop-types";
import VisitorLoginModal from "./VisitorLoginModal";
import {Redirect} from "react-router-dom";


const VisitorLogin = ({setVisitor}) => {
  const [show, setShow] = useState(true)

  return show ? <VisitorLoginModal setShow={setShow} setVisitor={setVisitor}/> : <Redirect to={"/"}/>
}

VisitorLogin.propTypes = {
  setVisitor: propTypes.func.isRequired
}

export default VisitorLogin