import React from 'react'
import classnames from 'classnames'

const heightOptions = {
  sm: '1.25rem',
  md: '1.88rem',
  lg: '2.625rem',
  xl: '6.75rem',
  accuse: '4rem'
}

const baseText = "w-full pl-4 text-md bg-black font-normal text-white placeholder-text border remove-input-steps focus:outline-none"
const borderText = "border border-gray-500"
const errorBorderText = "border border-red"

const TextInput = ({ type, height="md", _classnames, iPlaceholder="", error, errored, ...rest }) => (
  <input type={type} className={errored ? classnames(baseText, iPlaceholder, errorBorderText, _classnames) : classnames(baseText, borderText, iPlaceholder, _classnames)} style={{height: heightOptions[height], lineHeight: '1.4357rem'}} {...rest}/>
)

const baseTextArea ="w-full p-2 bg-black text-white text-md focus:outline-none border border-gray-500"
const TextAreaInput = ({ type, height="md", error, errored, _classnames, ...rest }) => (
  <textarea type={type} className={errored ? classnames(baseTextArea, errorBorderText, _classnames) : classnames(baseTextArea, _classnames)} style={{height: heightOptions[height], lineHeight: '1.4357rem'}} {...rest} />
)

const RadioButton = ({type, value, children, ...rest}) => (
  <div className="text-sm" style={{lineHeight: '2.125rem'}}>
    <input id={value} type={type} {...rest}/>
    <label htmlFor={value}>{children}</label>
  </div>
)

const Input = ({ type='text', ...rest} ) => {
  if(type === "text" || type === "number") return <TextInput type={type} {...rest} />
  if(type === "textarea") return <TextAreaInput type={type} {...rest} />
  if(type === "radio") return <RadioButton type={type} {...rest} />
  return <></>
}

export default Input