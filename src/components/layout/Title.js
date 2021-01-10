import React from 'react'
import question from '../../assets/images/question.svg'

const Title = ({ title }) => (
  <div className="flex mt-6 mb-2">
    <span className="mr-2">{ title }</span>
    <img src={question} alt="" className="" />
  </div>
)

export default Title