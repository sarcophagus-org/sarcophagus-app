import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import completedCheck from '../../../assets/images/completed.svg'
import { labels } from '../../../constants'

const baseClosed = "border border-white mt-2 mb-8 cursor-pointer flex items-center justify-center relative"
const disabled = "border border-gray-400 mt-2 mb-8 cursor-normal flex items-center justify-center text-gray-400 relative"

const ClosedButton = ({ handleClick, label, isDisabled}) => (
  <div className={isDisabled ? classnames(disabled) : classnames(baseClosed)} onClick={handleClick} style={{ height: '3rem', width: '23.55rem' }}>
    <span className="text-lg">{ label }</span>
  </div>
)

const CompletedButton = ({ handleClick, label, isDisabled}) => (
  <div className={isDisabled ? classnames(disabled) : classnames(baseClosed)} onClick={handleClick} style={{ height: '3rem', width: '23.55rem' }}>
    <span className="text-lg">{ label }</span>
    <div className="right-3 absolute flex justify-center items-center rounded z-10" style={{height: '1.75rem', width: '1.75rem', padding: '0.25rem', top: '0.585rem' }}>
      <img src={completedCheck} alt="" className="w-full h-full" />
    </div>
  </div>
)

const ExpandedButton = ({ handleClick, setExpanded, setCompleted, children }) => (
  <div className="border border-white mt-2 mb-8 relative rounded-sm" style={{ width: '23.55rem' }}>
    <div className="top-2 right-2 absolute flex justify-center items-center rounded z-10 cursor-pointer" style={{height: '1.5rem', width: '1.5rem', padding: '0.15rem'}} onClick={handleClick}>
      <svg viewBox="0 0 100 80" width="40" height="40" fill="#FFF">
        <rect width="100" height="20"></rect>
        <rect y="30" width="70" height="20"></rect>
        <rect y="60" width="50" height="20"></rect>
      </svg>
    </div>
    { children(setExpanded, setCompleted) }
  </div>
)

const MenuItem = ({ isDisabled=false, label, step, children}) => {
  const [ expanded, setExpanded ] = useState(false)
  const [ opened, setOpened ] = useState(false)
  const [ completed, setCompleted ] = useState(false)

  // Opens current step menu
  useEffect(() => {
    if(label === labels.createSarco && step === 0 && !opened) { setExpanded(true) ; setOpened(true) }
    if(label === labels.feeSettings && step === 1 && !opened) { setExpanded(true) ; setOpened(true) }
    if(label === labels.pickArchaeologist && step === 2 && !opened) { setExpanded(true) ; setOpened(true) }
    if(label === labels.completeEmbalming && step === 3 && !opened) { setExpanded(true) ; setOpened(true) }
  },[label, opened, step, setExpanded])

  const _handleClick = () => setExpanded(expanded => isDisabled ? null : !expanded)
  if(expanded) return <ExpandedButton handleClick={_handleClick} isDisabled={isDisabled} setExpanded={setExpanded} children={children} setCompleted={setCompleted}/>
  if(completed) return <CompletedButton label={label} handleClick={_handleClick} isDisabled={isDisabled} />
  return <ClosedButton label={label} handleClick={_handleClick} isDisabled={isDisabled} />
}

export default MenuItem