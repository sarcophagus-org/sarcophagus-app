import React from 'react'

const TwoColumnContainer = ({ children }) => (
  <div className="grid grid-cols-2 mt-8 gap-7">
      { children }
  </div>
)

export default TwoColumnContainer