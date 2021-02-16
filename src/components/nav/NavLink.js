import React from "react"
import { NavLink as Link } from "react-router-dom"

const NavLink = ({ title, dest, ...rest }) => (
  <Link to={dest} activeClassName="border-b-4 border-white text-white" className="ml-6 pb-2 text-sm text-gray-300" {...rest}>
    { title }
  </Link>
)


export default NavLink