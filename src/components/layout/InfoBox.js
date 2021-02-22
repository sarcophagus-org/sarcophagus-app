import React from 'react'

const InfoBox = ({ children, margin="mt-8", ...rest }) => (
  <div className={`text-gray-400 text-2xs ${margin}`} {...rest}>
    { children }
  </div>
)

export default InfoBox