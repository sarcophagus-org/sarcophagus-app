import React from 'react'

const InfoBox = ({ children, ...rest }) => (
  <div className="text-gray-400 text-2xs" {...rest}>
    { children }
  </div>
)

export default InfoBox