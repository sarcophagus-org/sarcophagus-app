import React, { useState } from 'react'
import classnames from 'classnames'

const baseClosed = "border border-white mt-2 mb-8 cursor-pointer flex items-center justify-center"
const disabled = "border border-gray-400 mt-2 mb-8 cursor-normal flex items-center justify-center text-gray-400"

const ClosedButton = ({ handleClick, label, isDisabled}) => (
  <div className={isDisabled ? classnames(disabled) : classnames(baseClosed)} onClick={handleClick} style={{ height: '3rem', width: '22rem' }}>
    <span className="text-lg">{ label }</span>
  </div>
)

const ExpandedButton = ({ handleClick, setExpanded, children }) => (
  <div className="border border-white mt-2 mb-8 relative" style={{ width: '22rem' }}>
    <div className="top-2 right-2 absolute flex justify-center items-center border border-white rounded z-10 cursor-pointer" style={{height: '2rem', width: '2rem'}} onClick={handleClick}>
      {/* <img className="w-full h-full" src="" alt="" /> */}
    </div>
    { children(setExpanded) }
  </div>
)

const MenuItem = ({ isDisabled=false, label, children}) => {
  const [ expanded, setExpanded ] = useState(false)
  const _handleClick = () => setExpanded(expanded => isDisabled ? null : !expanded)
  if(expanded) return <ExpandedButton handleClick={_handleClick} isDisabled={isDisabled} children={children} setExpanded={setExpanded}/>
  return <ClosedButton label={label} handleClick={_handleClick} isDisabled={isDisabled} />
}

export default MenuItem