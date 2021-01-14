import React from 'react'


const FlyoutContainer = ({children}) => (
  <div className="absolute border border-white p-4" style={{width: '20rem', marginLeft: '-22rem'}}>
    {children}
  </div>
)

export default FlyoutContainer