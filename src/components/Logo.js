import React from "react"
import { FaArrowRight } from "react-icons/fa"

const Logo = () => {
  return <span className={'logoBorderOuter'}>
    <span className={'logoBorder'}>
      <span className={'logo'}>No Outlet <FaArrowRight color={'#000000'} size={25} />
      </span>
    </span>
  </span>
}

export default Logo