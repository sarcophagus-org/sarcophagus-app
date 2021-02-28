import React from 'react'
import { getCustomDate } from '../../utils/datetime'
import Tooltip from './Tooltip'

const MainTitle = ({ title, icon }) => (
  <div className="flex items-center mb-6 whitespace-nowrap">
    {icon && <img src={icon} alt="" className="mr-4" />}
    <span className="text-lg">{ title }</span>
  </div>
)

const SubTitleOne = ({ title, icon=false }) => (
  <div className="flex items-center text-white whitespace-pre-wrap md:whitespace-nowrap mr-2">
    {icon && <img src={icon} alt="" className="mr-4" />}
    <span className="text-md font-bold">{ title }</span>
  </div>
)

const SubTitleTwo = ({ title, showToolTip=false, toolTip="" }) => (
  <div className="flex items-center">
    <span className="mr-2 text-gray-400 text-sm whitespace-nowrap" style={{lineHeight: '1.375rem'}}>{ title }</span>
      {showToolTip && 
        <Tooltip>
          {toolTip}
        </Tooltip> }
  </div>
)

const ResurrectionClock = ({values}) => (
  <div className="flex items-center whitespace-nowrap">
    <span className="mr-2 text-gray-400 text-sm" style={{lineHeight: '1.375rem'}}>Resurrection: {getCustomDate(values.resurrectionTime)}</span>
      <Tooltip>
        Time currently set for resurrection
      </Tooltip>
  </div>
)

const Title = ({ type, ...rest }) => {
  if(type === 'main') return <MainTitle {...rest} />
  if(type === 'subOne') return <SubTitleOne {...rest} />
  if(type === 'subTwo') return <SubTitleTwo {...rest} />
  if(type === 'resurrection') return <ResurrectionClock {...rest}/>
  return <></>
}

export default Title