import React from 'react'
import classnames from 'classnames'

const heightOptions = {
  sm: '1.25rem',
  md: '1.88rem',
  lg: '2.625rem',
  xl: '6.5rem'
}

const baseText = "w-full pl-4 text-md bg-black font-normal text-white placeholder-text border remove-input-steps focus:outline-none"
const borderText = "border border-gray-500"
const errorBorderText = "border border-red"

const TextInput = ({ type, height="md", iPlaceholder="", error, errored, ...rest }) => (
  <input type={type} className={errored ? classnames(baseText, iPlaceholder, errorBorderText) : classnames(baseText, borderText, iPlaceholder)} style={{height: heightOptions[height], lineHeight: '1.4357rem'}} {...rest}/>
)

const textareaPadding = "p-2"
const hidden = "overflow-hidden"
const TextAreaInput = ({ type, height="md", error, errored, ...rest }) => (
  <textarea type={type} className={errored ? classnames(baseText, textareaPadding, hidden, errorBorderText) : classnames(baseText, borderText, hidden, textareaPadding)} style={{height: heightOptions[height], lineHeight: '1.4357rem'}} {...rest} />
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