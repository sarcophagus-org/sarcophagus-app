import React from "react"
import { NavLink as Link } from "react-router-dom"

const NavLink = ({ title, dest, icon, ...rest }) => (
  <Link to={dest} activeClassName="border-b-4 border-white text-white pb-2" className="text-sm text-gray-300 flex items-center justify-center" {...rest}>
    {icon && <img src={icon} alt="" className="mr-2 h-4" />}
    { title }
  </Link>
)


export default NavLink