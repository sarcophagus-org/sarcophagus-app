import React, { useState } from 'react'

const ClosedButton = ({ handleClick, label }) => (
  <div className="border border-white my-2 py-1 text-center cursor-pointer" onClick={handleClick} style={{ height: '2rem', width: '28rem' }}>
    { label }
  </div>
)

const ExpandedButton = ({ handleClick, children }) => (
  <div className="border border-white my-2 p-2 relative" style={{ width: '28rem' }}>
    <div className="top-2 right-2 absolute flex justify-center items-center border border-white rounded z-10 cursor-pointer" style={{height: '2rem', width: '2rem'}} onClick={handleClick}>
      {/* <img className="w-full h-full" src="" alt="" /> */}
    </div>
    { children }
  </div>
)

const MenuItem = ({ isDisabled=false, label, children}) => {
  const [ expanded, setExpanded ] = useState(false)
  const _handleClick = () => setExpanded(!expanded)
  if(expanded) return <ExpandedButton handleClick={_handleClick} isDisabled={isDisabled} children={children}/>
  return <ClosedButton label={label} handleClick={_handleClick} isDisabled={isDisabled} />
}

export default MenuItem