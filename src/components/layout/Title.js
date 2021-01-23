import React from 'react'
import question from '../../assets/images/question.svg'



const MainTitle = ({ title, icon }) => (
  <div className="flex items-center mb-6 whitespace-nowrap">
    {icon && <img src={icon} alt="" className="mr-4" />}
    <span className="text-lg">{ title }</span>
  </div>
)

const SubTitleOne = ({ title, icon=false }) => (
  <div className="flex items-center text-white whitespace-nowrap">
    {icon && <img src={icon} alt="" className="mr-4" />}
    <span className="text-base font-bold">{ title }</span>
  </div>
)

const SubTitleTwo = ({ title }) => (
  <div className="flex mb-2 items-center whitespace-nowrap">
    <span className="mr-2 text-gray-400 text-sm" style={{lineHeight: '1.375rem'}}>{ title }</span>
    <img src={question} alt="" className="" style={{paddingTop: '0.15rem'}}/>
  </div>
)

const ResurrectionClock = ({values}) => (
  <div className="flex items-center whitespace-nowrap">
    <span className="mr-2 text-gray-400 text-sm" style={{lineHeight: '1.375rem'}}>Resurrection: {values.daysDisplayed} days 0{values.hours}:0{values.minutes}:00</span>
    <img src={question} alt="" className=""/>
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