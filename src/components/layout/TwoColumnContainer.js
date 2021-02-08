import React from 'react'

const TwoColumnContainer = ({ children }) => (
  <div className="md:grid md:grid-cols-2 mt-8 md:gap-6">
      { children }
  </div>
)

export default TwoColumnContainer