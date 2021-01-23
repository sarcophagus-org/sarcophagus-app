import React from 'react'

const Select = ({  children, ...rest }) => (
  <select {...rest} className="mr-2 border border-gray-500 bg-black pl-2 focus:outline-none" style={{width: '5.1875rem', height: '2.125rem'}}>
    { children }
  </select>
)

export default Select